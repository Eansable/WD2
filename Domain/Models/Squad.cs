using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Squad : IId
    {
        public long PlayerId { get; set; }
        public Player Player { get; set; }
        public long MatchId { get; set; }
        public Match Match { get; set; }
        public long TeamId { get; set; }
        public Team Team { get; set; }
        public bool IsStartSquad { get; set; }
    }
}
