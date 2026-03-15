using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;

namespace Product_demo
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public bool IsStock { get; set; }
    }

    public class Product_Catalog
    {
        private List<Product> products;
        public Product_Catalog()
        {
            //products = new List<Product> { new Product{Id = 100, Name = "Laptop", Description ="Electronics", Price = 75000},
            //                               new Product{Id = 101, Name = "SmartPhone", Description ="Electronics", Price = 23000},
            //                               new Product{Id = 102, Name = "Desk", Description ="Furniture", Price = 1200},
            //                               new Product{Id = 103, Name = "Notebokk", Description ="Stationary", Price = 70}
            //                              };
            products = new List<Product>();
        }

        public void Add_Product()
        {
            Product product = new Product();
            Console.Write("Enter the product id: ");
            product.Id = Convert.ToInt32 (Console.ReadLine());
            Console.Write("Enter the product Name: ");
            product.Name = Console.ReadLine();
            Console.Write("Enter the product Description: ");
            product.Description = Console.ReadLine();
            Console.Write("Enter the product Price: ");
            product.Price = Convert.ToDouble(Console.ReadLine());
            Console.Write("Is stock is available: ");
            product.IsStock = Convert.ToBoolean(Console.ReadLine());
            products.Add(product);

        }

        public bool delete_Product_By_Id(int id)
        {
            var productid = products.FirstOrDefault(p => p.Id == id);
                if(productid == null)
                {
                    return false;
                }
              
                products.Remove(productid);
                return true;


        }

        public void DisplayProducts()
        {
            foreach (var product in products) //var - accepts any data type;
            {
                Console.WriteLine($"Id: {product.Id} | Name: {product.Name} | Description: {product.Description} | Price: {product.Price} | Stock Available: {product.IsStock}");
            }
        }

        
    }

    class Test_Prodct
    {
        static void Main(string[] args)
        {
            Product_Catalog catalog = new Product_Catalog();

            int choice;
            do
            {
                Console.WriteLine("0. Exit the program");
                Console.WriteLine("1. Add the products");
                Console.WriteLine("2. Display the products");
                Console.WriteLine("3. Delete product by Id");
                Console.Write("4. Enter the choice: ");
                choice = Convert.ToInt32(Console.ReadLine());

                switch (choice)
                    {
                        case 1:
                            catalog.Add_Product();
                            Console.WriteLine();
                            break;
                        case 2:
                            catalog.DisplayProducts();
                            Console.WriteLine();
                            break;

                        case 3:
                            int id1; 
                            Console.Write("Enter the product id to delete: ");
                            id1 = Convert.ToInt32(Console.ReadLine());
                            catalog.delete_Product_By_Id(id1);
                            break;
                            
                        case 0:
                            Console.WriteLine("Exiting the program...");
                            Console.WriteLine();
                            break;
                        default:
                            Console.WriteLine("Invalid choice. Please try again.");
                            Console.WriteLine();
                            break;

                }
            }

            while (choice != 0);
  
        }
    }
}
