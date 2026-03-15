using System;
using System.Collections.Generic;
using System.Text;

namespace PRODUCT_MANAGEMENT_SYSTEM
{
    internal class ProductModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string Category { get; set; }
        public bool Instock { get; set; }

    }
}
