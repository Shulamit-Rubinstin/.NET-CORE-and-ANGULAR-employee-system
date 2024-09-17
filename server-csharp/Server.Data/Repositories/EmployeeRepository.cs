using Microsoft.EntityFrameworkCore;
using Server.Core.Models;
using Server.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Server.Data.Repositories.EmployeeRepository;

namespace Server.Data.Repositories
{
    public class EmployeeRepository:IEmployeeRepository
    {
        private readonly DataContext _dataContext;

        public EmployeeRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Employee> AddAsync(Employee employee)
        {
            _dataContext.Employees.Add(employee);
            await _dataContext.SaveChangesAsync();
            return employee;
        }

        public async Task DeleteAsync(int employeeId)
        {
            var employee = await GetByIdAsync(employeeId);
            _dataContext.Employees.Remove(employee);
            await _dataContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            return await _dataContext.Employees.Include(e=>e.Roles).ToListAsync();
        }

        public async Task<Employee> GetByIdAsync(int employeeId)
        {
            //    return await _dataContext.Employees.Include(c => c.Parent).FirstAsync(c => c.Id == categoryId);
            return await _dataContext.Employees.FirstAsync(u => u.Id== employeeId);
        }

        public async Task<Employee> UpdateAsync(Employee employee)
        {
            var existEmployee = await GetByIdAsync(employee.Id);
            _dataContext.Entry(existEmployee).CurrentValues.SetValues(existEmployee);
            await _dataContext.SaveChangesAsync();
            return existEmployee;
        }

        //    private readonly DATA_CONTEX _context;

        //    public EmployeeRepository(DATA_CONTEX context)
        //    {
        //        _context = context;
        //    }
        // public List<Employee> GetList()
        //{
        //    return _context.Employees.ToList();
        //}
        //    public Employee AddEmployee(Employee employee)
        //    {
        //        _context.EmployeeList.Add(employee);
        //        return employee;
        //    }

        //    public void DeleteEmployee(int id)
        //    {
        //        _context.EmployeeList.Remove(_context.EmployeeList.Find(u => u.Id == id));

        //    }

        //    public Employee GetById(int id)
        //    {
        //        return _context.EmployeeList.Find(u => u.Id == id);
        //    }

        //    public List<Employee> GetEmployee()
        //    {
        //        return _context.EmployeeList;
        //    }
        //    public Employee UpdateEmployee(int id, Employee employee)
        //    {
        //        var updateEmployee = _context.EmployeeList.Find(u => u.Id == id);
        //        if (updateEmployee != null)
        //        {
        //            updateEmployee.Id = employee.Id;
        //            updateEmployee.FirstName = employee.FirstName;
        //            return updateEmployee;
        //        }
        //        return null;
        //    }


        //Employee IEmployeeRepository.GetById(int id)
        //{
        //    throw new NotImplementedException();
        //}

    }
}
