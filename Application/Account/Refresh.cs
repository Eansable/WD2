using Application.Account.Dto;
using Domain.Context;
using Domain.Helpers.JWT;
using Domain.Models.Account;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;

namespace Application.Account
{
    public class Refresh
    {
        public class RefreshRequest : IRequest<UserDto>
        {
            public string Token { get; set; }
            public long SessionId { get; set; }
        }

        public class Handler : IRequestHandler<RefreshRequest, UserDto>
        {
            private readonly IConfiguration _config;
            private readonly AppDbContext _context;
            private readonly JwtGenerator _jwt;
            private readonly UserManager<User> _userManager;

            public Handler(IConfiguration config, AppDbContext context, JwtGenerator jwt, UserManager<User> userManager)
            {
                _config = config;
                _context = context;
                _jwt = jwt;
                _userManager = userManager;
            }

            public async Task<UserDto> Handle(RefreshRequest request, CancellationToken cancellationToken)
            {
                try
                {
                    _jwt.ValidateToken(request.Token);
                    return null;
                } catch (Exception ex)
                { 
                    if (ex.Message == "Token expired")
                    {
                        var userName = _jwt.GetUserameFromExpiredToken(request.Token);
                        var expTime = _config["Tokens:ExpirationTime"];
                        var tokenDateTime = getTokenDateTime(request);

                        if (DateTime.UtcNow > tokenDateTime.AddMinutes(int.Parse(expTime ?? "1"))) {
                            var refreshToken = _context.RefreshTokens.Where(rt => rt.Id == request.SessionId).FirstOrDefault();
                            if (refreshToken != null)
                            {
                                _context.RefreshTokens.Remove(refreshToken);
                                await _context.SaveChangesAsync();
                            }

                            throw new Exception("Время токена истекло");
                        }

                        var user = await _userManager.FindByNameAsync(userName);
                        var userRT = _context.RefreshTokens.Where(rt => rt.Id == request.SessionId && rt.User.Id == user.Id).FirstOrDefault();
                        if (userRT != null)
                        {
                            var newRT = _jwt.GenerateRefreshToken();
                            userRT.Value= newRT;
                            _context.RefreshTokens.Update(userRT);
                            await _context.SaveChangesAsync();

                            var roles = await _userManager.GetRolesAsync(user);

                            return new UserDto
                            {
                                Token = _jwt.CreateTokenWithRoles(user, roles.ToList()),
                                RefreshToken = newRT,
                                UserName = user.UserName,
                                Roles = roles,
                                SessionId = userRT.Id
                            };

                        } else
                        {
                            throw new Exception("invalid Token");
                        }
                    }
                    throw ex;
                }
            }
            private DateTime getTokenDateTime(RefreshRequest request)
            {
                var handler = new JwtSecurityTokenHandler();
                var jwtSecurityToken = handler.ReadJwtToken(request.Token);
                var tokenExp = jwtSecurityToken.Claims.First(claim => claim.Type.Equals("exp")).Value;
                var ticks = long.Parse(tokenExp);
                var tokenDate = DateTimeOffset.FromUnixTimeSeconds(ticks).UtcDateTime;

                return tokenDate;
            }
        }
    }

}
