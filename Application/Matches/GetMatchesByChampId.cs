using Application.Matches.Dto;
using Domain.Context;
using Domain.Errors;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Matches
{
    public class GetMatchesByChampId
    {
        public class GetByChampId : IRequest<List<MatchDto>>
        {
            public long ChampId { get; set; }
            public bool IsEndedMatches { get; set; }
        }
        public class Handler : IRequestHandler<GetByChampId, List<MatchDto>>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }
            public async Task<List<MatchDto>> Handle(GetByChampId request,  CancellationToken cancellationToken)
            {
                var matches = _context.Matches.Where(m => m.ChampionatId == request.ChampId && m.IsEnded == request.IsEndedMatches)
                    .Include(m => m.HomeTeam)
                    .Include(m => m.Visitor)
                    .Select(m => new MatchDto()
                    {
                        Id = m.Id,
                         Home = new TeamMatchDto() { TeamId = m.HomeTeam.Id, TeamName = m.HomeTeam.Name, TeamLogo = m.HomeTeam.LogoId, },
                         Visitor = new TeamMatchDto() { TeamId = m.Visitor.Id, TeamName = m.Visitor.Name, TeamLogo = m.Visitor.LogoId, },
                         Date = m.StartMatch,
                         IsLive = m.IsLive,
                         IsEnded= m.IsEnded,
                         Score = m.HomeGoals.ToString() + ":" + m.VisitorGoals.ToString(),
                         Round = m.Round
                    }
                    )
                    .OrderBy(m => m.Round)
                    .OrderBy(m => m.Date)
                    .ToList();
                if (matches == null)
                {
                    throw new RestException(System.Net.HttpStatusCode.NotFound, "Матчи не найдены в этом чемпионате!");
                }
                return matches;
            }
        }
    }
}
