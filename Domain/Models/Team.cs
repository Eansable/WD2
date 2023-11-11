using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Team : IId
    {

        public string Name { get; set; }
        public string? Description { get; set; }
        public DateTime? CreateTeam { get; set; }
        public Guid? CaptainId { get; set; }
        public bool IsActive { get; set; }
        public long? LogoId { get; set; }
        public LogoFile? LogoFile { get; set; }
        public string? Coach { get; set; }
        public string? Link { get; set; }

    }
}
