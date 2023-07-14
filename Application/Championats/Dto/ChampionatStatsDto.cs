using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Championats.Dto
{
    public class ChampionatStatsDto
    {
        public long TeamId { get; set; }
        public string TeamName { get; set; }
        public long? TeamLogoId { get; set; }
        public int Win { get; set; }
        public int Draw { get; set; }
        public int Lose { get; set; }
        public int Goals { get; set; }
        public int GoalsConceded { get; set; }
        public int RedCards { get; set; }
        public int Points { get; set; }
        public int YellowCards { get; set; }
    }
}
