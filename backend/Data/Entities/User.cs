using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string DisplayName { get; set; }
        public Guid AuthUserId { get; set; }
    }
}
