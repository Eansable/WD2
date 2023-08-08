using Domain.Context;
using Domain.Errors;
using Domain.Models;
using MediatR;

namespace Application.Matches
{
    public class AddGoal
    {
        public class MatchAddGoal : IRequest<bool> { 
            public long PlayerId { get; set; }
            public long MatchId { get; set; }
            public long TeamId { get; set; }
            public long EventId { get; set; }
            public int Minute { get; set; }
        }
        public class Handler : IRequestHandler<MatchAddGoal, bool>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }
            public async Task<bool> Handle(MatchAddGoal request, CancellationToken cancellationToken)
            {
                var match = _context.Matches.Where(m => m.Id == request.MatchId).FirstOrDefault();
                if (match == null)
                {
                    throw new RestException(System.Net.HttpStatusCode.NotFound, "Матч не найден!");
                }
                if (match.IsLive)
                {
                    var matchEvent = new MatchEvent()
                    {
                        PlayerId = request.PlayerId,
                        TeamId = request.TeamId,
                        Minute = request.Minute,
                        MatchId = request.MatchId,
                        EventId = request.EventId,
                    };
                    if (match.HomeTeamId == request.TeamId)
                    {
                        match.HomeGoals++;
                    } else
                    {
                        match.VisitorGoals++;
                    }
                    await _context.MatchEvents.AddAsync(matchEvent);
                    return await _context.SaveChangesAsync() > 0;
                } else
                {
                    throw new RestException(System.Net.HttpStatusCode.BadRequest, "Матч не начат или закончен, действие не возможно!");
                }

                
            }
        }
    }
}
