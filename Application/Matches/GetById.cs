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
                    .Select(m => new OneMatchDto()
                    {
                        Id = m.Id,
                        HomeId = m.HomeTeam.Id,
                        HomeName = m.HomeTeam.Name,
                        HomeLogo = m.HomeTeam.LogoId,
                        VisitorId = m.Visitor.Id,
                        VisitorName = m.Visitor.Name,
                        VisitorLogo = m.Visitor.LogoId,
                        Date = m.StartMatch.ToLocalTime(),
                        StadiumId = m.StadiumId,
                        StadiumName = m.Stadium.Name
                    })
                    .FirstOrDefault();
                if(match == null)
                {
                    throw new RestException(System.Net.HttpStatusCode.NotFound, "Матч не найден!");
                };    
                return match;
            }
        }
    }
}
