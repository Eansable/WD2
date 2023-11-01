using Application.Dto;
using Application.Players.Dto;
using Domain.Context;
using MediatR;

namespace Application.Players
{
    public class GetPageLastMatches
    {
        public class PlayerGetPageLastMatches : IRequest<Page<PlayerLastMatchDto>>
        {
            public long Id { get; set; }
            public int Page { get; set; }
            public int PageSize { get; set; }
        }
        public class Handler : IRequestHandler<PlayerGetPageLastMatches, Page<PlayerLastMatchDto>>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }
            public async Task<Page<PlayerLastMatchDto>> Handle(PlayerGetPageLastMatches request, CancellationToken cancellationToken)
            {

                return new Page<PlayerLastMatchDto>();
            }
        }

    }
}
