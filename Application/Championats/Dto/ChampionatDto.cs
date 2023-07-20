using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Championats.Dto
{
    public class ChampionatDto
    {
        public long Id { get; set; }
        public string? Name { get; set; }
        public string? YearString { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set;}
        public int PlayersCount { get; set; }
        public int? ChampionatFormat { get; set; }
        public bool isActive { get; set; }
        public List<ChampionatStatsDto>? Table { get; set; }
        public long? LogoId { get; set; }
    }
}
