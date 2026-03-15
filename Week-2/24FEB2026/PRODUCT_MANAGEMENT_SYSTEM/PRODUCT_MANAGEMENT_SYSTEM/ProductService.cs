using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;


namespace PRODUCT_MANAGEMENT_SYSTEM
{
    internal class ProductService
    {
        private readonly string ConntionString = "Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=Product;Integrated Security=True";

        public void Run()
        {
            while (true)
            {
                Console.WriteLine("------- PRODUCT MANAGEMENT SYSTEM --------");
                Console.WriteLine("1. View all products");
                Console.WriteLine("2. Insert a new product");
                Console.WriteLine("3. Update product details");
                Console.WriteLine("4. Delete a product");
                Console.WriteLine("5. Search product by ID");
                Console.WriteLine("6. Search product by Category");
                Console.WriteLine("7. Sort products");
                Console.WriteLine("8. Exit");

                Console.Write("Enter your choice: ");
                int choice = Convert.ToInt32(Console.ReadLine());

                switch (choice)
                {
                    case 1:
                        ViewAllProducts();
                        break;
                    case 2:
                        InsertProduct();
                        break;
                    case 3:
                        UpdateProduct();
                        break;
                    case 4:
                        DeleteProduct();
                        break;
                    case 5:
                        SearchProductById();
                        break;
                    case 6:
                        SearchProductByCategory();
                        break;
                    case 7:
                        SortProducts();
                        break;
                    case 8:
                        return;
                        break;
                    default:
                        Console.WriteLine("Invalid choice. Please try again.");
                        break;
                }
                Console.WriteLine("\n Press Enter key to continue...");
                Console.ReadLine();
            }
        }

        public void ViewAllProducts()
        {
            using SqlConnection conn = new SqlConnection(ConntionString);
            conn.Open();
            string query = "SELECT * FROM Product_Attributes";
            using SqlCommand cmd = new SqlCommand(query, conn);
            using SqlDataReader reader = cmd.ExecuteReader();
            Console.WriteLine("------- All Products --------");
            while (reader.Read())
            {
                Console.WriteLine($"ID: {reader["Id"]}, Name: {reader["Name"]}, Price: {reader["Price"]}, Category: {reader["Category"]}, In Stock: {reader["Instock"]}");
            }
        }

        public void InsertProduct()
        {
            ProductModel prod = new ProductModel();
            Console.WriteLine("Enter product name:");
            prod.Name = Console.ReadLine();
            Console.WriteLine("Enter product price:");
            prod.Price = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Enter product category:");
            prod.Category = Console.ReadLine();
            Console.WriteLine("Is the product in stock? (true/false):");
            prod.Instock = Convert.ToBoolean(Console.ReadLine());

            using SqlConnection conn = new SqlConnection(ConntionString);
            conn.Open();
            string query = "INSERT INTO Product_Attributes (Name, Price, Category, Instock) VALUES (@Name, @Price, @Category, @Instock)";
            using SqlCommand cmd = new SqlCommand(query, conn);
            cmd.Parameters.AddWithValue("@Name", prod.Name);
            cmd.Parameters.AddWithValue("@Price", prod.Price);
            cmd.Parameters.AddWithValue("@Category", prod.Category);
            cmd.Parameters.AddWithValue("@Instock", prod.Instock);
            cmd.ExecuteNonQuery();

            Console.WriteLine("Product inserted successfully");
        }
        public void UpdateProduct()
        {
            // Implementation for updating a product
            Console.WriteLine("Update product functionality is not implemented yet.");
            ProductModel mod = new ProductModel();
            mod.Id = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Enter product Name: ");
            mod.Name = Console.ReadLine();
            Console.WriteLine("Enter product Category: ");
            mod.Category = Console.ReadLine();
            Console.WriteLine("Enter Product Price: ");
            mod.Price = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("is prouct is in stock ");
            mod.Instock = Convert.ToBoolean(Console.ReadLine());

            using SqlConnection conn = new SqlConnection(ConntionString);
            conn.Open();
            string query = "UPDATE Product_Attributes SET Name = @Name, Category = @Category, Price = @Price, InStock = @InStock WHERE Id = @Id";
            using SqlCommand cmd = new SqlCommand(query, conn);
            cmd.Parameters.AddWithValue("@Id", mod.Id);
            cmd.Parameters.AddWithValue("@Name", mod.Name);
            cmd.Parameters.AddWithValue("@Category", mod.Category);
            cmd.Parameters.AddWithValue("@Price", mod.Price);
            cmd.Parameters.AddWithValue("@InStock", mod.Instock);
            int rows = cmd.ExecuteNonQuery();
            Console.WriteLine(rows > 0 ? "Updated Successfully" : "Product not found");
        }

