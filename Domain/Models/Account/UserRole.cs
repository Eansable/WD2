using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Domain.Models.Account
{
    public class UserRole : IdentityUserRole<Guid>
    {
        [Key]
        public long SID { get; set; }
        public virtual Role Role { get; set; }
        public virtual User User { get; set; }
    }
}
