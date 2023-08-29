using Application.Players.Dto;
using Domain.Context;
using Domain.Errors;
using Domain.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Players
{
    public class GetById
    {
        public class PlayersGetById : IRequest<OnePlayerDto>
        {
            public long PlayerId { get; set; }
        }
        public class Handler : IRequestHandler<PlayersGetById, OnePlayerDto>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }
            public async Task<OnePlayerDto> Handle(PlayersGetById request, CancellationToken cancellationToken)
            {
                var player = _context.Players.Where(p => p.Id == request.PlayerId)
                    .Include(p => p.Team)
                    .Select(p => new OnePlayerDto()
                    {
                        AvatarId = p.AvatarId,
                        Birthday = p.Birthday,
                        Name = p.Name + " " + p.SecondName + " " + p.MiddleName,
                        Id = request.PlayerId,
                        TeamName = p.Team.Name,
                    }).FirstOrDefault();
                if (player == null)
                {
                    throw new RestException(System.Net.HttpStatusCode.NotFound, "Игрок не найден!");
                }
                var events = _context.MatchEvents.Where(me => me.PlayerId == player.Id);
                player.GoalCount= events.Where(e => e.EventId == 1).Count();
                player.YellowCardCount= events.Where(e => e.EventId == 2 || e.EventId == 4).Count();
                player.RedCardCount = events.Where(e => e.EventId == 5).Count();

                return player;
            }
        }
    }
}
