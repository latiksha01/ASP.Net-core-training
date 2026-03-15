/*1.
Create a delegate named NotificationSender
It should accept a string parameter (message).

2.
Create a class Notifiers
Static method SendEmail(string message)
Static method SendSMS(string message)
Static method SendPushNotification(string message)

3.
Create a class NotificationManager
Method NotifyUser(string message, NotificationSender sender)
It should invoke the delegate.

4.
In Main():
Create object of NotificationManager
Send notifications using Email, SMS, and Push methods.
*/

using System;

namespace DelegateNotificationDemo
{
    public delegate void NotificationSender(string message);

    class Notifiers
    {
        public static void SendEmail(string message)
        {
            Console.WriteLine("Email Sent: " + message);
        }

        public static void SendSMS(string message)
        {
            Console.WriteLine("SMS Sent: " + message);
        }

        public static void SendPushNotification(string message)
        {
            Console.WriteLine("Push Notification Sent: " + message);
        }
    }

    class NotificationManager
    {
        public void NotifyUser(string message, NotificationSender sender)
        {
            sender(message);  
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            NotificationManager manager = new NotificationManager();

            manager.NotifyUser("Welcome to our app!", Notifiers.SendEmail);

            manager.NotifyUser("Your OTP is 1234", Notifiers.SendSMS);

            manager.NotifyUser("You have a new message", Notifiers.SendPushNotification);

            Console.ReadLine();
        }
    }
}