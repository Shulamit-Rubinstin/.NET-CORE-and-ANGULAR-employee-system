using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Models
{
    public enum Gender
    {
        Male=1,
        Female=2
    }
    public class Employee
    {
        [Key]
        public int Id { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string Identity { get; set; }
        public bool Status { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime EntryDate { get; set; }
        public List<RoleForEmployee> Roles { get; set; }
        public Gender Gender { get; set; }
    }
}
