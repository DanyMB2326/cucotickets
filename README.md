# Events and Registration Platform API

API REST para la gestión integral de eventos y su proceso de registro, desarrollada como proyecto final de la asignatura **Backend II**. El sistema permite la creación y administración de eventos, así como el registro, emisión y control de tickets de los usuarios, implementando una arquitectura por capas robusta, validación estricta de datos y buenas prácticas de seguridad.

---

## Tabla de Contenidos

1. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
2. [Tecnologías Utilizadas](#tecnologías-utilizadas)
3. [Instalación](#instalación)
4. [Variables de Entorno](#variables-de-entorno)
5. [Ejecución](#ejecución)
6. [Pruebas](#pruebas)
7. [Autenticación](#autenticación)
8. [Roles y Permisos](#roles-y-permisos)
9. [Gestión de Eventos](#gestión-de-eventos)
10. [Gestión de Tickets](#gestión-de-tickets)
11. [Reglas de Negocio](#reglas-de-negocio)
12. [Endpoints](#endpoints)
13. [DTOs (Data Transfer Objects)](#dtos-data-transfer-objects)
14. [Seguridad](#seguridad)
15. [Escalabilidad](#escalabilidad)
16. [Códigos de Estado HTTP](#códigos-de-estado-http)
17. [Estado del Proyecto](#estado-del-proyecto)
18. [Autor](#autor)

---

## Arquitectura del Proyecto

El proyecto está construido bajo el patrón **DAO – Repository – DTO**, aplicando una separación estricta de responsabilidades a lo largo de las capas de la aplicación. El flujo de una petición sigue el siguiente orden:

```
Cliente → Route → Controller → Service → Repository → DAO → Model (MongoDB)
```

### Responsabilidad de cada capa

| Capa | Responsabilidad |
|------|------------------|
| **Route** | Define los endpoints disponibles, el método HTTP y enlaza cada ruta con su controlador correspondiente. No contiene lógica de negocio. |
| **Controller** | Recibe la petición HTTP, valida el formato de entrada mediante los esquemas de Zod, invoca al servicio correspondiente y construye la respuesta HTTP (status code + payload). No accede directamente a la base de datos. |
| **Service** | Contiene la lógica de negocio de la aplicación: validaciones semánticas, reglas de dominio, orquestación entre entidades y transformación de datos mediante DTOs. Es agnóstico a Express y a la base de datos. |
| **Repository** | Actúa como intermediario entre el Service y el DAO, exponiendo operaciones de negocio orientadas a entidades (por ejemplo, `buscarEventosDisponibles`). Desacopla al Service del motor de persistencia específico. |
| **DAO (Data Access Object)** | Encapsula el acceso directo a la base de datos mediante Mongoose, ejecutando operaciones CRUD puras sobre los modelos. Es la única capa que interactúa directamente con la base de datos. |
| **Model** | Define los esquemas de Mongoose (estructura, tipos de datos, índices y validaciones a nivel de base de datos) para cada entidad del sistema. |
| **DTO** | Estructura los datos que se transfieren entre capas y hacia el cliente, evitando exponer campos sensibles o innecesarios del modelo de datos. |

Esta arquitectura favorece la **mantenibilidad**, la **testabilidad** y la posibilidad de sustituir el motor de persistencia sin afectar la lógica de negocio.

---

## Tecnologías Utilizadas

- **Node.js** – Entorno de ejecución de JavaScript en el servidor.
- **Express.js** – Framework para la construcción de la API REST.
- **MongoDB** – Base de datos NoSQL orientada a documentos.
- **Mongoose** – ODM para el modelado de datos y la comunicación con MongoDB.
- **Zod** – Validación y tipado de esquemas de entrada.
- **bcrypt** – Hasheo seguro de contraseñas.
- **JSON Web Tokens (JWT)** – Autenticación basada en tokens.
- **ES Modules (ESM)** – Sistema de módulos nativo de JavaScript.
- **Node Test Runner + Supertest** – Pruebas unitarias e de integración.

---

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/DanyMB2326/<nombre-del-repositorio>.git
   cd <nombre-del-repositorio>
   ```

2. Instalar las dependencias:

   ```bash
   npm install
   ```

3. Crear el archivo de variables de entorno `.env` en la raíz del proyecto (ver sección siguiente).

---

## Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Servidor
PORT=3000
NODE_ENV=development

# Base de datos
MONGO_URI=mongodb://localhost:27017/events_platform

# Autenticación
JWT_SECRET=tu_clave_secreta
JWT_EXPIRES_IN=1d

# Seguridad
BCRYPT_SALT_ROUNDS=10
```

> **Nota:** El archivo `.env` no debe subirse al repositorio. Se recomienda incluir `.env.example` con las variables sin valores sensibles como referencia.

---

## Ejecución

**Modo desarrollo** (con recarga automática):

```bash
npm run dev
```

**Modo producción:**

```bash
npm start
```

El servidor quedará disponible por defecto en:

```
http://localhost:3000
```

---

## Pruebas

El proyecto utiliza el **test runner nativo de Node.js** junto con **Supertest** para pruebas de integración sobre los endpoints.

```bash
npm test
```

Las pruebas cubren, entre otros aspectos:

- Validación de esquemas de entrada (Zod).
- Casos de éxito y error en los endpoints de autenticación, eventos y tickets.
- Reglas de negocio (por ejemplo, control de capacidad de eventos y prevención de doble registro).
- Respuestas y códigos de estado HTTP esperados.

---

## Autenticación

La autenticación se implementa mediante **JSON Web Tokens (JWT)**:

1. El usuario se registra o inicia sesión mediante los endpoints correspondientes.
2. Las contraseñas se almacenan utilizando **bcrypt** con salting, nunca en texto plano.
3. Al iniciar sesión exitosamente, el servidor emite un **token JWT** firmado con `JWT_SECRET`.
4. El cliente debe enviar el token en el header `Authorization` en las peticiones protegidas:

   ```
   Authorization: Bearer <token>
   ```

5. Un middleware de autenticación verifica la validez y vigencia del token antes de permitir el acceso a rutas protegidas.

---

## Roles y Permisos

El sistema contempla los siguientes roles:

| Rol | Descripción | Permisos principales |
|-----|-------------|------------------------|
| **Administrador** | Gestiona la plataforma en su totalidad. | Crear, editar y eliminar eventos; gestionar usuarios; consultar y administrar todos los tickets. |
| **Organizador** | Responsable de la creación y gestión de eventos propios. | Crear y editar sus propios eventos; consultar los tickets asociados a sus eventos. |
| **Usuario/Asistente** | Usuario final de la plataforma. | Consultar eventos disponibles; registrarse a eventos; gestionar sus propios tickets. |

El control de acceso se implementa mediante middlewares de autorización basados en el rol contenido en el payload del token JWT.

---

## Gestión de Eventos

Los eventos son la entidad central de la plataforma. Cada evento cuenta con:

- Título, descripción y categoría.
- Fecha y hora de inicio/fin.
- Ubicación (física o virtual).
- Capacidad máxima de asistentes.
- Precio (gratuito o de pago).
- Estado (`activo`, `cancelado`, `finalizado`).
- Organizador responsable.

**Funcionalidades principales:**

- Creación, edición y eliminación de eventos (rol Organizador/Administrador).
- Consulta pública de eventos disponibles, con filtros por fecha, categoría y ubicación.
- Control automático de disponibilidad de cupo en función de los tickets emitidos.

---

## Gestión de Tickets

Los tickets representan el registro de un usuario a un evento específico. Cada ticket incluye:

- Referencia al evento y al usuario.
- Código único de identificación.
- Estado (`confirmado`, `cancelado`, `usado`).
- Fecha de emisión.

**Funcionalidades principales:**

- Emisión de ticket al registrarse a un evento.
- Validación de disponibilidad de cupo antes de emitir el ticket.
- Cancelación de tickets por parte del usuario o del administrador.
- Consulta del historial de tickets por usuario.

---

## Reglas de Negocio

- Un usuario **no puede registrarse dos veces** al mismo evento mientras tenga un ticket activo.
- Un evento **no puede exceder su capacidad máxima**; al alcanzarla, se rechaza la emisión de nuevos tickets.
- Solo el **organizador propietario** del evento o un **administrador** pueden editarlo o eliminarlo.
- No es posible registrar tickets para eventos con estado `cancelado` o `finalizado`.
- La cancelación de un ticket libera automáticamente el cupo correspondiente en el evento.
- Las contraseñas deben cumplir criterios mínimos de seguridad definidos en el esquema de validación de Zod.

---

## Endpoints

### Autenticación

| Método | Endpoint | Descripción | Acceso |
|--------|----------|-------------|--------|
| `POST` | `/api/auth/register` | Registro de un nuevo usuario. | Público |
| `POST` | `/api/auth/login` | Inicio de sesión y emisión de token JWT. | Público |
| `POST` | `/api/auth/logout` | Cierre de sesión. | Autenticado |

### Usuarios

| Método | Endpoint | Descripción | Acceso |
|--------|----------|-------------|--------|
| `GET` | `/api/users/me` | Obtiene el perfil del usuario autenticado. | Autenticado |
| `PUT` | `/api/users/me` | Actualiza los datos del usuario autenticado. | Autenticado |
| `GET` | `/api/users` | Lista todos los usuarios. | Administrador |
| `DELETE` | `/api/users/:id` | Elimina un usuario. | Administrador |

### Eventos

| Método | Endpoint | Descripción | Acceso |
|--------|----------|-------------|--------|
| `GET` | `/api/events` | Lista los eventos disponibles (con filtros opcionales). | Público |
| `GET` | `/api/events/:id` | Obtiene el detalle de un evento. | Público |
| `POST` | `/api/events` | Crea un nuevo evento. | Organizador / Administrador |
| `PUT` | `/api/events/:id` | Actualiza un evento existente. | Organizador (propietario) / Administrador |
| `DELETE` | `/api/events/:id` | Elimina un evento. | Organizador (propietario) / Administrador |

### Tickets

| Método | Endpoint | Descripción | Acceso |
|--------|----------|-------------|--------|
| `POST` | `/api/events/:id/tickets` | Registra al usuario autenticado en el evento (emite ticket). | Autenticado |
| `GET` | `/api/tickets/me` | Lista los tickets del usuario autenticado. | Autenticado |
| `GET` | `/api/tickets/:id` | Obtiene el detalle de un ticket. | Autenticado / Administrador |
| `PATCH` | `/api/tickets/:id/cancel` | Cancela un ticket. | Autenticado (propietario) / Administrador |
| `GET` | `/api/events/:id/tickets` | Lista los tickets de un evento. | Organizador (propietario) / Administrador |

---

## DTOs (Data Transfer Objects)

Los DTOs se utilizan para controlar de manera explícita la información que se expone en las respuestas de la API, evitando filtrar campos sensibles (como contraseñas hasheadas o metadatos internos).

**Ejemplos representativos:**

```javascript
// UserResponseDTO
{
  id: string,
  nombre: string,
  email: string,
  rol: "admin" | "organizador" | "usuario",
  createdAt: Date
}

// EventResponseDTO
{
  id: string,
  titulo: string,
  descripcion: string,
  fecha: Date,
  ubicacion: string,
  capacidad: number,
  cuposDisponibles: number,
  precio: number,
  estado: "activo" | "cancelado" | "finalizado",
  organizador: UserResponseDTO
}

// TicketResponseDTO
{
  id: string,
  codigo: string,
  estado: "confirmado" | "cancelado" | "usado",
  evento: EventResponseDTO,
  usuario: UserResponseDTO,
  fechaEmision: Date
}
```

---

## Seguridad

- **Hasheo de contraseñas** mediante `bcrypt`, nunca se almacenan en texto plano.
- **Autenticación basada en JWT** con expiración configurable.
- **Validación estricta de entrada** en todos los endpoints mediante esquemas de Zod, previniendo inyección de datos malformados.
- **Control de acceso basado en roles (RBAC)** mediante middlewares de autorización.
- **Manejo centralizado de errores**, evitando la exposición de información sensible (stack traces, detalles internos) en producción.
- **Variables de entorno** para el manejo de credenciales y secretos, excluidas del control de versiones.

---

## Escalabilidad

La arquitectura por capas (DAO–Repository–DTO) fue diseñada considerando el crecimiento futuro del sistema:

- **Independencia del motor de persistencia:** al aislar el acceso a datos en la capa DAO, sería posible migrar de MongoDB a otro motor de base de datos sin modificar la lógica de negocio.
- **Bajo acoplamiento entre capas**, lo que facilita la incorporación de nuevas funcionalidades (por ejemplo, pagos, notificaciones o reportes) sin afectar los módulos existentes.
- **Modularidad**, que permite escalar el proyecto hacia una arquitectura de microservicios en etapas futuras si el volumen de usuarios lo requiere.
- **Pruebas automatizadas**, que garantizan estabilidad ante cambios y refactorizaciones progresivas.

---

## Códigos de Estado HTTP

| Código | Significado | Uso en la API |
|--------|-------------|----------------|
| `200 OK` | Solicitud procesada correctamente. | Consultas y actualizaciones exitosas. |
| `201 Created` | Recurso creado exitosamente. | Registro de usuario, creación de evento o ticket. |
| `400 Bad Request` | Error de validación en los datos enviados. | Fallos en la validación con Zod. |
| `401 Unauthorized` | Autenticación requerida o token inválido/ausente. | Acceso a rutas protegidas sin token válido. |
| `403 Forbidden` | El usuario no tiene permisos suficientes. | Acceso a recursos restringidos por rol. |
| `404 Not Found` | El recurso solicitado no existe. | Evento, ticket o usuario inexistente. |
| `409 Conflict` | Conflicto con el estado actual del recurso. | Registro duplicado a un evento, cupo agotado. |
| `500 Internal Server Error` | Error inesperado del servidor. | Fallos no controlados en la aplicación. |

---

## Estado del Proyecto

🚧 **En desarrollo activo**

El proyecto se encuentra en fase de implementación como entrega final de la asignatura Backend II. Actualmente:

- ✅ Arquitectura por capas (DAO–Repository–DTO) implementada.
- ✅ Validación de datos con Zod.
- ✅ Hasheo de contraseñas con bcrypt.
- ✅ Suite de pruebas con Node Test Runner y Supertest (pasando en su totalidad).
- 🔄 Documentación y ajustes finales en curso.

---

## Autor

**Daniela** – Estudiante de Ingeniería en Computación, Facultad de Ingeniería, UNAM.

- GitHub: [@DanyMB2326](https://github.com/DanyMB2326)

---

*Proyecto desarrollado con fines académicos como entrega final de la asignatura Backend II.*
