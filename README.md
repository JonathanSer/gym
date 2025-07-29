1. Encabezado
# Sistema de gestion de membresias de Gimnasio(FitZone Gym)
## Equipo 9
# Integrantes
**Sanchez Jimenez Miguel Leonardo**

**Serrano Cortes Jonathan**
## ¿Qué hace el sistema?
El sistema nos permite crear, modificar y gestionar las membresias de los usuarios.

Tipo de sistema (ejemplo: Sistema Web).
# Funcionalidades Clave con imágenes
## Proceso de Logueo
## Niveles de usuario | Rol
El sistema cuenta con 3 niveles de usuario:

* Administrador
* Entrenador
* Usuario

# CRUD de usuarios 
* Lista de usuarios
<img width="1920" height="917" alt="image" src="https://github.com/user-attachments/assets/e5a197d0-a7d0-4fd3-b738-a3622aba98ce" />

* Creacion de ususario
<img width="1920" height="928" alt="image" src="https://github.com/user-attachments/assets/ca623773-45b7-486c-9ad7-1e751c10b52a" />

* Edicion de usuario
<img width="1920" height="929" alt="image" src="https://github.com/user-attachments/assets/2df0493d-c1af-475c-bf95-eaff53b43a0a" />

*Eliminacion de usuario
<img width="1920" height="921" alt="image" src="https://github.com/user-attachments/assets/272a534b-0b54-4fc0-a656-ee39f9639f65" />
<img width="1920" height="917" alt="image" src="https://github.com/user-attachments/assets/e356d0d6-5e28-44d3-8097-50a6132eb4eb" />
<img width="1920" height="920" alt="image" src="https://github.com/user-attachments/assets/035a6c3e-38dc-4ec4-8e1a-bc93da387abd" />


# CRUD de membresias
* Lista de mebresias
<img width="1920" height="909" alt="image" src="https://github.com/user-attachments/assets/5bc2270d-4a39-45a5-b862-b0dbb9c26408" />

* Creacion de membresias
<img width="1920" height="917" alt="image" src="https://github.com/user-attachments/assets/5edc0f28-ac0a-455b-a2ba-38fbdb8f8cdf" />

* Edicion de membresias
<img width="1920" height="927" alt="image" src="https://github.com/user-attachments/assets/e5bb5883-c31b-4f1e-898d-ec5d117b74b3" />

* Elminacion de membresia
<img width="1920" height="924" alt="image" src="https://github.com/user-attachments/assets/01cd02c0-f0e1-4fc8-b59b-12c5c9722d79" />
<img width="1920" height="926" alt="image" src="https://github.com/user-attachments/assets/8e208c46-e033-47ce-84d9-e3a81e04499e" />
<img width="1920" height="923" alt="image" src="https://github.com/user-attachments/assets/c0a9107e-c97f-419e-b658-6acffca9064e" />


# APIS laravel y consumo de las mismas con imágenes
## 1. Autenticación (Auth)
Estas rutas se utilizan para el manejo de sesiones de usuario.

POST /api/login

Función: Inicia sesión de un usuario.

Controlador/Método: AuthController@login

Notas: Espera credenciales (usuario/email y contraseña) para emitir un JWT.
<img width="1049" height="740" alt="image" src="https://github.com/user-attachments/assets/0c9e8545-129e-4445-b403-2148661942aa" />


2. Rutas Protegidas por Autenticación (JWT)
Estas rutas requieren que el usuario esté autenticado con un token JWT válido para poder acceder a ellas.

GET /api/me

Función: Obtiene la información del usuario actualmente autenticado.

Controlador/Método: AuthController@me

Requiere: Token JWT válido en la cabecera Authorization.

POST /api/logout

Función: Cierra la sesión del usuario actual (invalida el token JWT).

Controlador/Método: AuthController@logout

Requiere: Token JWT válido.

POST /api/refresh

Función: Refresca el token JWT del usuario, obteniendo uno nuevo con mayor tiempo de vida.

Controlador/Método: AuthController@refresh

Requiere: Token JWT válido.

