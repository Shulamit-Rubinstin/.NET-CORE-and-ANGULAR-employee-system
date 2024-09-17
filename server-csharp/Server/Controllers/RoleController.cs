using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Server.Core.DTOs;
using Server.Core.Models;
using Server.Core.Service;
using Server.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _roleService;
        private readonly IMapper _mapper;
        public RoleController(IRoleService roleService, IMapper mapper)
        {
            _roleService = roleService;
            _mapper = mapper;
        }

        // GET: api/<CategoriesController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            //וזאת כיון שהיא נשלפת בכל מקרה שהרי גם היא בטבלת קטגוריות. (כלומר, זה קורה כשיש קשר לאותה טבלה עצמה.) Include נשים לב שבמקרה זה קטגוריית האב תיכלל בשליפה למרות שאין
            var roles = await _roleService.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<RoleDto>>(roles));
        }

        // GET api/<CategoriesController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var role = await _roleService.GetByIdAsync(id);
            return Ok(_mapper.Map<RoleDto>(role));
        }

        // POST api/<CategoriesController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] RolePostModel model)
        {
            //check if parentId exists
            var newRole = await _roleService.AddAsync(_mapper.Map<Role>(model));
            return Ok(_mapper.Map<RoleDto>(newRole));
        }

        // PUT api/<CategoriesController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] RolePostModel model)
        {
            var role = await _roleService.GetByIdAsync(id);
            if (role is null)
            {
                return NotFound();
            }
            _mapper.Map(model, role);//להסביר!!
            await _roleService.UpdateAsync(role);
            role = await _roleService.GetByIdAsync(id);
            return Ok(_mapper.Map<RoleDto>(role));

        }

        // DELETE api/<CategoriesController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var role = await _roleService.GetByIdAsync(id);
            if (role is null)
            {
                return NotFound();
            }
            await _roleService.DeleteAsync(id);
            return NoContent();
        }
    }
}

