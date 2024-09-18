using Server.Core.Models;
using Server.Core.Repositories;
using Server.Core.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Service.Utils
{
    public class RoleForEmployeeService: IRoleForEmployeeService
    {
        private readonly IRoleForEmployeeRepository _RoleForEmployeeRepository;

        public RoleForEmployeeService(IRoleForEmployeeRepository roleForEmployeeRepository)
        {
            _RoleForEmployeeRepository = roleForEmployeeRepository;
        }

        public async Task<RoleForEmployee> AddAsync(RoleForEmployee roleForEmployee)
        {
            return await _RoleForEmployeeRepository.AddAsync(roleForEmployee);
        }

        public async Task DeleteAsync(int roleId)
        {
            await _RoleForEmployeeRepository.DeleteAsync(roleId);
        }

        public async Task<IEnumerable<RoleForEmployee>> GetAllAsync()
        {
            return await _RoleForEmployeeRepository.GetAllAsync();
        }

        public async Task<RoleForEmployee> GetByIdAsync(int roleForEmployeId)
        {
            return await _RoleForEmployeeRepository.GetByIdAsync(roleForEmployeId);
        }

        public async Task<RoleForEmployee> UpdateAsync(RoleForEmployee roleForEmployee)//?
        {
            return await _RoleForEmployeeRepository.UpdateAsync(roleForEmployee);
        }
    }
}

