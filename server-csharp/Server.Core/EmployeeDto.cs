using Server.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.DTOs
{
    public class EmployeeDto
    {
        public int Id { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }

        public bool Status { get; set; }
        //public bool Status { get; set; }
        //public DateTime DateOfBirth { get; set; }
        public IEnumerable<RoleForEmployeeDto> Roles { get; set; }
    }
}

