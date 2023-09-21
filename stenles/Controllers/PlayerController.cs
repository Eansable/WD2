using Application.Players;
using Application.Players.Dto;
using Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Project.Controllers;

namespace stenles.Controllers
{
    [Route("api/[controller]")]
    public class PlayerController : BaseController
    {
        [HttpGet("GetByTeamId")]
        public async Task<List<Player>> GetByTeamId([FromHeader] GetByTeamId.PlayersGetAllByTeamId request)
        {
            return await Mediator.Send(request);
        }

        [HttpGet("GetById")]
        public async Task<OnePlayerDto> GetById([FromHeader] GetById.PlayersGetById request)
        {
            return await Mediator.Send(request);
        }
        [Authorize(Roles ="admin")]
        [HttpPost("Add")]
        public async Task<bool> Add([FromBody] Add.PlayerAdd request)
        {
            return await Mediator.Send(request);
        }
        [Authorize(Roles = "admin")]
        [HttpPost("change")]
        public async Task<bool> Change([FromBody] Change.PlayerChange request)
        {
            return await Mediator.Send(request);
        }
        [Authorize(Roles = "admin")]
        [HttpPost("changeAvatar")]
        public async Task<bool> ChangeAvatar([FromForm] ChangeAvatar.PlayerChangeAvatar request)
        {
            return await Mediator.Send(request);
        }
    }
}
