using Domain.Models.Account;

namespace Domain.Models
{
    public class MatchReferee : IId
    {
        public long MatchId { get; set; }
        public Match Match { get; set; }
        public long RefereeId { get; set; }
        public User Referee { get; set; }
    }
}
