# Recetas del Mundo

## Descripción

La aplicación permite registrarse e iniciar sesión, asi como tambien visualizar recetas, navegar a sus detalles y calificarlas, subir recetas y filtrar segun las preferencias del usuario.

En la sección "Ayuda" se podrá visualizar una guia de lo que el usuario puede realizar en la web.

Al clickear sobre el botón "Crear receta" pide llenar un formulario con datos sobre la receta y luego de confirmar se guarda (o se publica, dependiendo que elija el usuario). Se podrá ver el listado de recetas subidas a la web en "Mis recetas", donde el usuario podrá eliminarlas o editarlas cuando quiera.

Tambien en "Perfil" el usuario podrá editar sus datos, incluyendo la contraseña.
Si el usuario olvida su contraseña puede recurperarla con su nombre de usuario, le llegará un correo a su casilla de email registrado con una contraseña provisoria.

La aplicación permite conectarse con un backend realizado con NodeJS y MongoDB.

**Tecnologías y librerías:**

- Interfaz realizada con **ReactJS - Create React App**
- Estilos con **Material-UI** y **CSS**
- Ruteo con **React Router Dom**
- Backend con **NodeJS**, **MongoDB**, **Express**, **Nodemailer**

## Descargar y correr el proyecto

Una vez clonado o descargado el proyecto, instalar dependencias:

### `npm install`

Correr el servidor:

### `npm start`

Se abre una pestaña del navegador en el puerto 3000:

### Sino copiar esta URL y pegarla en el navegador: `http://localhost:3000`


## Backend

Tiene un backend realizado con Express, NodeJS y MongoDB, por si quieren descargar y correr este proyecto tienen descargar el codigo en el siguiente repositorio: [Link al repo de Backend](https://github.com/chdigiorno/back-recipes-app)

## Estructura

![estructura] (https://raw.githubusercontent.com/marparedes/recipes-app/main/src/static/project.PNG)

## ScreenShots

Home
![image00](https://raw.githubusercontent.com/marparedes/recipes-app/main/src/static/home.PNG)

Login                      |  Registro
:-------------------------:|:-------------------------:
![image01](https://raw.githubusercontent.com/marparedes/recipes-app/main/src/static/login.PNG)  |  ![image02](https://raw.githubusercontent.com/marparedes/recipes-app/main/src/static/register.PNG)

Listado de recetas subidas por el usuario
![image03](https://raw.githubusercontent.com/marparedes/recipes-app/main/src/static/myRecipes.PNG)

Opciones para usuario con sesión iniciada
![image04](https://raw.githubusercontent.com/marparedes/recipes-app/main/src/static/sections.PNG)
