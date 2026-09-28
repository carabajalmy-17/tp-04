# Trabajo práctico 04

## Descripción
es uan aplicación web desarrollada con Node.js, Express y EJS para consultar mascotas en adopción.
La aplicación permite ver un catálogo de mascotas, consultar el detalle de cada una y agregar nuevas mascotas a traves de un formulario. 

## Ejecución
Para iniciar la aplicación ejecutar:
npm start
El servidor estará disponible en:
http://localhost:3000

## Páginas y rutas

### Página de inicio

GET /

Muestra la página principal de la aplicación y un enlace para acceder al catálogo de mascotas.

### Catálogo de mascotas

GET /mascotas

Muestra todas las mascotas disponibles en el arreglo.

### Formulario de nueva mascota

GET /mascotas/nueva

Muestra un formulario para ingresar una nueva mascota.

### Detalle de mascota

GET /mascotas/:id

Muestra la información completa de una mascota según su identificador.

### Crear mascota

POST /mascotas

Recibe los datos enviados desde el formulario.

## Estructura de vistas
La aplicación utiliza EJS para generar las páginas HTML.
