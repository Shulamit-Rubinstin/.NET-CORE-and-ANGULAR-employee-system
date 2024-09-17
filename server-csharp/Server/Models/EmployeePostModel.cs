using Server.Core.Models;

namespace Server.Models
{
    public class EmployeePostModel
    {
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string Identity { get; set; }

        public bool Status { get; set; }
        public List<RoleForEmployeePostModel>? Roles { get; set; }

    }
}
