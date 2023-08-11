using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Matches.Dto
{
    public class OneMatchDto : MatchDto
    {
        public string? StadiumName { get; set; }
        public long? StadiumId { get; set; }
        public List<MatchEventDto>? MatchEvents { get; set; }

    }
}
