using Domain.Context;
using Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Players
{
    public class GetByTeamId
    {
        public class PlayersGetAllByTeamId : IRequest<List<Player>>
        {
            public int TeamId { get; set; }

        }

        public class Handler : IRequestHandler<PlayersGetAllByTeamId, List<Player>>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<List<Player>> Handle(PlayersGetAllByTeamId request, CancellationToken cancellationToken)

            {
                return _context.Players.Where(p => p.TeamId == request.TeamId).OrderBy(p => p.Number).ToList();
            }
        }
    }


}
