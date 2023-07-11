using Domain.Context;
using Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Players
{
    public class Add
    {
        public class PlayerAdd : IRequest<bool>
        {

            public string Name { get; set; }
            public string? SecondName { get; set; }
            public string? MiddleName { get; set; }
            public DateTime Birthday { get; set; }
            public long TeamId { get; set; }
        }

        public class Handler : IRequestHandler<PlayerAdd, bool>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<bool> Handle(PlayerAdd request, CancellationToken cancellationToken)
            {
                var player = new Player()
                {
                    Name = request.Name,
                    Birthday = request.Birthday,
                    TeamId = request.TeamId,
                    MiddleName = request.MiddleName,
                    SecondName= request.SecondName,
                    IsActive = true,
                };
                _context.Players.Add(player);
                return await _context.SaveChangesAsync() > 0; 
            }
        }
    }
}
