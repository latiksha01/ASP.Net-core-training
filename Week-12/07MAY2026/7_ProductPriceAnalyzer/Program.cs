/*
Question- 7
Product Price Analyzer
Description
Problem: Product Price Analyzer

A retail system needs to analyze product prices using array operations.

Requirements:
Store product prices in array
Implement custom sorting (Bubble Sort, Selection Sort)
Implement binary search for price lookup
Find pairs that sum to target value
Find longest increasing subsequence

Sample Input:
Prices: 299, 499, 199, 399, 599, 159, 699, 259
Target Sum: 698

Sample Output:
--- Product Price Analysis ---
Original Prices: 299, 499, 199, 399, 599, 159, 699, 259
Sorted Prices (Ascending): 159, 199, 259, 299, 399, 499, 599, 699

Binary Search Results:
Price 399 found at index 4
Price 500 not found

 Pairs that sum to 698:
(199, 499)
(299, 399)

Longest Increasing Subsequence:
159, 199, 299, 399, 599, 699 (Length: 6)

Statistics:
Lowest Price: 159
Highest Price: 699
Average Price: 363.88
Median Price: 349.00
*/

using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        // Input prices
        Console.WriteLine("Enter prices separated by commas:");

        int[] prices = Console.ReadLine()
                        .Split(',')
                        .Select(int.Parse)
                        .ToArray();

        // Input target sum
        Console.Write("\nEnter target sum: ");
        int target = int.Parse(Console.ReadLine());

        Console.WriteLine("\n--- Product Price Analysis ---\n");

        // ---------------------------------------------------
        // Original Prices
        // ---------------------------------------------------

        Console.WriteLine("Original Prices: " +
            string.Join(", ", prices));

        // ---------------------------------------------------
        // Bubble Sort (Ascending)
        // ---------------------------------------------------

        int[] sortedPrices = (int[])prices.Clone();

        for (int i = 0; i < sortedPrices.Length - 1; i++)
        {
            for (int j = 0; j < sortedPrices.Length - i - 1; j++)
            {
                if (sortedPrices[j] > sortedPrices[j + 1])
                {
                    int temp = sortedPrices[j];
                    sortedPrices[j] = sortedPrices[j + 1];
                    sortedPrices[j + 1] = temp;
                }
            }
        }

        Console.WriteLine("\nSorted Prices (Ascending): " +
            string.Join(", ", sortedPrices));

        // ---------------------------------------------------
        // Binary Search
        // ---------------------------------------------------

        Console.WriteLine("\nBinary Search Results:\n");

        int[] searchPrices = { 399, 500 };

        foreach (int search in searchPrices)
        {
            int left = 0;
            int right = sortedPrices.Length - 1;

            int foundIndex = -1;

            while (left <= right)
            {
                int mid = (left + right) / 2;

                if (sortedPrices[mid] == search)
                {
                    foundIndex = mid;
                    break;
                }
                else if (sortedPrices[mid] < search)
                {
                    left = mid + 1;
                }
                else
                {
                    right = mid - 1;
                }
            }

            if (foundIndex != -1)
            {
                Console.WriteLine("Price " + search +
                    " found at index " + foundIndex);
            }
            else
            {
                Console.WriteLine("Price " + search +
                    " not found");
            }
        }

        // ---------------------------------------------------
        // Pairs with Target Sum
        // ---------------------------------------------------

        Console.WriteLine("\nPairs that sum to " +
            target + ":\n");

        for (int i = 0; i < sortedPrices.Length; i++)
        {
            for (int j = i + 1; j < sortedPrices.Length; j++)
            {
                if (sortedPrices[i] + sortedPrices[j] == target)
                {
                    Console.WriteLine("(" +
                        sortedPrices[i] + ", " +
                        sortedPrices[j] + ")");
                }
            }
        }

        // ---------------------------------------------------
        // Longest Increasing Subsequence
        // ---------------------------------------------------

        List<int> lis = new List<int>();

        lis.Add(sortedPrices[0]);

        for (int i = 1; i < sortedPrices.Length; i++)
        {
            if (sortedPrices[i] > lis[lis.Count - 1])
            {
                lis.Add(sortedPrices[i]);
            }
        }

        Console.WriteLine("\nLongest Increasing Subsequence:\n");

        Console.WriteLine(
            string.Join(", ", lis) +
            " (Length: " + lis.Count + ")"
        );

        // ---------------------------------------------------
        // Statistics
        // ---------------------------------------------------

        int lowest = sortedPrices.Min();
        int highest = sortedPrices.Max();
        double average = sortedPrices.Average();

        double median;

        int n = sortedPrices.Length;

        if (n % 2 == 0)
        {
            median =
                (sortedPrices[n / 2 - 1] +
                 sortedPrices[n / 2]) / 2.0;
        }
        else
        {
            median = sortedPrices[n / 2];
        }

        Console.WriteLine("\nStatistics:\n");

        Console.WriteLine("Lowest Price: " + lowest);

        Console.WriteLine("Highest Price: " + highest);

        Console.WriteLine("Average Price: " +
            average.ToString("0.00"));

        Console.WriteLine("Median Price: " +
            median.ToString("0.00"));
    }
}