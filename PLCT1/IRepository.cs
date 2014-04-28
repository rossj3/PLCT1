using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PLCT1
{
    public interface IRepository
    {
        // Get All
        IEnumerable<Message> GetMessages();

        // Create
        // AddMessage will add a new Message in the DB, unstarred.
        // Id and Timestamp are assigned by repository, and new object is returned.
        Message AddMessage(string content);

        // Update
        void SetStarredValue(int messageId, bool starred);

        // Delete
        void DeleteMessage(int messageId);
    }
}
