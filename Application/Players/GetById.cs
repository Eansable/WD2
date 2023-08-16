using Domain.Context;
using Domain.Errors;
using Domain.Models;
using MediatR;

namespace Application.Players
{
    public class GetById
    {
        public class PlayersGetById : IRequest<Player>
        {
            public long PlayerId { get; set; }
        }
        public class Handler : IRequestHandler<PlayersGetById, Player>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }
            public async Task<Player> Handle(PlayersGetById request, CancellationToken cancellationToken)
            {
                var player = _context.Players.Where(p => p.Id == request.PlayerId).FirstOrDefault();
                if (player == null)
                {
                    throw new RestException(System.Net.HttpStatusCode.NotFound, "Игрок не найден!");
                }
                return player;
            }
        }
    }
}
