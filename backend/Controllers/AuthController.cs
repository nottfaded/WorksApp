using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.DTOs;
using backend.Helpers;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(IAccount accRep, IConfiguration configuration, JwtService jwtService) : ControllerBase
    {

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto data)
        {
            var acc = await accRep.GetAccountByEmailAsync(data.Email);

            if (acc == null) return NotFound("Invalid email");

            if (!BCrypt.Net.BCrypt.Verify(data.Password, acc.Password)) return Unauthorized("Invalid password");


            var jwtToken = jwtService.Generate(acc);

            var account = new object();

            switch (acc)
            {
                case User user:
                    account = new
                    {
                        user.Id,
                        user.Email,
                        Role = user.Role.ToString(),
                        user.Firtname,
                        user.Lastname,
                        user.Fullname,
                    };
                    break;
                case Corporation corporation:
                    account = new
                    {
                        corporation.Id,
                        corporation.Email,
                        Role = corporation.Role.ToString(),
                        corporation.CompanyName,
                    };
                    break;
            }

            return Ok(new
            {
                jwtToken,
                account,
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Resiter(RegisterDto data)
        {
            var account = await accRep.GetAccountByEmailAsync(data.Email);

            if (account != null) return BadRequest("A user with the same email address already exists");

            var hashPassword = BCrypt.Net.BCrypt.HashPassword(data.Password);
            await accRep.AddAccount(data.Role, data.Email, hashPassword);

            return Ok();
        }


        [HttpGet("get")]
        [Authorize]
        public IActionResult Get()
        {
            return Ok();
        }
    }
}
