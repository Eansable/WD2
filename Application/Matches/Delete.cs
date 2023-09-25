using Domain.Context;
using Domain.Errors;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Matches
{
    public class Delete
    {
        public class MatchesDelete : IRequest<bool>
        {
            public long MatchId { get; set; }
        }
        public class Handler : IRequestHandler<MatchesDelete, bool> { 
            private readonly AppDbContext _context;
            public Handler(AppDbContext context)
            {
                _context = context;
            }
            public async Task<bool> Handle(MatchesDelete request, CancellationToken cancellationToken)
            {
                var match = _context.Matches.Where(m => m.Id == request.MatchId).FirstOrDefault();
                if (match == null)
                {
                    throw new RestException(System.Net.HttpStatusCode.NotFound, "Матч не найден!");    
                }
                _context.Matches.Remove(match);
                return await _context.SaveChangesAsync() > 0;
            }
        }


    }
}
