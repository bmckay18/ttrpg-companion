using Data;
using Data.Entities;
using Microsoft.EntityFrameworkCore;
using Service.CombatTracker;
using Service.CombatTracker.Models;

namespace Test.Service.CombatTracker
{
    [TestFixture]
    public class CombatTrackerServiceTests
    {
        private AppDbContext _dbContext;
        private CombatTrackerService _service;
        private Guid _userId = Guid.NewGuid();

        [SetUp]
        public async Task Setup()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            _dbContext = new AppDbContext(options);
            await CreateDbEntities();

            _service = new CombatTrackerService(_dbContext);
        }

        [TearDown]
        public void TearDown()
        {
            _dbContext.Dispose();
        }

        [Test]
        public async Task GetNpcsAsync_ReturnsNpcsForCampaign_ForProvidedCampaignAndUserIds()
        {
            var npcs = await _service.GetNpcsAsync(3, _userId, CancellationToken.None);

            Assert.That(npcs.Count(), Is.EqualTo(1));
        }

        [Test]
        public async Task GetNpcsAsync_ThrowsInvalidOperationException_WhenUserDoesNotOwnCampaign()
        {
            Assert.ThrowsAsync<InvalidOperationException>(async () => await _service.GetNpcsAsync(2, _userId, CancellationToken.None));
        }

        [Test]
        public async Task CreateNpcAsync_CreatesNewNpc_WithValidData()
        {
            var request = new NewNpcRequestDto
            {
                Name = "Harry",
                Hp = 500
            };

            await _service.CreateNpcAsync(request, 1, _userId, CancellationToken.None);

            var npc = await _dbContext.Npcs.FirstOrDefaultAsync(x => x.Name == "Harry");

            Assert.That(npc, Is.Not.Null);
            Assert.That(npc.MaxHp, Is.EqualTo(500));
            Assert.That(npc.CurrentHp, Is.EqualTo(500));
            Assert.That(npc.CampaignId, Is.EqualTo(1));
        }

        [Test]
        public async Task CreateNpcAsync_ThrowsInvalidOperationException_WhenUserDoesNotOwnCampaign()
        {
            var request = new NewNpcRequestDto
            {
                Name = "Harry",
                Hp = 500
            };

            Assert.ThrowsAsync<InvalidOperationException>(async () => await _service.CreateNpcAsync(request, 2, _userId, CancellationToken.None));
        }

        [Test]
        public async Task CreateNpcAsync_ThrowsInvalidOperationException_WhenNameFormatIsInvalid()
        {
            var request = new NewNpcRequestDto
            {
                Name = "",
                Hp = 500
            };

            Assert.ThrowsAsync<InvalidOperationException>(async () => await _service.CreateNpcAsync(request, 1, _userId, CancellationToken.None));
        }

        [Test]
        public async Task CreateNpcAsync_ThrowsInvalidOperationException_WhenHpIsInvalid()
        {
            var request = new NewNpcRequestDto
            {
                Name = "Harry",
                Hp = -500
            };

            Assert.ThrowsAsync<InvalidOperationException>(async () => await _service.CreateNpcAsync(request, 1, _userId, CancellationToken.None));
        }

        [Test]
        public async Task UpdateNpcHealthAsync_UpdatesCurrentHpOfNpcs_WithProvidedValues()
        {
            var npc = new Npc
            {
                Name = "Harry",
                CampaignId = 3,
                CurrentHp = 800,
                MaxHp = 900,
                Id = 2
            };

            _dbContext.Npcs.Add(npc);

            await _dbContext.SaveChangesAsync();

            var request = new List<HealthUpdateRequestDto>
            {
                new HealthUpdateRequestDto
                {
                    Id = 1,
                    HpAmountChanged = -200
                },
                new HealthUpdateRequestDto
                {
                    Id = 2,
                    HpAmountChanged = 50
                }
            };

            await _service.UpdateNpcHealthAsync(request, 3, _userId, CancellationToken.None);

            var npcs = _dbContext.Npcs.Where(x => x.CampaignId == 3);
            var npc1 = await npcs.FirstAsync(x => x.Id == 1);
            var npc2 = await npcs.FirstAsync(x => x.Id == 2);

            Assert.That(npc1.CurrentHp, Is.EqualTo(600));
            Assert.That(npc2.CurrentHp, Is.EqualTo(850));
        }

        [Test]
        public async Task UpdateNpcHealthAsync_ThrowsArgumentException_WhenDuplicateNpcIdsAreProvided()
        {
            var request = new List<HealthUpdateRequestDto>
            {
                new HealthUpdateRequestDto
                {
                    Id = 1,
                    HpAmountChanged = 200
                },
                new HealthUpdateRequestDto
                {
                    Id = 1,
                    HpAmountChanged = -300
                }
            };

            Assert.ThrowsAsync<ArgumentException>(async () => await _service.UpdateNpcHealthAsync(request, 3, _userId, CancellationToken.None));
        }

