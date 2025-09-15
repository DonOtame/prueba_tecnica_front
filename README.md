# Prueba Técnica Frontend – Abitmedia S.A.

Aplicación frontend desarrollada en Angular 20 que implementa autenticación de usuarios, gestión de publicaciones y comentarios. Se utilizan servicios centralizados, guards para protección de rutas y un sistema de internacionalización.

## Ejecución del Proyecto

Para clonar y ejecutar el proyecto `prueba_tecnica_front`, sigue estos pasos:

---

### 1. Clonar el Repositorio

Clona el repositorio del proyecto y navega dentro de la carpeta del mismo:

```bash
git clone https://github.com/DonOtame/prueba_tecnica_front.git
cd prueba_tecnica_front
```

### 2. Ejecutar Frontend y Backend con Docker

```bash
docker-compose up
```

La aplicación estará disponible en: http://localhost:80

### Notas

- Para detener Docker: `docker-compose down`
- Asegúrate de que los puertos `8080` y `80` no estén ocupados por otras aplicaciones.
- Si se ejecuta `docker-compose up` por primera vez, puede tardar unos minutos en descargar las imágenes necesarias.

## Estructura del Proyecto

### Tecnologías y Dependencias Principales

- **Angular 20**: Framework principal para el desarrollo frontend.
- **Tailwind CSS v4**: Utilizado para el diseño y estilos responsivos.
- **Flowbite**: Biblioteca de componentes UI basada en Tailwind.
- **NGX-Translate**: Soporte de internacionalización y traducciones.
- **NGX-Cookie-Service**: Manejo sencillo de cookies en Angular.
- **NGX-Sonner**: Notificaciones tipo toast para mejorar la experiencia de usuario.
- **SweetAlert2**: Diálogos de confirmación y alertas personalizadas.

La estructura del proyecto está organizada para facilitar la escalabilidad, el mantenimiento y la reutilización de componentes. A continuación se describe la disposición de carpetas y su propósito principal:

```
public/
└── i18n/                  # Archivos de traducción (JSON) para internacionalización

src/
├── app/
│   ├── core/              # Elementos centrales: servicios, guards, interceptores, modelos
│   ├── features/          # Módulos de funcionalidades: autenticación, publicaciones, comentarios
│   ├── shared/            # Componentes y utilidades reutilizables en toda la app
│
├── environments/          # Configuración de entornos (desarrollo, producción)
```

**Resumen de carpetas clave:**

- **public/i18n/**: Archivos de idioma para soportar múltiples traducciones.
- **src/app/core/**: Lógica central y servicios globales.
- **src/app/features/**: Funcionalidades principales agrupadas por dominio.
- **src/app/shared/**: Recursos reutilizables como componentes y utilidades.
- **src/environments/**: Variables y configuraciones específicas por entorno.

Esta estructura sigue las mejores prácticas de Angular para proyectos medianos y grandes.

### Componentes Principales

#### 🔐 Autenticación

- **login**: Formulario para el inicio de sesión de usuarios.
- **register**: Formulario para el registro de nuevos usuarios.

#### 📝 Publicaciones

- **posts-list**: Muestra el listado general de publicaciones.
- **post-item**: Visualiza los detalles de una publicación individual.
- **post-form**: Permite crear o editar publicaciones.

#### 💬 Comentarios

- **comment-list**: Lista los comentarios asociados a una publicación.
- **comment-item**: Visualiza un comentario individual.
- **comment-form**: Formulario para agregar o editar un comentario.

### Servicios Principales

- **auth.service.ts**: Gestiona la autenticación de usuarios, incluyendo inicio de sesión, registro y cierre de sesión.
- **post.service.ts**: Proporciona operaciones CRUD para las publicaciones.
- **comment.service.ts**: Permite crear, actualizar y eliminar comentarios.
- **post-data.service.ts**: Administra el estado de las publicaciones en memoria para una experiencia fluida.
- **auth-storage.service.ts**: Se encarga de la persistencia de la sesión utilizando almacenamiento local.

### Interceptores

- **token.interceptor.ts**: Inyecta automáticamente el token de autenticación en todas las peticiones HTTP salientes, asegurando que solo los usuarios autenticados puedan acceder a los recursos protegidos.

### Guards

- **auth.guard.ts**: Protege rutas restringidas, permitiendo el acceso únicamente a usuarios autenticados.

- **guest.guard.ts**: Restringe el acceso a determinadas rutas para usuarios que ya han iniciado sesión, permitiendo el acceso solo a usuarios invitados (no autenticados).

### Rutas Principales

La aplicación cuenta con las siguientes rutas principales:

- **/** (Home): Muestra la lista de publicaciones. Acceso restringido solo a usuarios autenticados mediante `auth.guard.ts`.
- **/login**: Página de inicio de sesión. Solo accesible para usuarios no autenticados gracias a `guest.guard.ts`.
- **/register**: Página de registro de nuevos usuarios. También protegida por `guest.guard.ts` para evitar el acceso de usuarios ya autenticados.

Los guards garantizan que:

- Solo los usuarios autenticados puedan acceder a la sección de publicaciones.
- Los usuarios no autenticados solo puedan acceder a las páginas de login y registro.

## Pantallas de la Aplicación

A continuación se muestran capturas de las principales pantallas de la aplicación en ambos modos: claro y oscuro.

### Pantalla de Login

| Modo Claro                                    | Modo Oscuro                                 |
| --------------------------------------------- | ------------------------------------------- |
| ![Login Light](public/images/login_light.png) | ![Login Dark](public/images/login_dark.png) |

### Pantalla de Registro

| Modo Claro                                          | Modo Oscuro                                       |
| --------------------------------------------------- | ------------------------------------------------- |
| ![Register Light](public/images/register_light.png) | ![Register Dark](public/images/register_dark.png) |

### Pantalla de Publicaciones

| Modo Claro                                  | Modo Oscuro                               |
| ------------------------------------------- | ----------------------------------------- |
| ![Post Light](public/images/post_light.png) | ![Post Dark](public/images/post_dark.png) |

---

Estas imágenes ilustran la interfaz responsiva y el soporte de temas de la aplicación, permitiendo una experiencia de usuario consistente en diferentes preferencias de visualización.
