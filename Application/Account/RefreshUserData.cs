using Application.Account.Dto;
using Domain.Context;
using Domain.Errors;
using Domain.Helpers.JWT;
using Domain.Models.Account;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Account
{
    public class RefreshUserData
    {
        public class RefreshUserDataRequest : IRequest<UserDto>
        {

        }

        public class Handler : IRequestHandler<RefreshUserDataRequest, UserDto>
        {
            private readonly AppDbContext _context;
            private readonly UserManager<User> _userManager;
            private readonly UserAccessor _userAccessr;

            public Handler(AppDbContext context, UserManager<User> userManager, UserAccessor userAccessr)
            {
                _context = context;
                _userManager = userManager;
                _userAccessr = userAccessr;
            }

            public async Task<UserDto> Handle(RefreshUserDataRequest request, CancellationToken token)
            {

                string userName = _userAccessr.GetCurrentUsername();

                if (userName == null)
                {
                    throw new RestException(System.Net.HttpStatusCode.Unauthorized, "Пользователь не найден");
                }

                var user = _context.Users.Where(u => u.UserName == userName).FirstOrDefault();
                var roles = await _userManager.GetRolesAsync(user);
                var result = new UserDto()
                {
                    UserName = user.UserName,
                    Id = user.Id,
                    Email = user.Email,
                    Roles = (IList<string>)roles,
                    CaptainTeamId = user.CaptainTeamId,
                };
                return result;
            }
        }
    }
}
