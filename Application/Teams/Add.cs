using Domain.Context;
using Domain.Models;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.Teams
{
    public class Add
    {
        public class TeamAddRequest : IRequest<bool>
        {
            public string Name { get; set; }
            public string? Description { get; set; }
            public IFormFile? Logo { get; set; }

        }

        public class Handler : IRequestHandler<TeamAddRequest, bool>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<bool> Handle(TeamAddRequest request, CancellationToken cancellationToken)
            {
                if (_context.Teams.Any(t => t.Name.ToUpper() == request.Name.ToUpper()))
                {
                    throw new Exception("Команда с таким именем уже существует");
                }
                Team team = new Team()
                {
                    Name = request.Name,
                    Description = request.Description,
                    CreateTeam = DateTime.Now,
                    CaptainId = 1,
                    IsActive = true,
                };
                if (!(request.Logo.Length == 0)) 
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
                    _context.LogoFiles.Add(file);
                    _context.SaveChanges();
                    team.LogoId = file.Id;
                };
                _context.Teams.Add(team);
                return _context.SaveChanges() > 0;
            }
        }
    }
}
