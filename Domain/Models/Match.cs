using Domain.Models.Enums;
using Domain.Models.NRI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Match : IId
    {
        public long HomeTeamId { get; set; }
        public Team HomeTeam { get; set; }
        public long VisitorId { get; set; }
        public Team Visitor { get; set; }
        public DateTime StartMatch { get; set; }
        public long ChampionatId { get; set; }
        public Championat Championat { get; set; }
        public MatchResultEnum? MatchResult { get; set; }
        public long? StadiumId { get; set; }
        public Stadium Stadium { get; set; }

    }
}
