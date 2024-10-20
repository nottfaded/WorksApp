﻿using System.IdentityModel.Tokens.Jwt;
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
    public class AuthController(IAccountService accRep, IConfiguration configuration, JwtService jwtService) : ControllerBase
    {
        //[HttpGet("get")]
        //[JwtAuthorize]
        //public async Task<IActionResult> Check()
        //{
        //    var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        //    if (string.IsNullOrEmpty(userId))
        //    {
        //        return Unauthorized();
        //    }

        //    var account = await accRep.GetAccountByIdAsync(int.Parse(userId));

        //    switch (account)
        //    {
        //        case User user:
        //            return Ok(new
        //            {
        //                user.Id,
        //                user.Email,
        //                Role = user.Role.ToString(),
        //                user.Firtname,
        //                user.Lastname,
        //                user.Fullname,
        //            });

        //        case Corporation corporation:
        //            return Ok(new
        //            {
        //                corporation.Id,
        //                corporation.Email,
        //                Role = corporation.Role.ToString(),
        //                corporation.CompanyName,
        //            });
        //    }

        //    return Ok();
        //}

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto data)
        {
            var acc = await accRep.GetAccountByEmailAsync(data.Email);

            if (acc == null) return NotFound("Invalid email");

            if (!BCrypt.Net.BCrypt.Verify(data.Password, acc.Password)) return Unauthorized("Invalid password");

            //var claims = new[]
            //{
            //    new Claim(JwtRegisteredClaimNames.Sub, acc.Id.ToString()),
            //    //new Claim(ClaimTypes.NameIdentifier, acc.Id.ToString()),
            //    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            //};

            //var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
            //var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            //var token = new JwtSecurityToken(
            //    issuer: configuration["Jwt:Issuer"],
            //    audience: configuration["Jwt:Audience"],
            //    claims: claims,
            //    expires: DateTime.Now.AddSeconds(15),
            //    signingCredentials: creds);

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
                        user.Firstname,
                        user.Lastname,
                        user.JobTitle,
                        user.Skills,
                        user.Experience,
                        user.ExpSalary,
                        user.EngLvl,
                        user.Country,
                        user.LinkedIn,
                        user.GitHub,
                    };
                    break;
                case Corporation corporation:
                    account = new
                    {
                        corporation.Id,
                        corporation.Email,
                        Role = corporation.Role.ToString(),
                        corporation.CompanyName,
                        corporation.Description,
                        corporation.Country,
                        corporation.Site,
                        corporation.Phone,
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

        [HttpGet("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("access_token");
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
