using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace TalentOnboarding.Api.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Range(0, double.MaxValue)]
        public decimal Price { get; set; }

        // ✅ 导航属性：一个产品可以对应多条销售记录
        public ICollection<Sale>? Sales { get; set; }
    }
}