        [Test]
        public async Task UpdateNpcHealthAsync_ThrowsKeyNotFoundException_WhenNpcIdBelongsToAnotherCampaign()
        {
            var npc = new Npc
            {
                Name = "Harry",
                CampaignId = 1,
                CurrentHp = 800,
                MaxHp = 900,
                Id = 2
            };

            _dbContext.Npcs.Add(npc);

            await _dbContext.SaveChangesAsync();

            var request = new List<HealthUpdateRequestDto>
            {
                new HealthUpdateRequestDto
                {
                    Id = 1,
                    HpAmountChanged = 200
                },
                new HealthUpdateRequestDto
                {
                    Id = 2,
                    HpAmountChanged = -300
                }
            };

            Assert.ThrowsAsync<KeyNotFoundException>(async () => await _service.UpdateNpcHealthAsync(request, 3, _userId, CancellationToken.None));
        }

        [Test]
        public async Task UpdateNpcHealthAsync_DeletesNpc_WhenHealthIsEqualToOrLessThanZero()
        {
            var request = new List<HealthUpdateRequestDto>
            {
                new HealthUpdateRequestDto
                {
                    Id = 1,
                    HpAmountChanged = -2000
                }
            };

            await _service.UpdateNpcHealthAsync(request, 3, _userId, CancellationToken.None);

            var npc = await _dbContext.Npcs.FirstOrDefaultAsync(x => x.Id == 1);

            Assert.That(npc, Is.Null);
        }

        [Test]
        public async Task UpdateNpcHealthAsync_SetsHpToMax_IfNewHpIsGreaterThanMax()
        {
            var request = new List<HealthUpdateRequestDto>
            {
                new HealthUpdateRequestDto
                {
                    Id = 1,
                    HpAmountChanged = 2000
                }
            };

            await _service.UpdateNpcHealthAsync(request, 3, _userId, CancellationToken.None);

            var npc = await _dbContext.Npcs.FirstOrDefaultAsync(x => x.Id == 1);

            Assert.That(npc, Is.Not.Null);
            Assert.That(npc.CurrentHp, Is.EqualTo(npc.MaxHp));
        }

        [Test]
        public async Task UpdateNpcHealthAsync_ThrowsKeyNotFoundException_WhenUserDoesNotOwnNpc()
        {
            var newUser = Guid.NewGuid();

            var request = new List<HealthUpdateRequestDto>
            {
                new HealthUpdateRequestDto
                {
                    Id = 1,
                    HpAmountChanged = 2000
                }
            };

            Assert.ThrowsAsync<KeyNotFoundException>(async () => await _service.UpdateNpcHealthAsync(request, 3, newUser, CancellationToken.None));
        }

        [Test]
        public async Task DeleteNpcAsync_DeletesTheNpc_WhenRequestIsValid()
        {
            await _service.DeleteNpcAsync(1, 3, _userId, CancellationToken.None);

            var npcExists = await _dbContext.Npcs.AnyAsync(x => x.Id == 1);

            Assert.That(npcExists, Is.False);
        }

        [Test]
        public async Task DeleteNpcAsync_ThrowsArgumentException_WhenNpcDoesNotExist()
        {
            Assert.ThrowsAsync<ArgumentException>(async () => await _service.DeleteNpcAsync(5, 1, _userId, CancellationToken.None));
        }

        [Test]
        public async Task DeleteNpcAsync_ThrowsInvalidOperationException_WhenUserDoesNotOwnNpc()
        {
            var user = Guid.NewGuid();

            Assert.ThrowsAsync<InvalidOperationException>(async () => await _service.DeleteNpcAsync(1, 3, user, CancellationToken.None));
        }

        private async Task CreateDbEntities()
        {
            var campaigns = new List<Campaign>
            {
                new Campaign
                {
                    Name = "Campaign 1",
                    Id = 1,
                    UserId = _userId
                },
                new Campaign
                {
                    Name = "Campaign 2",
                    Id = 2,
                    UserId = Guid.NewGuid()
                },
                new Campaign
                {
                    Name = "Campaign 3",
                    Id = 3,
                    UserId = _userId
                }
            };

            _dbContext.Campaigns.AddRange(campaigns);

            var npc = new Npc
            {
                Id = 1,
                Name = "The Babylon",
                MaxHp = 1500,
                CurrentHp = 800,
                CampaignId = 3
            };

            _dbContext.Npcs.Add(npc);

            await _dbContext.SaveChangesAsync();
        }
    }
}
