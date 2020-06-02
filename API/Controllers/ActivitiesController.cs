using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ActivitiesController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet]

        public async Task<ActionResult<List<Activity>>> List(CancellationToken ct)
        {
            return await _mediator.Send(new List.Query(), ct);
        }
        // Code for cancellation tokes: if user cancel the request, it will also stops
        // at the background
        // public async Task<ActionResult<List<Activity>>> List(CancellationToken ct)
        // {
        //     return await _mediator.Send(new List.Query(), ct);
        // }
        // create route with base controller "api/[controller]" with swith id, Details method call takes id of type Guid
        // and returns asynchronously activity with id passed to the endpoint
        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> Details(Guid id)
        {
            return await _mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        // method that creates new asnc Task with type of Unit  call it Create()
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpPut("{id}")]
        // updates one or any number of activity parameters
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await _mediator.Send(command);
        }
        [HttpDelete("{id}")]
        // updates one or any number of activity parameters
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            // in resolution await new Delete Command, consuming {Id=id}
            return await _mediator.Send(new Delete.Command { Id = id });
        }

    }

}
