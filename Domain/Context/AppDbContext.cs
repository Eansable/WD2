using Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Domain.Context
{
    public class AppDbContext: DbContext
    {
        public DbSet<Position> Positions  { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

        }
    }
}
