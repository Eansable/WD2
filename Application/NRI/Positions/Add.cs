using Domain.Context;
using Domain.Models;
using Domain.Models.NRI;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.NRI.Positions
{
    public class Add
    {
        public class AddRequest : IRequest<bool>
        {
            public string Name { get; set; }
            public string Code { get; set; }
            public int PositionType { get; set; }

        }

        public class Handler : IRequestHandler<AddRequest, bool>
        {
            private readonly AppDbContext _context;
            public Handler(AppDbContext context)
            {
                _context = context;
            }
            public async Task<bool> Handle(AddRequest request, CancellationToken cancellationToken)
            {
                try
                {
                    var pos = new Position()
                    {
                        Name = request.Name,
                        Code = request.Code,
                        PositionType =  request.PositionType,
                    };
                    _context.Add(pos);
                    return await _context.SaveChangesAsync() > 0;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }
    }
}
