# Productos: Angular + NgRx + Dexie + API Express

## Cómo ejecutarlo

Necesitas dos terminales.

```bash
# Terminal 1: API (http://localhost:3000)
cd server
npm install
npm start

# Terminal 2: app Angular (http://localhost:4200)
cd client
npm install
npm start
```

Entra con usuario `admin` y clave `1234`.

## Dónde está cada elemento de la actividad

| # | Elemento | Archivo |
|---|----------|---------|
| 1 | Guard que usa un servicio para saber si hay usuario logueado | `client/src/app/core/auth.guard.ts` |
| 2 | Componente protegido por el Guard en su ruta | `client/src/app/app.routes.ts` (ruta `productos`, componente en `pages/productos.component.ts`) |
| 3 | Literal inyectado con `InjectionToken` propio (`API_URL`) | `client/src/app/config/tokens.ts` (definición), `app.config.ts` (valor), `services/productos.service.ts` (inyección) |
| 4 | `useClass`: `Logger` (contrato) -> `ConsoleLogger` | `client/src/app/app.config.ts`, `core/logger.ts` |
| 5 | `useExisting`: `AuthService` -> `AuthLocalService` (hereda de `AuthService`) | `client/src/app/app.config.ts`, `core/auth.service.ts` |
| 6 | API Express con array en memoria, GET y POST con JSON | `server/index.js` |
| 7 | Servicio Angular que usa `HttpClient` | `client/src/app/services/productos.service.ts` |
| 8 | Al responder bien el POST, se dispara un Action de NgRx que agrega el elemento al estado y se refleja en la UI | `services/productos.service.ts` (método `agregar`), `state/productos.actions.ts`, `state/productos.reducer.ts` |
| 9 | Base Dexie con la entidad `productos`, inyectada en un servicio y en un componente | `client/src/app/db/app-db.ts` |
| 10 | Tras el POST exitoso, el elemento también se guarda en Dexie de forma asíncrona | `services/productos.service.ts` (método `agregar`, `db.productos.put`) |

## Cómo comprobar cada comportamiento

- Abre `http://localhost:4200/productos` sin haber iniciado sesión: el Guard te redirige a `/login`.
- Agrega un producto: aparece en la lista (viene del estado de Redux) y el contador "guardados en Dexie" sube.
- En DevTools > Application > IndexedDB > `productos-db` > `productos` verás los registros.
- En la consola del navegador verás los mensajes del `ConsoleLogger`.
- La API guarda los datos solo en memoria: al reiniciarla se pierden los que agregaste.
