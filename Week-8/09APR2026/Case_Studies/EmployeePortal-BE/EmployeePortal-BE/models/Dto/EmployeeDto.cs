using System.ComponentModel.DataAnnotations;
using EmployeePortal_BE.models.attributes;

namespace EmployeePortal_BE.models.Dto
{
    public class EmployeeDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Department { get; set; }

        [Required]
        [RangeSalary(10000, 100000)]
        public double Salary { get; set; }

        [Required]
        [Password]
        public string Password { get; set; }


    }
}