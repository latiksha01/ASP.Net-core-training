using System.ComponentModel.DataAnnotations;

namespace Laptop_API.models.Attributes
{
    public class OperatingSystemValidation : ValidationAttribute
    {
        

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if(value is string operatingSystem)
            {
                if (operatingSystem != "Windows" && operatingSystem != "Linux" && operatingSystem != "MacOs" && operatingSystem != "Uinux")
                {
                    return new ValidationResult(
                        "Operating System must be valid");
                }
            }

                return ValidationResult.Success;
        }
    }
}
