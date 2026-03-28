using Microsoft.EntityFrameworkCore;
using HackerBankAPI.Models;

namespace HackerBankAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Transaction> Transactions { get; set; }
    }
}