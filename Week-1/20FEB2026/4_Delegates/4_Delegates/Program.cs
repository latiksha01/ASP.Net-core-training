/*Delegates - grouping the functions together 
  Two types of delegates: Single-cast(one action) and Multi-cast(more than one actions)
  */

using System;

namespace Delegate_Demo
{
    public delegate void Arithamatic_Operation(int x, int y);
    class using_delegate
    {
        static void Add(int x, int y)
        {
            Console.WriteLine($"Addition of {x} and {y} is: {x + y}");
        }

        static void Subtract(int x, int y)
        {
            Console.WriteLine($"Sutract of {x} and {y} is: {x - y}");
        }
        static void Multiplication(int x, int y)
        {
            Console.WriteLine($"Multiply of {x} and {y} is: {x * y}");
        }
        static void Divison(int x, int y)
        {
            Console.WriteLine($"Divison of {x} and {y} is: {x / y}");
        }


        static void Main(string[] args)
        {
            //Single -cast delegate
            //Arithamatic_Operation obj = new Arithamatic_Operation(Add);
            //obj(45, 30);

            //Arithamatic_Operation obj = new Arithamatic_Operation(Subtract);
            //obj(45, 30);

            //Multi-cast delegate
            Arithamatic_Operation obj = new Arithamatic_Operation(Add);
            obj += new Arithamatic_Operation(Subtract);
            obj += new Arithamatic_Operation(Multiplication);
            obj += new Arithamatic_Operation(Divison);

            obj(45, 30);

            Console.ReadLine();

        }


    }
}