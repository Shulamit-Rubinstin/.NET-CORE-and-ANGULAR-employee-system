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
public class RoleRepository:IRoleRepository
    {
        private readonly DataContext _dataContext;

        public RoleRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Role> AddAsync(Role role)
        {
            _dataContext.Roles.Add(role);
            await _dataContext.SaveChangesAsync();
            return role;
        }

        public async Task DeleteAsync(int roleId)
        {
            var role = await GetByIdAsync(roleId);
            _dataContext.Roles.Remove(role);
            await _dataContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<Role>> GetAllAsync()
        {
            return await _dataContext.Roles.ToListAsync();
        }

        public async Task<Role> GetByIdAsync(int roleId)
        {
            //    return await _dataContext.Employees.Include(c => c.Parent).FirstAsync(c => c.Id == categoryId);
            return await _dataContext.Roles.FirstAsync(u => u.Id == roleId);
        }

        public async Task<Role> UpdateAsync(Role role)
        {
            var existRole = await GetByIdAsync(role.Id);
            _dataContext.Entry(existRole).CurrentValues.SetValues(existRole);
            await _dataContext.SaveChangesAsync();
            return existRole;
        }

    }
}
