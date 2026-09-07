namespace PhoneBook.Api.Models;

public enum ContactType
{
    Person = 1,
    PublicOrganization = 2,
    PrivateOrganization = 3
}

public class Contact
{
    public int Id { get; set; }
    public ContactType ContactType { get; set; }
    public string Name { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string? Comments { get; set; }

    // Person-specific fields
    public string? FirstName { get; set; }
    public string? LastName { get; set; }

    // Public organization-specific fields
    public string? GovernmentSector { get; set; }
    public string? Website { get; set; }

    // Private organization-specific fields
    public string? Industry { get; set; }
}
