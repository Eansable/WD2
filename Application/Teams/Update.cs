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

namespace Application.Teams
{
    public class Update
    {
        public class TeamUpdateRequest : IRequest<bool>
        {
            public string Id { get; set; }
            public string? Name { get; set; }
            public string? Description { get; set; }
            public IFormFile? Logo { get; set; }
        }
        public class Handler : IRequestHandler<TeamUpdateRequest, bool>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }
            public async Task<bool> Handle(TeamUpdateRequest request, CancellationToken cancellationToken)
            {
                var team = _context.Teams.Where(t => t.Id == long.Parse(request.Id)).FirstOrDefault();
                if (team == null)
                {
                    throw new RestException(System.Net.HttpStatusCode.NotFound, "Команда с таким Id не найдена!");
                }
                if (request.Name != null) {
                
                team.Name = request.Name;
                }
                if (request.Description != null)
                {
                    team.Description = request.Description;
                }

                if (request?.Logo?.Length > 0) {
                    var oldFile = _context.LogoFiles.Where(l => l.Id == team.LogoId).FirstOrDefault();
                    if (oldFile != null) {
                        _context.LogoFiles.Remove(oldFile);
                    }
                    var ms = new MemoryStream();
                    request.Logo.CopyTo(ms);
                    var logo = new LogoFile()
                    {
                        FileName = Path.GetFileNameWithoutExtension(request.Logo.FileName),
                        FileExtension = Path.GetExtension(request.Logo.FileName),
                        ContentType = request.Logo.ContentType,
                        FileLength = request.Logo?.Length ?? 0,
                        DateUpload = DateTime.Now,
                        Content = ms.ToArray()
                    };
                    await _context.LogoFiles.AddAsync(logo);
                    await _context.SaveChangesAsync();
                    team.LogoId = logo.Id;
                }

                _context.Update(team);

                return await _context.SaveChangesAsync() > 0;
            }
        }
    }
}
