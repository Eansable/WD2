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

    }
}
