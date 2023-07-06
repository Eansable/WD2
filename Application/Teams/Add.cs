using Domain.Context;
using Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Teams
{
    public class Add
    {
        public class TeamAddRequest : IRequest<bool>
        {
            public string Name { get; set; }
            public string? Description { get; set; }

        }

        public class Handler : IRequestHandler<TeamAddRequest, bool>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<bool> Handle(TeamAddRequest request, CancellationToken cancellationToken)
            {
                if (_context.Teams.Any(t => t.Name.ToUpper() == request.Name.ToUpper()))
                {
                    throw new Exception("Команда с таким именем уже существует");
                }
                Team team = new Team()
                {
                    Name = request.Name,
                    Description = request.Description,
                    CreateTeam = DateTime.Now,
                    CaptainId = 1
                };
                _context.Teams.Add(team);
                return _context.SaveChanges() > 0;
            }
        }
    }
}
