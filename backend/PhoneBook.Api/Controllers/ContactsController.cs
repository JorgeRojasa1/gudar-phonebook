using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PhoneBook.Api.Data;
using PhoneBook.Api.DTOs;
using PhoneBook.Api.Models;

namespace PhoneBook.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactsController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ContactDto>>> GetAll([FromQuery] ContactType? type)
    {
        var query = db.Contacts.AsNoTracking();

        if (type.HasValue)
            query = query.Where(c => c.ContactType == type.Value);

        var contacts = await query.OrderBy(c => c.Name).ToListAsync();
        return Ok(contacts.Select(ToDto));
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ContactDto>> GetById(int id)
    {
        var contact = await db.Contacts.FindAsync(id);
        return contact is null ? NotFound() : Ok(ToDto(contact));
    }

    [HttpPost]
    public async Task<ActionResult<ContactDto>> Create(ContactDto dto)
    {
        if (!TryValidateContact(dto, out var error))
            return BadRequest(new { message = error });

        var contact = FromDto(dto);
        db.Contacts.Add(contact);
        await db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = contact.Id }, ToDto(contact));
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<ContactDto>> Update(int id, ContactDto dto)
    {
        if (!TryValidateContact(dto, out var error))
            return BadRequest(new { message = error });

        var contact = await db.Contacts.FindAsync(id);
        if (contact is null) return NotFound();

        contact.ContactType = dto.ContactType;
        contact.Name = dto.Name.Trim();
        contact.PhoneNumber = dto.PhoneNumber.Trim();
        contact.Comments = dto.Comments?.Trim();
        contact.FirstName = dto.FirstName?.Trim();
        contact.LastName = dto.LastName?.Trim();
        contact.GovernmentSector = dto.GovernmentSector?.Trim();
        contact.Website = dto.Website?.Trim();
        contact.Industry = dto.Industry?.Trim();

        await db.SaveChangesAsync();
        return Ok(ToDto(contact));
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var contact = await db.Contacts.FindAsync(id);
        if (contact is null) return NotFound();

        db.Contacts.Remove(contact);
        await db.SaveChangesAsync();
        return NoContent();
    }

    private static bool TryValidateContact(ContactDto dto, out string? error)
    {
        if (string.IsNullOrWhiteSpace(dto.Name)) { error = "Name is required."; return false; }
        if (string.IsNullOrWhiteSpace(dto.PhoneNumber)) { error = "Phone number is required."; return false; }

        if (dto.ContactType == ContactType.Person &&
            (string.IsNullOrWhiteSpace(dto.FirstName) || string.IsNullOrWhiteSpace(dto.LastName)))
        { error = "First name and last name are required for persons."; return false; }

        if (dto.ContactType == ContactType.PublicOrganization && string.IsNullOrWhiteSpace(dto.GovernmentSector))
        { error = "Government sector is required for public organizations."; return false; }

        if (dto.ContactType == ContactType.PrivateOrganization && string.IsNullOrWhiteSpace(dto.Industry))
        { error = "Industry is required for private organizations."; return false; }

        error = null;
        return true;
    }

    private static ContactDto ToDto(Contact c) => new()
    {
        Id = c.Id,
        ContactType = c.ContactType,
        Name = c.Name,
        PhoneNumber = c.PhoneNumber,
        Comments = c.Comments,
        FirstName = c.FirstName,
        LastName = c.LastName,
        GovernmentSector = c.GovernmentSector,
        Website = c.Website,
        Industry = c.Industry
    };

    private static Contact FromDto(ContactDto dto) => new()
    {
        ContactType = dto.ContactType,
        Name = dto.Name.Trim(),
        PhoneNumber = dto.PhoneNumber.Trim(),
        Comments = dto.Comments?.Trim(),
        FirstName = dto.FirstName?.Trim(),
        LastName = dto.LastName?.Trim(),
        GovernmentSector = dto.GovernmentSector?.Trim(),
        Website = dto.Website?.Trim(),
        Industry = dto.Industry?.Trim()
    };
}
