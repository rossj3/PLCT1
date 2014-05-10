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
            return _repository.GetMessages().OrderByDescending(m => m.DatePosted).ToList();
        }

        // POST api/Messages
        public PLCT1.Message Post([FromBody]PLCT1.Message value)
        {
            return _repository.AddMessage(value.Content);
        }

        // PUT api/Messages/5
        public PLCT1.Message Put(int id, [FromBody]PLCT1.Message value)
        {
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
