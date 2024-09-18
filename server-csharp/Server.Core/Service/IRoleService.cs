using Server.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Service
{
    public interface IRoleService
    { 
        
            Task<IEnumerable<Role>> GetAllAsync();

            Task<Role> GetByIdAsync(int roleId);

            Task<Role> AddAsync(Role role);

            Task<Role> UpdateAsync(Role role);

            Task DeleteAsync(int roleId);
        
    }
}
