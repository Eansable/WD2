using Domain.Context;
using Domain.Errors;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Matches
{
    public class StartMatch
    {
        public class StartMatchRequest : IRequest<bool> {
            public long MatchId { get; set; }
        }
        public class Handler : IRequestHandler<StartMatchRequest, bool>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }
            public async Task<bool> Handle(StartMatchRequest request, CancellationToken cancellationToken)
            {
                var match = _context.Matches.Where(m => m.Id == request.MatchId).Include(m => m.Championat).FirstOrDefault();
                if (match == null) {
                    throw new RestException(System.Net.HttpStatusCode.NotFound, "Матч не найден!");
                }
                var team1Squad = _context.Squads.Where(s => s.MatchId == request.MatchId && s.TeamId == match.HomeTeamId).ToList();
                var team2Squad = _context.Squads.Where(s => s.MatchId == request.MatchId && s.TeamId == match.VisitorId).ToList();
                if (team1Squad.Count < match.Championat.PLayersCount || team2Squad.Count < match.Championat.PLayersCount)
                    throw new RestException(System.Net.HttpStatusCode.BadRequest, "Добавте стартовые составы!");
                if (!match.IsLive)
                {
                    match.IsLive = true;
                    match.HomeGoals = 0;
                    match.VisitorGoals = 0;
                    return await _context.SaveChangesAsync() > 0;
                }
                throw new RestException(System.Net.HttpStatusCode.BadRequest, "Матч уже начат!");
            }
        }

    }
}
