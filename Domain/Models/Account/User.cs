using Microsoft.AspNetCore.Identity;

namespace Domain.Models.Account
{
    public class User : IdentityUser<Guid>
    {
        public string? OwnerName { get; set; }
        public ICollection<UserRole> UserRoles { get; set; }
        public DateTimeOffset RegistrationDate { get; set; }
        public string? Information { get; set; }
        

    }
}
