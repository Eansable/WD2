using Application.Championats;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Project.Controllers;

namespace stenles.Controllers
{
    [Route("api/[controller]")]

    public class ChampionatController : BaseController
    {
        [HttpGet("GetAll")]
        public async Task<List<Championat>> GetAll([FromHeader] GetAll.ChampionatGetAll request)
        {
            return await Mediator.Send(request);
        }

        [HttpGet("Add")]
        public async Task<bool> Add([FromHeader] Add.ChampionatAdd request)
        {
            return await Mediator.Send(request);
        }
    }
}
