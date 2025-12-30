# Sistema de Gestión de Inventario con Auditoría Proactiva

API robusta construida con **NestJS**, enfocada en la seguridad y la trazabilidad de datos. Permite la gestión de productos mientras registra automáticamente cada movimiento en un log de auditoría.

## Características de Seguridad

- **RBAC (Role-Based Access Control):** Diferenciación de permisos entre `Admin` y `User`.
- **JWT en HttpOnly Cookies:** Los tokens de sesión no son accesibles mediante JavaScript, mitigando ataques **XSS**.
- **Protección CSRF:** Implementación de `SameSite: Strict` en las cookies.
- **Auditoría Automática:** Uso de interceptores para registrar `IP` e `ID de Usuario` en cada acción sensible (POST, PATCH, DELETE).

---

## Instalación y Despliegue (Docker)

El proyecto está completamente Dockerizado con una imagen ligera de **Node.js Alpine**.

1.  **Variables de Entorno:**
    Crea un archivo `.env` en la raíz con el siguiente contenido:

    ```env
    DB_USER=mi_usuario
    DB_PASSWORD=mi_password
    DB_NAME=inventory_db

    ```

2.  **Levantar el Proyecto:**
    ```bash
    docker-compose up --build
    ```
    _La API estará disponible en `http://localhost:3000`._

---

---

## Documentación de la API

### Autenticación y Usuarios (`/users`)

| Método   | Endpoint       | Acceso  | Descripción                       |
| :------- | :------------- | :------ | :-------------------------------- |
| `POST`   | `/users`       | Público | Registro de usuario.              |
| `POST`   | `/users/login` | Público | Login y seteo de HttpOnly Cookie. |
| `GET`    | `/users`       | Público | Lista de usuarios registrados.    |
| `GET`    | `/users/:id`   | Público | Consulta de un usuario.           |
| `PATCH`  | `/users/:id`   | Público | Editar un usuario.                |
| `DELETE` | `/users/:id`   | Público | Eliminar un usuario.              |

### Gestión de Productos (`/products`)

_Requiere estar logueado. Cada cambio genera un log de auditoría._
| Método | Endpoint | Roles | Acción |
| :--- | :--- | :--- | :--- |
| `GET` | `/products` | Admin, User | Ver inventario. |
| `POST` | `/products` | Admin, User | Crear producto (Registra IP/ID). |
| `PATCH` | `/products/:id` | Admin, User | Editar producto (Registra IP/ID). |
| `DELETE` | `/products/:id` | Admin, User | Eliminar producto (Registra IP/ID). |

### Auditoría (`/audit`)

_Restringido exclusivamente a Administradores._
| Método | Endpoint | Roles | Acción |
| :--- | :--- | :--- | :--- |
| `GET` | `/audit` | **Admin** | Consultar logs (IP, Usuario, Fecha,). |
| `GET` | `/audit/:id` | **Admin** | Consultar log específico. |

---

## Configuración de CORS

Para conectar un frontend, el sistema ya permite credenciales:

```typescript
app.enableCors({
  origin: 'http://localhost:TU_PUERTO',
  credentials: true,
});
```

# Resumen de servicios

- api: (NodeJS + NestJS)
- db: (PostgreSQL)
