using System;
using System.Text;
using Athena.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Athena {
    public class Startup {
        public Startup (IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices (IServiceCollection services) {
            services.AddMvc ();

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles (configuration => {
                configuration.RootPath = "ClientApp/dist";
            });

            services.AddEntityFrameworkNpgsql ().AddDbContext<ApplicationDbContext> (
                options => options.UseNpgsql (Configuration.GetConnectionString ("DefaultConnection")));

            // Add ASP.NET Identity support
            services.AddIdentity<ApplicationUser, IdentityRole> (
                    opts => {
                        opts.Password.RequireDigit = true;
                        opts.Password.RequireLowercase = true;
                        opts.Password.RequireUppercase = true;
                        opts.Password.RequireNonAlphanumeric = false;
                        opts.Password.RequiredLength = 7;
                    })
                .AddEntityFrameworkStores<ApplicationDbContext> ();

            // Add Authentication with JWT Tokens
            services.AddAuthentication (opts => {
                    opts.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                    opts.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    opts.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer (cfg => {
                    cfg.RequireHttpsMetadata = false;
                    cfg.SaveToken = true;
                    cfg.TokenValidationParameters = new TokenValidationParameters () {
                        // standard configuration
                        ValidIssuer = Configuration["Auth:Jwt:Issuer"],
                        IssuerSigningKey = new SymmetricSecurityKey (
                        Encoding.UTF8.GetBytes (Configuration["Auth:Jwt:Key"])),
                        ValidAudience = Configuration["Auth:Jwt:Audience"],
                        ClockSkew = TimeSpan.Zero,

                        // security switches
                        RequireExpirationTime = true,
                        ValidateIssuer = true,
                        ValidateIssuerSigningKey = true,
                        ValidateAudience = true
                    };
                    cfg.IncludeErrorDetails = true;
                }) 
                // Add Facebook support
                .AddFacebook (opts => {
                    opts.AppId = Configuration["Auth:Facebook:AppId"];
                    opts.AppSecret = Configuration["Auth:Facebook:AppSecret"];
                });;

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure (IApplicationBuilder app, IHostingEnvironment env) {
            if (env.IsDevelopment ()) {
                app.UseDeveloperExceptionPage ();
                // Create a service scope to get an ApplicationDbContext instance using DI
                using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory> ().CreateScope ()) {
                    var dbContext = serviceScope.ServiceProvider.GetService<ApplicationDbContext> ();

                    var roleManager = serviceScope.ServiceProvider.GetService<RoleManager<IdentityRole>> ();
                    var userManager = serviceScope.ServiceProvider.GetService<UserManager<ApplicationUser>> ();

                    // Create the Db if it doesn't exist and applies any pending migration 
                    dbContext.Database.Migrate ();
                    // Seed the Db.
                    DbSeeder.Seed (dbContext, roleManager, userManager);
                }
            } else {
                app.UseExceptionHandler ("/Home/Error");
            }

            app.UseStaticFiles ();
            app.UseSpaStaticFiles ();
            app.UseAuthentication ();

            app.UseMvc (routes => {
                routes.MapRoute (
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");

                // routes.MapSpaFallbackRoute (
                //     name: "spa-fallback", 
                //     defaults : new { controller = "Home", action = "Index" });
            });

            app.UseSpa (spa => {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment ()) {
                    spa.UseAngularCliServer (npmScript: "start");
                }
            });
        }
    }
}