3. Gestión de Membresías (membresias)
Estas rutas utilizan apiResource, lo que significa que implementan las operaciones CRUD estándar para el recurso membresias.

GET /api/membresias

Función: Lista todas las membresías disponibles.

Controlador/Método: MembresiaController@index
<img width="1062" height="731" alt="image" src="https://github.com/user-attachments/assets/1520ab54-a9ba-49b0-9387-82fab11dc00c" />

POST /api/membresias

Función: Crea una nueva membresía.

Controlador/Método: MembresiaController@store
<img width="1072" height="720" alt="image" src="https://github.com/user-attachments/assets/01d3b4ee-088b-4a7d-9a2a-1f7c0a66e68e" />

GET /api/membresias/{membresia}

Función: Muestra los detalles de una membresía específica por su ID.

Controlador/Método: MembresiaController@show
<img width="1049" height="726" alt="image" src="https://github.com/user-attachments/assets/11f4cc60-e408-4ce2-9839-42abf1171d9b" />

PUT/PATCH /api/membresias/{membresia}

Función: Actualiza una membresía existente por su ID.

Controlador/Método: MembresiaController@update
<img width="1059" height="705" alt="image" src="https://github.com/user-attachments/assets/61fd2e05-5dda-40e3-b1bb-b90e1a643c68" />

DELETE /api/membresias/{membresia}

Función: Elimina una membresía por su ID.

Controlador/Método: MembresiaController@destroy

4. Gestión de Membresías de Usuarios (membresias-usuarios)
Similar a membresias, estas rutas también utilizan apiResource para las operaciones CRUD sobre el recurso membresias-usuarios.

GET /api/membresias-usuarios

Función: Lista todas las asociaciones entre membresías y usuarios.

Controlador/Método: MembresiaUsuarioController@index

POST /api/membresias-usuarios

Función: Crea una nueva asociación de membresía a un usuario.

Controlador/Método: MembresiaUsuarioController@store

GET /api/membresias-usuarios/{membresia_usuario}

Función: Muestra los detalles de una asociación específica por su ID.

Controlador/Método: MembresiaUsuarioController@show

PUT/PATCH /api/membresias-usuarios/{membresia_usuario}

Función: Actualiza una asociación existente por su ID.

Controlador/Método: MembresiaUsuarioController@update

DELETE /api/membresias-usuarios/{membresia_usuario}

Función: Elimina una asociación por su ID.

Controlador/Método: MembresiaUsuarioController@destroy

5. Gestión de Usuarios (usuarios)
Estas rutas definen explícitamente las operaciones CRUD para los usuarios.

GET /api/usuarios

Función: Lista todos los usuarios.

Controlador/Método: UsuarioController@index
<img width="1055" height="720" alt="image" src="https://github.com/user-attachments/assets/a569a1ef-77eb-4e5d-93fa-1779e8977d8e" />


GET /api/usuarios/{id}

Función: Muestra los detalles de un usuario específico por su ID.

Controlador/Método: UsuarioController@show
<img width="1077" height="734" alt="image" src="https://github.com/user-attachments/assets/e869b84c-79dd-4ca3-a766-81b77feaa7ab" />

POST /api/usuarios

Función: Crea un nuevo usuario.

Controlador/Método: UsuarioController@store

PUT /api/usuarios/{id}

Función: Actualiza un usuario existente por su ID.

Controlador/Método: UsuarioController@update

DELETE /api/usuarios/{id}

Función: Elimina un usuario por su ID.

Controlador/Método: UsuarioController@destroy
# Dependencias y Configuración
## Requisitos
### Angular 20
* Node.js - v20.11.1 o el más reciente
* Editor de codigo - Se recomienda
* Terminal - Necesario para ejecutar comandos CLI de Angular
* Herramienta de desarrollo- Para mejorar su flujo de trabajo de desarrollo, recomendamos el servicio de lenguaje Angular
### Laravel 12
* Composer
* PHP
* Otra opcion es descargarlo desde la pagina de laravel https://laravel.com/docs/12.x
# Otros
Revisen la rúbrica:
Los requisitos y criterios de evaluación se solicitaron en clase. Asegúrense de cumplir con los criterios.
