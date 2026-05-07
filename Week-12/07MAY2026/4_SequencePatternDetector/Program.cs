/*
Question - 4
Sequence Pattern Detector
Description
Problem: Sequence Pattern Detector

A security system needs to detect patterns in access logs.

Requirements:

Find longest consecutive sequence of numbers
Find most frequent element
Find first non-repeating element
Find pairs with difference K
Find majority element (appears > n/2 times)

Sample Input:
Access Log: 1,3,2,3,3,4,5,3,6,7,8,9,10,3
K = 2

Sample Output:

--- Access Pattern Analysis ---
Longest Consecutive Sequence: 3,4,5,6,7,8,9,10 (Length: 8)

Most Frequent Element: 3 (appears 5 times)

First Non-Repeating Element: 1

Pairs with Difference 2:
(1, 3), (3, 5), (5, 7), (7, 9), (8, 10)

Majority Element: 3 (appears 5 out of 14 times - 35.7% - No majority)
*/

using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        // Input Access Log
        Console.WriteLine("Enter access log numbers separated by commas:");

        int[] arr = Console.ReadLine().Split(',').Select(int.Parse).ToArray();

        // Input K
        Console.Write("\nEnter value of K: ");
        int k = int.Parse(Console.ReadLine());

        Console.WriteLine("\n--- Access Pattern Analysis ---\n");

        // 1. Longest Consecutive Sequence
        HashSet<int> set = new HashSet<int>(arr);

        int longestLength = 0;
        List<int> longestSequence = new List<int>();

        foreach (int num in set)
        {
            // Check starting point
            if (!set.Contains(num - 1))
            {
                int currentNum = num;
                List<int> currentSequence = new List<int>();

                while (set.Contains(currentNum))
                {
                    currentSequence.Add(currentNum);
                    currentNum++;
                }

                if (currentSequence.Count > longestLength)
                {
                    longestLength = currentSequence.Count;
                    longestSequence = currentSequence;
                }
            }
        }

        Console.WriteLine("Longest Consecutive Sequence: " +
            string.Join(",", longestSequence) +
            " (Length: " + longestLength + ")");

        // 2. Most Frequent Element

        Dictionary<int, int> frequency = new Dictionary<int, int>();

        foreach (int num in arr)
        {
            if (frequency.ContainsKey(num))
            {
                frequency[num]++;
            }
            else
            {
                frequency[num] = 1;
            }
        }

        var mostFrequent = frequency
                            .OrderByDescending(x => x.Value)
                            .First();

        Console.WriteLine("\nMost Frequent Element: " +
            mostFrequent.Key +
            " (appears " + mostFrequent.Value + " times)");

        // 3. First Non-Repeating Element
        
        int firstNonRepeating = -1;

        foreach (int num in arr)
        {
            if (frequency[num] == 1)
            {
                firstNonRepeating = num;
                break;
            }
        }

        Console.WriteLine("\nFirst Non-Repeating Element: " +
            firstNonRepeating);

        // 4. Pairs with Difference K
        
        Console.WriteLine("\nPairs with Difference " + k + ":\n");

        List<string> pairs = new List<string>();

        foreach (int num in set)
        {
            if (set.Contains(num + k))
            {
                pairs.Add("(" + num + ", " + (num + k) + ")");
            }
        }

        Console.WriteLine(string.Join(", ", pairs));

        // 5. Majority Element
        int n = arr.Length;

        var majority = frequency
                        .OrderByDescending(x => x.Value)
                        .First();

        double percentage =
            ((double)majority.Value / n) * 100;

        if (majority.Value > n / 2)
        {
            Console.WriteLine("\nMajority Element: " +
                majority.Key +
                " (appears " + majority.Value +
                " out of " + n + " times)");
        }
        else
        {
            Console.WriteLine("\nMajority Element: " +
                majority.Key +
                " (appears " + majority.Value +
                " out of " + n +
                " times - " +
                percentage.ToString("0.0") +
                "% - No majority)");
        }
    }
}