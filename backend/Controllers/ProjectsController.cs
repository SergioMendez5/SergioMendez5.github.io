using Microsoft.AspNetCore.Mvc;
using PortfolioApi.DTOs;
using PortfolioApi.Services;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly IProjectService _service;

    public ProjectsController(IProjectService service)
    {
        _service = service;
    }

    [HttpGet]
    public ActionResult<List<ProjectResponseDto>> GetAll()
    {
        return Ok(_service.GetAll());
    }

    [HttpGet("{id}")]
    public ActionResult<ProjectResponseDto> GetById(int id)
    {
        var project = _service.GetById(id);
        if (project is null) return NotFound();
        return Ok(project);
    }

    [HttpPost]
    public ActionResult<ProjectResponseDto> Create(ProjectCreateDto dto)
    {
        var project = _service.Create(dto);
        return CreatedAtAction(nameof(GetById), new { id = project.Id }, project);
    }

    [HttpPut("{id}")]
    public ActionResult<ProjectResponseDto> Update(int id, ProjectUpdateDto dto)
    {
        var project = _service.Update(id, dto);
        if (project is null) return NotFound();
        return Ok(project);
    }

    [HttpDelete("{id}")]
    public ActionResult Delete(int id)
    {
        var gelukt = _service.Delete(id);
        if (!gelukt) return NotFound();
        return NoContent();
    }
}
