using System;
using System.Collections.Generic;
using System.Text;

namespace Service.CombatTracker.Models
{
    public class NpcDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CurrentHp { get; set; }
        public int MaxHp { get; set; }
    }
}
