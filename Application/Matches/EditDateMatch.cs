using Domain.Context;
using Domain.Errors;
using MediatR;

namespace Application.Matches
{
    public class EditDateMatch
    {
        public class MatchEditDate : IRequest<bool>
        {
            public long MatchId { get; set; }
            public DateTime DateTime { get; set; }
        }
        public class Handler : IRequestHandler<MatchEditDate, bool>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<bool> Handle(MatchEditDate request, CancellationToken cancellationToken)
            {
                var match = _context.Matches.Where(m => m.Id == request.MatchId).FirstOrDefault();
                if (match != null)
                {
                    throw new RestException(System.Net.HttpStatusCode.NotFound, "Матч не найден!");
                }
                match.StartMatch = request.DateTime;
                return await _context.SaveChangesAsync() > 0;
                
            }
        }
    }
}
