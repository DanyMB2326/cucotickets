# Plataforma de Eventos e Inscripciones — Backend

Proyecto final de **Backend II**. API REST para una plataforma de gestión de eventos e inscripciones.

Esta pre-entrega (Pre-entrega 1) establece la **base arquitectónica** del proyecto: un servidor Express organizado por capas, listo para escalar en las siguientes entregas (registro, login, JWT, cookies, Passport, roles, autorización, gestión de eventos, inscripciones, control de cupos y notificaciones).

## Temática elegida

**Plataforma de Eventos e Inscripciones**: sistema donde los usuarios podrán consultar eventos disponibles, inscribirse a sesiones/charlas dentro de esos eventos, y los administradores podrán gestionar el catálogo de eventos y cupos.

## Tecnologías

- Node.js
- Express
- dotenv
- Módulos ES (ESM) — `import` / `export`
- (Próximas entregas) MongoDB + Mongoose, JWT, cookies, Passport

## Instalación

```bash
git clone <url-del-repositorio>
cd plataforma-eventos
npm install
```

## Configuración de variables de entorno

1. Copiar el archivo de ejemplo:

   ```bash
   cp .env.example .env
   ```

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

## Estructura de carpetas

```
plataforma-eventos/
├── server.js                  # Levanta el servidor
├── src/
│   ├── app.js                 # Configuración de Express
│   ├── config/                # Configuración (variables de entorno, etc.)
│   ├── routes/                # Definición de endpoints
│   ├── controllers/           # Manejo de request/response
│   ├── services/               # Lógica de negocio
│   ├── repositories/          # Abstracción entre servicios y DAO
│   ├── dao/                   # Acceso a datos (hoy en memoria, luego MongoDB)
│   ├── models/                # Modelos de datos (User, Event)
│   ├── middlewares/            # Middlewares (vacío por ahora)
│   └── utils/                  # Utilidades (vacío por ahora)
├── .env.example
├── .gitignore
└── package.json
```

## Rutas disponibles

| Método | Ruta                | Descripción                                      |
|--------|---------------------|---------------------------------------------------|
| GET    | `/api/health`        | Verifica que el servidor está activo              |
| GET    | `/api/events`        | Lista todos los eventos (vacío por ahora)          |
| GET    | `/api/events/:id`    | Obtiene un evento por id                           |
| POST   | `/api/events`        | Crea un evento                                     |
| GET    | `/api/sessions/current` | Estructura inicial, sin lógica de autenticación |

## Estado del proyecto

Esta es la **base arquitectónica inicial**. Aún no incluye:

- Conexión real a MongoDB (por ahora los datos viven en memoria en la capa DAO)
- Autenticación y autorización (registro, login, JWT, cookies, Passport, roles)
- Gestión completa de eventos, inscripciones y control de cupos
- Notificaciones

Estas funcionalidades se incorporarán en las próximas pre-entregas.
