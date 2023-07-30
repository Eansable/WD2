using Application.Matches.Dto;
using Domain.Context;
using Domain.Errors;
using Domain.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Matches
{
    public class GetMatchesByChampId
    {
        public class GetByChampId : IRequest<List<MatchDto>>
        {
            public long ChampId { get; set; }
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
                var matches = _context.Matches.Where(m => m.ChampionatId == request.ChampId)
                    .Include(m => m.HomeTeam)
                    .Include(m => m.Visitor)
                    .Select(m => new MatchDto()
                    {
                        Id = m.Id,
                         HomeId = m.HomeTeam.Id,
                         HomeName = m.HomeTeam.Name,
                         HomeLogo = m.HomeTeam.LogoId,
                         VisitorId = m.Visitor.Id,
                         VisitorName = m.Visitor.Name,
                         VisitorLogo = m.Visitor.LogoId,
                         Date = m.StartMatch,
                    }
                    )
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
