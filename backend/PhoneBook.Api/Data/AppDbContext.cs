using Microsoft.EntityFrameworkCore;
using PhoneBook.Api.Models;

namespace PhoneBook.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Contact> Contacts => Set<Contact>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Contact>(entity =>
        {
            entity.HasKey(c => c.Id);
            entity.Property(c => c.Name).HasMaxLength(150).IsRequired();
            entity.Property(c => c.PhoneNumber).HasMaxLength(50).IsRequired();
            entity.Property(c => c.Comments).HasMaxLength(500);
            entity.Property(c => c.ContactType).HasConversion<string>().HasMaxLength(30);
            entity.Property(c => c.FirstName).HasMaxLength(100);
            entity.Property(c => c.LastName).HasMaxLength(100);
            entity.Property(c => c.GovernmentSector).HasMaxLength(150);
            entity.Property(c => c.Website).HasMaxLength(250);
            entity.Property(c => c.Industry).HasMaxLength(150);
        });
    }
}
