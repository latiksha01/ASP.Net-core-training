using BillGenerator.API.DTOs;
using BillGenerator.API.Models;

namespace BillGenerator.API.Services
{
    public interface ICatalogService
    {
        Task<List<CatalogItem>> GetAllAsync(string? type);
        Task<CatalogItem> CreateAsync(CatalogItemDto dto);
        Task<CatalogItem?> UpdateAsync(int id, CatalogItemDto dto);
        Task<bool> DeleteAsync(int id);
    }
}