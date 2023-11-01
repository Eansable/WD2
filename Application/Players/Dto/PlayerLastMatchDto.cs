namespace Application.Players.Dto
{
    public class PlayerLastMatchDto
    {
        public long MatchId { get; set; }
        public DateTime Date { get; set; }
        public string HomeName { get; set; }
        public string VisitorName { get; set; }
        public string Score { get; set; }
        public string GoalsCount { get; set; }
        public string AssistCount { get; set; }
        public string YellowCardCount { get; set; }
        public string RedCardCount { get; set; }

    }
}
