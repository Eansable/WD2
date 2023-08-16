using Domain.Models.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Account.Dto
{
    public class UserDto
    {

        public Guid? Id { get; set; }
        public string? Token { get; set; }
        public string? RefreshToken { get; set; }
        public long? SessionId { get; set; }
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public UserType? UserType { get; set; }
        public IList<string>? Roles { get; set; }
        public string? IdToken { get; set; }
        public long? CaptainTeamId { get; set; }
    }
}
