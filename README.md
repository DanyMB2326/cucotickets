# Plataforma de Eventos e Inscripciones - Backend

API REST desarrollada con **Node.js**, **Express** y **MongoDB** para la gestión de usuarios, autenticación y administración de eventos.

La aplicación implementa autenticación centralizada mediante **Passport.js**, utilizando **JWT** almacenado en una **cookie HTTP Only**, además de un sistema de autorización basado en roles y un CRUD completo para la entidad **Event**.

---

# Tecnologías utilizadas

- Node.js
- Express
- MongoDB Atlas / MongoDB
- Mongoose
- Passport.js
- Passport Local
- Passport JWT
- JSON Web Token (JWT)
- bcrypt
- Zod
- Supertest
- Dotenv

---

# Arquitectura del proyecto

El proyecto sigue una arquitectura por capas para mantener el código organizado y facilitar su mantenimiento.

```
Routes
    │
    ▼
Passport Strategies
    │
    ▼
Controllers
    │
    ▼
Services
    │
    ▼
Repositories
    │
    ▼
DAO
    │
    ▼
MongoDB
```

Cada capa posee una única responsabilidad.

---

# Estructura del proyecto

```
src
│
├── config
│   ├── env.config.js
│   ├── mongoose.js
│   └── passport.config.js
│
├── controllers
│
├── dao
│
├── middlewares
│
├── models
│
├── repositories
│
├── routes
│
├── schemas
│
├── services
│
├── utils
│   ├── ApiError.js
│   ├── hash.js
│   ├── jwt.js
│   └── logger.js
│
└── app.js

server.js
package.json
```

---

# Instalación

Clonar el repositorio:

```bash
git clone https://github.com/DanyMB2326/cucotickets.git
```

Entrar al proyecto:

```bash
cd cucotickets
```

Instalar dependencias:

```bash
npm install
```

---

# Variables de entorno

Crear un archivo `.env` utilizando como base `.env.example`.

Ejemplo:

```env
PORT=8080

NODE_ENV=development

MONGO_URL=mongodb://localhost:27017/plataforma-eventos

JWT_SECRET=tu_secreto

JWT_EXPIRES_IN=1h
```

Para pruebas automatizadas se utiliza:

```
.env.test
```

---

# Ejecutar el proyecto

Modo desarrollo

```bash
npm run dev
```

Modo producción

```bash
npm start
```

---

# Pruebas

Ejecutar todas las pruebas:

```bash
npm test
```

Las pruebas verifican:

- Registro de usuarios
- Inicio de sesión
- Usuario autenticado
- Acceso sin autenticación
- Hash de contraseñas
- Generación y validación de JWT
- Autenticación mediante Passport.js
- Protección de rutas privadas
- Autorización basada en roles

---

# Autenticación

La autenticación está centralizada mediante Passport.js.

## Estrategias implementadas

### register

Se encarga de:

- Registrar nuevos usuarios.
- Validar correo duplicado.
- Hashear la contraseña mediante bcrypt.
- Asignar automáticamente el rol `user`.

---

### login

Se encarga de:

- Validar credenciales.
- Autenticar usuarios mediante Passport Local.

Después de una autenticación exitosa, el controller genera el JWT y crea la cookie HTTP Only.

---

### current

Utiliza Passport JWT para:

- Leer el JWT desde la cookie `currentUser`.
- Validar el token.
- Colocar el usuario autenticado en `req.user`.

---

# Flujo de autenticación

```
Registro
     │
     ▼
Login
     │
     ▼
Passport Local
     │
     ▼
JWT
     │
     ▼
Cookie HTTP Only
     │
     ▼
GET /current
     │
     ▼
Passport JWT
     │
     ▼
Usuario autenticado
     │
     ▼
Logout
```

---

# Roles

El sistema implementa autorización basada en roles.

## Roles disponibles

- user
- organizer
- admin

El registro público siempre crea usuarios con rol **user**.

Los roles **organizer** y **admin** únicamente pueden asignarse desde la base de datos.

---

# Matriz de permisos

| Acción | user | organizer | admin |
|--------|:----:|:---------:|:-----:|
| Consultar eventos | ✅ | ✅ | ✅ |
| Crear eventos | ❌ | ✅ | ✅ |
| Modificar eventos propios | ❌ | ✅ | ✅ |
| Modificar cualquier evento | ❌ | ❌ | ✅ |
| Ver todos los usuarios | ❌ | ❌ | ✅ |

---

# Gestión de Eventos

La entidad principal del sistema es **Event**.

