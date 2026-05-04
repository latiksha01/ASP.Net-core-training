using Laptop_API.models.Attributes;
using System.ComponentModel.DataAnnotations;

namespace Laptop_API.models.Dtos
{
    public class LaptopDto
    {
        
        [Required]
        [StringLength(50, MinimumLength = 2)]
        public string Brand { get; set; }


        [Required]
        public string Model { get; set; }

        [Required]
        public string Processor { get; set; }

        

        [StorageValidation]
        public int Storage { get; set; }  


        [Required]
        [Range(20000, 300000)]
        public decimal Price { get; set; }


        [Required]
        [OperatingSystemValidation]
        public string OperatingSystem { get; set; }
    
    }
}
