/*
Question - 6
Sales Data Aggregator
Description
Problem: Sales Data Aggregator

A sales system needs to aggregate daily sales by product and region.

Requirements:
Group sales by product and region
Calculate total sales, average, min, max
Find best-selling product in each region
Identify underperforming products (< threshold)

Sample Input:
10
P001 North 1500
P001 South 2000
P002 North 3000
P001 East 2500
P002 South 1800
P003 North 1200
P001 West 2200
P002 West 2800
P003 South 900
P002 East 3200

Threshold: 2000

Sample Output:
--- Sales Report by Product and Region ---
Product P001:
  North: $1500
  South: $2000
  East: $2500
  West: $2200
  Total: $8200, Average: $2050.00

Product P002:
  North: $3000
  South: $1800
  West: $2800
  East: $3200
  Total: $10800, Average: $2700.00

Product P003:
  North: $1200
  South: $900
  Total: $2100, Average: $1050.00

Best Selling Product by Region:
North: P002 ($3000)
South: P001 ($2000)
East: P002 ($3200)
West: P002 ($2800)

Underperforming Products (< $2000 average):
P003 ($1050.00)
*/

using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        // Input number of sales records
        Console.Write("Enter number of records: ");
        int n = int.Parse(Console.ReadLine());

        // Product -> Region -> Sales
        Dictionary<string, Dictionary<string, int>> salesData = new Dictionary<string, Dictionary<string, int>>();

        // Input sales data
        for (int i = 0; i < n; i++)
        {
            Console.WriteLine("\nEnter ProductId Region Sales:");

            string[] input = Console.ReadLine().Split(' ');

            string product = input[0];
            string region = input[1];
            int sales = int.Parse(input[2]);

            // If product does not exist
            if (!salesData.ContainsKey(product))
            {
                salesData[product] =
                    new Dictionary<string, int>();
            }

            // Add region sales
            salesData[product][region] = sales;
        }

        // Input threshold
        Console.Write("\nEnter threshold value: ");
        int threshold = int.Parse(Console.ReadLine());

        Console.WriteLine("\n--- Sales Report by Product and Region ---\n");

        // Store best-selling products by region
        Dictionary<string, (string product, int sales)> bestByRegion = new Dictionary<string, (string, int)>();

        // Process each product
        foreach (var productData in salesData)
        {
            string product = productData.Key;

            Dictionary<string, int> regions = productData.Value;

            Console.WriteLine("Product " + product + ":\n");
            int total = 0;

            // Display region sales
            foreach (var regionData in regions)
            {
                string region = regionData.Key;
                int sales = regionData.Value;

                Console.WriteLine("  " + region +
                    ": $" + sales);

                total += sales;

                // Best selling product by region
                if (!bestByRegion.ContainsKey(region) ||
                    sales > bestByRegion[region].sales)
                {
                    bestByRegion[region] =
                        (product, sales);
                }
            }

            // Average sales
            double average =
                (double)total / regions.Count;

            Console.WriteLine("\n  Total: $" + total +
                ", Average: $" +
                average.ToString("0.00"));

            Console.WriteLine();
        }

        // Best selling products
        Console.WriteLine(
            "--- Best Selling Product by Region ---\n");

        foreach (var item in bestByRegion)
        {
            Console.WriteLine(item.Key +
                ": " +
                item.Value.product +
                " ($" +
                item.Value.sales +
                ")");
        }

        // Underperforming products
        Console.WriteLine(
            "\n--- Underperforming Products (< $" +
            threshold + " average) ---\n");

        foreach (var productData in salesData)
        {
            string product = productData.Key;

            Dictionary<string, int> regions =
                productData.Value;

            double average =
                regions.Values.Average();

            if (average < threshold)
            {
                Console.WriteLine(product +
                    " ($" +
                    average.ToString("0.00") +
                    ")");
            }
        }
    }
}