/*
 * Requirements: Create an abstract | class OrderProcessor
   Properties: OrderId , Amount
   Abstract methods:ProcessPayment() | GenerateInvoice() | SendNotification()
   Concrete method:DisplayOrderDetails()
   Create a derived class OnlineOrder
   Override all abstract methods.
   Provide implementation for : Online payment processing | Digital invoice generation | Email notification
   In Main():Create object using parent reference; | OrderProcessor order = new OnlineOrder(); | Assign order details | Call all methods
 */

using System;

namespace Order_processing
{
    abstract class OrderProcessor
    {
        public int OrderId { get; set; }
        public decimal Amount { get; set; }
        public abstract void ProcessPayment();
        public abstract void GenerateInvoice();
        public abstract void SendNotification();
        public void DisplayOrderDetails()
        {
            Console.WriteLine("-------- Order Details --------");
            Console.WriteLine($"Order ID: {OrderId}, Amount: {Amount}");
        }
    }

    class OnlineOrder : OrderProcessor
    {
        public override void ProcessPayment()
        {
            Console.WriteLine("Processing online payment...");
        }
        public override void GenerateInvoice()
        {
            Console.WriteLine("Generating digital invoice...");
        }
        public override void SendNotification()
        {
            Console.WriteLine("Sending email notification...");
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            

            OrderProcessor order = new OnlineOrder();

            order.OrderId = 12345;
            order.Amount = 250.75m;
            order.DisplayOrderDetails();
            order.ProcessPayment();
            order.GenerateInvoice();
            order.SendNotification();
            Console.ReadLine();
        }

        
    }


}
