using Application.NRI.Stadiums;
using Domain.Models.NRI;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Project.Controllers;

namespace stenles.Controllers.NRI
{
    [Route("api/[controller]")]
    public class StadiumController : BaseController
    {
        [AllowAnonymous]
        [HttpGet("GetAll")]
        public async Task<List<Stadium>> GetAll([FromHeader] GetAll.StadiumGetAll query)
        {
            return await Mediator.Send(query);
        }

        [Authorize(Roles ="admin")]
        [HttpPost("Add")]
        public async Task<bool> Add([FromForm] Add.StadiumAdd query)
        {
            return await Mediator.Send(query);
        }

    }
}
