using System.ComponentModel.DataAnnotations;

namespace EmployeePortal_BE.models.attributes
{
    public class PasswordAttribute : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value == null)
            {
                return new ValidationResult("Password is required");
            }

            if (value is string password)
            {
                if (password.Length < 8)
                    return new ValidationResult("Password must be at least 8 characters long");

                if (!password.Any(char.IsUpper))
                    return new ValidationResult("Password must contain at least one uppercase letter");

                if (!password.Any(char.IsLower))
                    return new ValidationResult("Password must contain at least one lowercase letter");
            }

            return ValidationResult.Success;
        }
    }
}