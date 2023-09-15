using Domain.Context;
using Domain.Errors;
using MediatR;

namespace Application.Players
{
    public class Change
    {
        public class PlayerChange : IRequest<bool>
        {
            public long PlayerId { get; set; }
            public int? Number { get; set; }
            public string Name { get; set; }
            public string? SecondName { get; set; }
            public string? MiddleName { get; set; }
            public DateTime? Birthday { get; set; }
            public long? TeamId { get; set; }
        }
        public class Handler : IRequestHandler<PlayerChange, bool>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<bool> Handle(PlayerChange request, CancellationToken cancellationToken) 
            {
                var player = _context.Players.Where(p => p.Id == request.PlayerId).FirstOrDefault();
                if (player == null)
                {
                    throw new RestException(System.Net.HttpStatusCode.NotFound, "Игрок не найден!");
                }

                var teamPlayers = _context.Players.Where(t => t.TeamId == player.TeamId && t.Id != player.Id).Select(t => t.Number).ToList();

                if (teamPlayers.Contains(request.Number))
                {
                    throw new RestException(System.Net.HttpStatusCode.BadRequest, "Номер уже занят в команде!");
                }
                player.Number = request.Number;
                player.Name = request.Name;
                player.SecondName = request.SecondName;
                player.MiddleName = request.MiddleName;
                player.Birthday = request.Birthday;
                if (request.TeamId != null)
                {
                    player.TeamId = request.TeamId.Value;
                }
                return await _context.SaveChangesAsync() > 0;
            }
        }
    }
}
