using System.Text;
using backend.Helpers;
using backend.Interfaces;
using backend.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var services = builder.Services;
            var configuration = builder.Configuration;
            var env = builder.Environment;
            var jwtService = new JwtService(configuration);

            services.AddControllers();

            services.AddHttpClient();

            services.AddDbContext<AppDbContext>(options =>
                options.UseMySql(configuration.GetConnectionString("MariaDb"),
                new MariaDbServerVersion(new Version(11, 5, 2)))
            );

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = jwtService.GetTokenValidationParameters();
            });
            builder.Services.AddScoped<JwtService>();

            services.AddScoped<IAccount, AccountRepository>();



            var app = builder.Build();

            using (var scope = app.Services.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                db.Database.Migrate();

            }

            app.UseCors(op =>
            {
                op.WithOrigins("http://localhost:5173")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials();
            });

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            //app.UseHttpsRedirection();
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.Run();
        }
    }
}
