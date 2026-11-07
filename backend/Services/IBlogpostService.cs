using PortfolioApi.DTOs;

namespace PortfolioApi.Services;

public interface IBlogpostService
{
    List<BlogpostResponseDto> GetAll();
    BlogpostResponseDto? GetById(int id);
    BlogpostResponseDto Create(BlogpostCreateDto dto);
    BlogpostResponseDto? Update(int id, BlogpostUpdateDto dto);
    bool Delete(int id);
}
