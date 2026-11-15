using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.UserDetails;
using System.Security.Claims;

namespace Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/user")]
    public class UserDetailsController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserDetailsController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [Route("display-name")]
        public async Task<ActionResult<string>> GetDisplayNameAsync()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if(!Guid.TryParse(userId, out var parsedUserId))
            {
                return NotFound();
            }

            return Ok(await _userService.GetDisplayNameAsync(parsedUserId));
        }
    }
}
