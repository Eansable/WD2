using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Matches.Dto
{
    public class MatchDto
    {
        public long Id { get; set; }
        public string HomeName { get; set; }
        public long HomeId { get; set; }
        public string VisitorName { get; set; }
        public long VisitorId { get; set; }
        public long? HomeLogo { get; set; }
        public long? VisitorLogo { get; set; }
        public DateTime? Date { get; set; }

    }
}
