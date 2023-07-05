using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class ChampionatStats : IId
    {
        public long ChampionatId { get; set; }
        public Championat Championat { get; set; }
        public long TeamId { get; set; }
        public Team Team { get; set; }
        public int Points { get; set; }
        public int Win { get; set; }
        public int Draw { get; set; }
        public int Lose { get; set; }
        public int Goals { get; set; }
        public int GoalsConceded { get; set; }
        public int YellowCards { get; set; }
        public int RedCards { get; set; }
    }
}
