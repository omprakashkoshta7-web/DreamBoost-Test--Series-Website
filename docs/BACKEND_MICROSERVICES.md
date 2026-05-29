# Backend Microservices

The backend now runs from a shared Express app factory plus service-specific route registries.

## Services

| Service | Default port | Routes |
| --- | ---: | --- |
| `gateway` | `3000` | All existing `/api` routes. Use this for current frontend compatibility. |
| `identity` | `3001` | `/api/auth`, `/api/otp`, `/api/profile`, `/api/settings` |
| `learning` | `3002` | `/api/dashboard`, `/api/tests`, `/api/leaderboard`, `/api/study`, content routes, `/api/exam` |
| `commerce` | `3003` | `/api/payments`, `/api/subscription` |
| `engagement` | `3004` | `/api/notifications`, support routes |
| `admin` | `3005` | `/api/admin` |

## Run

```bash
cd server
npm run dev:gateway
npm run dev:identity
npm run dev:learning
npm run dev:commerce
npm run dev:engagement
npm run dev:admin
```

For deployment, build once and start the needed service by setting `SERVICE_NAME`.

```bash
npm run build
SERVICE_NAME=learning PORT=3002 node dist/index.js
```

On Windows PowerShell, use:

```powershell
$env:SERVICE_NAME="learning"; $env:PORT="3002"; node dist/index.js
```

## Code Layout

- `server/src/app.ts`: shared Express app factory.
- `server/src/bootstrap.ts`: starts one selected service.
- `server/src/microservices/registry.ts`: service-to-route map.
- `server/src/features/index.ts`: gateway compatibility router.

All existing controllers, models, middleware, validators, scripts, and shared services remain in place. The route registry defines the service boundary without duplicating business logic.
