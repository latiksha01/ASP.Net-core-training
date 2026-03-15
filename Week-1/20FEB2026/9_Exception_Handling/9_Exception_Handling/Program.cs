// class ExcDemo1
// {
//     public static void Main()
//     {
//         int[] nums = new int[4];
//         try
//         {
//             Console.WriteLine("Before exception is generated");
//             for (int i = 0; i < 10; i++)
//             {
//                 nums[i] = i;
//                 Console.WriteLine($"nums[{i}] = {nums[i]}");

//             }
//             Console.WriteLine("this won't be displayed");
//         }
//         catch (IndexOutOfRangeException ex)
//         {
//             Console.WriteLine("Exception caught");
//             Console.WriteLine(ex.Message);
//         }
//         Console.WriteLine("After exception is generated");
//     }
// }

// class Exedemo
// {
//     public static void Main()
//     {
//         int[] num = {4,8,14,32,64,128,256,512};
//         int[] deno = {2,0,4,4,0,8};

//         for(int i = 0; i < num.Length; i++)
//         {
//             try
//             {
//                 Console.WriteLine(num[i] + "/" + deno[i] +" is " + num[i] / deno[i]);
//             }
//             catch(DivideByZeroException ex)
//             {
//                 Console.WriteLine("Exception caught");
//                 Console.WriteLine(ex.Message);
//             }
//             catch(IndexOutOfRangeException ex)
//             {
//                 Console.WriteLine("Exception caught");
//                 Console.WriteLine(ex.Message);
//             }
//         }
//     }
// }

// class NestTrys
// {
//     public static void Main()
//     {
//         int[] num = {4,8,14,32,64,128,256,512};
//         int[] deno = {2,0,4,4,0,8};

//         for(int i = 0; i < num.Length; i++)
//         {
//             try
//             {
//                 Console.WriteLine(num[i] + "/" + deno[i] +" is " + num[i] / deno[i]);
//             }
//             catch(DivideByZeroException ex)
//             {
//                 Console.WriteLine("Exception caught");
//                 Console.WriteLine(ex.Message);
//             }
//             catch(IndexOutOfRangeException ex)
//             {
//                 Console.WriteLine("Exception caught");
//                 Console.WriteLine(ex.Message);
//             }
//         }
//     }
// }

using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Linq.Expressions;

namespace CustomExceptionExampleCode
{
    class MyException : Exception
    {
        public MyException(string Messege) : base(Messege){}
        public MyException(){}
        public MyException(string Messege, Exception inner) : base(Messege, inner){}
    }

    class Program
    {
        static void Main(string[] args)
        {
            int a = 50;
            int b = 10;
            int k = a/b;
            try
            {
                if(k < 10)
                {
                    throw new MyException("value of k is less than 10");
                }
            }
            catch (MyException e)
            {
                Console.WriteLine("Caught My Exception");
                Console.WriteLine(e.Message);
            }
            Console.Read();

        }
    }
}