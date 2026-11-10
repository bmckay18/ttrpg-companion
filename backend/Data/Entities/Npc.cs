using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Entities
{
    public class Npc
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int MaxHp { get; set; }
        public int CurrentHp { get; set; }
    }
}
