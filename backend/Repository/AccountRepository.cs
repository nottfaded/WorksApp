using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class AccountRepository(AppDbContext context) : IAccountService
    {
        public async Task AddAccount(Role role, string email, string password)
        {
            switch (role)
            {
                case Role.User:
                    await context.Users.AddAsync(new User
                    {
                        Email = email,
                        Role = role,
                        Password = password
                    });
                    break;
                case Role.Corporation:
                    await context.Corporations.AddAsync(new Corporation()
                    {
                        Email = email,
                        Role = role,
                        Password = password
                    });
                    break;
            }

            await context.SaveChangesAsync();
        }

        public async Task<List<AccountBase>> GetAllAccountsAsync()
        {
            var users = await context.Users.Cast<AccountBase>().ToListAsync();
            var corporations = await context.Corporations.Cast<AccountBase>().ToListAsync();
            var admins = await context.Admins.Cast<AccountBase>().ToListAsync();

            return users
                .Union(corporations)
                .Union(admins)
                .ToList();
        }

        public async Task<AccountBase?> GetAccountByEmailAsync(string email)
        {
            var list = await GetAllAccountsAsync();
            return list.FirstOrDefault(i => i.Email == email);
        }

        public async Task<AccountBase?> GetAccountByIdAsync(int id)
        {
            var list = await GetAllAccountsAsync();
            return list.FirstOrDefault(i => i.Id == id);
        }

        public async Task<User?> GetUserAsync(int id)
        {
            return await context.Users.FindAsync(id);
        }

        public async Task<Corporation?> GetCorporationAsync(int id)
        {
            return await context.Corporations.FindAsync(id);
        }
    }
}
