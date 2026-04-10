namespace EmployeePortal_BE.models.Entities
{
    public class Employee
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Department { get; set; }
        public double Salary { get; set; }

        public string Password { get; set; }
    }
}
