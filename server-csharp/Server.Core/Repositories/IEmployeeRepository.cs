using Server.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Repositories
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<Employee>> GetAllAsync();

        Task<Employee> GetByIdAsync(int employeeId);

        Task<Employee> AddAsync(Employee employeeId);

        Task<Employee> UpdateAsync(Employee employeeId);

        Task DeleteAsync(int employeeId);
    }
}
