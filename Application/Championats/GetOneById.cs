using Application.Championats.Dto;
using Domain.Context;
using Domain.Errors;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Championats
{
    public class GetOneById
    {
        public class ChampionatGetOneById : IRequest<ChampionatDto>
        {
            public long Id { get; set; }
        }
        public class Handler : IRequestHandler<ChampionatGetOneById, ChampionatDto>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<ChampionatDto> Handle(ChampionatGetOneById request, CancellationToken cancellationToken)
            {
                var championat = _context.Championats.Where(c => c.Id == request.Id).FirstOrDefault();
                if (championat== null)
                {
                    throw new RestException(System.Net.HttpStatusCode.NotFound, "Чемпионат с таким Id не найден");
                }
                var table = _context.ChampionatStats.Where(s => s.ChampionatId == request.Id).Include(t => t.Team).OrderByDescending(t => t.Points).Select(tab => new ChampionatStatsDto() {
                    TeamId = tab.TeamId,
                    TeamName = tab.Team.Name,
                    TeamLogoId = tab.Team.LogoId,
                    Draw = tab.Draw,
                    Goals= tab.Goals,
                    GoalsConceded= tab.GoalsConceded,
                    Lose= tab.Lose,
                    Points = tab.Points,
                    RedCards= tab.RedCards,
                    Win = tab.Win,
                    YellowCards = tab.YellowCards
                }).ToList();
                return new ChampionatDto()
                {
                    Id = championat.Id,
                    ChampionatFormat = (int)championat.ChampionatFormat,
                    EndDate= championat.EndDate,
                    isActive= championat.IsActive,
                    Name= championat.Name,
                    PlayersCount = championat.PLayersCount,
                    StartDate= championat.StartDate,
                    Table= table,
                    YearString = championat.YearString,
                    LogoId = championat.LogoId,
                };
            }
        }
    }
}
