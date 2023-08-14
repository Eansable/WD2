using Domain.Context;
using Domain.Errors;
using Domain.Models.Account;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Data;

namespace Application.Account
{
    public class AddRoles
    {
        public class AccountAddRoles : IRequest<bool>
        {
            public Guid UserId { get; set; }
            public List<string> Roles { get; set; }
            public List<string> RemoveRoles { get; set; }
        }
        public class Handler : IRequestHandler<AccountAddRoles, bool>
        {
            private readonly AppDbContext _context;
            private readonly UserManager<User> _userManager;

            public Handler(AppDbContext context, UserManager<User> userManager)
            {
                _context = context;
                _userManager = userManager;
            }

            public async Task<bool> Handle(AccountAddRoles request, CancellationToken cancellationToken)
            {   
                var user = _context.Users.Where(u => u.Id == request.UserId).FirstOrDefault();
                if (user == null)
                {
                    throw new RestException(System.Net.HttpStatusCode.NotFound, "Игрок не найден!");
                }
                var roles = _userManager.GetRolesAsync(user);
                List<string> listRoles = new List<string>() { "authorized" };
                foreach (var role in request.Roles)
                {
                    listRoles.Add(_context.Roles.Where(r => r.NormalizedName == role.ToUpper().Trim()).Select(r => r.Name).FirstOrDefault());
                }
                List<string> removeRoles = new List<string>();
                foreach (var role in request.RemoveRoles)
                {
                    removeRoles.Add(_context.Roles.Where(r => r.NormalizedName == role.ToUpper().Trim()).Select(r => r.Name).FirstOrDefault());
                }

                await _userManager.AddToRolesAsync(user, listRoles);
                await _userManager.RemoveFromRolesAsync(user, removeRoles);

                return true;
            }
        }
    }
}
