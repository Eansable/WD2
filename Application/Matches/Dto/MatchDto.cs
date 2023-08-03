namespace Application.Matches.Dto
{
    public class MatchDto
    {
        public long Id { get; set; }
        public TeamMatchDto Home { get; set; }
        public TeamMatchDto Visitor { get; set; }
        public DateTime? Date { get; set; }
        public bool IsLive { get; set; }
        public bool IsEnded { get; set; }
        public string? Score { get; set; }
    }
}
