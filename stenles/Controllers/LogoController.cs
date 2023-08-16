using Application.Logos;
using Microsoft.AspNetCore.Mvc;
using Project.Controllers;

namespace stenles.Controllers
{
    [Route("api/[controller]")]

    public class LogoController : BaseController
    {
        [HttpGet("GetById")]
        public async Task<FileResult> GetByTeamId([FromHeader] GetById.LogoGetById request)
        {
            return await Mediator.Send(request);
        }
    }
}
