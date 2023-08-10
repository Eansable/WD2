using Domain.Context;
using Domain.Errors;
using Domain.Models;
using MediatR;

namespace Application.Matches
{
    public class AddCard
    {
        public class MatchesAddCard : IRequest<bool>
        {
            public long MatchId { get; set; }
            public long PlayerId { get; set; }
            public long EventId { get; set; }
        }

        public class Handler : IRequestHandler<MatchesAddCard, bool>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }
            public async Task<bool> Handle(MatchesAddCard request, CancellationToken cancellationToken)
            {
                var match = _context.Matches.Where(m => m.Id ==  request.MatchId).FirstOrDefault();
                var player = _context.Players.Where(p => p.Id ==  request.PlayerId).FirstOrDefault();
                if (match == null)
                {
                    throw new RestException(System.Net.HttpStatusCode.NotFound, "Матч не найден!");
                }

                var playerYellowCards = _context.MatchEvents.Where(c => c.MatchId == request.MatchId 
                                                                        && c.PlayerId == request.PlayerId
                                                                        && c.EventId == 2).ToList();
                var playerRedCards = _context.MatchEvents.Where(c => c.MatchId == request.MatchId
                                                                        && c.PlayerId == request.PlayerId
                                                                        && c.EventId == 3).ToList();
                if (playerYellowCards.Count < 2 && playerRedCards.Count < 1) {
                var card = new MatchEvent()
                {
                    MatchId = request.MatchId,
                    PlayerId = request.PlayerId,
                    Minute = 1,
                    TeamId = player.TeamId,
                    EventId = request.EventId,
                };
                    _context.MatchEvents.Add(card);
                } else
                {
                    throw new RestException(System.Net.HttpStatusCode.BadRequest, "Не возможно добавить игроку ещё одну карточку!");
                }
                return await _context.SaveChangesAsync() > 0;
            }
        }
    }
}
