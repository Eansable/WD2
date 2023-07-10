using Domain.Context;
using MediatR;
using Domain.Models;


namespace Application.Championats
{
    public class GetAll
    {
        public class ChampionatGetAll : IRequest<List<Championat>>
        {

        }
        public class Handler : IRequestHandler<ChampionatGetAll, List<Championat>>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }
            public async Task<List<Championat>> Handle(ChampionatGetAll request, CancellationToken cancellationToken)
            {
                var champs = _context.Championats.Where(c => c.IsActive == true).ToList();

                return champs;
            }
        }
    }
}
