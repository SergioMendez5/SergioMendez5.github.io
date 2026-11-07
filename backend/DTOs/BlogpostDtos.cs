namespace PortfolioApi.DTOs;

public record BlogpostCreateDto(
    string Titel,
    string Inhoud,
    DateTime Publicatiedatum
);

public record BlogpostUpdateDto(
    string Titel,
    string Inhoud,
    DateTime Publicatiedatum
);

public record BlogpostResponseDto(
    int Id,
    string Titel,
    string Inhoud,
    DateTime Publicatiedatum
);
