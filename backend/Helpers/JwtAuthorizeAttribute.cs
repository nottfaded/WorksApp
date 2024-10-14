using backend.Models;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;

namespace backend.Helpers
{
    public class JwtAuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        private readonly Role[] _roles;

        public JwtAuthorizeAttribute(params Role[] roles)
        {
            _roles = roles;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var user = context.HttpContext.User;

            if (!user.Identity.IsAuthenticated)
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            if (_roles.Length > 0 && !_roles.Any(r => user.IsInRole(r.ToString())))
            {
                context.Result = new ForbidResult();
            }
        }
    }
}
