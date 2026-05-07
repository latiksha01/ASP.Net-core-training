/*
Question-5
Student Grade Processor
Description
Problem: Student Grade Processor

A school needs to process student grades across multiple subjects. Use arrays for grade storage and HashSet for unique student tracking.

Requirements:

Store grades for multiple students
Calculate average, highest, lowest for each student
Find students with all grades above certain threshold
Identify grade patterns (unique grades per student)

Sample Input:
4
John 85 90 78 92
Sarah 95 88 91 89
Mike 70 65 80 75
Emma 88 92 94 96

Operations to perform:

Calculate each student's average
Find top performer
Find students with all grades >= 80
Count unique grade values across all students

Sample Output:

--- Student Grade Report ---

John: Average = 86.25, Highest = 92, Lowest = 78
Sarah: Average = 90.75, Highest = 95, Lowest = 88
Mike: Average = 72.50, Highest = 80, Lowest = 65
Emma: Average = 92.50, Highest = 96, Lowest = 88

Top Performer: Emma (Average: 92.50)
Students with all grades >= 80:
Sarah (95,88,91,89)
Emma (88,92,94,96)

Unique Grade Values Across All Students:
65,70,75,78,85,88,89,90,91,92,94,95,96
Total unique grades: 13
*/

using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        // Input number of students
        Console.Write("Enter number of students: ");
        int n = int.Parse(Console.ReadLine());

        // Dictionary to store student name and grades
        Dictionary<string, int[]> students = new Dictionary<string, int[]>();

        // Input student data
        for (int i = 0; i < n; i++)
        {
            Console.WriteLine("\nEnter student name and 4 grades:");

            string[] input = Console.ReadLine().Split(' ');

            string name = input[0];

            int[] grades = input
                            .Skip(1)
                            .Select(int.Parse)
                            .ToArray();

            students[name] = grades;
        }

        Console.WriteLine("\n--- Student Grade Report ---\n");

        // Variables for top performer
        string topStudent = "";
        double highestAverage = 0;

        // HashSet for unique grades
        HashSet<int> uniqueGrades = new HashSet<int>();

        // Process each student
        foreach (var student in students)
        {
            string name = student.Key;
            int[] grades = student.Value;

            // Add grades to HashSet
            foreach (int grade in grades)
            {
                uniqueGrades.Add(grade);
            }

            // Calculate average
            double average = grades.Average();

            // Highest and Lowest
            int highest = grades.Max();
            int lowest = grades.Min();

            // Print report
            Console.WriteLine(name +
                ": Average = " +
                average.ToString("0.00") +
                ", Highest = " + highest +
                ", Lowest = " + lowest);

            // Find top performer
            if (average > highestAverage)
            {
                highestAverage = average;
                topStudent = name;
            }
        }

        // Top performer
        Console.WriteLine("\nTop Performer: " +
            topStudent +
            " (Average: " +
            highestAverage.ToString("0.00") + ")");

        // Students with all grades >= 80
        Console.WriteLine("\nStudents with all grades >= 80:\n");

        foreach (var student in students)
        {
            string name = student.Key;
            int[] grades = student.Value;

            bool allAbove80 = true;

            foreach (int grade in grades)
            {
                if (grade < 80)
                {
                    allAbove80 = false;
                    break;
                }
            }

            if (allAbove80)
            {
                Console.WriteLine(name +
                    " (" +
                    string.Join(",", grades) +
                    ")");
            }
        }

        // Unique grade values
        Console.WriteLine("\nUnique Grade Values Across All Students:\n");

        Console.WriteLine(
            string.Join(",",
            uniqueGrades.OrderBy(x => x))
        );

        Console.WriteLine("\nTotal unique grades: " +
            uniqueGrades.Count);
    }
}