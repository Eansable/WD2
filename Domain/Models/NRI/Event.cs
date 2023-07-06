using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.NRI
{
    public class Event : IId
    {
        public string Name { get; set; }
        public string ShortName { get; set; }
        public DateTime Create { get; set; }
        public bool IsDeleted { get; set; }
    }
}
