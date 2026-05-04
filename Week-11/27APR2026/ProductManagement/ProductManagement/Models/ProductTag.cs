namespace ProductManagement.Models
{
    public class ProductTag
    {
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int Tag { get; set; }
        public int TagId { get; set; }
    }
}
