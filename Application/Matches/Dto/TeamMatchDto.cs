using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Matches.Dto
{
    public class TeamMatchDto
    {
        public string TeamName { get; set; }
        public long TeamId { get; set; }
        public long? TeamLogo { get; set; }
        public List<MatchPlayerDto>? TeamPlayers { get; set; }
    }
}
