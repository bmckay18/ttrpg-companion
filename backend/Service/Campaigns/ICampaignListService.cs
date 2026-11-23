using Data.Entities;
using Service.Campaigns.Models;

namespace Service.Campaigns
{
    public interface ICampaignListService
    {
        Task CreateCampaignAsync(Guid userId, CreateCampaignRequestDto request, CancellationToken cancellationToken);
        Task<IEnumerable<CampaignDto>> GetCampaignsAsync(Guid userId, string? searchTerm, CancellationToken cancellationToken);
    }
}