using Domain.Context;
using Domain.Errors;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Championats
{
    public class DeleteTeamFromChampionat
    {
        public class DeleteTeam : IRequest<bool>
        {
            public long ChampionatId { get; set; }
            public long TeamId { get; set; }
        }

        public class Handler : IRequestHandler<DeleteTeam, bool>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<bool> Handle(DeleteTeam request, CancellationToken cancellationToken)
            {
                var teamStats = _context.ChampionatStats.Where(cs => cs.TeamId == request.TeamId && cs.ChampionatId == request.ChampionatId).FirstOrDefault();
                if (teamStats == null)
                {
                    throw new RestException(System.Net.HttpStatusCode.NotFound, "Команда с таким Id в этом чемпионате не найдена");
                };

                if (teamStats.Win > 0 || teamStats.Draw > 0 || teamStats.Lose > 0) {
                    throw new RestException(System.Net.HttpStatusCode.BadRequest, "Нельзя удалить команду ведь она сыграла уже один или больше матчей! Проставте ей технические поражения!");
                };

                _context.Remove(teamStats);
                return await _context.SaveChangesAsync() > 0;
            }
        }
    }
}
