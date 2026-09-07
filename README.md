# GUDAR DEVS - Phone Book Technical Test

Solution for the GUDAR DEVS Developer Competency Test.

## Stack

- Angular 22 (client-side only, no SSR)
- Bootstrap 5.3
- ng-bootstrap 21 for modal dialogs
- ASP.NET Core / .NET 10 Web API
- Entity Framework Core 10
- PostgreSQL 17
- REST API
- Simple API-key authorization bonus

Angular 22 is the current supported major version as of September 2026. Angular's official release page lists v22 as active. ng-bootstrap 21 is the compatible ng-bootstrap release for Angular 22 and Bootstrap 5.3.8.

## Requirements covered

- Contact grid with type, name, phone, comments, additional type-specific fields, edit and delete.
- Filter by contact type in any combination.
- Add/Edit modal.
- Delete confirmation modal.
- Angular client without SSR.
- Bootstrap styling.
- ng-bootstrap modals.
- ASP.NET Core REST API.
- PostgreSQL.
- Entity Framework Core.
- Frontend and backend validation.
- Simple authorization with `X-API-KEY`.

## Run PostgreSQL

From the project root:

```bash
docker compose up -d
```

## Run backend

Open a terminal in `backend/PhoneBook.Api`:

```bash
dotnet restore
dotnet run
```

The API runs on `http://localhost:5050` and Swagger is available at `/swagger`.

The database is created automatically on first startup with EF Core's `EnsureCreated`.

## Run frontend

Open another terminal in `frontend/phone-book`:

```bash
npm install
npm start
```

Open `http://localhost:4200`.

## API key

The Angular interceptor sends:

```text
X-API-KEY: gudar-devs-demo-key
```

This is intentionally simple because authorization was a bonus task. In a production system, use proper authentication/authorization such as JWT/OIDC and store secrets outside source control.

## Suggested GitHub commits

1. `chore: initialize solution`
2. `feat: add contact model and postgres context`
3. `feat: implement contacts REST API`
4. `feat: add Angular phone book UI`
5. `feat: add contact and delete modals`
6. `feat: add validation and simple authorization`
7. `docs: add setup instructions`
