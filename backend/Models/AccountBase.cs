namespace backend.Models
{
    public enum Role
    {
        User,
        Corporation,
        Admin,
    }

    public abstract class AccountBase
    {
        public int Id { get; set; }
        public Role Role { get; set; } 
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
