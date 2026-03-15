using System;

namespace PRODUCT_MANAGEMENT_SYSTEM
{
    internal class Program
    {
        static void Main(string[] args)
        {
            ProductService service = new ProductService();
            service.Run();
        }
    }
}