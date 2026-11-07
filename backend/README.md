# PortfolioApi — ASP.NET Core Web API backend

Backend voor de portfoliosite van Sergio Mendez.

## Technische gegevens

- **.NET-versie:** .NET 10.0
- **API-stijl:** Controllers met lagen (Controllers → Services → Data)
- **Database:** SQL Server (SQLEXPRESS)
- **ORM:** Entity Framework Core

## Codestructuur

```
backend/
├── Controllers/      HTTP-afhandeling
│   ├── ProjectsController.cs
│   └── BlogpostsController.cs
├── Services/         Businesslogica + DTO-mapping
│   ├── IProjectService.cs
│   ├── ProjectService.cs
│   ├── IBlogpostService.cs
│   └── BlogpostService.cs
├── Data/              EF Core DbContext
│   └── PortfolioDbContext.cs
├── Entities/          Databasemodellen
│   ├── Project.cs
│   └── Blogpost.cs
├── DTOs/              Invoer- en uitvoer-DTO's
│   ├── ProjectDtos.cs
│   └── BlogpostDtos.cs
├── Program.cs         Configuratie (DI, Swagger, DbContext)
└── appsettings.json   Connection string
```

## SQL Server configureren

De connection string staat in `appsettings.json`:

```
Server=localhost\SQLEXPRESS;Database=PortfolioDb;Trusted_Connection=True;TrustServerCertificate=True;
```

De database wordt automatisch aangemaakt met `EnsureCreated` bij het opstarten van de applicatie.

## Starten

1. Open een terminal in de map `backend/`
2. Typ: `dotnet run`
3. Ga naar http://localhost:5242/swagger

## Endpoints

**Projects:**
- `GET /api/projects` — alle projecten ophalen
- `GET /api/projects/{id}` — één project ophalen
- `POST /api/projects` — project aanmaken
- `PUT /api/projects/{id}` — project wijzigen
- `DELETE /api/projects/{id}` — project verwijderen

**Blogposts:**
- `GET /api/blogposts` — alle blogposts ophalen
- `GET /api/blogposts/{id}` — één blogpost ophalen
- `POST /api/blogposts` — blogpost aanmaken
- `PUT /api/blogposts/{id}` — blogpost wijzigen
- `DELETE /api/blogposts/{id}` — blogpost verwijderen
