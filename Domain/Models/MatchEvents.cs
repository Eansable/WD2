using Domain.Models.NRI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    internal class MatchEvent : IId
    {
        public long EventId { get; set; }
        public Event Event { get; set; }
        public long MatchId { get; set; }
        public Match Match { get; set; }
    }
}
