using BillGenerator.API.DTOs;
using BillGenerator.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace BillGenerator.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CatalogsController : ControllerBase
    {
        private readonly ICatalogService _catalogService;

        public CatalogsController(ICatalogService catalogService)
        {
            _catalogService = catalogService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? type)
            => Ok(await _catalogService.GetAllAsync(type));

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CatalogItemDto dto)
            => Ok(await _catalogService.CreateAsync(dto));

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] CatalogItemDto dto)
        {
            var item = await _catalogService.UpdateAsync(id, dto);
            return item == null ? NotFound() : Ok(item);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
            => await _catalogService.DeleteAsync(id) ? NoContent() : NotFound();
    }
}