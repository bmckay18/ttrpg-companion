using Data;
using Data.Entities;
using Microsoft.EntityFrameworkCore;
using Service.Campaigns.Models;

namespace Service.Campaigns
{
    public class CampaignListService : ICampaignListService
    {
        private AppDbContext _dbContext;
        private const int _minCampaignName = 5;

        public CampaignListService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<CampaignDto>> GetCampaignsAsync(Guid userId, string? searchTerm, CancellationToken cancellationToken)
        {
            var query = _dbContext.Campaigns.Where(x => x.UserId == userId);

            if (!string.IsNullOrWhiteSpace(searchTerm))
            {
                query = query.Where(x => EF.Functions.ILike(x.Name, $"%{searchTerm}%"));
            }

            return await query.Select(x => new CampaignDto
            {
                Name = x.Name,
                Id = x.Id,
                CreationDate = x.CreationDate,
                ModifiedDate = x.LastModifiedDate
            }).ToListAsync(cancellationToken);
        }

        public async Task CreateCampaignAsync(Guid userId, CreateCampaignRequestDto request, CancellationToken cancellationToken)
        {
            var name = request.Name;

            if (string.IsNullOrWhiteSpace(name) || name.Length < _minCampaignName)
            {
                throw new InvalidOperationException("The name must be 5 or more characters in length.");
            }

            var currentDate = DateTime.UtcNow;

            var campaign = new Campaign
            {
                Name = name,
                CreationDate = currentDate,
                LastModifiedDate = currentDate,
                UserId = userId
            };

            _dbContext.Campaigns.Add(campaign);

            await _dbContext.SaveChangesAsync();
        }
    }
}
