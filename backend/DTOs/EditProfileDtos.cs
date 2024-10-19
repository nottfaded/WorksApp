using backend.Models;

namespace backend.DTOs
{
    public record EditUserDto
    {
        public string? Firstname { get; set; }
        public string? Lastname { get; set; }
        public string? JobTitle { get; set; }
        public List<string>? Skills { get; set; }
        public string? Experience { get; set; }
        public string? ExpSalary { get; set; }
        public string? EngLvl { get; set; }
        public string? Country { get; set; }
        public string? LinkedIn { get; set; }
        public string? GitHub { get; set; }
    }

    public record EditCorpDto
    {
        public string? CompanyName { get; set; }
        public string? Description { get; set; }
        public string? Site { get; set; }
        public string? Phone { get; set; }
    }
}
