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
            SeedData(builder);
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

        private static void SeedData(ModelBuilder builder)
        {
            builder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    Email = "u@u",
                    Password = "$2a$11$kp1DevIoes7ZhcQbmRnFFe/0VEh65I1bCGrO4pcGtDVL3GxRsqGWa",
                    Firtname = "John",
                    Lastname = "Doe",
                    Role = Role.User
                }
            );

            builder.Entity<Corporation>().HasData(
                new Corporation
                {
                    Id = 2,
                    Email = "c@c",
                    Password = "$2a$11$kp1DevIoes7ZhcQbmRnFFe/0VEh65I1bCGrO4pcGtDVL3GxRsqGWa",
                    CompanyName = "Tech Corp",
                    Role = Role.Corporation
                }
            );

            builder.Entity<Admin>().HasData(
                new Admin
                {
                    Id = 3,
                    Email = "a@a",
                    Password = "$2a$11$kp1DevIoes7ZhcQbmRnFFe/0VEh65I1bCGrO4pcGtDVL3GxRsqGWa",
                    FixAnekts = 0,
                    Role = Role.Admin
                }
            );
        }
    }
}
