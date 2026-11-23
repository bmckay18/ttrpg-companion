using Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Campaigns;
using Service.Campaigns.Models;

namespace Api.Controllers
{
    [Route("api/campaigns")]
    public class CampaignsController : CustomBaseController
    {
        private readonly ICampaignListService _campaignListService;

        public CampaignsController(ICampaignListService campaignListService)
        {
            _campaignListService = campaignListService;
        }

        [HttpGet]
        [Route("")]
        public async Task<ActionResult<List<CampaignDto>>> GetCampaignsAsync([FromQuery] string? searchTerm, CancellationToken cancellationToken)
        {
            return Ok(await _campaignListService.GetCampaignsAsync(UserId, searchTerm, cancellationToken));
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateCampaignAsync([FromBody] CreateCampaignRequestDto request, CancellationToken cancellationToken)
        {
            await _campaignListService.CreateCampaignAsync(UserId, request, cancellationToken);

            return Created();
        }
    }
}
