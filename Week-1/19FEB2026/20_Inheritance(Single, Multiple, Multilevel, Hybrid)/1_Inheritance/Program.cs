//Types of Interitance(5)
//1. Single Inheritance
//2. Multilevel Inheritance
//3. Multiple Inheritance
//4. Hierarchical Inheritance
//5. Hybrid Inheritance

namespace Interitance_Demo
{
    public class Person
    {
        private string name;
        private int age;

        public void getInformation()
        {
            Console.Write("Enter your name : ");
            name = Console.ReadLine();

            Console.Write("Enter your age : ");
            age = Convert.ToInt32(Console.ReadLine());
        }

        public void displayInformation()
        {

            Console.WriteLine($"Welcome to .NET training Mr/Ms {name}, and your age is {age} !!");
        }

    }

    public class Employee:Person
    {
        private string Company_name;
        private int EmployeeID;
        private int Employee_Score;

        public int getEmployeeInformation()
        {
            Console.Write("Enter your Company name : ");
            Company_name = Console.ReadLine();
            Console.Write("Enter your Employee ID : ");
            EmployeeID = Convert.ToInt32(Console.ReadLine());
            Console.Write("Enter your Employee Score : ");
            Employee_Score = Convert.ToInt32(Console.ReadLine());

            return Employee_Score;
        }

        public void displayEmployeeInformation()
        {
            Console.WriteLine($"Welcome to {Company_name}, your Employee ID is {EmployeeID} and your Employee Score is {Employee_Score} !!");
        }

    }

    interface IDepartment
    {
        string Department_name { get; set; }

        void DisplayDepartment();
    }

    public class Employee_Grade_Level:Employee , IDepartment
    {
        public string Department_name { get; set; }
        

        public void Check_eligible()
        {
            Console.WriteLine("Every Person or Employee should have above 150");
            if(this.getEmployeeInformation() > 150)
            {
                Console.WriteLine("Congratulations, you are eligible !!");
            }
            else
            {
                Console.WriteLine("Sorry, you are not eligible !!");
            }
        }

        public void DisplayDepartment()
        {
            Console.WriteLine($"Your Department name is {Department_name}");
        }
    }

    public class TestProgram
    {
        static void Main(string[] args)
        {
            Employee_Grade_Level Cap = new Employee_Grade_Level();
            Cap.getInformation();
            Cap.displayInformation();
            //Cap.getEmployeeInformation();
            Cap.Check_eligible();
            Cap.displayEmployeeInformation();
            //Cap.Check_eligible();
            Cap.Department_name = "IT Department";
            Cap.DisplayDepartment();
            Console.ReadLine();
        }
    }
}
