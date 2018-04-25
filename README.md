# Athena

ASPNETCORE_ENVIRONMENT=Development dotnet watch run

## migrate a database

dotnet ef migrations add "Identity" -o "Data/Migrations"

## update a database

- option 1: update

```bash
dotnet ef database update
```

- option 2: drop and recreate

```bash
dotnet ef database drop
dotnet ef database update
```
