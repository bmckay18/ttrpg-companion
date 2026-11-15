using Data;
using Data.Entities;
using Microsoft.EntityFrameworkCore;
using Service.CustomExceptions;
using Service.UserDetails;

namespace Test.Service.UserDetails
{
    [TestFixture]
    public class UserServiceTests
    {
        private UserService _service;
        private AppDbContext _dbContext;

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            _dbContext = new AppDbContext(options);


            _service = new UserService(_dbContext);
        }

        [TearDown]
        public void TearDown()
        {
            _dbContext.Dispose();
        }

        [Test]
        public async Task GetDisplayNameAsync_ReturnsDisplayName()
        {
            var userId = Guid.NewGuid();

            var user = new User
            {
                Id = 1,
                DisplayName = "Frodo Baggins",
                AuthUserId = userId
            };

            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();

            var result = await _service.GetDisplayNameAsync(userId);

            Assert.That(result, Is.EqualTo("Frodo Baggins"));
        }

        [Test]
        public async Task GetDisplayName_ThrowsNotFoundException_WhenUserDoesNotExist()
        {
            Assert.ThrowsAsync<NotFoundException>(async () =>
            {
                await _service.GetDisplayNameAsync(Guid.NewGuid());
            });
        }
    }
}
