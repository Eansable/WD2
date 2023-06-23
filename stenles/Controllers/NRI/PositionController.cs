using Application.NRI.Positions;
using Domain.Models.NRI;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Project.Controllers;

namespace InternetRecources.Controllers.NRI
{
    [Route("api/[controller]")]
    public class PositionController : BaseController
    {
        [AllowAnonymous]
        [HttpGet("GetAll")]
        public async Task<List<Position>> GetAll([FromHeader] GetAll.GetAllRequest query)
        {
            return await Mediator.Send(query);
        }

        [AllowAnonymous]
        [HttpPost("Add")]
        public async Task<bool> Add([FromBody] Add.AddRequest query)
        {
            return await Mediator.Send(query);
        }
    }
}