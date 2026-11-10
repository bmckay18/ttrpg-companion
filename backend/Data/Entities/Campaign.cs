using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Entities
{
    public class Campaign
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime LastModifiedDate { get; set; }
    }
}
