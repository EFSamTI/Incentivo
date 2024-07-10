## Tabla de Contenido
1. [Definiciones y Especificaciones del Proyecto](#definiciones-y-especificaciones-del-proyecto)
2. [Instalaciones Necesarias](#instalaciones-necesarias)
3. [Instructivo del Levantamiento del Software](#instructivo-del-levantamiento-del-software)

## Definiciones y Especificaciones del Proyecto

Se realizo la aplicación web utilizando Node.js en el backend y Ionic/Angular en el frontend. El backend se construyó con Express, TypeScript y una base de datos Postgres. 

## Instalaciones Necesarias

Antes de comenzar con el levantamiento del software, asegúrese de tener instalado lo siguiente en su sistema:

- **Node.js**: Necesario para ejecutar el backend. Descárguelo e instálelo desde [https://nodejs.org/](https://nodejs.org/).
- **Ionic CLI**: Necesario para iniciar el proyecto frontend. Instálelo globalmente con `npm install -g @ionic/cli`.
- **Angular CLI**: También necesario para el frontend. Instálelo globalmente con `npm install -g @angular/cli`.
- **PostgreSQL**: La base de datos utilizada por el backend. Descargue e instale desde [https://www.postgresql.org/](https://www.postgresql.org/).
- **Git**: Necesario para clonar el repositorio. Descárguelo e instálelo desde [https://git-scm.com/](https://git-scm.com/).

## Instructivo del Levantamiento del Software

Para levantar el software en un entorno local, debe realizar los siguientes pasos:

### Backend (Node.js con Express y TypeScript):

1. Clone el repositorio desde la URL proporcionada.
2. Navegue hasta el directorio del proyecto backend.
3. Instale las dependencias utilizando el comando `npm install`.
4. Configure las variables de entorno necesarias en un archivo `.env` respecto a la conexión con la base de datos.
5. Inicie el servidor con el comando `npm run dev`.

Al iniciar el servidor, la base de datos se generará automáticamente. Para obtener acceso, es necesario crear un usuario administrador con el script adjunto.

### Frontend (Ionic/Angular):

1. Clone el repositorio desde la URL proporcionada.
2. Navegue hasta el directorio del proyecto frontend.
3. Instale las dependencias utilizando el comando `npm install`.
4. Inicie la aplicación con el comando `ionic serve`.



