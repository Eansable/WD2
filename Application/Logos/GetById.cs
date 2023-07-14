using Domain.Context;
using Domain.Errors;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Application.Logos
{
    public class GetById
    {
         public class LogoGetById : IRequest<FileResult>
        {
            public long Id { get; set; }
        }   

        public class Handler : ControllerBase, IRequestHandler<LogoGetById, FileResult>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<FileResult> Handle(LogoGetById request, CancellationToken cancellationToken)
            {
                var logo = _context.LogoFiles.Where(l => l.Id == request.Id).FirstOrDefault();
                if (logo == null)
                {
                    throw new RestException(System.Net.HttpStatusCode.NotFound, "Логотип с таким Id не найден");
                }
                MemoryStream ms = new MemoryStream();
                ms.Write(logo.Content, 0, (int)logo.FileLength);
                ms.Position= 0;
                return File(ms, logo.ContentType, logo.FileName + logo.FileExtension);
            }
        }

    }
}
