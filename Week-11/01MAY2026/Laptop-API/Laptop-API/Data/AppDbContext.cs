using Laptop_API.models.Entities;
using Laptop_API.models;
using Microsoft.EntityFrameworkCore;

namespace Laptop_API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<laptop> Laptops { get; set; }
    }
}