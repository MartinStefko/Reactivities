using System.Threading.Tasks;
using Application.Photos;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PhotosController : BaseController
    {
        [HttpPost]
        public async Task<ActionResult<Photo>> Add([FromForm] Add.Command command)
        // [FromForm] is hint for runtime where to look when searching for photo: it should lokk at form-data instead of body
        {
            return await Mediator.Send(command);
        }
    }
}