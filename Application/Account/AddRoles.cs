using Domain.Context;
using Domain.Errors;
using Domain.Models.Account;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Account
{
    public class AddRoles
    {
        public class AccountAddRoles : IRequest<bool>
        {
            public Guid UserId { get; set; }
            public List<int> Roles { get; set; }
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

                
                return true;

            }
        }
    }
}
