using Microsoft.EntityFrameworkCore;
using Server.Core.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Data
{
    public class DataContext:DbContext
    {
        //public DbSet<Employee> EmployeeList { get; set; }
        //  protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //  {
        //      optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=my_db");
        //  }
        public DbSet<Employee> Employees { get; set; }

        public DbSet<Role> Roles { get; set; }
        public DbSet<RoleForEmployee> RolesForEmployee{ get; set; }



        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;Database=new_DB");
            optionsBuilder.LogTo((message) => Debug.Write(message));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RoleForEmployee>().HasKey(op => new { op.RoleId, op.EmployeeId });
        }
    }

}
