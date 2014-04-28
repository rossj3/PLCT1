using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(PLCT1.WebAPI.Startup))]
namespace PLCT1.WebAPI
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
