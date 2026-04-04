using BillGenerator.API.Data;
using BillGenerator.API.DTOs;
using BillGenerator.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace BillGenerator.API.Services
{
    public class BillService : IBillService
    {
        private readonly AppDbContext _db;

        public BillService(AppDbContext db)
        {
            _db = db;
        }

        public async Task<List<Bill>> GetAllAsync(string? status, DateTime? from, DateTime? to)
        {
            var query = _db.Bills.Include(b => b.Items).AsQueryable();

            if (!string.IsNullOrEmpty(status))
                query = query.Where(b => b.Status == status);

            if (from.HasValue)
                query = query.Where(b => b.CreatedAt >= from.Value);

            if (to.HasValue)
                query = query.Where(b => b.CreatedAt <= to.Value);

            return await query.OrderByDescending(b => b.CreatedAt).ToListAsync();
        }

        public async Task<Bill?> GetByIdAsync(int id)
        {
            return await _db.Bills
                .Include(b => b.Items)
                .FirstOrDefaultAsync(b => b.Id == id);
        }

        public async Task<Bill> CreateAsync(CreateBillDto dto)
        {
            var bill = new Bill
            {
                InvoiceNumber = Bill.GenerateInvoiceNumber(),
                CustomerName = dto.CustomerName,
                DiscountPercent = dto.DiscountPercent,
                DiscountFixed = dto.DiscountFixed,
                TaxPercent = dto.TaxPercent,
                Notes = dto.Notes
            };

            _db.Bills.Add(bill);
            await _db.SaveChangesAsync();

            if (dto.Items != null && dto.Items.Any())
            {
                foreach (var itemDto in dto.Items)
                {
                    var item = new BillItem
                    {
                        BillId = bill.Id,
                        Name = itemDto.Name,
                        CatalogType = itemDto.CatalogType,
                        Quantity = itemDto.Quantity,
                        UnitPrice = itemDto.UnitPrice
                    };
                    _db.BillItems.Add(item);
                }
                await _db.SaveChangesAsync();
            }

            return await GetByIdAsync(bill.Id) ?? bill;
        }

        public async Task<Bill?> UpdateAsync(int id, UpdateBillDto dto)
        {
            var bill = await _db.Bills.Include(b => b.Items)
                .FirstOrDefaultAsync(b => b.Id == id);

            if (bill == null) return null;

            bill.CustomerName = dto.CustomerName;
            bill.DiscountPercent = dto.DiscountPercent;
            bill.DiscountFixed = dto.DiscountFixed;
            bill.TaxPercent = dto.TaxPercent;
            bill.Notes = dto.Notes;
            bill.Status = dto.Status;

            _db.BillItems.RemoveRange(bill.Items);

            bill.Items = dto.Items.Select(i => new BillItem
            {
                Name = i.Name,
                CatalogType = i.CatalogType,
                Quantity = i.Quantity,
                UnitPrice = i.UnitPrice
            }).ToList();

            await _db.SaveChangesAsync();

            return bill;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var bill = await _db.Bills.FindAsync(id);
            if (bill == null) return false;

            _db.Bills.Remove(bill);
            await _db.SaveChangesAsync();

            return true;
        }

        public async Task<object> GetDailySummaryAsync(DateTime date)
        {
            var start = date.Date;
            var end = start.AddDays(1);

            var bills = await _db.Bills
                .Include(b => b.Items)
                .Where(b => b.CreatedAt >= start && b.CreatedAt < end)
                .ToListAsync();

            var byCategory = bills.SelectMany(b => b.Items)
                .GroupBy(i => i.CatalogType)
                .Select(g => new 
                {
                    category = g.Key,
                    count = g.Sum(i => i.Quantity),
                    total = g.Sum(i => i.Total)
                }).ToList();

            return new
            {
                date = date.Date,
                totalBills = bills.Count,
                totalRevenue = bills.Sum(b => b.GrandTotal),
                totalTax = bills.Sum(b => b.TaxAmount),
                totalDiscount = bills.Sum(b => b.DiscountAmount),
                byCategory
            };
        }
    }
}
