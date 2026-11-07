using PortfolioApi.DTOs;

namespace PortfolioApi.Services;

public interface IProjectService
{
    List<ProjectResponseDto> GetAll();
    ProjectResponseDto? GetById(int id);
    ProjectResponseDto Create(ProjectCreateDto dto);
    ProjectResponseDto? Update(int id, ProjectUpdateDto dto);
    bool Delete(int id);
}
