using Domain.Context;
using Domain.Models;
using Domain.Models.Enums;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.Championats
{
    public class Add
    {
        public class ChampionatAdd : IRequest<long>
        {
            public string Name { get; set; }
            public int Format { get; set; }
            public int PlayersCount { get; set; }
            public DateTime StartDate { get; set;}
            public DateTime EndDate { get; set; }
            public IFormFile? Logo { get; set; }
            public int MinutesTime { get; set; }
            public int CountYellowAfterDis { get; set; }
            public int PlaeyrsCount { get; set; }
            public int MaxPlayerPerMatch { get; set; }
            public bool? IsDefaultChamp { get; set; }
            public bool IsNeedSubsToProtocol { get; set; }
            public int CountLaps { get; set; }
        }

        public class Handler : IRequestHandler<ChampionatAdd, long>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }
            public async Task<long> Handle(ChampionatAdd request, CancellationToken cancellationToken)
            {
                string year = request.StartDate.Year.ToString();
                if (request.EndDate.Year != request.StartDate.Year) {
                    year += "/" + request.EndDate.Year.ToString();
                }
                
                Championat champ = new Championat()
                {
                    Name = request.Name,
                    IsActive = true,
                    StartDate = request.StartDate,
                    EndDate = request.EndDate,
                    PLayersCount = request.PlayersCount,
                    ChampionatFormat = (ChampionatFormatEnum)request.Format,
                    CountYellowAfterDis= request.CountYellowAfterDis,
                    MaxPlayerPerMatch = request.MaxPlayerPerMatch,
                    MinutesTime= request.MinutesTime,
                    YearString = year,
                    LapsCount = request.CountLaps,
                    IsNeededSubsToProtocol = request.IsNeedSubsToProtocol
                };
                if (request.IsDefaultChamp.HasValue)
                {
                    var champDef = _context.Championats.Where(cd => cd.IsDefaultChamp).FirstOrDefault();
                    if (champDef != null)
                    {
                        champDef.IsDefaultChamp = false;
                    }
                    champ.IsDefaultChamp = true;
                }
                if (request.Logo != null)
                {
                    var ms = new MemoryStream();
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
                    champ.LogoId = file.Id;
                }
                await _context.AddAsync(champ);
                await _context.SaveChangesAsync();
                return champ.Id;

            }
        }
    }
}
