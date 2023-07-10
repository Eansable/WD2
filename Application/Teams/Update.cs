using Domain.Context;
using Domain.Errors;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Teams
{
    public class Update
    {
        public class TeamUpdateRequest : IRequest<bool>
        {
            public long Id { get; set; }
            public string? Name { get; set; }
            public string? Description { get; set; }
        }
        public class Handler : IRequestHandler<TeamUpdateRequest, bool>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }
            public async Task<bool> Handle(TeamUpdateRequest request, CancellationToken cancellationToken)
            {
                var team = _context.Teams.Where(t => t.Id == request.Id).FirstOrDefault();
                if (team == null)
                {
                    throw new RestException(System.Net.HttpStatusCode.NotFound, "Команда с таким Id не найдена!");
                }
                if (request.Name != null) {
                
                team.Name = request.Name;
                }
                if (request.Description != null)
                {
                    team.Description = request.Description;
                }

                _context.Update(team);

                return await _context.SaveChangesAsync() > 0;
            }
        }
    }
}
