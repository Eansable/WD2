namespace Application.Matches.Dto
{
    public class MatchEventDto
    {
        public long MatchEventId { get; set; }
        public string Name { get; set; }
        public long LogoId { get; set; }
        public long PlayerId { get; set; }
        public string PlayerName { get; set; }
        public long TeamId { get; set; }
        public int Minute { get; set; }
    }
}
