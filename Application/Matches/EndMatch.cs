using Domain.Context;
using Domain.Errors;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Matches
{
    public class EndMatch
    {
        public class EndMatchRequest : IRequest<bool> {
            public long MatchId { get; set; }
        }
        public class Handler : IRequestHandler<EndMatchRequest, bool>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }
            public async Task<bool> Handle(EndMatchRequest request, CancellationToken cancellationToken)
            {
                var match = _context.Matches.Where(m => m.Id == request.MatchId).Include(m => m.Championat).FirstOrDefault();
                var homeStats = _context.ChampionatStats.Where(s => s.ChampionatId == match.ChampionatId && s.TeamId == match.HomeTeamId).FirstOrDefault();
                var visitorStats = _context.ChampionatStats.Where(s => s.ChampionatId == match.ChampionatId && s.TeamId == match.VisitorId).FirstOrDefault();
                
                if (match == null) {
                    throw new RestException(System.Net.HttpStatusCode.NotFound, "Матч не найден!");
                }

                if (homeStats == null || visitorStats == null)
                {
                    throw new RestException(System.Net.HttpStatusCode.BadRequest, "Общая ошибка, матч не удалось завершить, обратитесь к администратору");
                }

                if (match.IsLive)
                {
                    match.IsLive = false;
                    match.IsEnded = true;
                    
                    if (match.HomeGoals.HasValue)
                    {
                        visitorStats.GoalsConceded += match.HomeGoals.Value;
                        homeStats.Goals += match.HomeGoals.Value;
                    }


                    if (match.VisitorGoals.HasValue)
                    {
                        visitorStats.Goals += match.VisitorGoals.Value;
                        homeStats.GoalsConceded += match.VisitorGoals.Value;
                    }

                    if (match.HomeGoals.Value == match.VisitorGoals.Value)
                    {
                        homeStats.Draw++;
                        homeStats.Points++;
                        visitorStats.Draw++;
                        visitorStats.Points++;
                    } else if (match.HomeGoals.Value >= match.VisitorGoals.Value)
                    {
                        homeStats.Win++;
                        homeStats.Points += 3;
                        visitorStats.Lose++;
                    } else
                    {
                        homeStats.Lose++;
                        visitorStats.Win++;
                        visitorStats.Points += 3;
                    }

                    return await _context.SaveChangesAsync() > 0;
                }
                throw new RestException(System.Net.HttpStatusCode.BadRequest, "Матч не начат!");
            }
        }

    }
}
