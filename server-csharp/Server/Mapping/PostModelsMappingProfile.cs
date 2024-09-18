using AutoMapper;
using Server.Controllers;
using Server.Core.Models;
using Server.Models;

namespace Server.Mapping
{
    public class PostModelsMappingProfile:Profile
    {
        public PostModelsMappingProfile()
        {
            CreateMap<EmployeePostModel, Employee>().ReverseMap();
            CreateMap<RoleForEmployeePostModel, RoleForEmployee>().ReverseMap();
            CreateMap<RolePostModel, Role>().ReverseMap();
        }
    }
}
