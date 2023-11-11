using Domain.Context;
using Domain.Errors;
using Domain.Models.Account;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.Account
{
    public class Register
    {
        public class Request : IRequest<bool> 
        {
            /// <summary>
            /// Имя пользователя
            /// </summary>
            public string UserName { get; set; }
            /// <summary>
            /// Пароль
            /// </summary>
            public string Password { get; set; }
            public long? UserType { get; set; }
            public string? Email { get; set; }
            public string? Phone { get; set; }
            public string? OwnerName { get; set; }
            public long? TeamId { get; set; }
        }

        public class Validator : AbstractValidator<Request>
        {
            public Validator()
            {
                RuleFor(x => x.UserName).NotEmpty();
                RuleFor(x => x.Password).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Request, bool>
        {
            private readonly AppDbContext _context;
            private readonly PasswordHasher<User> _passwordHasher;
            private readonly UserManager<User> _userManager;

            public Handler(AppDbContext context, PasswordHasher<User> passwordHasher, UserManager<User> userManager)
            {
                _context = context;
                _passwordHasher = passwordHasher;
                _userManager = userManager;
            }

            public async Task<bool> Handle(Request request, CancellationToken cancellationToken)
            {
                var userCheck = _context.Users.Where(u => u.UserName == request.UserName).FirstOrDefault();
                var team = _context.Teams.Where(t => request.TeamId != null && t.Id == request.TeamId).FirstOrDefault();

                if (userCheck != null)
                {
                    throw new RestException(System.Net.HttpStatusCode.BadRequest, "Пользователь с таким логином уже существует");
                }
                var user = new User() {
                    UserName = request.UserName,
                    Email = request.Email,
                    RegistrationDate = DateTime.Now,
                    PhoneNumber = request.Phone,
                    OwnerName = request.OwnerName,
                };
                List<string> listRoles = new () { "authorized" };


                

                var hashedPassword = _passwordHasher.HashPassword(user, request.Password);
                user.PasswordHash = hashedPassword;


                var userTypeCode = _context.UserTypes.Where(u => u.Code == request.UserType).Select(u => u.Code).FirstOrDefault();
                listRoles.Add(await _context.Roles.Where(x => x.Code == userTypeCode).Select(x => x.Name).FirstOrDefaultAsync());

                if (request.TeamId != null)
                {
                    user.CaptainTeamId = request.TeamId;
                    listRoles.Add("teamManager");

                }

                await _userManager.CreateAsync(user);
                await _userManager.AddToRolesAsync(user, listRoles);

              

                if (team != null)
                {
                    team.CaptainId = user.Id;
                }

                return await _context.SaveChangesAsync() > 0;
                ;

            }
        }
    }
}
