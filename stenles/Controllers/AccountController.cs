using Application.Account;
using Application.Account.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Project.Controllers;

namespace stenles.Controllers
{
    [Route("api/[controller]")]
    public class AccountController : BaseController
    {
        [AllowAnonymous]
        [HttpPost("Register")]
        public async Task<bool> Register([FromBody] Register.Request query)
        {
            return await Mediator.Send(query);
        }

        [AllowAnonymous]
        [HttpPost("Login")]
        public async Task<UserDto> Login([FromBody] Login.LoginRequest query)
        {
            return await Mediator.Send(query);
        }

        [AllowAnonymous]
        [HttpPost("refresh")]
        public async Task<UserDto> Refresh([FromBody] Refresh.RefreshRequest query)
        {
            return await Mediator.Send(query);
        }
        [AllowAnonymous]
        [HttpGet("refreshUserData")]
        public async Task<UserDto> RefreshUserData([FromHeader] RefreshUserData.RefreshUserDataRequest query)
        {
            return await Mediator.Send(query);
        }
    }
}
