using Data;
using Data.Entities;
using Microsoft.EntityFrameworkCore;
using Service.CombatTracker.Models;

namespace Service.CombatTracker
{
    public class CombatTrackerService : ICombatTrackerService
    {
        private readonly AppDbContext _dbContext;

        public CombatTrackerService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<NpcDto>> GetNpcsAsync(int campaignId, Guid userId, CancellationToken cancellationToken)
        {
            var canAccessCampaign = await _dbContext.Campaigns
                .Where(x => x.UserId == userId && x.Id == campaignId)
                .AnyAsync(cancellationToken);

            if (!canAccessCampaign)
            {
                throw new InvalidOperationException("User does not have permission to access this campaign.");
            }

            return await _dbContext.Npcs
                .Where(x => x.CampaignId == campaignId)
                .Select(x => new NpcDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    CurrentHp = x.CurrentHp,
                    MaxHp = x.MaxHp
                })
                .ToListAsync(cancellationToken);
        }

        public async Task CreateNpcAsync(NewNpcRequestDto requestData, int campaignId, Guid userId, CancellationToken cancellationToken)
        {
            var canAccessCampaign = await _dbContext.Campaigns
                .Where(x => x.UserId == userId && x.Id == campaignId)
                .AnyAsync(cancellationToken);

            if (!canAccessCampaign)
            {
                throw new InvalidOperationException("User does not have permission to access this campaign.");
            }

            if (string.IsNullOrWhiteSpace(requestData.Name))
            {
                throw new InvalidOperationException("The name must not be empty.");
            }

            if (requestData.Hp <= 0)
            {
                throw new InvalidOperationException("The HP amount must be greater than 0.");
            }

            var newNpc = new Npc
            {
                Name = requestData.Name,
                CurrentHp = requestData.Hp,
                MaxHp = requestData.Hp,
                CampaignId = campaignId
            };

            _dbContext.Npcs.Add(newNpc);
            await _dbContext.SaveChangesAsync(cancellationToken);
        }
    }
}
