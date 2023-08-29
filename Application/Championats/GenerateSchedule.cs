using Application.Matches.Dto;
using Domain.Context;
using Domain.Errors;
using Domain.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Championats
{
    public class GenerateSchedule
    {
        public class ChampionatGenerateSchedule : IRequest<List<MatchDto>>
        {
            public long ChampionatId { get; set; }
        }
        public class Handler : IRequestHandler<ChampionatGenerateSchedule, List<MatchDto>>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }
            public async Task<List<MatchDto>> Handle(ChampionatGenerateSchedule request, CancellationToken cancellationToken)
            {
                var champ = _context.Championats.Where(c => c.Id == request.ChampionatId).FirstOrDefault();
                if (champ == null)
                {
                    throw new RestException(System.Net.HttpStatusCode.NotFound, "Чемпионат не найден!");
                }
                if (_context.Matches.Any(m => m.ChampionatId == champ.Id))
                {
                    throw new RestException(System.Net.HttpStatusCode.BadRequest, "Невозможно сформировать календарь, так как матчи уже есть в чемпионате!");
                }
                var teams = _context.ChampionatStats.Where(t => t.ChampionatId == request.ChampionatId).Include(s => s.Team).ToList();
                if (teams.Count <= 1)
                {
                    throw new RestException(System.Net.HttpStatusCode.BadRequest, "Недостаточно команд чтобы сформировать календарь");
                }
                List<MatchDto> result = new();
                var matchesPerLap = teams.Count - 1;
                var firstTeam = teams[0];
                teams.Remove(firstTeam);
                for (var i = 1; i <= matchesPerLap; i++)
                {
                    for (var j = 0;  j < teams.Count / 2.0; j++ )
                    {
                        ChampionatStats team1;
                        ChampionatStats team2 = teams[teams.Count - j - 1];
                        if(j == 0)
                        {
                            team1 = firstTeam;
                        } else
                        {
                            team1 = teams[j - 1];
                        }
                        for (var u = 0; u < champ.LapsCount; u++)
                        {
                            var home = u % 2 == i % 2 ? team1 : team2;
                            var visitor = u % 2 == i % 2 ? team2 : team1;
                            Match match = new Match()
                            {
                                ChampionatId = champ.Id,
                                HomeTeamId = home.TeamId,
                                VisitorId = visitor.TeamId,
                                Round = u * matchesPerLap + i
                            };
                            result.Add(new MatchDto
                            {
                                Id = match.Id,
                                Round = match.Round,
                                Home = new TeamMatchDto() { TeamId = home.TeamId, TeamLogo = home.Team.LogoId, TeamName = home.Team.Name },
                                Visitor = new TeamMatchDto() { TeamId = visitor.TeamId, TeamLogo = visitor.Team.LogoId, TeamName = visitor.Team.Name },
                            });
                            await _context.Matches.AddAsync(match);
                        }
                        
                    }
                    var lastTeam = teams[teams.Count - 1];
                    teams.Remove(lastTeam);
                    teams.Insert(0, lastTeam);
                }
                await _context.SaveChangesAsync();
                return result;
                }
            }
        }

    }

