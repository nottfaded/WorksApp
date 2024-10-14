namespace backend.Models
{
    public class User : AccountBase
    {
        public string Firtname { get; set; } = string.Empty;
        public string Lastname { get; set; } = string.Empty;
        public string JobTitle { get; set; } = string.Empty;
        public List<string> Skills { get; set; } = new();
        public string Experience { get; set; } = string.Empty;
        public string ExpSalary { get; set; } = string.Empty;
        public string EngLvl { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public string LinkedIn { get; set; } = string.Empty;
        public string GitHub { get; set; } = string.Empty;
    }
}
