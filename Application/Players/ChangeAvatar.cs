using Domain.Context;
using Domain.Errors;
using Domain.Models;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.Players
{
    public class ChangeAvatar
    {
        public class PlayerChangeAvatar : IRequest<bool>
        {
            public string PlayerId { get; set; }
            public IFormFile Avatar { get; set; }
        }
        public class Handler : IRequestHandler<PlayerChangeAvatar, bool>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }
            public async Task<bool> Handle(PlayerChangeAvatar request, CancellationToken cancellationToken)
            {

                var player = _context.Players.Where(p => p.Id == long.Parse(request.PlayerId)).FirstOrDefault();
                if (player == null)
                {
                    throw new RestException(System.Net.HttpStatusCode.NotFound, "Игрок не найден!");
                }
                if (player.AvatarId != null)
                {
                    var avatar = _context.LogoFiles.Where(a => a.Id == player.AvatarId).FirstOrDefault();
                    if (avatar != null)
                    {
                        _context.LogoFiles.Remove(avatar);
                    }
                }
                var ms = new MemoryStream();
                request.Avatar.CopyTo(ms);
                var newAvatar = new LogoFile()
                {
                    FileName = Path.GetFileNameWithoutExtension(request.Avatar.FileName),
                    FileExtension = Path.GetExtension(request.Avatar.FileName),
                    ContentType = request.Avatar.ContentType,
                    FileLength = request.Avatar.Length,
                    DateUpload = DateTime.Now,
                    Content = ms.ToArray()
                };
                await _context.LogoFiles.AddAsync(newAvatar);
                player.AvatarId = newAvatar.Id;
                return await _context.SaveChangesAsync() > 0;
            }
        }
    }
}
