namespace Application.Managment.Dto
{
    public class UsersListDto
    {
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? OwnerName { get; set; }
        public Guid Id { get; set; }
    }
}
