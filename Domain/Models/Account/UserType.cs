namespace Domain.Models.Account
{
    public class UserType : IId
    {
        /// <summary>
        /// Код
        /// </summary>
        public int Code { get; set; }
        /// <summary>
        /// Название типа
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Описание типа
        /// </summary>
        public string Description { get; set; }

    }
}
