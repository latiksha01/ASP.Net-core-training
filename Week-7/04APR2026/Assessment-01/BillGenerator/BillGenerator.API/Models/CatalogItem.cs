namespace BillGenerator.API.Models
{
    public class CatalogItem
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string CatalogType { get; set; } = "";
        public decimal Price { get; set; }
        public string Unit { get; set; } = "";
        public bool IsActive { get; set; } = true;
    }
}