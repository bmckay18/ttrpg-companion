using Data;
using Microsoft.EntityFrameworkCore;
using Service.CustomExceptions;

namespace Service.UserDetails
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _dbContext;

        public UserService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<string> GetDisplayNameAsync(Guid userId)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.AuthUserId == userId) ?? throw new NotFoundException("The user could not be found.");

            return user.DisplayName;
        }
    }
}
