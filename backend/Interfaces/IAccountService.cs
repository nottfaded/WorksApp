using backend.Models;

namespace backend.Interfaces
{
    public interface IAccountService
    {
        public Task AddAccount(Role role, string email, string password);
        public Task<List<AccountBase>> GetAllAccountsAsync();
        public Task<AccountBase?> GetAccountByEmailAsync(string email);
        public Task<AccountBase?> GetAccountByIdAsync(int id);
        public Task<User?> GetUserAsync(int id);
        public Task<Corporation?> GetCorporationAsync(int id);
    }
}
