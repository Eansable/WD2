﻿namespace Domain.Models
{
    public class Player : IId
    {
        public string? Name { get; set; }
        public string? SecondName { get; set; }
        public string? MiddleName { get; set; }
        public DateTime? Birthday { get; set; }
        public long TeamId { get; set; }
        public Team Team { get; set; }
        public bool IsActive { get; set; }
        public long? AvatarId { get; set; }
        public LogoFile? AvatarFile { get; set; }
        public int? Number { get; set; }
    }
}
