using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Managment.Dto
{
    public class ManagmentUserDto
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public string OwnerName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public IList<string> RolesId { get; set; }
    }
}
