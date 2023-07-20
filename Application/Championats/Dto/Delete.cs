using Domain.Context;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Championats.Dto
{
    public class Delete
    {
        public class ChampionatDelete : IRequest<bool>
        {
            public long Id { get; set; }
        }
        public class Handler : IRequestHandler<ChampionatDelete, bool >
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<bool> Handle(ChampionatDelete request, CancellationToken cancellationToken)
            {
                var champ = _context.Championats.Where(c => c.Id == request.Id).FirstOrDefault();
                _context.Remove(champ);
                return await _context.SaveChangesAsync() > 0;
            }
        }
    }
}
