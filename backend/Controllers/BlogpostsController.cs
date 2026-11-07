using Microsoft.AspNetCore.Mvc;
using PortfolioApi.DTOs;
using PortfolioApi.Services;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BlogpostsController : ControllerBase
{
    private readonly IBlogpostService _service;

    public BlogpostsController(IBlogpostService service)
    {
        _service = service;
    }

    [HttpGet]
    public ActionResult<List<BlogpostResponseDto>> GetAll()
    {
        return Ok(_service.GetAll());
    }

    [HttpGet("{id}")]
    public ActionResult<BlogpostResponseDto> GetById(int id)
    {
        var blogpost = _service.GetById(id);
        if (blogpost is null) return NotFound();
        return Ok(blogpost);
    }

    [HttpPost]
    public ActionResult<BlogpostResponseDto> Create(BlogpostCreateDto dto)
    {
        var blogpost = _service.Create(dto);
        return CreatedAtAction(nameof(GetById), new { id = blogpost.Id }, blogpost);
    }

    [HttpPut("{id}")]
    public ActionResult<BlogpostResponseDto> Update(int id, BlogpostUpdateDto dto)
    {
        var blogpost = _service.Update(id, dto);
        if (blogpost is null) return NotFound();
        return Ok(blogpost);
    }

    [HttpDelete("{id}")]
    public ActionResult Delete(int id)
    {
        var gelukt = _service.Delete(id);
        if (!gelukt) return NotFound();
        return NoContent();
    }
}
