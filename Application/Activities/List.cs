using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
// using Microsoft.Extensions.Logging;
using Persistence;


namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<List<Activity>> { }
        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            private readonly DataContext _context;
            // take ILogger from microsoft.Extensions.Logging, log on the List and call it logger

            // cancellation token code,use togethe with ActivitiesController.cs
            // private readonly ILogger<List> _logger;
            // ctrl + . on logger, initialize field from parameter

            // cancellation token code,use togethe with ActivitiesController.cs
            // public Handler(DataContext context, ILogger<List> logger)
            public Handler(DataContext context)
            {
                // cancellation token code,use togethe with ActivitiesController.cs
                // this._logger = logger;
                _context = context;
            }
            // handle responsible for querieng all the data from activities table and returning them as json

            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                // code for cancellationToken, use togethe with ActivitiesController.cs
                // try
                // {
                //     for (var i = 0; i < 10; i++)
                //     {
                //         cancellationToken.ThrowIfCancellationRequested();
                //         await Task.Delay(1000, cancellationToken);
                //         _logger.LogInformation($"task {i} has completed");
                //     }
                // }
                // catch (Exception ex) when (ex is TaskCanceledException)
                // {
                //     _logger.LogInformation("Task was cancelled");
                // }

                var activities = await _context.Activities.ToListAsync(cancellationToken);

                return activities;
            }
        }
    }
}

