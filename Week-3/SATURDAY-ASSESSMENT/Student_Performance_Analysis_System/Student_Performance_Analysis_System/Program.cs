using System;
using System.Collections.Generic;
using System.Linq;

public class Student
{
    public int StudentId { get; set; }
    public string Name { get; set; }
    public int Marks { get; set; }
}

public class AnalysisEngine
{
    private List<Student> students;

    public AnalysisEngine(List<Student> students)
    {
        this.students = students;
    }

    public void ShowPassedStudents()
    {
        Console.WriteLine("Passed Students:");

        students
        .Where(s => s.Marks >= 50)
        .Select(s => s.Name)
        .ToList()
        .ForEach(Console.WriteLine);
    }

    public void ShowTopper()
    {
        Console.WriteLine();
        Console.WriteLine("Topper:");

        students
        .OrderByDescending(s => s.Marks)
        .Take(1)
        .Select(s => s.Name + " - " + s.Marks)
        .ToList()
        .ForEach(Console.WriteLine);
    }

    public void ShowSortedStudents()
    {
        Console.WriteLine();
        Console.WriteLine("Students Sorted by Marks:");

        students
        .OrderByDescending(s => s.Marks)
        .Select(s => s.Name + " - " + s.Marks)
        .ToList()
        .ForEach(Console.WriteLine);
    }
}

public class Solution
{
    public static void Main()
    {
        List<Student> students = new List<Student>()
        {
            new Student{StudentId=101, Name="Ananya", Marks=78},
            new Student{StudentId=102, Name="Ravi", Marks=45},
            new Student{StudentId=103, Name="Neha", Marks=88},
            new Student{StudentId=104, Name="Arjun", Marks=67}
        };

        AnalysisEngine engine = new AnalysisEngine(students);

        engine.ShowPassedStudents();
        engine.ShowTopper();
        engine.ShowSortedStudents();
        Console.WriteLine();
    }
}