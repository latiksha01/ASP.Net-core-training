using Microsoft.AspNetCore.Mvc;
using ems_api.Models;

namespace ems_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private static List<Employee> employees = new List<Employee>();

        [HttpGet]
        public IActionResult GetEmployees()
        {
            return Ok(employees);
        }

        [HttpPost]
        public IActionResult AddEmployee(Employee employee)
        {
            employee.Id = employees.Count + 1;
            employees.Add(employee);
            return Ok(employee);
        }
    }
}