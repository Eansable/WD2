using Domain.Context;
using Domain.Models;
using MediatR;

namespace Application.Championats
{
    public class AddMatch
    {
        public class ChampionatAddMatch : IRequest<bool>
        {
            public long HomeId { get; set; }
            public long VisitorId { get; set; }
            public long StadiumId { get; set; }
            public DateTime? DateStartMatch { get; set; }
            public long ChampionatId { get; set;}
        }
        public class Handler : IRequestHandler<ChampionatAddMatch, bool>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<bool> Handle(ChampionatAddMatch request, CancellationToken cancellationToken)
            {
                var match = new Match()
                {
                    ChampionatId = request.ChampionatId,
                    HomeTeamId = request.HomeId,
                    VisitorId = request.VisitorId,
                    StadiumId = request.StadiumId,
                    StartMatch = DateTime.Now
                };
                await _context.AddAsync(match);
                return await _context.SaveChangesAsync() > 0;
            }
        }
    }
}
