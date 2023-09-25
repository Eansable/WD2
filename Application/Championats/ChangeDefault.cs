using Domain.Context;
using Domain.Errors;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Championats
{
    public class ChangeDefault
    {
        public class ChampionatChangeDefault : IRequest<bool>
        {
            public long ChampId { get; set; }

        }
        public class Handler : IRequestHandler<ChampionatChangeDefault, bool> {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }
            public async Task<bool> Handle(ChampionatChangeDefault request, CancellationToken cancellationToken)
            {
                var champ = _context.Championats.Where(c => c.Id == request.ChampId).FirstOrDefault();
                if (champ == null)
                {
                    throw new RestException(System.Net.HttpStatusCode.NotFound, "Чемпионат не найден!");
                }    
                var champs = _context.Championats.Where(c => c.Id != request.ChampId).ToList();
                foreach (var item in champs)
                {
                    item.IsDefaultChamp = false;
                }
                champ.IsDefaultChamp = true;


                
                return await _context.SaveChangesAsync() > 0;
            }
        }


    }
}
