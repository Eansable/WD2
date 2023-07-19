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
    public class GenerateSchedule
    {
        public class ChampionatGenerateSchedule : IRequest<bool>
        {
            public long ChampionatId { get; set; }
        }
        public class Handler : IRequestHandler<ChampionatGenerateSchedule, bool>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }
            public async Task<bool> Handle(ChampionatGenerateSchedule request, CancellationToken cancellationToken)
            {
                var champ = _context.Championats.Where(c => c.Id == request.ChampionatId).FirstOrDefault();
                if (champ == null)
                {
                    throw new RestException(System.Net.HttpStatusCode.NotFound, "Чемпионат не найден!");
                }
                var teams = _context.ChampionatStats.Where(t => t.ChampionatId == request.ChampionatId).Select(t => t.TeamId).ToList();
                if (teams.Count() <= 1) {
                    throw new RestException(System.Net.HttpStatusCode.BadRequest, "Недостаточно команд чтобы сформировать календарь");
                }
                var countRound = (teams.Count() - 1) * champ.LapsCount;
                for (var i = 0; i <= countRound; i++)
                {


                }

                return true;
            }
        }
    }
}
