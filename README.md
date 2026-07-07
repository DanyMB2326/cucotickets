# Plataforma de Eventos e Inscripciones

Backend desarrollado con **Node.js**, **Express**, **MongoDB**, **Mongoose** y **bcrypt** para la gestión de usuarios de una Plataforma de Eventos e Inscripciones.

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- bcrypt

## Instalación

1. Clonar el repositorio.

```bash
git clone <URL_DEL_REPOSITORIO>
```

2. Entrar a la carpeta del proyecto.

```bash
cd plataforma-eventos
```

3. Instalar las dependencias.

```bash
npm install
```

4. Crear un archivo `.env` utilizando como base el archivo `.env.example`.

## Variables de entorno

Crear un archivo `.env` con el siguiente contenido:

```env
PORT=8080
NODE_ENV=development
MONGO_URL=mongodb://localhost:27017/plataforma-eventos
JWT_SECRET=cambiar_este_valor_por_un_secreto_seguro
```

## Ejecutar el proyecto

Iniciar el servidor con:

```bash
npm start
```

El servidor estará disponible en:

```
http://localhost:8080
```

## Endpoint implementado

### Registrar usuario

**POST**

```
/api/sessions/register
```

### Body esperado

```json
{
    "first_name": "Daniela",
    "last_name": "Martinez",
    "email": "daniela@gmail.com",
    "password": "12345678"
}
```

### Respuesta exitosa

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

## Validaciones implementadas

- Todos los campos son obligatorios.
- Validación del formato del correo electrónico.
- La contraseña debe tener una longitud mínima de 8 caracteres.
- El correo se normaliza utilizando `trim()` y `toLowerCase()`.
- No se permite registrar usuarios con un correo ya existente.
- La contraseña se almacena utilizando **bcrypt**.
- El rol del usuario se asigna automáticamente como **user**.
- La contraseña no se devuelve en la respuesta del endpoint.

## Arquitectura del proyecto

El proyecto sigue una arquitectura en capas:

```
Ruta
    ↓
Controller
    ↓
Service
    ↓
Repository
    ↓
DAO
    ↓
MongoDB
```

## Casos probados

- Registro exitoso.
- Campos obligatorios faltantes.
- Correo con formato inválido.
- Correo ya registrado.
- Contraseña almacenada de forma segura mediante bcrypt.
- La respuesta del endpoint no incluye la contraseña.

## Autor

Daniela Martínez Bravo