        public void DeleteProduct()
        {
            // Implementation for deleting a product
            Console.WriteLine("Delete product functionality is not implemented yet.");
            int id = Convert.ToInt32(Console.ReadLine());
            using SqlConnection conn = new SqlConnection(ConntionString);
            conn.Open();
            string query = "DELETE FROM Product_Attributes WHERE Id = @Id";
            using SqlCommand cmd = new SqlCommand(query, conn);
            cmd.Parameters.AddWithValue("@Id", id);
            int rows = cmd.ExecuteNonQuery();
            Console.WriteLine(rows > 0 ? "Deleted Successfully" : "Product not found");
        }

        public void SearchProductById()
        {
            // Implementation for searching products
            Console.WriteLine("enter id of the product");
            ProductModel mod = new ProductModel();
            mod.Id = Convert.ToInt32(Console.ReadLine());
            using SqlConnection conn = new SqlConnection(ConntionString);
            conn.Open();
            string query = "SELECT Id, Name, Category, Price, InStock FROM Product_Attributes WHERE Id = @Id";
            using SqlCommand cmd = new SqlCommand(query, conn);
            cmd.Parameters.AddWithValue("@Id", mod.Id);
            using SqlDataReader reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                mod.Id = reader.GetInt32(0);
                mod.Name = reader.GetString(1);
                mod.Category = reader.GetString(2);
                mod.Price = (float)reader.GetDouble(3);
                mod.Instock = reader.GetBoolean(4);
                Console.WriteLine($"ID: {mod.Id}, Name: {mod.Name}, Category: {mod.Category}, Price: {mod.Price}, In Stock: {mod.Instock}");

            }
            else
            {
                Console.WriteLine("Product not found.");
            }

        }

        public void SearchProductByCategory()
        {
            Console.WriteLine("Enter the category of the product to search:");
            string category = Console.ReadLine();

            using SqlConnection conn = new SqlConnection(ConntionString);
            conn.Open();

            string query = @"SELECT Id, Name, Category, Price, Instock FROM Product_Attributes WHERE Category LIKE @Category";

            using SqlCommand cmd = new SqlCommand(query, conn);
            cmd.Parameters.AddWithValue("@Category", $"%{category}%");

            using SqlDataReader reader = cmd.ExecuteReader();

            bool found = false;

            while (reader.Read())   
            {
                found = true;
                Console.WriteLine(
                    $"{reader["Id"]}\t{reader["Name"]}\t{reader["Category"]}\t{reader["Price"]}\t{reader["Instock"]}"
                );
            }

            if (!found)
            {
                Console.WriteLine("No products found for this category.");
            }
        }

        public void SortProducts()
        {
            Console.WriteLine("Sort products by:");
            Console.WriteLine("1. Name");
            Console.WriteLine("2. Price");
            Console.WriteLine("3. Category");
            Console.WriteLine("4. In Stock");
            Console.Write("Enter your choice: ");
            int choice = Convert.ToInt32(Console.ReadLine());
            string orderByClause = choice switch
            {
                1 => "Name",
                2 => "Price",
                3 => "Category",
                4 => "Instock",
                _ => null
            };
            if (orderByClause == null)
            {
                Console.WriteLine("Invalid choice. Sorting by Name.");
                orderByClause = "Name";
            }
            using SqlConnection conn = new SqlConnection(ConntionString);
            conn.Open();
            string query = $"SELECT * FROM Product_Attributes ORDER BY {orderByClause}";
            using SqlCommand cmd = new SqlCommand(query, conn);
            using SqlDataReader reader = cmd.ExecuteReader();
            Console.WriteLine($"------- Products Sorted by {orderByClause} --------");
            while (reader.Read())
            {
                Console.WriteLine($"ID: {reader["Id"]}, Name: {reader["Name"]}, Price: {reader["Price"]}, Category: {reader["Category"]}, In Stock: {reader["Instock"]}");
            }



        }

    }
}
