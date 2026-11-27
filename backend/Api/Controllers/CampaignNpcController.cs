using Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Service.CombatTracker;
using Service.CombatTracker.Models;

namespace Api.Controllers
{
    [Route("api/campaigns")]
    public class CampaignNpcController : CustomBaseController
    {
        private readonly ICombatTrackerService _combatTrackerService;

        public CampaignNpcController(ICombatTrackerService combatTrackerService)
        {
            _combatTrackerService = combatTrackerService;
        }

        [HttpGet]
        [Route("{campaignId}/npcs")]
        public async Task<ActionResult<IEnumerable<NpcDto>>> GetNpcsAsync(int campaignId, CancellationToken cancellationToken)
        {
            return Ok(await _combatTrackerService.GetNpcsAsync(campaignId, UserId, cancellationToken));
        }

        [HttpPost]
        [Route("{campaignId}/npcs")]
        public async Task<IActionResult> CreateNpcAsync([FromBody] NewNpcRequestDto request, int campaignId, CancellationToken cancellationToken)
        {
            await _combatTrackerService.CreateNpcAsync(request, campaignId, UserId, cancellationToken);
            return Created();
        }

        [HttpPost]
        [Route("{campaignId}/npcs/update")]
        public async Task<IActionResult> UpdateNpcHealthAsync([FromBody] IEnumerable<HealthUpdateRequestDto> request, int campaignId, CancellationToken cancellationToken)
        {
            await _combatTrackerService.UpdateNpcHealthAsync(request, campaignId, UserId, cancellationToken);
            return NoContent();
        }
    }
}
