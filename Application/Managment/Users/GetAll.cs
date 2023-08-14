using Application.Managment.Dto;
using Domain.Context;
using MediatR;

namespace Application.Managment.Users
{
    public class GetAll
    {
        public class UsersGetAll : IRequest<List<UsersListDto>>
        {

        }
        public class Handler : IRequestHandler<UsersGetAll, List<UsersListDto>>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }
            public async Task<List<UsersListDto>> Handle(UsersGetAll request, CancellationToken cancellationToken)
            {
                var users = _context.Users.Select(u => new UsersListDto()
                {
                    Id = u.Id,
                    Email= u.Email,
                    OwnerName= u.OwnerName,
                    PhoneNumber= u.PhoneNumber,
                    UserName= u.UserName,
                }).ToList();
                return users;
            }
        }
    }
}
