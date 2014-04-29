using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PLCT1.DataAccess
{
    public class Repository : IRepository
    {
        private readonly PLCT1Entities _entities = new PLCT1Entities();

        public IEnumerable<PLCT1.Message> GetMessages()
        {
            return _entities.Messages.Select(m => new PLCT1.Message
            {
                Content = m.Content,
                DatePosted = m.DatePosted,
                MessageId = m.MessageId,
                Starred = m.Starred
            });
        }

        public PLCT1.Message AddMessage(string content)
        {
            var newMessage = new Message
            {
                Content = content,
                DatePosted = DateTime.Now,
                Starred = false
            };
            _entities.Messages.Add(newMessage);
            _entities.SaveChanges();

            // now construct new PLCT1.Message object to return...
            return new PLCT1.Message
            {
                Content = newMessage.Content,
                DatePosted = newMessage.DatePosted,
                MessageId = newMessage.MessageId,
                Starred = newMessage.Starred
            };
        }

        public void SetStarredValue(int messageId, bool starred)
        {
            var dbObj = _entities.Messages.Single(m => m.MessageId == messageId);
            dbObj.Starred = starred;
            _entities.SaveChanges();
        }

        public void DeleteMessage(int messageId)
        {
            var itemToDelete = _entities.Messages.Single(m => m.MessageId == messageId);
            _entities.Messages.Remove(itemToDelete);
            _entities.SaveChanges();
        }
    }
}
