using Domain.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Championat : IId
    {
        public string? Name { get; set; }
        public string? YearString { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int PLayersCount { get; set; }
        public ChampionatFormatEnum ChampionatFormat { get; set; }
        public bool IsActive { get; set; }
        public long? LogoId { get; set; }
        public LogoFile? LogoFile { get; set; }
        public int LapsCount { get; set; }
        public int CountYellowAfterDis { get; set; }
        public int MinutesTime { get; set; }
        public int MaxPlayerPerMatch { get; set; }
        public bool IsDefaultChamp { get; set; }
    }
}
