using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PLCT1
{
    public class Message
    {
        public int MessageId { get; set; }
        public string Content { get; set; }
        public DateTime DatePosted { get; set; }
        public bool Starred { get; set; }
    }
}
