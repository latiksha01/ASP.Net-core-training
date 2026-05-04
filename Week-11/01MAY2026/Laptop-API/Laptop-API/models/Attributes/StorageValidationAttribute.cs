using System.ComponentModel.DataAnnotations;

namespace Laptop_API.models.Attributes
{
    public class StorageValidationAttribute : ValidationAttribute
    {
       
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {

            if (value is int storage)
            {

                if (storage != 128 && storage != 256 && storage != 512 && storage != 1024)
                {
                    return new ValidationResult(
                        "Storage must be 128, 256, 512 or 1024 GB");
                }
            }

        return ValidationResult.Success;

        }

    }
}
