namespace PortfolioApi.DTOs;

public record ProjectCreateDto(
    string Titel,
    string Beschrijving,
    string Categorie,
    string GitHubUrl,
    DateTime Datum
);

public record ProjectUpdateDto(
    string Titel,
    string Beschrijving,
    string Categorie,
    string GitHubUrl,
    DateTime Datum
);

public record ProjectResponseDto(
    int Id,
    string Titel,
    string Beschrijving,
    string Categorie,
    string GitHubUrl,
    DateTime Datum
);
