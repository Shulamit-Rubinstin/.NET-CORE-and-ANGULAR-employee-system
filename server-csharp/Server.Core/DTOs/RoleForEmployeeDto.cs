using Server.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.DTOs
{
    public class RoleForEmployeeDto
    {
        public int RoleId { get; set; }
        //public int EmployeeWorker { get; set;}
        public Role Role { get; set; }
        public DateTime StartDate { get; set; }

    }
}
