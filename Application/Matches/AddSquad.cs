using Domain.Context;
using Domain.Errors;
using Domain.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Matches
{
    public class AddSquad
    {
        public class AddSquadRequest : IRequest<bool> 
        { 
            public long MatchId { get; set; }
            public List<long>? HomePlayersId { get; set; }
            public List<long>? VisitorPlayersId { get; set; }
        }
        public class Handler : IRequestHandler<AddSquadRequest, bool>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }
            public async Task<bool> Handle(AddSquadRequest request, CancellationToken cancellationToken)
            {
                var match = _context.Matches.Where(m => m.Id == request.MatchId)
                    .Include(m => m.Championat)
                    .FirstOrDefault();
                if (match == null) {
                    throw new RestException(System.Net.HttpStatusCode.NotFound, "Матч не найден!");
                }

                var checkDiscfal = _context.Discfalifications.Where(d => (request.HomePlayersId != null && request.HomePlayersId.Contains(d.PlayerId)) 
                                                                         || (request.VisitorPlayersId != null && request.VisitorPlayersId.Contains(d.PlayerId)) 
                                                                         && d.ChampionatId == match.ChampionatId).Any(d => d.IsActive);

                if (checkDiscfal)
                {
                    throw new RestException(System.Net.HttpStatusCode.BadRequest, "Игрок с дисквалификацией не может быть добавлен в состав!");
                }

                if (request.HomePlayersId != null) {
                    List<Squad> homePlayers = new List<Squad>();
                    request.HomePlayersId.ForEach((p) =>
                    {
                        var squad = new Squad()
                        {
                            MatchId = request.MatchId,
                            PlayerId = p,
                            TeamId = match.HomeTeamId
                        };  
                        homePlayers.Add(squad);
                    });
                    await _context.Squads.AddRangeAsync(homePlayers);
                }

                if (request.VisitorPlayersId != null)
                {
                    List<Squad> visitorPlayers = new List<Squad>();
                    request.VisitorPlayersId.ForEach(p =>
                    {
                        var squad = new Squad()
                        {
                            MatchId = request.MatchId,
                            PlayerId = p,
                            TeamId = match.VisitorId,
                        };
                        visitorPlayers.Add(squad);
                    });

                    await _context.Squads.AddRangeAsync(visitorPlayers);
                }

                return await _context.SaveChangesAsync() > 0;
            }
        }
    }
}
