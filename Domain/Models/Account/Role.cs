using Microsoft.AspNetCore.Identity;

namespace Domain.Models.Account
{
    public class Role : IdentityRole<Guid>
    {
        /// <summary>
        /// Название
        /// </summary>
        public string Description { get; set; }
        public int Code { get; set; }

        public ICollection<UserRole> UserRoles { get; set; }

    }
}
