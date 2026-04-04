namespace BillGenerator.API.Models
{
    public class Bill
    {
        public int Id { get; set; }

        public string InvoiceNumber { get; set; } = "";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public string CustomerName { get; set; } = "Walk-in";

        public string Status { get; set; } = "final";

        public decimal DiscountPercent { get; set; } = 0;

        public decimal DiscountFixed { get; set; } = 0;

        public decimal TaxPercent { get; set; } = 18;

        public string Notes { get; set; } = "";

        public List<BillItem> Items { get; set; } = new();

        public decimal Subtotal => Items?.Sum(i => i.Total) ?? 0;

        public decimal DiscountAmount =>
            DiscountFixed > 0 ? DiscountFixed : (Subtotal * DiscountPercent / 100);

        public decimal TaxableAmount => Subtotal - DiscountAmount;

        public decimal TaxAmount => TaxableAmount * TaxPercent / 100;

        public decimal GrandTotal => TaxableAmount + TaxAmount;

        public static string GenerateInvoiceNumber()
        {
            return $"INV-{DateTime.UtcNow:yyyyMMdd}-{Random.Shared.Next(1000, 9999)}";
        }
    }
}