using System.Text.Json.Serialization;

namespace BillGenerator.API.Models
{
    public class BillItem
    {
        public int Id { get; set; }

        public int BillId { get; set; }

        [JsonIgnore] // 🔥 prevents infinite loop
        public Bill? Bill { get; set; }

        public string Name { get; set; } = "";

        public string CatalogType { get; set; } = "custom";

        public int Quantity { get; set; } = 1;

        public decimal UnitPrice { get; set; }

        public decimal Total => Quantity * UnitPrice;
    }
}