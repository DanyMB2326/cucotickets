# Plataforma de Eventos e Inscripciones — Backend

Proyecto final de **Backend II**. API REST para una plataforma de gestión de eventos e inscripciones.

Esta pre-entrega (Pre-entrega 1) establece la **base arquitectónica** del proyecto: un servidor Express organizado por capas, con manejo de errores centralizado y validación de datos, listo para escalar en las siguientes entregas (registro, login, JWT, cookies, Passport, roles, autorización, gestión de eventos, inscripciones, control de cupos y notificaciones).

## Temática elegida

**Plataforma de Eventos e Inscripciones**: sistema donde los usuarios podrán consultar eventos disponibles, inscribirse a sesiones/charlas dentro de esos eventos, y los administradores podrán gestionar el catálogo de eventos y cupos.

## Tecnologías

- Node.js
- Express
- dotenv
- Zod (validación de datos)
- Módulos ES (ESM) — `import` / `export`
- Node Test Runner (`node:test`) + Supertest para pruebas unitarias e integración
- (Próximas entregas) MongoDB + Mongoose, JWT, cookies, Passport

## Instalación

```bash
git clone <url-de-tu-repositorio>
cd <nombre-de-la-carpeta-clonada>   # el nombre real depende de cómo se llame tu repo en GitHub
npm install
```

## Configuración de variables de entorno

1. Copiar el archivo de ejemplo:

   ```bash
   cp .env.example .env
   ```

   (En Windows/PowerShell: `copy .env.example .env`)

2. Completar los valores en `.env`:

| Variable      | Descripción                                              |
|---------------|-----------------------------------------------------------|
| `PORT`        | Puerto en el que corre el servidor (por defecto `8080`)   |
| `NODE_ENV`    | Entorno de ejecución (`development` / `production`)       |
| `MONGO_URL`   | Cadena de conexión a MongoDB (se usará en próximas entregas) |
| `JWT_SECRET`  | Secreto para firmar JWT (se usará en próximas entregas)   |

## Cómo ejecutar

```bash
# Modo desarrollo (requiere nodemon, incluido en devDependencies)
npm run dev

# Modo producción
npm start
```

El servidor quedará disponible en `http://localhost:<PORT>`.

## Cómo correr las pruebas

```bash
npm test
```

Corre con el runner nativo de Node (`node:test`):
- **Unitarias** (`tests/unit`): capa de servicio de eventos y esquema de validación.
- **Integración** (`tests/integration`): endpoints reales de la API con Supertest (health check, listado/creación de eventos con validación, manejo de rutas inexistentes).

## Estructura de carpetas

```
plataforma-eventos/
├── server.js                   # Levanta el servidor
├── src/
│   ├── app.js                  # Configuración de Express y middlewares globales
│   ├── config/                 # Configuración (variables de entorno, etc.)
│   ├── routes/                 # Definición de endpoints
│   ├── controllers/            # Manejo de request/response
│   ├── services/                # Lógica de negocio
│   ├── repositories/           # Abstracción entre servicios y DAO
│   ├── dao/                    # Acceso a datos (hoy en memoria, luego MongoDB)
│   ├── models/                 # Modelos de datos (User, Event)
│   ├── schemas/                # Esquemas de validación con Zod
│   ├── middlewares/            # Logger, validación, 404 y manejo global de errores
│   └── utils/                   # ApiError, asyncHandler, logger
├── tests/
│   ├── unit/                   # Pruebas unitarias (servicio, esquema)
│   └── integration/            # Pruebas de integración (endpoints con Supertest)
├── .env.example
├── .gitignore
└── package.json
```

## Manejo de errores

Todos los controladores usan `asyncHandler` para reenviar cualquier error a un middleware
de errores global (`errorHandler.middleware.js`), que responde con un formato consistente:

```json
{ "status": "error", "message": "..." }
```

Las rutas inexistentes son capturadas por `notFoundHandler.middleware.js` y devuelven un `404`
con el mismo formato.

## Validación de datos

`POST /api/events` valida el body con un esquema de **Zod** (`src/schemas/event.schema.js`)
a través del middleware genérico `validate.middleware.js`. Si los datos son inválidos,
responde `400` con el detalle de los campos que fallaron:

```json
{
  "status": "error",
  "message": "Datos inválidos",
  "details": [{ "field": "title", "message": "El título debe tener al menos 3 caracteres" }]
}
```

## Rutas disponibles

| Método | Ruta                     | Descripción                                          |
|--------|--------------------------|-------------------------------------------------------|
| GET    | `/api/health`             | Verifica que el servidor está activo                  |
| GET    | `/api/events`             | Lista todos los eventos (vacío por ahora)              |
| GET    | `/api/events/:id`         | Obtiene un evento por id (404 si no existe)            |
| POST   | `/api/events`             | Crea un evento (valida el body con Zod)                |
| GET    | `/api/sessions/current`   | Estructura inicial, sin lógica de autenticación        |

## Estado del proyecto

Esta es la **base arquitectónica inicial**. Aún no incluye:

- Conexión real a MongoDB (por ahora los datos viven en memoria en la capa DAO)
- Autenticación y autorización (registro, login, JWT, cookies, Passport, roles)
- Gestión completa de eventos, inscripciones y control de cupos
- Notificaciones

Estas funcionalidades se incorporarán en las próximas pre-entregas.
