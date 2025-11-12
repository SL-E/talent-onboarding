using Microsoft.EntityFrameworkCore;
using TalentOnboarding.Api.Models;

namespace TalentOnboarding.Api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // ✅ 已存在的 Users 表
        public DbSet<User> Users { get; set; }

        // ✅ 新增四个核心表
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Store> Stores { get; set; }
        public DbSet<Sale> Sales { get; set; }

        // ✅ 建立外键与关系
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Customer → Sales (一对多)
            modelBuilder.Entity<Customer>()
                .HasMany(c => c.Sales)
                .WithOne(s => s.Customer)
                .HasForeignKey(s => s.CustomerId)
                .OnDelete(DeleteBehavior.Cascade);

            // Product → Sales (一对多)
            modelBuilder.Entity<Product>()
                .HasMany(p => p.Sales)
                .WithOne(s => s.Product)
                .HasForeignKey(s => s.ProductId)
                .OnDelete(DeleteBehavior.Cascade);

            // Store → Sales (一对多)
            modelBuilder.Entity<Store>()
                .HasMany(st => st.Sales)
                .WithOne(s => s.Store)
                .HasForeignKey(s => s.StoreId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}