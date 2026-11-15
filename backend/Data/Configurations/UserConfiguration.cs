using Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.DisplayName)
                .IsRequired();

            builder.Property(x => x.AuthUserId)
                .IsRequired();

            builder.HasIndex(x => x.AuthUserId)
                .IsUnique();
        }
    }
}
