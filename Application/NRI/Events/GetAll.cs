using Domain.Context;
using Domain.Models.NRI;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.NRI.Events
{
    public class GetAll
    {
        public class EventGetAll : IRequest<List<Event>>
        {
            public string? Name { get; set; }
        }
        public class Handler : IRequestHandler<EventGetAll, List<Event>>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<List<Event>> Handle(EventGetAll request, CancellationToken cancellationToken)
            {
                var events = _context.Events.Where(e => request.Name == null || e.Name.ToUpper().Contains(request.Name.ToUpper())).ToList() ;
                return events;
            }
        }

    }
}
