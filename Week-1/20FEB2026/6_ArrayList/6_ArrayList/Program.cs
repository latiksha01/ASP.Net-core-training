using System;
using System.Collections;

namespace ArrayListDemo
{
    class UsingArrayList
    {
        static void Main(string[] args)
        {
            ArrayList listdata = new ArrayList();
            listdata.Add(100);
            listdata.Add(101);
            listdata.Add(102);
            listdata.Add(103);
            listdata.Add(104);
            listdata.Add("Done");

            foreach (object item in listdata)
            {
                Console.Write(item + " ");
            }

            Console.WriteLine();

            ArrayList listdata2 = new ArrayList();
            listdata2.Add(200);
            listdata2.Add(201);
            listdata2.Add(202);
            listdata2.Add(203);
            listdata2.Add(204);
            listdata2.Add("Done");

            foreach (object item in listdata2)
            {
                Console.Write(item + " ");
            }

            Console.ReadLine();
        }
    }
}