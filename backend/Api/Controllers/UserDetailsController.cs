using Microsoft.AspNetCore.Mvc;
using Service.UserDetails;

namespace Api.Controllers
{
    [Route("api/user")]
    public class UserDetailsController : CustomBaseController
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
            return Ok(await _userService.GetDisplayNameAsync(UserId));
        }
    }
}
