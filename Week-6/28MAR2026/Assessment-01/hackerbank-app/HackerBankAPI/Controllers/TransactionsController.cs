using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HackerBankAPI.Data;
using HackerBankAPI.Models;

namespace HackerBankAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TransactionsController(AppDbContext context)
        {
            _context = context;
        }

        // ✅ Get all transactions
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var data = await _context.Transactions.ToListAsync();
            return Ok(data);
        }

        // ✅ Filter by date
        [HttpGet("filter")]
        public async Task<IActionResult> FilterByDate(string date)
        {
            var data = await _context.Transactions
                .Where(t => t.Date == date)
                .ToListAsync();

            return Ok(data);
        }

        // ✅ Add new transaction
        [HttpPost]
        public async Task<IActionResult> AddTransaction(Transaction transaction)
        {
            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            return Ok(transaction);
        }
    }
}