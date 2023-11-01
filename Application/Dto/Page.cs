namespace Application.Dto
{
    public class Page<T>  
    {
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
        public int Count { get; set; }
        public List<T> Items { get; set; }
    }
}
