/*
Question
2
Customer Preference Analysis
Description
Problem: Customer Preference Analysis

An e-commerce platform needs to analyze customer preferences across different product categories.

Requirements:

Track customers who bought from Electronics category
Track customers who bought from Clothing category
Track customers who bought from Books category
Perform set operations: Union, Intersection, Difference
Identify cross-category buyers
Sample Input:

text

Electronics: C001,C002,C003,C005,C008
Clothing: C002,C004,C005,C006,C009
Books: C003,C005,C007,C008,C010

 

Operations:
1. Customers who bought from ANY category
2. Customers who bought from ALL categories
3. Customers who bought ONLY Electronics
4. Customers who bought Electronics AND Books but NOT Clothing

Sample Output:

text

--- Customer Preference Analysis ---

1. Customers in ANY category (Union):
C001, C002, C003, C004, C005, C006, C007, C008, C009, C010
Total: 10 customers

2. Customers in ALL categories (Intersection):
C005
Total: 1 customer
 
3. Customers ONLY in Electronics (Difference):
C001, C008
Total: 2 customers

4. Customers in Electronics AND Books but NOT Clothing:
C003, C008
Total: 2 customers
*/

using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        
        Console.Write("Enter Electronics customers: ");
        HashSet<string> electronics = new HashSet<string>(
            Console.ReadLine().Split(',')
        );

        Console.Write("Enter Clothing customers: ");
        HashSet<string> clothing = new HashSet<string>(
            Console.ReadLine().Split(',')
        );

        Console.Write("Enter Books customers: ");
        HashSet<string> books = new HashSet<string>(
            Console.ReadLine().Split(',')
        );

        Console.WriteLine("\n--- Customer Preference Analysis ---\n");

        HashSet<string> anyCategory = new HashSet<string>(electronics);
        anyCategory.UnionWith(clothing);
        anyCategory.UnionWith(books);

        Console.WriteLine("1. Customers in ANY category (Union):");
        Console.WriteLine(string.Join(", ", anyCategory.OrderBy(x => x)));
        Console.WriteLine("Total: " + anyCategory.Count + " customers\n");

        HashSet<string> allCategories = new HashSet<string>(electronics);
        allCategories.IntersectWith(clothing);
        allCategories.IntersectWith(books);

        Console.WriteLine("2. Customers in ALL categories (Intersection):");
        Console.WriteLine(string.Join(", ", allCategories.OrderBy(x => x)));
        Console.WriteLine("Total: " + allCategories.Count + " customer\n");

        HashSet<string> onlyElectronics = new HashSet<string>(electronics);
        onlyElectronics.ExceptWith(clothing);
        onlyElectronics.ExceptWith(books);

        Console.WriteLine("3. Customers ONLY in Electronics:");
        Console.WriteLine(string.Join(", ", onlyElectronics.OrderBy(x => x)));
        Console.WriteLine("Total: " + onlyElectronics.Count + " customers\n");

        HashSet<string> elecAndBooks = new HashSet<string>(electronics);
        elecAndBooks.IntersectWith(books);
        elecAndBooks.ExceptWith(clothing);

        Console.WriteLine("4. Customers in Electronics AND Books but NOT Clothing:");
        Console.WriteLine(string.Join(", ", elecAndBooks.OrderBy(x => x)));
        Console.WriteLine("Total: " + elecAndBooks.Count + " customers");
    }
}