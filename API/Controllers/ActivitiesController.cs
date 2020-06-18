using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> List(CancellationToken ct)
        {
            return await Mediator.Send(new List.Query(), ct);
        }
        // Code for cancellation tokens: if user cancel the request, it will also stops
        // at the background
        // public async Task<ActionResult<List<Activity>>> List(CancellationToken ct)
        // {
        //     return await _mediator.Send(new List.Query(), ct);
        // }
        // create route with base controller "api/[controller]" with swith id, Details method call takes id of type Guid
        // and returns asynchronously activity with id passed to the endpoint
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<Activity>> Details(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        // method that creates new asnc Task with type of Unit  call it Create()
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        // updates one or any number of activity parameters
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }
        [HttpDelete("{id}")]
        // updates one or any number of activity parameters
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            // in resolution await new Delete Command, consuming {Id=id}
            return await Mediator.Send(new Delete.Command { Id = id });
        }

    }

}
