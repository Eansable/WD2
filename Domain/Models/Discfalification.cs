using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Discfalification : IId
    {
        public long PlayerId { get; set; }
        public Player Player { get; set; }
        public long ChampionatId { get; set; }
        public Championat Championat { get; set;}
        public long TeamId { get; set; }
        public Team Team { get; set; }

        public int MatchesCount { get; set; }
        public int MatchesLeft { get; set; }

    }
}
