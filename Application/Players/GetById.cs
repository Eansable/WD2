using Application.Matches.Dto;
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
                        TeamLogoId = p.Team.LogoId,
                        TeamId = p.TeamId,
                    }).FirstOrDefault();
                if (player == null)
                {
                    throw new RestException(System.Net.HttpStatusCode.NotFound, "Игрок не найден!");
                }
                var events = _context.MatchEvents.Where(me => me.PlayerId == player.Id);
                var lastMatch = _context.Squads.Where(s => s.PlayerId == player.Id)
                    .Include(m => m.Match)
                    .ThenInclude(m => m.HomeTeam)
                    .Include(m => m.Match.Visitor)
                    .Select(s => new MatchDto()
                {
                        Id = s.Match.Id,
                    IsEnded = s.Match.IsEnded,
                    IsLive = s.Match.IsLive,
                    Home = new TeamMatchDto()
                    {
                        TeamName = s.Match.HomeTeam.Name,
                        TeamId = s.Match.HomeTeamId,
                        TeamLogo = s.Match.HomeTeam.LogoId,
                    },
                    Round = s.Match.Round,
                    Date = s.Match.StartMatch,
                    Visitor = new TeamMatchDto()
                    {
                        TeamName = s.Match.Visitor.Name,
                        TeamId = s.Match.VisitorId,
                        TeamLogo = s.Match.Visitor.LogoId,
                    },
                    Score = s.Match.HomeGoals.ToString() + " : " + s.Match.VisitorGoals.ToString(),
                }).FirstOrDefault();
                var matchesCount = _context.Squads.Where(s => s.PlayerId == player.Id).Count();
                player.GoalCount= events.Where(e => e.EventId == 1).Count();
                player.YellowCardCount= events.Where(e => e.EventId == 2 || e.EventId == 4).Count();
                player.RedCardCount = events.Where(e => e.EventId == 5).Count();
                player.LastMatch = lastMatch;
                player.MatchCount = matchesCount;
                return player;
            }
        }
    }
}
