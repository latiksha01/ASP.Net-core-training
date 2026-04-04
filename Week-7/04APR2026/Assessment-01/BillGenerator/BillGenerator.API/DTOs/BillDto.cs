namespace BillGenerator.API.DTOs
{
    public class CreateBillDto
    {
        public string CustomerName { get; set; } = "Walk-in";

        public decimal DiscountPercent { get; set; } = 0;
        public decimal DiscountFixed { get; set; } = 0;

        public decimal TaxPercent { get; set; } = 18;

        public string Notes { get; set; } = "";

        public List<CreateBillItemDto> Items { get; set; } = new();
    }

    public class CreateBillItemDto
    {
        public string Name { get; set; } = "";

        public string CatalogType { get; set; } = "custom";

        public int Quantity { get; set; }

        public decimal UnitPrice { get; set; }
    }

    public class UpdateBillDto
    {
        public string CustomerName { get; set; } = "Walk-in";

        public string Status { get; set; } = "draft";

        public decimal DiscountPercent { get; set; } = 0;
        public decimal DiscountFixed { get; set; } = 0;

        public decimal TaxPercent { get; set; } = 18;

        public string Notes { get; set; } = "";

        public List<UpdateBillItemDto> Items { get; set; } = new();
    }

    public class UpdateBillItemDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = "";

        public string CatalogType { get; set; } = "custom";

        public int Quantity { get; set; }

        public decimal UnitPrice { get; set; }
    }
}