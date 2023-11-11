using Domain.Context;
using Domain.Errors;
using Domain.Models;
using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Championats
{
    public class ChangeLogo
    {
        public class ChampionatChangeLogo : IRequest<bool>
        {
            public long ChampId { get; set; }
            public IFormFile NewLogo { get; set; }

        }
        public class Handler : IRequestHandler<ChampionatChangeLogo, bool> {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }
            public async Task<bool> Handle(ChampionatChangeLogo request, CancellationToken cancellationToken)
            {
                var champ = _context.Championats.FirstOrDefault(c => c.Id == request.ChampId);
                if (champ == null)
                {
                    throw new RestException(System.Net.HttpStatusCode.NotFound, "Чемпионат не найден!");
                }
                var file = _context.LogoFiles.FirstOrDefault(l => l.Id == champ.LogoId);

                var ms = new MemoryStream();
                request.NewLogo.CopyTo(ms);
                var newLogo = new LogoFile()
                {
                    FileName = Path.GetFileNameWithoutExtension(request.NewLogo.FileName),
                    FileExtension = Path.GetExtension(request.NewLogo.FileName),
                    ContentType = request.NewLogo.ContentType,
                    FileLength = request.NewLogo.Length,
                    DateUpload = DateTime.Now,
                    Content = ms.ToArray()
                };
                _context.LogoFiles.Add(newLogo);
                await _context.SaveChangesAsync();
                champ.LogoId = newLogo.Id;
                if (file != null)
                {
                    _context.LogoFiles.Remove(file);
                }

                return await _context.SaveChangesAsync() > 0;
            }
        }


    }
}
