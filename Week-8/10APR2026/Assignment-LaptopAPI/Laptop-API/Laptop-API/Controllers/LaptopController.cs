using Laptop_API.models.Dtos;
using Laptop_API.models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Laptop_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LaptopController : ControllerBase
    {
        private static List<laptop> laptops = new List<laptop>();

        [HttpPost]
        public IActionResult CreateLaptop([FromBody] LaptopDto dto)
        {
            var laptopobj = new laptop
            {
                Id = Guid.NewGuid(),
                Brand = dto.Brand,
                Model = dto.Model,
                Price = dto.Price,
            };

            laptops.Add(laptopobj);

            var response = new ResponseDto
            {
                Id = laptopobj.Id,
                Brand = laptopobj.Brand,
                Model = laptopobj.Model,
                Price = laptopobj.Price

            };


            return CreatedAtAction(nameof(GetLaptopById), new { id = response.Id }, response);
        }

        [HttpGet]
        public IActionResult GetAllLaptops()
        {
            var response = laptops.Select(l => new ResponseDto
            {
                Id = l.Id,
                Brand = l.Brand,
                Model = l.Model,
                
                
                Price = l.Price,
               
            }).ToList();

            return Ok(response);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteLaptop(Guid id)
        {
            var laptop = laptops.FirstOrDefault(l => l.Id == id);

            if (laptop == null)
                return NotFound();

            laptops.Remove(laptop);

            return Ok("Laptop deleted successfully");

        }

        [HttpGet("{id}")]
        public IActionResult GetLaptopById(Guid id)
        {
            var laptop = laptops.FirstOrDefault(l => l.Id == id);

            if (laptop == null)
                return NotFound();

            
            var response = new ResponseDto
            {
                Id = laptop.Id,
                Brand = laptop.Brand,
                Model = laptop.Model,
            
                
                Price = laptop.Price
                
            };

            return Ok(response);
        }



















        //[HttpPut("{id}")]
        //public IActionResult UpdateLaptop(Guid id, [FromBody] LaptopDto dto)
        //{
        //    var laptop = laptops.FirstOrDefault(l => l.Id == id);

        //    if (laptop == null)
        //        return NotFound();

        //    laptop.Brand = dto.Brand;
        //    laptop.Model = dto.Model;
        //    laptop.Price = dto.Price;
        //    laptop.RAM = dto.RAM;

        //    return Ok(laptop);
        //}
    }
}
