using PortfolioApi.Data;
using PortfolioApi.DTOs;
using PortfolioApi.Entities;

namespace PortfolioApi.Services;

public class ProjectService : IProjectService
{
    private readonly PortfolioDbContext _db;

    public ProjectService(PortfolioDbContext db)
    {
        _db = db;
    }

    public List<ProjectResponseDto> GetAll()
    {
        return _db.Projects
            .Select(p => new ProjectResponseDto(
                p.Id, p.Titel, p.Beschrijving, p.Categorie, p.GitHubUrl, p.Datum))
            .ToList();
    }

    public ProjectResponseDto? GetById(int id)
    {
        var p = _db.Projects.Find(id);
        if (p is null) return null;
        return new ProjectResponseDto(
            p.Id, p.Titel, p.Beschrijving, p.Categorie, p.GitHubUrl, p.Datum);
    }

    public ProjectResponseDto Create(ProjectCreateDto dto)
    {
        var p = new Project
        {
            Titel = dto.Titel,
            Beschrijving = dto.Beschrijving,
            Categorie = dto.Categorie,
            GitHubUrl = dto.GitHubUrl,
            Datum = dto.Datum
        };
        _db.Projects.Add(p);
        _db.SaveChanges();
        return new ProjectResponseDto(
            p.Id, p.Titel, p.Beschrijving, p.Categorie, p.GitHubUrl, p.Datum);
    }

    public ProjectResponseDto? Update(int id, ProjectUpdateDto dto)
    {
        var p = _db.Projects.Find(id);
        if (p is null) return null;

        p.Titel = dto.Titel;
        p.Beschrijving = dto.Beschrijving;
        p.Categorie = dto.Categorie;
        p.GitHubUrl = dto.GitHubUrl;
        p.Datum = dto.Datum;
        _db.SaveChanges();

        return new ProjectResponseDto(
            p.Id, p.Titel, p.Beschrijving, p.Categorie, p.GitHubUrl, p.Datum);
    }

    public bool Delete(int id)
    {
        var p = _db.Projects.Find(id);
        if (p is null) return false;
        _db.Projects.Remove(p);
        _db.SaveChanges();
        return true;
    }
}
