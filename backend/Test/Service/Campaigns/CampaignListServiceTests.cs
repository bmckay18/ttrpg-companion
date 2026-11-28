using Data;
using Data.Entities;
using Microsoft.EntityFrameworkCore;
using Service.Campaigns;
using Service.Campaigns.Models;

namespace Test.Service.Campaigns
{
    [TestFixture]
    public class CampaignListServiceTests
    {
        private AppDbContext _dbContext;
        private CampaignListService _service;
        private Guid _userId;

        [SetUp]
        public async Task Setup()
        {
            _userId = Guid.NewGuid();

            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            _dbContext = new AppDbContext(options);
            await CreateMockDatabaseEntities();

            _service = new CampaignListService(_dbContext);
        }

        [TearDown]
        public void Dispose()
        {
            _dbContext.Dispose();
        }

        [Test]
        public async Task GetCampaignsAsync_ReturnsUsersUnfilteredCampaigns_WhenNoSearchTermProvided()
        {
            var campaigns = await _service.GetCampaignsAsync(_userId, null, CancellationToken.None);

            Assert.That(campaigns.Count, Is.EqualTo(1));
            Assert.That(campaigns.First().Id, Is.EqualTo(1));
        }

        [Test]
        public async Task CreateCampaignAsync_CreatesCampaign_WhenNameIsValid()
        {
            var campaignRequest = new CreateCampaignRequestDto
            {
                Name = "New Campaign"
            };

            await _service.CreateCampaignAsync(_userId, campaignRequest, CancellationToken.None);

            var campaign = await _dbContext.Campaigns
                .FirstOrDefaultAsync(x => x.Name == "New Campaign");

            Assert.That(campaign, Is.Not.Null);
            Assert.That(campaign.UserId, Is.EqualTo(_userId));
        }

        [TestCase("")]
        [TestCase("        ")]
        [TestCase("e")]
        [TestCase(null)]
        public async Task CreateCampaignAsync_ThrowsInvalidOperationException_WhenNameIsInvalid(string? name)
        {
            var request = new CreateCampaignRequestDto
            {
                Name = name
            };

            Assert.ThrowsAsync<InvalidOperationException>(async () => await _service.CreateCampaignAsync(_userId, request, CancellationToken.None));

            var campaignCount = await _dbContext.Campaigns.CountAsync();
            Assert.That(campaignCount, Is.EqualTo(2));
        }

        private async Task CreateMockDatabaseEntities()
        {
            var campaigns = new List<Campaign>
            {
                new Campaign
                {
                    Id = 1,
                    Name = "Campaign 1",
                    UserId = _userId,
                    CreationDate = new DateTime(2026, 11, 25),
                    LastModifiedDate = new DateTime(2026, 11, 27)
                },
                new Campaign
                {
                    Id = 2,
                    Name = "Campaign 2",
                    UserId = Guid.NewGuid(),
                    CreationDate = new DateTime(2026, 11, 25),
                    LastModifiedDate = new DateTime(2026, 11, 27)
                }
            };

            _dbContext.Campaigns.AddRange(campaigns);
            await _dbContext.SaveChangesAsync();
        }
    }
}
