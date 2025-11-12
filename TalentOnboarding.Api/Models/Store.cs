using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace TalentOnboarding.Api.Models
{
    public class Store
    {
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(200)]
        public string Address { get; set; } = string.Empty;

        // ✅ 导航属性：一个门店可以有多条销售记录
        public ICollection<Sale>? Sales { get; set; }
    }
}