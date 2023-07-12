using Domain.Context;
using Domain.Errors;
using Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Championats
{
    public class AddTeam
    {
        public class AddTeamInChampionat : IRequest<bool>
        {
            public long TeamId { get; set; }
            public long ChampionatId { get; set; }
        }

        public class Handler : IRequestHandler<AddTeamInChampionat, bool>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<bool> Handle(AddTeamInChampionat request, CancellationToken cancellationToken)
            {
                var checkTeam = _context.ChampionatStats.Any(c => c.ChampionatId == request.ChampionatId && c.TeamId == request.TeamId);
                if (checkTeam)
                {
                    throw new RestException(System.Net.HttpStatusCode.BadRequest, "Команда уже добавлена в этом турнире");
                }
                var team = new ChampionatStats
                {
                    ChampionatId = request.ChampionatId,
                    TeamId = request.TeamId,
                    Win = 0,
                    Draw = 0,
                    Lose = 0,
                    Goals = 0,
                    GoalsConceded = 0,
                    Points = 0,
                    RedCards = 0,
                    YellowCards = 0
                };
                await _context.AddAsync(team);
                return await _context.SaveChangesAsync() > 0;

            }
        }
    }
}
