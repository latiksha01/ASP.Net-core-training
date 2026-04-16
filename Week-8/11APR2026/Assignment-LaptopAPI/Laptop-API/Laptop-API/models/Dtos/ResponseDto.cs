using Laptop_API.models.Attributes;
using System.ComponentModel.DataAnnotations;

namespace Laptop_API.models.Dtos
{
    public class ResponseDto
    {
        public Guid Id { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public decimal Price { get; set; }

    }
}
