namespace backend.Models
{
    public class User : AccountBase
    {
        public string Firtname { get; set; } = string.Empty;
        public string Lastname { get; set; } = string.Empty;
        public string Fullname { get; set; } = string.Empty;
    }
}
