using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.News
{
    public class News : IId
    {
        public string Title { get; set; }
        public string Text { get; set; }
        public DateTime Date { get; set; }
        public long ViewsCount { get; set; }
    }
}
