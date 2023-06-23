namespace Domain.Models.NRI
{
    public class Position : IId
    {
        public string? Name { get; set; }
        public string? Code { get; set; }
        public int? PositionType { get; set; }
    }
}
