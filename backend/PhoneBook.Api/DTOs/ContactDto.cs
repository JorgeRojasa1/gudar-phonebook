using PhoneBook.Api.Models;

namespace PhoneBook.Api.DTOs;

public class ContactDto
{
    public int Id { get; set; }
    public ContactType ContactType { get; set; }
    public string Name { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string? Comments { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? GovernmentSector { get; set; }
    public string? Website { get; set; }
    public string? Industry { get; set; }
}
