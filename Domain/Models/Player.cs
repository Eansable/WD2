using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    internal class Player : IId
    {
        public string? Name { get; set; }
        public string? SecondName { get; set; }
        public string? MiddleName { get; set; }
        public long? TeamId { get; set; }
        
    }
}
