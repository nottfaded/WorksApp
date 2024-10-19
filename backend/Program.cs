using System.Text;
using backend.Helpers;
using backend.Interfaces;
using backend.Mappers;
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

            services.AddAutoMapper(typeof(UserProfile), typeof(CorporationProfile));

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
            //services.AddAuthentication(options =>
            //{
            //    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            //    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            //})
            //.AddJwtBearer(options =>
            //{
            //    options.TokenValidationParameters = new TokenValidationParameters
            //    {
            //        ValidateIssuer = true,
            //        ValidateAudience = true,
            //        ValidateLifetime = true,
            //        ValidateIssuerSigningKey = true,
            //        ValidIssuer = configuration["Jwt:Issuer"],
            //        ValidAudience = configuration["Jwt:Audience"],
            //        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]))
            //    };

            //    options.Events = new JwtBearerEvents
            //    {
            //        OnMessageReceived = context =>
            //        {
            //            var token = context.Request.Cookies["access_token"];
            //            if (!string.IsNullOrEmpty(token))
            //            {
            //                context.Token = token;
            //            }
            //            return Task.CompletedTask;
            //        }
            //    };
            //});

            services.AddScoped<IAccountService, AccountRepository>();



            var app = builder.Build();

            using (var scope = app.Services.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                db.Database.Migrate();

                //if (env.IsProduction())
                //{
                //    db.Database.ExecuteSqlRaw("SET GLOBAL event_scheduler = ON;");

                //    db.Database.ExecuteSqlRaw(@"
                //    DROP EVENT IF EXISTS CleanUpSessions;
                //    CREATE EVENT IF NOT EXISTS CleanUpSessions
                //    ON SCHEDULE EVERY 1 HOUR
                //    DO
                //    BEGIN
                //        DELETE FROM sessions WHERE ExpiresAtTime < UTC_TIMESTAMP();
                //    END;");

                //}
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
            //app.UseSession();
            //app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.Run();
        }
    }
}
