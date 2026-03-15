using System;

class Program
{
    static void Main(string[] args)
    {
        int marks = 85;
        Console.WriteLine("Marks : " + marks);
        object objmarks = marks; //boxing
        Console.WriteLine("Object Marks : " + objmarks);
        int unboxmarks = (int)objmarks; //unboxing
        Console.WriteLine("Unboxed Marks : " + unboxmarks);
        unboxmarks = unboxmarks + 5;
        Console.WriteLine("Modified Marks : " + unboxmarks);

    }
}