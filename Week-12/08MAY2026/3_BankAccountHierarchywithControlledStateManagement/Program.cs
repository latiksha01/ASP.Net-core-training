using System;

class BankAccount
{
    public string accountNumber { get; }

    private double balance;

    public BankAccount(string accNo, double initialBalance)
    {
        accountNumber = accNo;
        balance = initialBalance;
    }

    public virtual bool Deposit(double amount)
    {
        if (amount > 0)
        {
            balance += amount;
            return true;
        }

        return false;
    }

    public virtual bool Withdraw(double amount)
    {
        if (amount <= balance)
        {
            balance -= amount;
            return true;
        }

        return false;
    }

    public double GetBalance()
    {
        return balance;
    }

    protected void SetBalance(double newBalance)
    {
        balance = newBalance;
    }
}

class SavingsAccount : BankAccount
{
    private double interestRate;
    private double minimumBalance;

    public SavingsAccount(string accNo, double initialBalance)
        : base(accNo, initialBalance)
    {
        minimumBalance = 1000;
    }

    public override bool Withdraw(double amount)
    {
        if (GetBalance() - amount < minimumBalance)
        {
            Console.WriteLine("Withdrawal Failed: Minimum balance requirement 1000");
            return false;
        }

        SetBalance(GetBalance() - amount);
        Console.WriteLine("Withdrawal Successful");
        return true;
    }

    public void ApplyInterest(double rate)
    {
        interestRate = rate;

        double newBalance = GetBalance() + (GetBalance() * interestRate / 100);

        SetBalance(newBalance);

        Console.WriteLine($"Interest Applied,Rate:{interestRate},New Balance:{GetBalance()}");
    }
}

class CurrentAccount : BankAccount
{
    private double overdraftLimit;
    private double transactionFee;

    public CurrentAccount(string accNo, double initialBalance)
        : base(accNo, initialBalance)
    {
        overdraftLimit = 2000;
        transactionFee = 100;
    }

    public override bool Withdraw(double amount)
    {
        if (GetBalance() + overdraftLimit >= amount)
        {
            SetBalance(GetBalance() - amount);
            Console.WriteLine("Withdrawal Successful");
            return true;
        }

        Console.WriteLine("Withdrawal Failed");
        return false;
    }

    public void DeductTransactionFee()
    {
        SetBalance(GetBalance() - transactionFee);

        Console.WriteLine($"Fee Deducted,Amount:{transactionFee},Remaining:{GetBalance()}");
    }
}

class Program
{
    static void Main()
    {
        string accountType = Console.ReadLine();

        string accountNumber = Console.ReadLine();

        double initialDeposit = double.Parse(Console.ReadLine());

        string operation1 = Console.ReadLine();

        string operation2 = Console.ReadLine();

        string operation3 = Console.ReadLine();

        if (accountType == "Savings")
        {
            SavingsAccount sa = new SavingsAccount(accountNumber, initialDeposit);

            ProcessSavings(sa, operation1);
            ProcessSavings(sa, operation2);
            ProcessSavings(sa, operation3);
        }
        else if (accountType == "Current")
        {
            CurrentAccount ca = new CurrentAccount(accountNumber, initialDeposit);

            ProcessCurrent(ca, operation1);
            ProcessCurrent(ca, operation2);
            ProcessCurrent(ca, operation3);
        }
    }

    static void ProcessSavings(SavingsAccount sa, string operation)
    {
        string[] parts = operation.Split(' ');

        if (parts[0] == "Withdraw")
        {
            double amount = double.Parse(parts[1]);
            sa.Withdraw(amount);
        }
        else if (parts[0] == "GetBalance")
        {
            Console.WriteLine($"Current Balance: {sa.GetBalance()}");
        }
        else if (parts[0] == "ApplyInterest")
        {
            double rate = double.Parse(parts[1]);
            sa.ApplyInterest(rate);
        }
    }

    static void ProcessCurrent(CurrentAccount ca, string operation)
    {
        string[] parts = operation.Split(' ');

        if (parts[0] == "Withdraw")
        {
            double amount = double.Parse(parts[1]);
            ca.Withdraw(amount);
        }
        else if (parts[0] == "GetBalance")
        {
            Console.WriteLine($"Current Balance: {ca.GetBalance()}");
        }
        else if (parts[0] == "DeductTransactionFee")
        {
            ca.DeductTransactionFee();
        }
    }
}