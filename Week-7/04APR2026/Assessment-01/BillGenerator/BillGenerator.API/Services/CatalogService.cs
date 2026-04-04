using BillGenerator.API.Data;
using BillGenerator.API.DTOs;
using BillGenerator.API.Models;
using Microsoft.EntityFrameworkCore;

namespace BillGenerator.API.Services
{
    public class CatalogService : ICatalogService
    {
        private readonly AppDbContext _db;

        public CatalogService(AppDbContext db)
        {
            _db = db;
        }

        public async Task<List<CatalogItem>> GetAllAsync(string? type)
        {
            var query = _db.CatalogItems.Where(c => c.IsActive);
            if (!string.IsNullOrEmpty(type)) query = query.Where(c => c.CatalogType == type);
            return await query.ToListAsync();
        }

        public async Task<CatalogItem> CreateAsync(CatalogItemDto dto)
        {
            var item = new CatalogItem
            {
                Name = dto.Name,
                CatalogType = dto.CatalogType,
                Price = dto.Price,
                Unit = dto.Unit
            };
            _db.CatalogItems.Add(item);
            await _db.SaveChangesAsync();
            return item;
        }

        public async Task<CatalogItem?> UpdateAsync(int id, CatalogItemDto dto)
        {
            var item = await _db.CatalogItems.FindAsync(id);
            if (item == null) return null;
            item.Name = dto.Name;
            item.Price = dto.Price;
            item.Unit = dto.Unit;
            await _db.SaveChangesAsync();
            return item;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var item = await _db.CatalogItems.FindAsync(id);
            if (item == null) return false;
            item.IsActive = false;
            await _db.SaveChangesAsync();
            return true;
        }
    }
}