using System.ComponentModel.DataAnnotations;
using backend.Models;

namespace backend.DTOs
{
    public class LoginDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [StringLength(25, MinimumLength = 5)]
        public string Password { get; set; }
    }

    public class RegisterDto : LoginDto
    {
        [Required]
        public Role Role { get; set; }
    }
}
