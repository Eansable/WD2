using Domain.Context;
using Domain.Models.NRI;
using MediatR;

namespace Application.NRI.Positions
{
    public class GetAll
    {
        public class GetAllRequest : IRequest<List<Position>> 
        {
            
        }

        public class Handler : IRequestHandler<GetAllRequest, List<Position>>
        {
            private readonly AppDbContext _context;
            public Handler(AppDbContext context)
            {
                _context = context;
            }
            public async Task<List<Position>> Handle(GetAllRequest request, CancellationToken cancellationToken)
            {
                try
                {
                    var pos = _context.Positions.ToList();

                    return pos;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

    }
}
