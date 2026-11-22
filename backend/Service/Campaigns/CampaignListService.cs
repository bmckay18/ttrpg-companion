using Data;
using Data.Entities;
using Microsoft.EntityFrameworkCore;
using Service.Campaigns.Models;

namespace Service.Campaigns
{
    public class CampaignListService : ICampaignListService
    {
        private AppDbContext _dbContext;

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
    }
}
