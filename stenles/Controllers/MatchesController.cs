using Application.Matches;
using Application.Matches.Dto;
using Domain.Models;
using Microsoft.AspNetCore.Authorization;
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
        [Authorize(Roles ="admin")]
        [HttpPost("StartMatch")]
        public async Task<bool> StartMatch([FromBody] StartMatch.StartMatchRequest request)
        {
            return await Mediator.Send(request);
        }
        [Authorize(Roles = "admin")]
        [HttpPost("EndMatch")]
        public async Task<bool> EndMatch([FromBody] EndMatch.EndMatchRequest request)
        {
            return await Mediator.Send(request);
        }
        [Authorize(Roles = "admin")]
        [HttpPost("AddSquad")]
        public async Task<bool> AddSquad([FromBody] AddSquad.AddSquadRequest request)
        {
            return await Mediator.Send(request);
        }
        [Authorize(Roles = "admin")]
        [HttpPost("AddGoal")]
        public async Task<bool> AddGoal([FromBody] AddGoal.MatchAddGoal request)
        {
            return await Mediator.Send(request);
        }
        [Authorize(Roles = "admin")]
        [HttpPost("AddCard")]
        public async Task<bool> AddCard([FromBody] AddCard.MatchesAddCard request)
        {
            return await Mediator.Send(request);
        }
        [Authorize(Roles = "admin")]
        [HttpPost("EditDate")]
        public async Task<bool> EditDate([FromBody] EditDateMatch.MatchEditDate request)
        {
            return await Mediator.Send(request);
        }
    }
}
