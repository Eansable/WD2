using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Matches.Dto
{
    public class MatchPlayerDto
    {
        public string PlayerName { get; set; }
        public long PlayerId { get; set; }
        public bool IsSquad { get; set; }
    }
}
