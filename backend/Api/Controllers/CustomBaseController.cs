using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Api.Controllers
{
    [ApiController]
    [Authorize]
    public abstract class CustomBaseController : ControllerBase
    {
        protected Guid UserId
        {
            get
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (!Guid.TryParse(userId, out var parsedUserId))
                {
                    throw new InvalidOperationException("Invalid User ID.");
                }

                return parsedUserId;
            }
        }
    }
}
