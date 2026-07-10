# Plataforma de Eventos e Inscripciones - Backend

API REST desarrollada con **Node.js**, **Express** y **MongoDB** para la gestión de usuarios y autenticación.

Esta versión implementa autenticación centralizada mediante **Passport.js**, utilizando **JWT** almacenado en una **cookie HTTP Only** para mantener la sesión autenticada.

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

El proyecto sigue una arquitectura por capas para mantener el código organizado y facilitar el mantenimiento.

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

Cada capa tiene una única responsabilidad.

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
git clone <URL_DEL_REPOSITORIO>
```

Entrar al proyecto:

```bash
cd plataforma-eventos
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

Para pruebas se utiliza un archivo independiente:

```text
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

---

# Estrategias Passport

La autenticación se encuentra centralizada mediante Passport.js.

## register

Se encarga de:

- Registrar nuevos usuarios
- Validar correo duplicado
- Hashear la contraseña con bcrypt
- Asignar el rol por defecto (`user`)

---

## login

Se encarga de:

- Validar credenciales
- Autenticar usuarios mediante Passport Local

Después de una autenticación exitosa, el **controller** genera el JWT y crea la cookie HTTP Only.

---

## current

Utiliza Passport JWT para:

- Leer el JWT desde la cookie `currentUser`
- Validar el token
- Colocar el usuario autenticado en `req.user`

---

# Endpoints

## Registro

**POST**

```
/api/sessions/register
```

### Request

```json
{
    "first_name": "Daniela",
    "last_name": "Martinez",
    "email": "daniela@gmail.com",
    "password": "12345678"
}
```

### Response

```json
{
    "status": "success",
    "payload": {
        "_id": "...",
        "first_name": "Daniela",
        "last_name": "Martinez",
        "email": "daniela@gmail.com",
        "role": "user"
    }
}
```

---

## Login

**POST**

```
/api/sessions/login
```

### Request

```json
{
    "email": "daniela@gmail.com",
    "password": "12345678"
}
```

### Response

```json
{
    "status": "success",
    "payload": {
        "_id": "...",
        "email": "daniela@gmail.com",
        "role": "user"
    }
}
```

Genera una cookie HTTP Only llamada:

```
currentUser
```

---

## Usuario autenticado

**GET**

```
/api/sessions/current
```

### Response

```json
{
    "status": "success",
    "payload": {
        "id": "...",
        "email": "daniela@gmail.com",
        "role": "user"
    }
}
```

---

## Logout

**POST**

```
/api/sessions/logout
```

Elimina la cookie `currentUser`.

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

# Seguridad

El proyecto implementa las siguientes medidas de seguridad:

- Contraseñas almacenadas mediante bcrypt.
- JWT firmado con una clave secreta.
- Cookie HTTP Only.
- Validación de datos con Zod.
- Manejo centralizado de errores.
- Variables de entorno mediante dotenv.
- Password nunca devuelto en respuestas.
- Password nunca incluido en el JWT.

---

# Escalabilidad

La autenticación fue centralizada mediante Passport.js para facilitar la incorporación de nuevas estrategias sin modificar la estructura del proyecto.

El sistema queda preparado para integrar proveedores como:

- Google OAuth
- GitHub OAuth
- Facebook OAuth

---

## Estado del proyecto

✅ Registro de usuarios

✅ Login

✅ JWT

✅ Cookies HTTP Only

✅ Passport.js

✅ MongoDB

✅ Pruebas automatizadas

✅ Arquitectura por capas

# Autor

**Daniela Martínez Bravo**

Facultad de Ingeniería

Universidad Nacional Autónoma de México (UNAM)

Backend II