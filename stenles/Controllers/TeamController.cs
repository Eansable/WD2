
using Application.Teams;
using Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Project.Controllers;

namespace stenles.Controllers
{
    [Route("api/[controller]")]
    public class TeamController : BaseController
    {
        [HttpGet("GetAll")]
        public async Task<List<Team>> GetAll([FromHeader] GetAll.TeamGetAllRequest  request)
        {
            return await Mediator.Send(request);
        }

        [Authorize(Roles = "admin")]
        [HttpPost("Add")]
        public async Task<bool> Add([FromBody] Add.TeamAddRequest request)
        {
            return await Mediator.Send(request);
        }

        [Authorize(Roles = "admin")]
        [HttpPost("Update")]
        public async Task<bool> Update([FromBody] Add.TeamAddRequest request)
        {
            return await Mediator.Send(request);
        }

        [Authorize(Roles = "admin")]
        [HttpPost("Deactivated")]
        public async Task<bool> Deactivated([FromBody] Deactivated.TeamDeactivatedRequest request)
        {
            return await Mediator.Send(request);
        }

        [Authorize(Roles = "admin")]
        [HttpPost("Activated")]
        public async Task<bool> Activated([FromBody] Activated.TeamActivatedRequest request)
        {
            return await Mediator.Send(request);
        }
    }
}
