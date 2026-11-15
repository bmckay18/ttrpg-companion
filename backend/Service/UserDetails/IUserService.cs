namespace Service.UserDetails
{
    public interface IUserService
    {
        Task<string> GetDisplayNameAsync(Guid userId);
    }
}