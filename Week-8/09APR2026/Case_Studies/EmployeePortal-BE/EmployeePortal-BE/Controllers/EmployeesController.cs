using EmployeePortal_BE.models.Dto;
using EmployeePortal_BE.models.Entities;
using EmployeePortal_BE.models.Dto;
using EmployeePortal_BE.models.Entities;
using Microsoft.AspNetCore.Mvc;

namespace EmployeePortal_BE.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        // In-memory list (temporary database)
        private static List<Employee> employees = new List<Employee>();

        // 🔹 CREATE (POST)
        [HttpPost]
        public IActionResult CreateEmployee([FromBody] EmployeeDto dto)
        {
            var emp = new Employee
            {
                Id = Guid.NewGuid(),
                Name = dto.Name,
                Department = dto.Department,
                Salary = dto.Salary,
                Password = dto.Password
            };

            employees.Add(emp);

            return CreatedAtAction(
                nameof(GetAllEmployees),
                emp
            );

        }

       
        [HttpGet]
        public IActionResult GetAllEmployees()
        {
            return Ok(employees);
        }


        //[HttpGet("{id}")]
        //public IActionResult GetEmployeeById(Guid id)
        //{
        //    var emp = employees.FirstOrDefault(e => e.Id == id);

        //    if (emp == null)
        //        return NotFound();

        //    return Ok(emp);
        //}


        //[HttpPut("{id}")]
        //public IActionResult UpdateEmployee(Guid id, [FromBody] EmployeeDto dto)
        //{
        //    var emp = employees.FirstOrDefault(e => e.Id == id);

        //    if (emp == null)
        //        return NotFound();

        //    emp.Name = dto.Name;
        //    emp.Department = dto.Department;
        //    emp.Salary = dto.Salary;

        //    return Ok(emp);
        //}


        //[HttpDelete("{id}")]
        //public IActionResult DeleteEmployee(Guid id)
        //{
        //    var emp = employees.FirstOrDefault(e => e.Id == id);

        //    if (emp == null)
        //        return NotFound();

        //    employees.Remove(emp);

        //    return Ok("Deleted Successfully");
        //}
    }
}