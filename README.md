# Athena

ASPNETCORE_ENVIRONMENT=Development dotnet watch run

## migrate a database

dotnet ef migrations add "Identity" -o "Data/Migrations"

## update a database

dotnet ef database updat