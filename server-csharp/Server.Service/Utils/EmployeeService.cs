using Server.Core.Models;
using Server.Core.Repositories;
using Server.Core.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Server.Service.Utils.EmployeeService;

namespace Server.Service.Utils
{
    public class EmployeeService : IEmployeeServise
    {
        private readonly IEmployeeRepository _EmployeeRepository;
        private readonly IRoleRepository _RoleRepository;
        private readonly IRoleForEmployeeRepository _RoleForEmployeeRepository;

        public EmployeeService(IEmployeeRepository employeeRepository, IRoleForEmployeeRepository roleForEmployeeRepository, IRoleRepository roleRepository)
        {
            _EmployeeRepository = employeeRepository;
            _RoleForEmployeeRepository = roleForEmployeeRepository;
            _RoleRepository = roleRepository;
        }

        public async Task<Employee> AddAsync(Employee employee)
        {
            
            
              
                var newEmployee = await _EmployeeRepository.AddAsync(employee);
                //foreach (var item in employee.Roles)
                //{
                //    //var role = await _RoleRepository.AddAsync(/*new Role() { Name =}*/);
                //    //  var 

                //}
                return newEmployee;
            
         
        }


        public async Task DeleteAsync(int employeeId)
        {
            await _EmployeeRepository.DeleteAsync(employeeId);
        }

        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            return await _EmployeeRepository.GetAllAsync();
        }

        public async Task<Employee> GetByIdAsync(int employeeId)
        {
            return await _EmployeeRepository.GetByIdAsync(employeeId);
        }

        public async Task<Employee> UpdateAsync(Employee employee)//?
        {
            return await _EmployeeRepository.UpdateAsync(employee);
        }

    }
}


