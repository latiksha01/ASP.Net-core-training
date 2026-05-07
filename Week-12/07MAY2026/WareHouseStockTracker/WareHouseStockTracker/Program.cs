using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Dictionary<int, int> stock = new Dictionary<int, int>();

        bool firstDisplay = true;

        for (int i = 0; i < n; i++)
        {
            string input = Console.ReadLine();

            string[] parts = input.Split(' ');

            string operation = parts[0];

            // ADD Operation
            if (operation == "ADD")
            {
                int productId = int.Parse(parts[1]);
                int quantity = int.Parse(parts[2]);

                if (stock.ContainsKey(productId))
                {
                    stock[productId] += quantity;
                }
                else
                {
                    stock[productId] = quantity;
                }
            }

            // REMOVE Operation
            else if (operation == "REMOVE")
            {
                int productId = int.Parse(parts[1]);
                int quantity = int.Parse(parts[2]);

                if (stock.ContainsKey(productId) && stock[productId] >= quantity)
                {
                    stock[productId] -= quantity;
                }
                else
                {
                    Console.WriteLine("Invalid REMOVE operation");
                }
            }

            // CHECK Operation
            else if (operation == "CHECK")
            {
                int productId = int.Parse(parts[1]);

                if (stock.ContainsKey(productId))
                {
                    Console.WriteLine($"Product {productId}: {stock[productId]} units");
                }
                else
                {
                    Console.WriteLine($"Product {productId}: 0 units");
                }
            }

            // BULK Operation
            else if (operation == "BULK")
            {
                string bulkData = input.Substring(5);

                string[] products = bulkData.Split(',');

                foreach (string product in products)
                {
                    string[] item = product.Split(':');

                    int productId = int.Parse(item[0]);
                    int quantity = int.Parse(item[1]);

                    if (stock.ContainsKey(productId))
                    {
                        stock[productId] += quantity;
                    }
                    else
                    {
                        stock[productId] = quantity;
                    }
                }
            }

            // DISPLAY Operation
            else if (operation == "DISPLAY")
            {
                if (firstDisplay)
                {
                    Console.WriteLine("--- Current Inventory---");
                    firstDisplay = false;
                }
                else
                {
                    Console.WriteLine("--- Updated Inventory---");
                }

                foreach (var item in stock)
                {
                    if (item.Value > 0)
                    {
                        Console.WriteLine($"{item.Key}: {item.Value} units");
                    }
                }
            }
        }
    }
}