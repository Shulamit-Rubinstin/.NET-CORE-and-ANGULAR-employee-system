using Microsoft.EntityFrameworkCore;
using Server.Core.Models;
using Server.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Data.Repositories
{
    public class RoleForEmployeeRepository:IRoleForEmployeeRepository
    {
        private readonly DataContext _dataContext;

        public RoleForEmployeeRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<RoleForEmployee> AddAsync(RoleForEmployee roleForEmployee)
        {
            _dataContext.Add(roleForEmployee);
            await _dataContext.SaveChangesAsync();
            return roleForEmployee;
        }

        public async Task DeleteAsync(int roleForEmployeeId)
        {
            var roleForEmployee = await GetByIdAsync(roleForEmployeeId);
            _dataContext.RolesForEmployee.Remove(roleForEmployee);
            await _dataContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<RoleForEmployee>> GetAllAsync()
        {
            return await _dataContext.RolesForEmployee.ToListAsync();
        }

        public async Task<RoleForEmployee> GetByIdAsync(int roleForEmployeeId)
        {
            //    return await _dataContext.Employees.Include(c => c.Parent).FirstAsync(c => c.Id == categoryId);
            return await _dataContext.RolesForEmployee.FirstAsync(u => u.RoleId == roleForEmployeeId);
        }

        public async Task<RoleForEmployee> UpdateAsync(RoleForEmployee roleForEmployee)
        {
            var existRoleForEmployee = await GetByIdAsync(roleForEmployee.RoleId);
            _dataContext.Entry(roleForEmployee).CurrentValues.SetValues(existRoleForEmployee);
            await _dataContext.SaveChangesAsync();
            return existRoleForEmployee;
        }

    }
}
