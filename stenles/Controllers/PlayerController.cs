using Application.Players;
using Domain.Models;
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

        [HttpPost("Add")]
        public async Task<bool> Add([FromBody] Add.PlayerAdd request)
        {
            return await Mediator.Send(request);
        }
    }
}
