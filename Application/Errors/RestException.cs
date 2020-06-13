using System;
using System.Net;

namespace Application.Errors
{
    // Rest Exception inheriting/extending the Exception class from System
    public class RestException : Exception
    {
        public RestException(HttpStatusCode code, object errors = null)
        {
            this.Errors = errors;
            this.Code = code;

        }
        public HttpStatusCode Code { get; }

        public object Errors { get; }
    }
}