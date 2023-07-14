using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class LogoFile : IId
    {
        public string FileName { get; set; }
        public string FileExtension { get; set; }
        public byte[] Content { get; set; }
        public string ContentType { get; set; }
        public long FileLength { get; set; }
        public DateTime DateUpload { get; set; }
    }
}
