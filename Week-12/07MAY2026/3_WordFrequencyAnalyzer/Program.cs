/*
Question
3
Word Frequency Analyzer
Description
Word Frequency Analyzer
A content management system needs to analyze article text and count word frequencies.

Requirements:

Read a paragraph of text
Count frequency of each word (case-insensitive)
Ignore punctuation
Display top N most frequent words
Find words that appear exactly once
Calculate average word frequency

Sample Input:
text
The quick brown fox jumps over the lazy dog. The fox is quick and the dog is lazy. Quick brown fox jumps over the lazy dog again.
N = 3

Sample Output:

text

--- Word Frequency Analysis ---
Total words: 27
Unique words: 14

Top 3 Frequent Words:
the: 5 times
quick: 3 times
fox: 3 times

Words appearing exactly once:
and, again, brown, is, jumps, lazy, over
Average frequency: 1.93 times per unique word
*/

using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
       
        Console.WriteLine("Enter paragraph:");
        string text = Console.ReadLine().ToLower();

        string cleanText = "";

        foreach (char ch in text)
        {
            if (!char.IsPunctuation(ch))
            {
                cleanText += ch;
            }
        }

        string[] words = cleanText.Split(' ', StringSplitOptions.RemoveEmptyEntries);

        Dictionary<string, int> frequency = new Dictionary<string, int>();

        foreach (string word in words)
        {
            if (frequency.ContainsKey(word))
            {
                frequency[word]++;
            }
            else
            {
                frequency[word] = 1;
            }
        }

        Console.Write("\nEnter value of N: ");
        int n = int.Parse(Console.ReadLine());

        Console.WriteLine("\n--- Word Frequency Analysis ---\n");

        int totalWords = words.Length;
        Console.WriteLine("Total words: " + totalWords);

        int uniqueWords = frequency.Count;
        Console.WriteLine("\nUnique words: " + uniqueWords);

        Console.WriteLine("\nTop " + n + " Frequent Words:\n");

        var topWords = frequency
                        .OrderByDescending(x => x.Value)
                        .ThenBy(x => x.Key)
                        .Take(n);

        foreach (var item in topWords)
        {
            Console.WriteLine(item.Key + ": " +
                              item.Value + " times");
        }

        Console.WriteLine("\nWords appearing exactly once:\n");

        var singleWords = frequency
                            .Where(x => x.Value == 1)
                            .Select(x => x.Key);

        Console.WriteLine(string.Join(", ", singleWords));

        double average = (double)totalWords / uniqueWords;

        Console.WriteLine("\nAverage frequency: " +
                          average.ToString("0.00") +
                          " times per unique word");
    }
}