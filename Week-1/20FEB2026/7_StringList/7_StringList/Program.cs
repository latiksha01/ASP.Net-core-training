using System;
using System.Collections;

class String_list
{
    static void Main(string[] args)
    {
        string order = "    Order#1001 | Laptop | Dell | 75000      ";
        Console.WriteLine(order);

        string trimOrder = order.Trim();
        Console.WriteLine(trimOrder);

        Console.WriteLine(order.Length);
        Console.WriteLine(trimOrder.Length);

        string[] parts = trimOrder.Split('|');
        Console.WriteLine("------After Split------");
        foreach (var item in parts)
        {
            Console.Write(item.Trim());
        }

        Console.ReadLine();


    }
}