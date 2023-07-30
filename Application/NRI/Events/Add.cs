using Domain.Context;
using Domain.Models.NRI;
using Domain.Models;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.NRI.Events
{
    public class Add
    {
        public class EventAdd : IRequest<bool>
        {
            public string Name { get; set; }
            public string ShortName { get; set; }
            public IFormFile? Logo { get; set; }
        }

        public class Handler : IRequestHandler<EventAdd, bool>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }
            public async Task<bool> Handle(EventAdd request, CancellationToken cancellationToken)
            {
                var events = new Event()
                {
                    Name = request.Name,
                    Create = DateTime.Now,
                    ShortName = request.ShortName,
                };

                if (request.Logo.Length > 0)
                {
                    using var ms = new MemoryStream();
                    request.Logo.CopyTo(ms);
                    var file = new LogoFile()
                    {
                        FileName = Path.GetFileNameWithoutExtension(request.Logo.FileName),
                        FileExtension = Path.GetExtension(request.Logo.FileName),
                        ContentType = request.Logo.ContentType,
                        FileLength = request.Logo?.Length ?? 0,
                        DateUpload = DateTime.Now,
                        Content = ms.ToArray()

                    };
                    await _context.LogoFiles.AddAsync(file);
                    await _context.SaveChangesAsync();
                    events.LogoId = file.Id;
                }
                await _context.Events.AddAsync(events);
                return await _context.SaveChangesAsync() > 0;
            }
        }
    }
}
