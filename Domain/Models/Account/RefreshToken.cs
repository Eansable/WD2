using Domain.Models.Account;

namespace Domain
{
    /// <summary>
    /// Токен обновления
    /// </summary>
    public class RefreshToken : IId
    {
        /// <summary>
        /// Пользователь
        /// </summary>
        public Guid UserId { get; set; }
        public User User { get; set; }
        /// <summary>
        /// Значение токена
        /// </summary>
        public string Value { get; set; }
        /// <summary>
        /// Дата создания
        /// </summary>
        public DateTimeOffset Date { get; set; }
    }
}
