using Domain.Models;
using Domain.Models.Account;
using Domain.Models.News;
using Domain.Models.NRI;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Domain.Context
{
    public class AppDbContext : IdentityDbContext<User, Role, Guid, IdentityUserClaim<Guid>, UserRole, IdentityUserLogin<Guid>, IdentityRoleClaim<Guid>, IdentityUserToken<Guid>>
    {
        public DbSet<Position> Positions  { get; set; }
        public DbSet<UserType> UserTypes { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<Championat> Championats { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<Player> Players{ get; set; }
        public DbSet<Event> Events{ get; set; }
        public DbSet<Match> Matches { get; set; }
        public DbSet<Squad> Squads { get; set; }
        public DbSet<MatchEvent> MatchEvents { get; set; }
        public DbSet<ChampionatStats> ChampionatStats { get; set; }
        public DbSet<Stadium> Stadiums { get; set; }
        public DbSet<LogoFile> LogoFiles { get; set; }
        public DbSet<News> News { get; set; }
        public DbSet<Discfalification> Discfalifications { get; set; }



        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>()
                .HasMany(e => e.UserRoles)
                .WithOne()
                .HasForeignKey(e => e.UserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<UserRole>()
                .HasOne(aur => aur.User)
                .WithMany(aur => aur.UserRoles)
                .HasForeignKey(aur => aur.UserId);

            builder.Entity<UserRole>()
                .HasOne(aur => aur.Role)
                .WithMany(aur => aur.UserRoles)
                .HasForeignKey(aur => aur.RoleId);

        }
    }
}
