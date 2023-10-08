using Application.Matches.Dto;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Players.Dto
{
    public class OnePlayerDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public DateTime? Birthday { get; set; }
        public long TeamId { get; set; }
        public long? TeamLogoId { get; set; }
        public string TeamName { get; set; }
        public int MatchCount { get; set; }
        public int GoalCount { get; set; }
        public int YellowCardCount { get; set; }
        public int RedCardCount { get; set; }
        public long? AvatarId { get; set; }
        public MatchDto? LastMatch { get; set; }
    }
}
