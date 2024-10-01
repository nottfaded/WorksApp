using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.Models;

namespace backend.Helpers
{
    public class JwtService(IConfiguration configuration)
    {
        private static readonly JwtSecurityTokenHandler TokenHandler = new();
        public const string Id = "accountId";

        public string Generate(AccountBase account)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new(Id, account.Id.ToString()),
                new(ClaimTypes.Email, account.Email),
                new(ClaimTypes.Role, account.Role.ToString()),
            };

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials
            );

            return TokenHandler.WriteToken(token);
        }

        public string? GetTokenFromHttpContext(HttpContext context) => context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

        public TokenValidationParameters GetTokenValidationParameters()
        {
            return new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ClockSkew = TimeSpan.Zero,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]))
            };
        }

        public bool ValidById(int id, string? token)
        {
            if (string.IsNullOrEmpty(token))
            {
                return false;
            }

            try
            {
                var validationParameters = GetTokenValidationParameters();
                var claimsPrincipal = TokenHandler.ValidateToken(token, validationParameters, out _);

                var userIdClaim = claimsPrincipal.Claims.FirstOrDefault(c => c.Type == "accountId");

                if (userIdClaim != null && int.TryParse(userIdClaim.Value, out var userId))
                {
                    return userId == id;
                }
            }
            catch (SecurityTokenException)
            {
                return false;
            }

            return false;
        }
    }
}
