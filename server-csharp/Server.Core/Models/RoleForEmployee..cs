using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Models
{
    public class RoleForEmployee
    {
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }
        public int RoleId { get; set; }
        public DateTime StartDate { get; set; }
        public bool IsManager { get; set; }
        public Role Role { get; set; }
    }
    
}
