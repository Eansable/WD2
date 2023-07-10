﻿using Domain.Context;
using Domain.Errors;
using MediatR;

namespace Application.Teams
{
    public class Activated
    {
        public class TeamActivatedRequest : IRequest<bool>
        {
            public long Id { get; set; }
        }
        public class Handler : IRequestHandler<TeamActivatedRequest, bool>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }
            public async Task<bool> Handle(TeamActivatedRequest request, CancellationToken cancellationToken)
            {
                var team = _context.Teams.Where(t => t.Id == request.Id).FirstOrDefault();
                if (team == null)
                {
                    throw new RestException(System.Net.HttpStatusCode.NotFound, "Команда с таким Id не найдена");
                }

                team.IsActive = true;

                return await _context.SaveChangesAsync() > 0;
            } 
        }
    }
}