using backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace backend
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public required DbSet<User> Users { get; set; }
        public required DbSet<Corporation> Corporations { get; set; }
        public required DbSet<Admin> Admins { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            ConfigureTables(builder);

        }

        private static void ConfigureTables(ModelBuilder builder)
        {
            builder.Entity<AccountBase>(entity =>
            {
                entity.ToTable("Accounts");
            });
        }

        private static void BuildRelations(ModelBuilder builder)
        {
            builder.Entity<AccountBase>()
                .HasDiscriminator<Role>("Role")
                .HasValue<User>(Role.User)
                .HasValue<Corporation>(Role.Corporation)
                .HasValue<Admin>(Role.Admin);
        }
    }
}
