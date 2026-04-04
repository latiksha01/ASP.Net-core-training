using BillGenerator.API.DTOs;
using BillGenerator.API.Models;

namespace BillGenerator.API.Services
{
    public interface IBillService
    {
        Task<List<Bill>> GetAllAsync(string? status, DateTime? from, DateTime? to);
        Task<Bill?> GetByIdAsync(int id);
        Task<Bill> CreateAsync(CreateBillDto dto);
        Task<Bill?> UpdateAsync(int id, UpdateBillDto dto);
        Task<bool> DeleteAsync(int id);
        Task<object> GetDailySummaryAsync(DateTime date);
    }
}