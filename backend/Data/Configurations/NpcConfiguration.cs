using Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Configurations
{
    public class NpcConfiguration : IEntityTypeConfiguration<Npc>
    {
        public void Configure(EntityTypeBuilder<Npc> builder)
        {
            builder.HasOne<Campaign>()
                .WithMany()
                .HasForeignKey(c => c.CampaignId);
        }
    }
}
