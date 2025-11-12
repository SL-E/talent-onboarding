using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TalentOnboarding.Api.Models
{
    public class Sale
    {
        public int Id { get; set; }

        // ✅ 外键与导航属性：Customer
        [ForeignKey("Customer")]
        public int CustomerId { get; set; }
        public Customer? Customer { get; set; }

        // ✅ 外键与导航属性：Product
        [ForeignKey("Product")]
        public int ProductId { get; set; }
        public Product? Product { get; set; }

        // ✅ 外键与导航属性：Store
        [ForeignKey("Store")]
        public int StoreId { get; set; }
        public Store? Store { get; set; }

        // ✅ 额外字段
        public DateTime DateSold { get; set; } = DateTime.Now;
    }
}