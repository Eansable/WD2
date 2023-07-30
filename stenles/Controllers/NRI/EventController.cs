using Application.NRI.Events;
using Domain.Models.NRI;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Project.Controllers;

namespace stenles.Controllers.NRI
{
    [Route("api/[controller]")]

    public class EventController : BaseController
    {
        [AllowAnonymous]
        [HttpGet("GetAll")]
        public async Task<List<Event>> GetAll([FromHeader] GetAll.EventGetAll query)
        {
            return await Mediator.Send(query);
        }

        [Authorize(Roles = "admin")]
        [HttpPost("Add")]
        public async Task<bool> Add([FromBody] Add.EventAdd query)
        {
            return await Mediator.Send(query);
        }
    }
}
