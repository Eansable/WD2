using Domain.Context;
using Domain.Errors;
using Domain.Models;
using Domain.Models.NRI;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Matches
{
    public class AddSubstitution
    {
        public class MatchAddSubs : IRequest<bool>
        {
            public int Minute { get; set; }
            public long MatchId { get; set; }
            public long PlayerInId { get; set; }
            public long PlayerOutId { get; set;}
        }
        public class Handler : IRequestHandler<MatchAddSubs, bool>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<bool> Handle(MatchAddSubs request, CancellationToken cancellationToken)
            {

                var playerIn = _context.Squads.Where(p => p.MatchId == request.MatchId && p.PlayerId == request.PlayerInId).Include(p => p.Match).FirstOrDefault();
                var playerOut = _context.Squads.Where(p => p.MatchId == request.MatchId && p.PlayerId == request.PlayerOutId).FirstOrDefault();
                var championat = _context.Matches.Where(m => m.Id == request.MatchId).Include(m => m.Championat).Select(c => c.Championat).FirstOrDefault();
                var subsCount = _context.MatchEvents.Where(e => e.MatchId == request.MatchId && e.EventId == 5 && e.TeamId == playerOut.TeamId).Count();

                if (playerIn == null || playerOut == null || championat == null)
                {
                    throw new RestException(System.Net.HttpStatusCode.BadRequest, "Не удалось записать замену!");
                }
                if (championat.IsNeededSubsToProtocol && championat.SubsCount > subsCount)
                {
                    playerIn.MinuteStart = request.Minute;
                    playerOut.MinuteEnd = request.Minute;

                    var subs = new MatchEvent()
                    {
                    EventId = 5,
                    MatchId = request.MatchId,
                    PlayerId = request.PlayerInId,
                    Minute = request.Minute,
                    PLayerOutId= request.PlayerOutId,
                    };
                    _context.MatchEvents.Add(subs);
                }

                return await _context.SaveChangesAsync() > 0;
            }
        }
    }
}
