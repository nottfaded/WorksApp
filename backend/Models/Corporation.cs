namespace backend.Models
{
    public class Corporation : AccountBase
    {
        public string CompanyName { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public string Site { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
    }
}
