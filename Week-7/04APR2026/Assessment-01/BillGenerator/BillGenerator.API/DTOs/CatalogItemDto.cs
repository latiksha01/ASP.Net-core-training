namespace BillGenerator.API.DTOs
{
    public class CatalogItemDto
    {
        public string Name { get; set; } = "";
        public string CatalogType { get; set; } = "";
        public decimal Price { get; set; }
        public string Unit { get; set; } = "";
    }
}