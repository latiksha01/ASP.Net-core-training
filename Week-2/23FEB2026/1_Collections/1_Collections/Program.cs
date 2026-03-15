/*Collections - 5 types (generic, non-generic)
 * Non-generic : Dynamic array, stack, queue, hash table
 * generic : system.Collections.Generic Namespace ; list, linkedlist, stack, queue, dictionary
 *           allow to write a class and method that can work with any type of data
 */


//Working with Generic

using System;

namespace Generic_Demo
{
    class Using_Generics<T>
    {
        T obj;
        public Using_Generics (T Obj1)
        {
            this.obj = Obj1; 
        }

        public T Get()
        {
            return this.obj;
        }
        
        public void Show()
        {
            Console.WriteLine("Type of T is: " + typeof(T));
        }
    }

    class Test_Generics
    {
        public static void Main(string[] args)
        {
            Using_Generics<int> objdata;
            objdata = new Using_Generics<int>(500);
            objdata.Show();

            Using_Generics<string> objdata1;
            objdata1 = new Using_Generics<string>("Latiksha");
            objdata1.Show();

            Console.ReadLine();

        }
    }   
}