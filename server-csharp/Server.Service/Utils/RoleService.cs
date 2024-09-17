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
    public class RoleService:IRoleService
    {
        private readonly IRoleRepository _RoleeRepository;
        public RoleService(IRoleRepository roleRepository)
        {
            _RoleeRepository = roleRepository;
        }
        public async Task<Role> AddAsync(Role role)
        {
            return await _RoleeRepository.AddAsync(role);
        }

        public async Task DeleteAsync(int roleId)
        {
            await _RoleeRepository.DeleteAsync(roleId);
        }

        public async Task<IEnumerable<Role>> GetAllAsync()
        {
            return await _RoleeRepository.GetAllAsync();
        }

        public async Task<Role> GetByIdAsync(int roleId)
        {
            return await _RoleeRepository.GetByIdAsync(roleId);
        }

        public async Task<Role> UpdateAsync(Role role)//?
        {
            return await _RoleeRepository.UpdateAsync(role);
        }
    }
}
