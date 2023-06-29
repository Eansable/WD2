using Domain.Context;
using Domain.Models.Account;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Domain.Models.Account.Enum;
using Microsoft.Extensions.Configuration;
using Application.Account.Dto;
using Domain.Helpers.JWT;
using Domain;

namespace Application.Account
{
    public class Login
    {
        public class LoginRequest : IRequest<UserDto>
        {
            public string UserName { get; set; }
            public string Password { get; set; }
        }

        public class Handler : IRequestHandler<LoginRequest, UserDto>
        {
            private readonly AppDbContext _context;
            private readonly PasswordHasher<User> _passwordHasher;
            private readonly UserManager<User> _userManager;
            private readonly IConfiguration _config;
            private readonly JwtGenerator _jwtGenerator;

            public Handler(AppDbContext context, PasswordHasher<User> passwordHasher, UserManager<User> userManager, IConfiguration configuration, JwtGenerator jwtGenerator)
            {
                _context = context;
                _passwordHasher = passwordHasher;
                _userManager = userManager;
                _config = configuration;
                _jwtGenerator = jwtGenerator;
            }

            public async Task<UserDto> Handle(LoginRequest request, CancellationToken cancellationToken)
            {
                var user = _context.Users.Include(u => u.UserRoles).ThenInclude(u => u.Role).Where(x => x.UserName == request.UserName).FirstOrDefault();
                if (user == null)
                {
                    throw new Exception("Пользователя с таким логином не существует!");
                }
                if (user.LockoutEnd != null)
                {
                    if (user.LockoutEnd.Value.Date == DateTime.MaxValue.Date) {
                        throw new Exception("Пользователь заблокирован!");
                    } else if (user.LockoutEnd > DateTime.Now)
                    {
                        throw new Exception("Заблокирован за превышение попыток входа в систему");
                    } else
                    {
                        user.LockoutEnd = null;
                        user.AccessFailedCount= 0;
                    }
                }

                if (_passwordHasher.VerifyHashedPassword(user, user.PasswordHash, request.Password) == PasswordVerificationResult.Failed)
                {
                    if (!user.UserRoles.Any(u => u.Role.Name == UserRoles.admin.ToString())) {
                        user.AccessFailedCount++;
                        var limit = short.Parse(_config["Lockout:LimitAttemps"]);
                        if (user.AccessFailedCount == limit) {
                            var time = short.Parse(_config["Lockout:Time"]);
                            user.LockoutEnd = DateTime.Now.AddMinutes(time);
                        }
                        await _context.SaveChangesAsync();
                    }
                    throw new Exception("Неверный логин или пароль");
                } else
                {
                    if (user.AccessFailedCount != 0) user.AccessFailedCount = 0;
                }

                var role = _context.Roles.Where(r => r.Code == 1).FirstOrDefault();

                var refreshToken = _jwtGenerator.GenerateRefreshToken();
                var token = new RefreshToken()
                {
                    User = user,
                    Value= refreshToken,
                    Date= DateTime.Now,
                };
                await _context.RefreshTokens.AddAsync(token);
                await _context.SaveChangesAsync();
                var result = new UserDto()
                {
                    Id= user.Id,
                    UserName = user.UserName,
                    Email= user.Email,
                    Roles= user.UserRoles.Select(u => u.Role.Name).ToList(),
                    SessionId = token.Id,
                    RefreshToken = token.Value,
                    Token = _jwtGenerator.CreateTokenWithRoles(user, user.UserRoles.Select(u => u.Role.Name).ToList())
                };
                return result;
            }
        } 
    }
}
