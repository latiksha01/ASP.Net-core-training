using FoodOrderingSystem.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FoodOrderingSystem.Data;

public static class SeedData
{
    public const string AdminRole = "Admin";
    public const string CustomerRole = "Customer";

    public static async Task InitializeAsync(IServiceProvider services)
    {
        var context = services.GetRequiredService<ApplicationDbContext>();
        await context.Database.EnsureCreatedAsync();
        await EnsureApplicationTablesAsync(context);

        var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
        var userManager = services.GetRequiredService<UserManager<IdentityUser>>();

        foreach (var role in new[] { AdminRole, CustomerRole })
        {
            if (!await roleManager.RoleExistsAsync(role))
            {
                await roleManager.CreateAsync(new IdentityRole(role));
            }
        }

        const string adminEmail = "admin@foodhub.local";
        var admin = await userManager.FindByEmailAsync(adminEmail);
        if (admin is null)
        {
            admin = new IdentityUser { UserName = adminEmail, Email = adminEmail, EmailConfirmed = true, PhoneNumber = "9999999999" };
            await userManager.CreateAsync(admin, "Admin@12345");
        }

        if (!await userManager.IsInRoleAsync(admin, AdminRole))
        {
            await userManager.AddToRoleAsync(admin, AdminRole);
        }

        if (await context.Categories.AnyAsync())
        {
            return;
        }

        var categories = new[]
        {
            new Category { Name = "Pizza", Description = "Hand-tossed pizzas with fresh toppings." },
            new Category { Name = "Biryani", Description = "Slow-cooked rice bowls with layered spices." },
            new Category { Name = "Burgers", Description = "Stacked burgers, fries, and quick bites." },
            new Category { Name = "Desserts", Description = "Sweet finishes for every order." }
        };

        context.Categories.AddRange(categories);
        await context.SaveChangesAsync();

        context.FoodItems.AddRange(
            new FoodItem { Name = "Margherita Pizza", CategoryId = categories[0].Id, Price = 249, PreparationMinutes = 18, IsVegetarian = true, ImageUrl = "/images/hero-food.png", Description = "Classic tomato, basil, and mozzarella on a crisp crust." },
            new FoodItem { Name = "Paneer Tikka Pizza", CategoryId = categories[0].Id, Price = 329, PreparationMinutes = 22, IsVegetarian = true, ImageUrl = "/images/hero-food.png", Description = "Smoky paneer, peppers, onions, and tikka sauce." },
            new FoodItem { Name = "Hyderabadi Biryani", CategoryId = categories[1].Id, Price = 299, PreparationMinutes = 25, ImageUrl = "/images/hero-food.png", Description = "Fragrant basmati rice with rich masala and raita." },
            new FoodItem { Name = "Veg Dum Biryani", CategoryId = categories[1].Id, Price = 239, PreparationMinutes = 24, IsVegetarian = true, ImageUrl = "/images/hero-food.png", Description = "Layered vegetables, saffron rice, and aromatic spices." },
            new FoodItem { Name = "Crispy Classic Burger", CategoryId = categories[2].Id, Price = 179, PreparationMinutes = 15, ImageUrl = "/images/hero-food.png", Description = "Crunchy patty, lettuce, cheese, and house sauce." },
            new FoodItem { Name = "Chocolate Lava Cake", CategoryId = categories[3].Id, Price = 129, PreparationMinutes = 10, IsVegetarian = true, ImageUrl = "/images/hero-food.png", Description = "Warm chocolate cake with a molten center." }
        );
        await context.SaveChangesAsync();
    }

    private static async Task EnsureApplicationTablesAsync(ApplicationDbContext context)
    {
        await context.Database.ExecuteSqlRawAsync("""
            CREATE TABLE IF NOT EXISTS "Categories" (
                "Id" INTEGER NOT NULL CONSTRAINT "PK_Categories" PRIMARY KEY AUTOINCREMENT,
                "Name" TEXT NOT NULL,
                "Description" TEXT NULL
            );
            """);

        await context.Database.ExecuteSqlRawAsync("""
            CREATE TABLE IF NOT EXISTS "FoodItems" (
                "Id" INTEGER NOT NULL CONSTRAINT "PK_FoodItems" PRIMARY KEY AUTOINCREMENT,
                "Name" TEXT NOT NULL,
                "Description" TEXT NOT NULL,
                "Price" TEXT NOT NULL,
                "ImageUrl" TEXT NULL,
                "IsAvailable" INTEGER NOT NULL,
                "IsVegetarian" INTEGER NOT NULL,
                "PreparationMinutes" INTEGER NOT NULL,
                "CategoryId" INTEGER NOT NULL,
                CONSTRAINT "FK_FoodItems_Categories_CategoryId" FOREIGN KEY ("CategoryId") REFERENCES "Categories" ("Id") ON DELETE CASCADE
            );
            """);

        await context.Database.ExecuteSqlRawAsync("""
            CREATE TABLE IF NOT EXISTS "Orders" (
                "Id" INTEGER NOT NULL CONSTRAINT "PK_Orders" PRIMARY KEY AUTOINCREMENT,
                "UserId" TEXT NOT NULL,
                "CustomerName" TEXT NOT NULL,
                "Email" TEXT NOT NULL,
                "PhoneNumber" TEXT NOT NULL,
                "DeliveryAddress" TEXT NOT NULL,
                "Notes" TEXT NULL,
                "OrderedAt" TEXT NOT NULL,
                "Status" INTEGER NOT NULL,
                "Subtotal" TEXT NOT NULL,
                "DeliveryFee" TEXT NOT NULL,
                "Tax" TEXT NOT NULL,
                "Total" TEXT NOT NULL
            );
            """);

        await context.Database.ExecuteSqlRawAsync("""
            CREATE TABLE IF NOT EXISTS "OrderItems" (
                "Id" INTEGER NOT NULL CONSTRAINT "PK_OrderItems" PRIMARY KEY AUTOINCREMENT,
                "OrderId" INTEGER NOT NULL,
                "FoodItemId" INTEGER NOT NULL,
                "FoodName" TEXT NOT NULL,
                "UnitPrice" TEXT NOT NULL,
                "Quantity" INTEGER NOT NULL,
                "LineTotal" TEXT NOT NULL,
                CONSTRAINT "FK_OrderItems_FoodItems_FoodItemId" FOREIGN KEY ("FoodItemId") REFERENCES "FoodItems" ("Id") ON DELETE CASCADE,
                CONSTRAINT "FK_OrderItems_Orders_OrderId" FOREIGN KEY ("OrderId") REFERENCES "Orders" ("Id") ON DELETE CASCADE
            );
            """);

        await context.Database.ExecuteSqlRawAsync("""
            CREATE INDEX IF NOT EXISTS "IX_FoodItems_CategoryId" ON "FoodItems" ("CategoryId");
            """);
        await context.Database.ExecuteSqlRawAsync("""
            CREATE INDEX IF NOT EXISTS "IX_OrderItems_FoodItemId" ON "OrderItems" ("FoodItemId");
            """);
        await context.Database.ExecuteSqlRawAsync("""
            CREATE INDEX IF NOT EXISTS "IX_OrderItems_OrderId" ON "OrderItems" ("OrderId");
            """);
    }
}
