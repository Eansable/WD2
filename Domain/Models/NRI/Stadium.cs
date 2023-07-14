using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.NRI
{
    public class Stadium : IId
    {
        public string Name { get; set; }
        public string Adress { get; set; }
        public string? Description { get; set; }
        public long? LogoId { get; set; }
        public LogoFile? LogoFile { get; set; }

    }
}
