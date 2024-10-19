using AutoMapper;
using backend.DTOs;
using backend.Helpers;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EditProfileController(IAccountService accountService, AppDbContext context, IMapper mapper) : ControllerBase
    {
        [HttpPost("user")]
        [JwtAuthorize(Role.User)]
        public async Task<IActionResult> EditGeneralUserData([FromBody] EditUserDto data)
        {
            try
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

                if (userIdClaim == null) return Unauthorized();

                var id = int.Parse(userIdClaim.Value);
                var user = await accountService.GetUserAsync(id);

                if (user == null) return NotFound();

                mapper.Map(data, user);

                await context.SaveChangesAsync();

                return Ok(new { message = "Profile updated successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpPost("corporation/{id}")]
        [JwtAuthorize(Role.Corporation)]
        public async Task<IActionResult> EditGeneralCompanyData([FromRoute] int id, [FromBody] EditCorpDto data)
        {
            try
            {
                var corp = await accountService.GetCorporationAsync(id);

                if (corp == null) return NotFound();

                mapper.Map(data, corp);

                await context.SaveChangesAsync();

                return Ok(new { message = "Profile updated successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
