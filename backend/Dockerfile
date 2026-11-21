# Build the app
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build

WORKDIR /src

COPY . .

# Restore dependencies
RUN dotnet restore "Api/Api.csproj"

# Build and publish API
RUN dotnet publish "Api/Api.csproj" --configuration Release --output /app/publish --no-restore

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final

WORKDIR /app

COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "Api.dll"]