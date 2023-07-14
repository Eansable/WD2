using MediatR;
using Domain.Models.NRI;
using Domain.Context;

namespace Application.NRI.Stadiums
{
    public class GetAll
    {
        public class StadiumGetAll : IRequest<List<Domain.Models.NRI.Stadium>>
        {
            public string? Name { get; set; }
        }
        public class Handler : IRequestHandler<StadiumGetAll, List<Domain.Models.NRI.Stadium>>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<List<Domain.Models.NRI.Stadium>> Handle(StadiumGetAll request, CancellationToken cancellationToken)
            {
                var stadiums = _context.Stadiums.ToList();
                if (request.Name != null)
                {
                    stadiums = stadiums.Where(s => s.Name.ToUpper().Contains(request.Name.ToUpper())).ToList();
                }
                return stadiums;
            }
        }
    }
}
