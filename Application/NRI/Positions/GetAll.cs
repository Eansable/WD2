using Domain.Context;
using Domain.Helpers.JWT;
using Domain.Models.Account;
using Domain.Models.NRI;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.NRI.Positions
{
    public class GetAll
    {
        public class GetAllRequest : IRequest<List<Position>> 
        {
            
        }

        public class Handler : IRequestHandler<GetAllRequest, List<Position>>
        {
            private readonly AppDbContext _context;
            private readonly UserAccessor _userAccessor;
            private readonly UserManager<User> _userManager;

            public Handler(AppDbContext context, UserAccessor userAccessor, UserManager<User> userManager)
            {
                _context = context;
                _userAccessor = userAccessor;
                _userManager = userManager;
            }

            public async Task<List<Position>> Handle(GetAllRequest request, CancellationToken cancellationToken)
            {
                try
                {
                    var pos = _context.Positions.ToList();
                    var user = await _userManager.FindByNameAsync(_userAccessor.GetCurrentUsername());
                    var roles = await _userManager.GetRolesAsync(user);
                    return pos;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

    }
}
