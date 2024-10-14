using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;

namespace backend.Helpers
{
    public class SessionAuthorizeAttribute(params Role[] roles) : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var userDataJson = context.HttpContext.Session.GetString("UserData");

            if (string.IsNullOrEmpty(userDataJson))
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            var userData = JsonConvert.DeserializeObject<SessionUser>(userDataJson);

            if (userData == null)
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            if (roles.Length > 0 && !roles.Contains(userData.Role))
            {
                context.Result = new ForbidResult();
            }
        }
    }
}