## Modelo Event

Cada evento contiene los siguientes campos:

| Campo | Descripción |
|--------|-------------|
| title | Título del evento |
| description | Descripción |
| category | Categoría |
| date | Fecha |
| location | Ubicación |
| capacity | Cupo máximo |
| price | Precio |
| status | Estado |
| organizer | Referencia al usuario organizador |

El campo **organizer** es una referencia (`ObjectId`) al usuario que creó el evento.

---

## Estados del evento

- draft
- published
- cancelled
- finished

---

# Endpoints de Sesiones

## Registro

**POST**

```
/api/sessions/register
```

---

## Login

**POST**

```
/api/sessions/login
```

Genera la cookie HTTP Only:

```
currentUser
```

---

## Usuario autenticado

**GET**

```
/api/sessions/current
```

---

## Logout

**POST**

```
/api/sessions/logout
```

Elimina la cookie `currentUser`.

---

## Obtener usuarios

**GET**

```
/api/sessions/users
```

Acceso exclusivo para administradores.

---

# Endpoints de Eventos

## Crear evento

**POST**

```
/api/events
```

Roles permitidos:

- organizer
- admin

El organizador se obtiene automáticamente del usuario autenticado.

---

## Listar eventos

**GET**

```
/api/events
```

Acceso público.

---

## Obtener un evento

**GET**

```
/api/events/:id
```

Acceso público.

---

## Actualizar un evento

**PUT**

```
/api/events/:id
```

Solo:

- organizer propietario
- admin

---

## Cambiar estado

**PATCH**

```
/api/events/:id/status
```

Solo:

- organizer propietario
- admin

---

# Filtros

El endpoint

```
GET /api/events
```

permite filtrar mediante:

- status
- category
- location
- dateFrom
- dateTo

Ejemplo:

```
GET /api/events?status=published&category=Workshop
```

---

# Paginación

Parámetros soportados:

```
page
limit
```

Ejemplo:

```
GET /api/events?page=2&limit=5
```

Respuesta:

```json
{
    "status": "success",
    "payload": {
        "data": [],
        "page": 2,
        "limit": 5,
        "total": 25,
        "totalPages": 5
    }
}
```

---

# Ordenamiento

Actualmente se soporta:

```
GET /api/events?sort=date
```

---

# Reglas de negocio

- No se pueden crear eventos con fecha pasada.
- La capacidad debe ser mayor que cero.
- El precio no puede ser negativo.
- El organizador se obtiene automáticamente del usuario autenticado.
- Un organizer únicamente puede modificar sus propios eventos.
- Un admin puede modificar cualquier evento.
- Los eventos cancelados no pueden modificarse.
- Un evento finalizado no puede volver al estado `published`.
- Los eventos no se eliminan físicamente; únicamente cambian su estado a `cancelled`.

---

# Seguridad

El proyecto implementa:

- Contraseñas protegidas mediante bcrypt.
- JWT firmado con una clave secreta.
- Cookie HTTP Only.
- Passport.js.
- Validación con Zod.
- Manejo centralizado de errores.
- Variables de entorno mediante dotenv.
- La contraseña nunca se devuelve en respuestas.
- La contraseña nunca se almacena en el JWT.

---

# Escalabilidad

La autenticación fue centralizada mediante Passport.js para facilitar la incorporación de nuevas estrategias sin modificar la arquitectura.

El sistema queda preparado para integrar proveedores como:

- Google OAuth
- GitHub OAuth
- Facebook OAuth

---

# Códigos HTTP

| Código | Significado |
|---------|-------------|
| 200 | Operación exitosa |
| 201 | Recurso creado |
| 400 | Solicitud inválida |
| 401 | Usuario no autenticado |
| 403 | Usuario autenticado sin permisos suficientes |
| 404 | Recurso no encontrado |

---

# Estado del proyecto

Actualmente el proyecto implementa:

- ✅ Registro de usuarios
- ✅ Login
- ✅ JWT
- ✅ Cookies HTTP Only
- ✅ Passport.js
- ✅ Autenticación centralizada
- ✅ Autorización basada en roles
- ✅ CRUD de eventos
- ✅ Validaciones de negocio
- ✅ Filtros
- ✅ Paginación
- ✅ Ordenamiento
- ✅ MongoDB
- ✅ Arquitectura por capas
- ✅ Pruebas automatizadas

---

# Autor

**Daniela Martínez Bravo**

Facultad de Ingeniería

Universidad Nacional Autónoma de México (UNAM)

Backend II