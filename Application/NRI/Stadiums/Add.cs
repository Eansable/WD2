using Domain.Context;
using Domain.Models;
using Domain.Models.NRI;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.NRI.Stadiums
{
    public class Add
    {
        public class StadiumAdd : IRequest<bool>
        {
            public string Name { get; set; }
            public string Adress { get; set; }
            public string? Description { get; set; }
            public IFormFile? Logo { get; set; }
        }

        public class Handler : IRequestHandler<StadiumAdd, bool>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }
            public async Task<bool> Handle(StadiumAdd request, CancellationToken cancellationToken)
            {
                var stadium = new Stadium()
                {
                    Name = request.Name,
                    Adress = request.Adress,
                    Description = request.Description,
                };
                if (request?.Logo?.Length > 0)
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
                    stadium.LogoId = file.Id;
                }
                await _context.Stadiums.AddAsync(stadium);
                return await _context.SaveChangesAsync() > 0;
            }
        }
    }
}
