using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Dictionary<int, int> stock = new Dictionary<int, int>();

        for (int i = 0; i < n; i++)
        {
            string input = Console.ReadLine();
            string[] parts = input.Split(' ');

            string operation = parts[0];

            if (operation == "ADD")
            {
                int productId = int.Parse(parts[1]);
                int quantity = int.Parse(parts[2]);

                stock[productId] = stock.ContainsKey(productId)
                    ? stock[productId] + quantity
                    : quantity;
            }

            else if (operation == "REMOVE")
            {
                int productId = int.Parse(parts[1]);
                int quantity = int.Parse(parts[2]);

                if (stock.ContainsKey(productId) && stock[productId] >= quantity)
                {
                    stock[productId] -= quantity;

                    if (stock[productId] == 0)
                    {
                        stock.Remove(productId);
                    }
                }
                else
                {
                    Console.WriteLine("Invalid REMOVE operation");
                }
            }

            else if (operation == "CHECK")
            {
                int productId = int.Parse(parts[1]);

                Console.WriteLine(
                    $"Product {productId}: {(stock.ContainsKey(productId) ? stock[productId] : 0)} units"
                );
            }

            else if (operation == "BULK")
            {
                string bulkData = input.Substring(5);

                string[] products = bulkData.Split(',');

                foreach (string product in products)
                {
                    string[] item = product.Split(':');

                    if (item.Length == 2)
                    {
                        int productId = int.Parse(item[0]);
                        int quantity = int.Parse(item[1]);

                        stock[productId] = stock.ContainsKey(productId)
                            ? stock[productId] + quantity
                            : quantity;
                    }
                }
            }

            else if (operation == "DISPLAY")
            {
                Console.WriteLine("--- Inventory ---");

                foreach (var item in stock.OrderBy(x => x.Key))
                {
                    Console.WriteLine($"{item.Key}: {item.Value} units");
                }
            }
        }
    }
}