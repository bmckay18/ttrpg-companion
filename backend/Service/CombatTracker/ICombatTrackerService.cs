using Data.Entities;
using Service.CombatTracker.Models;

namespace Service.CombatTracker
{
    public interface ICombatTrackerService
    {
        Task CreateNpcAsync(NewNpcRequestDto requestData, int campaignId, Guid userId, CancellationToken cancellationToken);
        Task<IEnumerable<NpcDto>> GetNpcsAsync(int campaignId, Guid userId, CancellationToken cancellationToken);
    }
}