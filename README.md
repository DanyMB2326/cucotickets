# Plataforma de Eventos e Inscripciones

Backend desarrollado con **Node.js**, **Express** y **MongoDB** para la gestión de usuarios de una Plataforma de Eventos e Inscripciones.

## Características

- Registro seguro de usuarios
- Inicio de sesión con JWT
- Autenticación mediante cookies HTTP Only
- Middleware de autenticación
- Hash de contraseñas con bcrypt
- Validación de datos con Zod
- Arquitectura en capas
- Pruebas unitarias e integración

---

# Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- bcrypt
- JSON Web Token (JWT)
- cookie-parser
- Zod
- Supertest
- Node Test Runner

---

# Arquitectura

El proyecto sigue una arquitectura por capas:

```
src
│
├── config
├── controllers
├── dao
├── middlewares
├── models
├── repositories
├── routes
├── schemas
├── services
├── utils
└── app.js
```

Cada capa tiene una responsabilidad específica:

- **Routes:** definición de endpoints.
- **Controllers:** manejo de solicitudes y respuestas.
- **Services:** lógica de negocio.
- **Repositories:** comunicación con el DAO.
- **DAO:** acceso a MongoDB mediante Mongoose.
- **Models:** modelos de la base de datos.
- **Middlewares:** autenticación, validación y manejo de errores.
- **Schemas:** validaciones con Zod.
- **Utils:** funciones reutilizables (JWT y bcrypt).

---

# Instalación

## 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
```

Entrar al proyecto:

```bash
cd plataforma-eventos
```

---

## 2. Instalar dependencias

```bash
npm install
```

---

## 3. Configurar variables de entorno

Crear un archivo **.env** tomando como base **.env.example**.

Ejemplo:

```env
PORT=8080
NODE_ENV=development

MONGO_URL=mongodb://localhost:27017/plataforma-eventos

JWT_SECRET=mi_clave_super_secreta

JWT_EXPIRES_IN=1h
```

---

## 4. Ejecutar el servidor

```bash
npm start
```

Servidor:

```
http://localhost:8080
```

---

# Endpoints

## Registro

**POST**

```
/api/sessions/register
```

Body

```json
{
    "first_name": "Daniela",
    "last_name": "Martinez",
    "email": "daniela@gmail.com",
    "password": "12345678"
}
```

Respuesta

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

Body

```json
{
    "email":"daniela@gmail.com",
    "password":"12345678"
}
```

Respuesta

```json
{
    "status":"success",
    "payload":{
        "_id":"...",
        "first_name":"Daniela",
        "last_name":"Martinez",
        "email":"daniela@gmail.com",
        "role":"user"
    }
}
```

Además genera una cookie HTTP Only llamada:

```
currentUser
```

---

## Usuario autenticado

**GET**

```
/api/sessions/current
```

Requiere la cookie generada durante el login.

Respuesta

```json
{
    "status":"success",
    "payload":{
        "id":"...",
        "email":"daniela@gmail.com",
        "role":"user"
    }
}
```

---

## Logout

**POST**

```
/api/sessions/logout
```

Respuesta

```json
{
    "status":"success",
    "message":"Sesión cerrada correctamente"
}
```

---

# Seguridad implementada

- Contraseñas protegidas mediante bcrypt.
- JWT firmado utilizando una clave almacenada en variables de entorno.
- Cookies HTTP Only.
- Validación de datos con Zod.
- Normalización del correo electrónico.
- Prevención de usuarios duplicados.
- El password nunca se devuelve en las respuestas.

---

# Pruebas

Ejecutar todas las pruebas:

```bash
npm test
```

Las pruebas incluyen:

## Integración

- Registro exitoso
- Registro con email inválido
- Registro con usuario duplicado
- Login exitoso
- Login con credenciales inválidas
- Consulta del usuario autenticado
- Consulta sin autenticación
- Logout

## Unitarias

- Hash de contraseñas
- Generación y validación de JWT

---

# Variables de entorno

El proyecto utiliza:

| Variable | Descripción |
|----------|-------------|
| PORT | Puerto del servidor |
| MONGO_URL | Cadena de conexión a MongoDB |
| JWT_SECRET | Clave para firmar los JWT |
| JWT_EXPIRES_IN | Tiempo de expiración del JWT |
| NODE_ENV | development o production |

---

# Autor

**Daniela Martínez Bravo**

Facultad de Ingeniería - UNAM

Ingeniería en Computación

Proyecto desarrollado para la asignatura **Backend II**.