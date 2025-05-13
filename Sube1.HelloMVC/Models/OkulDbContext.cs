using Microsoft.EntityFrameworkCore;

namespace Sube1.HelloMVC.Models
{
    public class OkulDbContext : DbContext
    {
        public OkulDbContext(DbContextOptions<OkulDbContext> options) : base(options)
        {
        }

        public DbSet<Ogrenci> Ogrenciler { get; set; }
    }
}
