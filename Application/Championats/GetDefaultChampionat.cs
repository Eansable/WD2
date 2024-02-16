using Application.Championats.Dto;
using Domain.Context;
using Domain.Errors;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Championats
{
    public class GetDefaultChampionat
    {
        public class ChamionatGetDefault : IRequest<List<ChampionatStatsDto>>
        {
           
        }

        public class Handler : IRequestHandler<ChamionatGetDefault, List<ChampionatStatsDto>>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<List<ChampionatStatsDto>> Handle(ChamionatGetDefault request, CancellationToken cancellationToken)
            {
                var champ = _context.Championats.Where(ch => ch.IsDefaultChamp).FirstOrDefault();
                if (champ == null)
                {
                    throw new RestException(System.Net.HttpStatusCode.NotFound, "Чемпионат не найден!");

                }
                var champStats = _context.ChampionatStats.Where(cs => cs.ChampionatId == champ.Id).Include(t => t.Team)
                    .OrderByDescending(cs => cs.Points)
                    .OrderByDescending(cs => cs.Goals - cs.GoalsConceded)
                    .Select(c => new ChampionatStatsDto()
                {
                    TeamId= c.TeamId,
                    TeamName = c.Team.Name,
                    TeamLogoId= c.Team.LogoId,
                    Win = c.Win,
                    Draw= c.Draw,
                    Lose = c.Lose,
                    Goals= c.Goals,
                    GoalsConceded= c.GoalsConceded,
                    Points= c.Points,
                }).ToList();
                return champStats;
            }
        }
    }
}
