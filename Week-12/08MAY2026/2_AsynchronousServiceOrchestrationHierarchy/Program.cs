using System;
using System.Threading.Tasks;

class AsyncService
{
    protected int requestCount;
    protected long lastResponseTime;

    public AsyncService()
    {
        requestCount = 0;
        lastResponseTime = 0;
    }

    public virtual async Task<string> FetchDataAsync(string endpoint)
    {
        await Task.Delay(2000);
        return "Base Fetch";
    }

    public virtual async Task<string> GetStatusAsync()
    {
        await Task.Delay(100);
        return "Base Status";
    }
}

class WeatherService : AsyncService
{
    private string city;
    private int temperature;

    public WeatherService(string cityName)
    {
        city = cityName;
        temperature = 22;
    }

    public override async Task<string> FetchDataAsync(string endpoint)
    {
        requestCount++;

        Console.WriteLine($"Weather Fetch Started,{city}");

        await Task.Delay(2000);

        Console.WriteLine($"Weather Data Received,{city},{temperature}°C");

        return "Success";
    }

    public override async Task<string> GetStatusAsync()
    {
        await Task.Delay(100);

        string status = $"Weather Service Status,Requests:{requestCount}";

        Console.WriteLine(status);

        return status;
    }
}

class StockService : AsyncService
{
    private string symbol;
    private double currentPrice;

    public StockService(string stockSymbol)
    {
        symbol = stockSymbol;
        currentPrice = 245.75;
    }

    public override async Task<string> FetchDataAsync(string endpoint)
    {
        requestCount++;

        Console.WriteLine($"Stock Fetch Started,{symbol}");

        await Task.Delay(2000);

        Console.WriteLine($"Stock Price Update,{symbol},${currentPrice}");

        return "Success";
    }

    public override async Task<string> GetStatusAsync()
    {
        await Task.Delay(100);

        string status = $"Stock Service Status,Requests:{requestCount}";

        Console.WriteLine(status);

        return status;
    }
}

class Program
{
    static async Task Main()
    {
        string serviceType = Console.ReadLine();
        string identifier = Console.ReadLine();
        string command = Console.ReadLine();

        if (serviceType == "Weather")
        {
            WeatherService ws = new WeatherService(identifier);

            if (command == "FetchDataAsync")
            {
                await ws.FetchDataAsync(identifier);
            }
            else if (command == "GetStatusAsync")
            {
                await ws.GetStatusAsync();
            }
        }
        else if (serviceType == "Stock")
        {
            StockService ss = new StockService(identifier);

            if (command == "FetchDataAsync")
            {
                await ss.FetchDataAsync(identifier);
            }
            else if (command == "GetStatusAsync")
            {
                await ss.GetStatusAsync();
            }
        }
    }
}