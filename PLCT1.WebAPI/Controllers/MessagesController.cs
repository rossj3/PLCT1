using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using PLCT1.DataAccess;

namespace PLCT1.Web.Controllers
{
    public class MessagesController : ApiController
    {
        private IRepository _repository = new Repository();

        // GET api/Messages
        public IEnumerable<PLCT1.Message> Get()
        {
            var x = _repository.GetMessages().ToList();

            return x;
        }

        // POST api/Messages
        public PLCT1.Message Post([FromBody]PLCT1.Message value)
        {
            // add
            // need to change this to return the new result... some vals like ID got changed.
            _repository.AddMessage(value.Content);
            // that should have saved automatically...
            return value; // with updated properties...
        }

        // PUT api/Messages/5
        public PLCT1.Message Put(int id, [FromBody]PLCT1.Message value)
        {
            // update
            // need to change this to return the new result... some vals like "Updated" got changed.

            _repository.SetStarredValue(value.MessageId, value.Starred);
            return value;
        }

        // DELETE api/Messages/5
        public void Delete(int id)
        {
            _repository.DeleteMessage(id);
        }
    }
}
