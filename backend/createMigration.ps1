param(
    [Parameter(Mandatory = $true)]
    [string]$MigrationName
)

Write-Host "Creating migration $MigrationName"

dotnet ef migrations add $MigrationName --project ./Data/Data.csproj --startup-project ./Api/Api.csproj

if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to create migration."
    exit 1
}