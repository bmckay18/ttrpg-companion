Write-Host "Applying migrations."

dotnet ef database update --project ./Data/Data.csproj --startup-project ./Api/Api.csproj

if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to create migration."
    exit 1
}