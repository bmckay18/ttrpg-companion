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

        public async Task UpdateNpcHealthAsync(IEnumerable<HealthUpdateRequestDto> requestData, int campaignId, Guid userId, CancellationToken cancellationToken)
        {
            if (!requestData.Any())
            {
                return;
            }
            
            var npcIds = requestData.Select(x => x.Id).ToArray();

            if (npcIds.Distinct().Count() != requestData.Count())
            {
                throw new ArgumentException("Duplicate NPC Ids are not allowed.");
            }

            var accessibleNpcs = await _dbContext.Npcs
                .Join(_dbContext.Campaigns, outer => outer.CampaignId, inner => inner.Id, (outer, inner) => new
                {
                    Npcs = outer,
                    OwnerId = inner.UserId,
                    CampaignId = inner.Id
                })
                .Where(x => x.OwnerId == userId && npcIds.Contains(x.Npcs.Id) && x.CampaignId == campaignId)
                .Select(x => x.Npcs)
                .ToDictionaryAsync(x => x.Id, cancellationToken);

            foreach (var request in requestData)
            {
                if (!accessibleNpcs.TryGetValue(request.Id, out var npc))
                {
                    throw new KeyNotFoundException($"NPC {request.Id} was not found.");
                }

                var newHp = npc.CurrentHp + request.HpAmountChanged;

                if (newHp <= 0)
                {
                    _dbContext.Remove(npc);
                }
                else
                {
                    npc.CurrentHp = Math.Min(newHp, npc.MaxHp);
                }
            }

            await _dbContext.SaveChangesAsync(cancellationToken);
        }

        public async Task DeleteNpcAsync(int npcId, int campaignId, Guid userId, CancellationToken cancellationToken)
        {
            if (!await _dbContext.Npcs.AnyAsync(x => x.Id == npcId, cancellationToken))
            {
                throw new ArgumentException("The NPC was not found.");
            }

            var targetNpc = await _dbContext.Npcs
                .Join(_dbContext.Campaigns, outer => outer.CampaignId, inner => inner.Id, (outer, inner) => new
                {
                    Npcs = outer,
                    inner.UserId,
                })
                .Where(x => x.Npcs.Id == npcId && x.UserId == userId && x.Npcs.CampaignId == campaignId)
                .Select(x => x.Npcs)
                .FirstAsync(cancellationToken);

            _dbContext.Npcs.Remove(targetNpc);

            await _dbContext.SaveChangesAsync(cancellationToken);
        }
    }
}
