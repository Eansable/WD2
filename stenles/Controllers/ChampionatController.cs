﻿using Application.Championats;
using Application.Championats.Dto;
using Domain.Models;
using Microsoft.AspNetCore.Authorization;
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
        [HttpGet("GetOneById")]
        public async Task<ChampionatDto> GetOneById([FromHeader] GetOneById.ChampionatGetOneById request)
        {
            return await Mediator.Send(request);
        }
        [Authorize]
        [HttpPost("Add")]
        public async Task<bool> Add([FromBody] Add.ChampionatAdd request)
        {
            return await Mediator.Send(request);
        }
        [Authorize]
        [HttpPost("AddTeam")]
        public async Task<bool> AddTeaam([FromBody] AddTeam.AddTeamInChampionat request)
        {
            return await Mediator.Send(request);
        }
    }
}
