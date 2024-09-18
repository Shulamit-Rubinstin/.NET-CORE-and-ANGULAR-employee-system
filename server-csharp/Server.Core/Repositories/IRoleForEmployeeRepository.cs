using Server.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Repositories
{
    public interface IRoleForEmployeeRepository
    {
     
            Task<IEnumerable<RoleForEmployee>> GetAllAsync();

            Task<RoleForEmployee> GetByIdAsync(int roleForEmployeeId);

            Task<RoleForEmployee> AddAsync(RoleForEmployee roleForEmployee);

            Task<RoleForEmployee> UpdateAsync(RoleForEmployee roleForEmployee);

            Task DeleteAsync(int roleForEmployeeId);
        
    }
}
