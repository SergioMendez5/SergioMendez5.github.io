using PortfolioApi.Data;
using PortfolioApi.DTOs;
using PortfolioApi.Entities;

namespace PortfolioApi.Services;

public class BlogpostService : IBlogpostService
{
    private readonly PortfolioDbContext _db;

    public BlogpostService(PortfolioDbContext db)
    {
        _db = db;
    }

    public List<BlogpostResponseDto> GetAll()
    {
        return _db.Blogposts
            .Select(b => new BlogpostResponseDto(
                b.Id, b.Titel, b.Inhoud, b.Publicatiedatum))
            .ToList();
    }

    public BlogpostResponseDto? GetById(int id)
    {
        var b = _db.Blogposts.Find(id);
        if (b is null) return null;
        return new BlogpostResponseDto(
            b.Id, b.Titel, b.Inhoud, b.Publicatiedatum);
    }

    public BlogpostResponseDto Create(BlogpostCreateDto dto)
    {
        var b = new Blogpost
        {
            Titel = dto.Titel,
            Inhoud = dto.Inhoud,
            Publicatiedatum = dto.Publicatiedatum
        };
        _db.Blogposts.Add(b);
        _db.SaveChanges();
        return new BlogpostResponseDto(
            b.Id, b.Titel, b.Inhoud, b.Publicatiedatum);
    }

    public BlogpostResponseDto? Update(int id, BlogpostUpdateDto dto)
    {
        var b = _db.Blogposts.Find(id);
        if (b is null) return null;

        b.Titel = dto.Titel;
        b.Inhoud = dto.Inhoud;
        b.Publicatiedatum = dto.Publicatiedatum;
        _db.SaveChanges();

        return new BlogpostResponseDto(
            b.Id, b.Titel, b.Inhoud, b.Publicatiedatum);
    }

    public bool Delete(int id)
    {
        var b = _db.Blogposts.Find(id);
        if (b is null) return false;
        _db.Blogposts.Remove(b);
        _db.SaveChanges();
        return true;
    }
}
