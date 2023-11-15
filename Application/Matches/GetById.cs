using Application.Matches.Dto;
using Domain.Context;
using Domain.Errors;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Matches
{
    public class GetById
    {
        public class MatchesGetById : IRequest<OneMatchDto>
        {
            public long MatchId { get; set; }
        }
        public class Handler : IRequestHandler<MatchesGetById, OneMatchDto> {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<OneMatchDto> Handle(MatchesGetById request, CancellationToken cancellationToken)
            {
               
                var match = _context.Matches.Where(m => m.Id == request.MatchId)
                    .Include(m => m.HomeTeam)
                    .Include(m => m.Visitor)
                    .Include(m => m.Stadium)
                    .Include(m => m.Championat)
                    .FirstOrDefault();

                var homePlayers = _context.Players.Where(p => p.TeamId == match.HomeTeamId)
                    .Select(p => new MatchPlayerDto()
                    {
                        PlayerId = p.Id,
                        PlayerName = p.SecondName + " " + p.Name,
                        IsSquad = _context.Squads.Any(s => s.PlayerId == p.Id && s.MatchId == match.Id),
                        IsDiscfal = _context.Discfalifications.Where(d => d.PlayerId == p.Id && d.ChampionatId == match.ChampionatId)
                                                                .Any(d => d.IsActive),
                        Number = p.Number
                                                                
                    })
                    .ToList();

                var visitorPlayers = _context.Players.Where(p => p.TeamId == match.VisitorId)
                    .Select(p => new MatchPlayerDto()
                    {
                        PlayerId = p.Id,
                        PlayerName = p.SecondName + " " + p.Name,
                        IsSquad = _context.Squads.Any(s => s.PlayerId == p.Id && s.MatchId == match.Id),
                        IsDiscfal = _context.Discfalifications.Where(d => d.PlayerId == p.Id && d.ChampionatId == match.ChampionatId)
                                                                .Any(d => d.IsActive),
                        Number = p.Number
                    })
                    .ToList();
                List<MatchEventDto> matchEvents = _context.MatchEvents.Where(me => me.MatchId == request.MatchId)
                    .Include(me => me.Player)
                    .Include(me => me.Event)
                    .Select(me => new MatchEventDto()
                    {
                        MatchEventId = me.Id,
                        Name = me.Event.Name,
                        PlayerId = me.PlayerId,
                        PlayerName = me.Player.Name + " " + me.Player.SecondName,
                        TeamId = me.TeamId,
                        LogoId = me.Event.LogoId,
                        Minute = me.Minute,
                    })
                    .OrderBy(e => e.Minute)
                    .ToList();

                var result = new OneMatchDto()
                {
                    Id = match.Id,
                    Home = new TeamMatchDto() { 
                        TeamId = match.HomeTeam.Id, 
                        TeamName = match.HomeTeam.Name, 
                        TeamLogo = match.HomeTeam.LogoId,
                        TeamPlayers = homePlayers
                    },
                    Visitor = new TeamMatchDto() { 
                        TeamId = match.Visitor.Id, 
                        TeamName = match.Visitor.Name,
                        TeamLogo = match.Visitor.LogoId,
                        TeamPlayers = visitorPlayers
                    },
                    Date = match.StartMatch,
                    StadiumId = match.StadiumId != null ? match.StadiumId : null,
                    StadiumName = match.Stadium?.Name,
                    IsLive= match.IsLive,
                    IsEnded= match.IsEnded,
                    Score = match.HomeGoals.ToString() + ":" + match.VisitorGoals.ToString(),
                    MatchEvents = matchEvents,
                    Round = match.Round,
                    IsNeedSubsToProtocol = match.Championat.IsNeededSubsToProtocol,
                    PlayerCountOnStart = match.Championat.PLayersCount
                    
                }; 
                if (match == null)
                {
                    throw new RestException(System.Net.HttpStatusCode.NotFound, "Матч не найден!");
                };    
                return result;
            }
        }
    }
}
