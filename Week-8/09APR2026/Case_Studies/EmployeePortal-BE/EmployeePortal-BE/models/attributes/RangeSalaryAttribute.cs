using System.ComponentModel.DataAnnotations;

namespace EmployeePortal_BE.models.attributes
{
    public class RangeSalaryAttribute : ValidationAttribute
    {
        private readonly double minSalary;
        private readonly double maxSalary;

        public RangeSalaryAttribute(double minSalary, double maxSalary)
        {
            this.minSalary = minSalary;
            this.maxSalary = maxSalary;
        }

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value is double salary)
            {
                if (salary < minSalary || salary > maxSalary)
                {
                    return new ValidationResult(
                        $"Salary must be in the range of [{minSalary}, {maxSalary}]");
                }
            }

            return ValidationResult.Success;
        }
    }
}