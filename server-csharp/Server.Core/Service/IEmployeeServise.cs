using Server.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Service
{
    public interface IEmployeeServise
    {
        Task<IEnumerable<Employee>> GetAllAsync();

        Task<Employee> GetByIdAsync(int employeeId);

        Task<Employee> AddAsync(Employee employee);

        Task<Employee> UpdateAsync(Employee employee);

        Task DeleteAsync(int employeeId);

    }

}

