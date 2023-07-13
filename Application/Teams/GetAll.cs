using Domain.Context;
using Domain.Models;
using MediatR;

namespace Application.Teams
{
    public class GetAll
    {
        public class TeamGetAllRequest :  IRequest<List<Team>> 
        {
            public string? Name { get; set; }
            public bool IsOnlyActive { get; set; } = false;
        }
        public class Handler : IRequestHandler<TeamGetAllRequest, List<Team>>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<List<Team>> Handle(TeamGetAllRequest request, CancellationToken cancellationToken)
            {
                var teams = _context.Teams.Where(t => !request.IsOnlyActive || t.IsActive == true).ToList();
                if (request.Name != null)
                {
                    teams = teams.Where(t => t.Name.ToUpper().Contains(request.Name.ToUpper())).ToList();
                }
                return teams;
            }
        }
    }
}
