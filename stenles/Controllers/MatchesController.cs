using Application.Matches;
using Application.Matches.Dto;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Project.Controllers;

namespace stenles.Controllers
{
    [Route("api/[controller]")]

    public class MatchesController : BaseController
    {
        [HttpGet("getMatchesByIdChamp")]
        public async Task<List<MatchDto>> GetMatchesById([FromHeader] GetMatchesByChampId.GetByChampId request)
        {
            return await Mediator.Send(request);
        }
        [HttpGet("getById")]
        public async Task<OneMatchDto> GetById([FromHeader] GetById.MatchesGetById request)
        {
            return await Mediator.Send(request);
        }
    }
}
