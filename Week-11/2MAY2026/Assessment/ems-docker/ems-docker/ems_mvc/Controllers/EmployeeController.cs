using Microsoft.AspNetCore.Mvc;
using ems_mvc.Models;
using System.Net.Http.Json;

namespace ems_mvc.Controllers
{
    public class EmployeeController : Controller
    {
        private readonly HttpClient _httpClient;

        public EmployeeController(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient("EmployeeApi");
        }

        public async Task<IActionResult> Index()
        {
            try
            {
                var employees = await _httpClient.GetFromJsonAsync<List<Employee>>("api/Employees");
                return View(employees ?? new List<Employee>());
            }
            catch
            {
                return View(new List<Employee>());
            }
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
public async Task<IActionResult> Create(Employee employee)
{
    var response = await _httpClient.PostAsJsonAsync("api/Employees", employee);

    if (!response.IsSuccessStatusCode)
    {
        return Content("API ERROR: " + response.StatusCode);
    }

    return RedirectToAction("Index");
}
    }
}