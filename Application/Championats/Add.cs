using Domain.Context;
using Domain.Models;
using Domain.Models.Enums;
using MediatR;

namespace Application.Championats
{
    public class Add
    {
        public class ChampionatAdd : IRequest<bool>
        {
            public string Name { get; set; }
            public int Format { get; set; }
            public int PlayersCount { get; set; }
            public DateTime StartDate { get; set;}
            public DateTime EndDate { get; set; }
        }

        public class Handler : IRequestHandler<ChampionatAdd, bool>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }
            public async Task<bool> Handle(ChampionatAdd request, CancellationToken cancellationToken)
            {
                Championat champ = new Championat()
                {
                    Name = request.Name,
                    IsActive = true,
                    StartDate = request.StartDate,
                    EndDate = request.EndDate,
                    PLayersCount = request.PlayersCount,
                    ChampionatFormat = (ChampionatFormatEnum)request.Format
                };

                await _context.AddAsync(champ);
                return await _context.SaveChangesAsync() > 0;
            }
        }
    }
}
