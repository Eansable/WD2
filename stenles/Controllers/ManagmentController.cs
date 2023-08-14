using Application.Managment.Dto;
using Application.Managment.Users;
using Domain.Models.Account;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Project.Controllers;

namespace stenles.Controllers
{
    [Route("api/[controller]")]
    public class ManagmentController : BaseController
    {
        [Authorize(Roles = "admin")]
        [HttpGet("GetAll")]
        public async Task<List<UsersListDto>> GetAll([FromHeader] GetAll.UsersGetAll query)
        {
            return await Mediator.Send(query);
        }
        [Authorize(Roles = "admin")]
        [HttpGet("GetById")]
        public async Task<UserDto> GetById([FromHeader] GetById.UsersGetById query)
        {
            return await Mediator.Send(query);
        }
    }
}
