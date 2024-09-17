using Microsoft.AspNetCore.Mvc;
using Server.Core.Models;
using Server.Core.Service;
using Server.Core.Repositories;
using AutoMapper;
using Server.Core.DTOs;
using Server.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeServise _employeeService;
        private readonly IRoleForEmployeeRepository _roleForEmployeeRepository;
        private readonly IMapper _mapper;
        public EmployeeController(IEmployeeServise employeeService, IMapper mapper, IRoleForEmployeeRepository roleForEmployeeRepository)
        {
            _employeeService = employeeService;
            _mapper = mapper;
            _roleForEmployeeRepository = roleForEmployeeRepository;
        }

        // GET: api/<CategoriesController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            //וזאת כיון שהיא נשלפת בכל מקרה שהרי גם היא בטבלת קטגוריות. (כלומר, זה קורה כשיש קשר לאותה טבלה עצמה.) Include נשים לב שבמקרה זה קטגוריית האב תיכלל בשליפה למרות שאין
            var employees = await _employeeService.GetAllAsync();
            var activeEmployees = employees.Where(e => e.Status == true).ToList();
            return Ok(_mapper.Map<IEnumerable<EmployeeDto>>(activeEmployees));
        }


        // GET api/<CategoriesController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var employee = await _employeeService.GetByIdAsync(id);
            if (employee is null || !employee.Status)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<EmployeeDto>(employee));
        }


        // POST api/<CategoriesController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] EmployeePostModel model)
        {
            //check if parentId exists
            var newemployee = await _employeeService.AddAsync(_mapper.Map<Employee>(model));
            return Ok(_mapper.Map<EmployeeDto>(newemployee));
        }

        // PUT api/<CategoriesController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] EmployeePostModel model)
        {
            var employee = await _employeeService.GetByIdAsync(id);
            if (employee is null)
            {
                return NotFound();
            }
            _mapper.Map(model, employee);//להסביר!!
            await _employeeService.UpdateAsync(employee);
            employee = await _employeeService.GetByIdAsync(id);
            return Ok(_mapper.Map<EmployeeDto>(employee));

        }

        // DELETE api/<CategoriesController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var employee = await _employeeService.GetByIdAsync(id);
            if (employee is null)
            {
                return NotFound();
            }

            // שינוי הסטטוס ל־false במקום למחוק את הרשומה
            employee.Status = false;
            await _employeeService.UpdateAsync(employee);

            return NoContent();
        }
         

    }
}
            
        
