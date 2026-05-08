using System;
using System.Collections.Generic;
using System.Linq;

class Query
{
    protected List<int> dataSource;
    protected bool isExecuted;

    public Query(List<int> data)
    {
        dataSource = data;
        isExecuted = false;
    }

    public virtual IEnumerable<int> Apply()
    {
        return dataSource;
    }

    public virtual List<int> Execute()
    {
        isExecuted = true;
        return Apply().ToList();
    }

    public virtual string GetQueryType()
    {
        return "Query";
    }
}

class FilterQuery : Query
{
    private string predicate;
    private int filteredCount;

    public FilterQuery(List<int> data, string pred) : base(data)
    {
        predicate = pred;
        filteredCount = 0;
    }

    public override IEnumerable<int> Apply()
    {
        if (predicate == "even")
        {
            return dataSource.Where(x => x % 2 == 0);
        }
        else if (predicate.StartsWith(">"))
        {
            int value = int.Parse(predicate.Substring(1));
            return dataSource.Where(x => x > value);
        }
        else if (predicate.StartsWith("<"))
        {
            int value = int.Parse(predicate.Substring(1));
            return dataSource.Where(x => x < value);
        }

        return dataSource;
    }

    public override List<int> Execute()
    {
        List<int> result = Apply().ToList();

        filteredCount = result.Count;
        isExecuted = true;

        Console.WriteLine($"Filter Executed,Predicate:{predicate},Result Count:{filteredCount}");

        return result;
    }

    public override string GetQueryType()
    {
        return "FilterQuery";
    }
}

class AggregateQuery : Query
{
    private string operation;
    private double result;

    public AggregateQuery(List<int> data, string op) : base(data)
    {
        operation = op;
        result = 0;
    }

    public override IEnumerable<int> Apply()
    {
        return dataSource;
    }

    public override List<int> Execute()
    {
        var data = Apply().ToList();

        if (operation == "Sum")
        {
            result = data.Sum();
        }
        else if (operation == "Average")
        {
            result = data.Average();
        }
        else if (operation == "Max")
        {
            result = data.Max();
        }
        else if (operation == "Min")
        {
            result = data.Min();
        }

        isExecuted = true;

        Console.WriteLine($"Aggregation Executed,Operation:{operation},Result:{result}");

        return data;
    }

    public override string GetQueryType()
    {
        return "AggregateQuery";
    }
}

class Program
{
    static void Main()
    {
        string queryType = Console.ReadLine();

        List<int> data = Console.ReadLine()
                                .Split(' ')
                                .Select(int.Parse)
                                .ToList();

        string condition = Console.ReadLine();

        if (queryType == "Filter")
        {
            FilterQuery fq = new FilterQuery(data, condition);
            fq.Execute();
        }
        else if (queryType == "Aggregate")
        {
            AggregateQuery aq = new AggregateQuery(data, condition);
            aq.Execute();
        }
    }
}