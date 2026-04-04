using Microsoft.AspNetCore.Mvc;
using BillGenerator.API.Models;
using BillGenerator.API.Data;
using BillGenerator.API.Services;
using BillGenerator.API.DTOs;
using Microsoft.EntityFrameworkCore;

namespace BillGenerator.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BillsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BillsController(AppDbContext context)
        {
            _context = context;
        }

        // ✅ GET ALL
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var bills = await _context.Bills
                .Include(b => b.Items)
                .ToListAsync();

            return Ok(bills);
        }

        // ✅ GET BY ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var bill = await _context.Bills
                .Include(b => b.Items)
                .FirstOrDefaultAsync(b => b.Id == id);

            if (bill == null)
                return NotFound();

            return Ok(bill);
        }

        // ✅ CREATE BILL (MAIN FIX)
[HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateBillDto dto)
        {
            try
            {
                var billService = HttpContext.RequestServices.GetRequiredService<IBillService>();
                var bill = await billService.CreateAsync(dto);
                return CreatedAtAction(nameof(GetById), new { id = bill.Id }, bill);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // Daily Summary for Dashboard
        [HttpGet("summary/daily")]
        public async Task<IActionResult> DailySummary([FromQuery] DateTime? date)
        {
            var billService = HttpContext.RequestServices.GetRequiredService<IBillService>();
            var summary = await billService.GetDailySummaryAsync(date ?? DateTime.Today);
            return Ok(summary);
        }

        // ✅ DELETE
        [HttpDelete("{id}")] 
        public async Task<IActionResult> Delete(int id)
        {
            var bill = await _context.Bills.FindAsync(id);
            if (bill == null)
                return NotFound();

            _context.Bills.Remove(bill);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
