using Application.Managment.Dto;
using Domain.Context;
using Domain.Errors;
using Domain.Models.Account;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.Managment.Users
{
    public class GetById
    {
        public class UsersGetById : IRequest<ManagmentUserDto>
        {
            public Guid UserId { get; set; }
        }
        public class Handler : IRequestHandler<UsersGetById, ManagmentUserDto>
        {
            private readonly AppDbContext _context;
            private readonly UserManager<User> _userManager;
            public Handler(AppDbContext context, UserManager<User> userManager)
            {
                _context = context;
                _userManager = userManager;
            }
            public async Task<ManagmentUserDto> Handle(UsersGetById request, CancellationToken cancellationToken)
            {
                var user = _context.Users.Where(u => u.Id == request.UserId)
                    .Include(u => u.UserRoles)
                    .FirstOrDefault();
                var roles = await _userManager.GetRolesAsync(user);
                var result = new ManagmentUserDto()
                {
                    Id = user.Id,
                    Email = user.Email,
                    OwnerName = user.OwnerName,
                    PhoneNumber = user.PhoneNumber,
                    UserName = user.UserName,
                    RolesId = roles
                };
                if (user == null)
                {
                    throw new RestException(System.Net.HttpStatusCode.NotFound, "Пользователь не найден!");
                }
                return result;
            }
        }
    }
}
