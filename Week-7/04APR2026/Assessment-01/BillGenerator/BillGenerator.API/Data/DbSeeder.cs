using BillGenerator.API.Models;
using Microsoft.EntityFrameworkCore;

namespace BillGenerator.API.Data
{
    public static class DbSeeder
    {
        public static void Seed(AppDbContext db, IServiceProvider? serviceProvider = null)
        {
            SeedCatalogItems(db);
            SeedSampleBills(db);
        }

        private static void SeedCatalogItems(AppDbContext db)
        {
            if (db.CatalogItems.Any()) return;

            var items = new List<CatalogItem>
            {
                // Entrance
                new() { Name = "Adult Ticket",  CatalogType = "entrance",     Price = 500m,  Unit = "per person", IsActive = true },
                new() { Name = "Child Ticket",  CatalogType = "entrance",     Price = 250m,  Unit = "per person", IsActive = true },
                new() { Name = "Senior Ticket", CatalogType = "entrance",     Price = 300m,  Unit = "per person", IsActive = true },
                new() { Name = "VIP Pass",      CatalogType = "entrance",     Price = 1500m, Unit = "per person", IsActive = true },

                // Donation
                new() { Name = "Small Donation",  CatalogType = "donation", Price = 100m,  Unit = "fixed",  IsActive = true },
                new() { Name = "Medium Donation", CatalogType = "donation", Price = 500m,  Unit = "fixed",  IsActive = true },
                new() { Name = "Large Donation",  CatalogType = "donation", Price = 2000m, Unit = "fixed",  IsActive = true },
                new() { Name = "Custom Donation", CatalogType = "donation", Price = 0m,    Unit = "custom", IsActive = true },

                // Merchandise
                new() { Name = "T-Shirt",  CatalogType = "merchandise", Price = 399m, Unit = "piece",  IsActive = true },
                new() { Name = "Souvenir", CatalogType = "merchandise", Price = 199m, Unit = "piece", IsActive = true },

                // Food
                new() { Name = "Food Combo", CatalogType = "food", Price = 150m, Unit = "plate",  IsActive = true },
                new() { Name = "Beverage",   CatalogType = "food", Price = 60m,  Unit = "bottle", IsActive = true },
            };

            db.CatalogItems.AddRange(items);
            db.SaveChanges();
        }

        private static void SeedSampleBills(AppDbContext db)
        {
            if (db.Bills.Any()) return;

            var today = DateTime.Today;
            var yesterday = today.AddDays(-1);

            // Bill 1: Family (today)
            var bill1 = new Bill 
            { 
                InvoiceNumber = "INV-SAMPLE1", 
                CustomerName = "Family Outing", 
                DiscountPercent = 5, 
                TaxPercent = 18, 
                Notes = "Weekend visit",
                CreatedAt = today.AddHours(10),
                Status = "final",
                Items = new List<BillItem>
                {
                    new() { Name = "Adult Ticket", CatalogType = "entrance", Quantity = 2, UnitPrice = 500 },
                    new() { Name = "Child Ticket", CatalogType = "entrance", Quantity = 1, UnitPrice = 250 },
                    new() { Name = "Food Combo", CatalogType = "food", Quantity = 1, UnitPrice = 150 }
                }
            };

            // Bill 2: Group VIP (today)
            var bill2 = new Bill 
            { 
                InvoiceNumber = "INV-SAMPLE2", 
                CustomerName = "Corporate Group", 
                TaxPercent = 18, 
                Notes = "VIP event",
                CreatedAt = today.AddHours(14),
                Status = "final",
                Items = new List<BillItem>
                {
                    new() { Name = "Adult Ticket", CatalogType = "entrance", Quantity = 4, UnitPrice = 500 },
                    new() { Name = "VIP Pass", CatalogType = "entrance", Quantity = 1, UnitPrice = 1500 }
                }
            };

            // Bill 3: Seniors (yesterday)
            var bill3 = new Bill 
            { 
                InvoiceNumber = "INV-SAMPLE3", 
                CustomerName = "Senior Group", 
                DiscountFixed = 10, 
                TaxPercent = 18, 
                Notes = "Group discount",
                CreatedAt = yesterday.AddHours(11),
                Status = "final",
                Items = new List<BillItem>
                {
                    new() { Name = "Senior Ticket", CatalogType = "entrance", Quantity = 3, UnitPrice = 300 },
                    new() { Name = "Medium Donation", CatalogType = "donation", Quantity = 1, UnitPrice = 500 }
                }
            };

            // Bill 4: Merch (yesterday)
            var bill4 = new Bill 
            { 
                InvoiceNumber = "INV-SAMPLE4", 
                CustomerName = "Gift Shopper", 
                DiscountPercent = 5, 
                TaxPercent = 18, 
                Notes = "Souvenirs",
                CreatedAt = yesterday.AddHours(15),
                Status = "final",
                Items = new List<BillItem>
                {
                    new() { Name = "T-Shirt", CatalogType = "merchandise", Quantity = 2, UnitPrice = 399 },
                    new() { Name = "Souvenir", CatalogType = "merchandise", Quantity = 1, UnitPrice = 199 }
                }
            };

            // Bill 5: Food (today)
            var bill5 = new Bill 
            { 
                InvoiceNumber = "INV-SAMPLE5", 
                CustomerName = "Lunch Crowd", 
                TaxPercent = 18, 
                Notes = "Bulk food",
                CreatedAt = today.AddHours(12),
                Status = "final",
                Items = new List<BillItem>
                {
                    new() { Name = "Food Combo", CatalogType = "food", Quantity = 5, UnitPrice = 150 },
                    new() { Name = "Beverage", CatalogType = "food", Quantity = 3, UnitPrice = 60 }
                }
            };

            db.Bills.AddRange(bill1, bill2, bill3, bill4, bill5);
            db.SaveChanges();
        }
    }
}
