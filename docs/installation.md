>Para instalar una versión de development de la PWA se deben seguir los siguientes pasos:
+ Clonar repositorio de *Github* del *Cliente* y el *Servidor*: **([Cliente](https://github.com/SamuelVera/dosPiNovenos-Bonsapp-Client.git))** **([Servidor](https://github.com/SamuelVera/dosPiNovenos-Bonsapp-Server.git))**.
+ Utilizar el comando `npm install` o `npm i` la carpeta donde se clonó el repositorio del *Cliente*.
+ Utilizar el comando `npm install` o `npm i` la carpeta donde se clonó el repositorio del *Servidor*.
+ Añadir un archivo con el nombre '.env' en el root de la carpeta de cliente, con las credenciales para la conexión el servicio de firebase de google, con la siguiente estructura:     

>``REACT_APP_apiKey=YOUR_API``     
``REACT_APP_projectId=YOUR_PROJECT_ID``     
``REACT_APP_storageBucket=YOUR_STORAGE_BUCKET``     
``REACT_APP_messagingSenderId=YOUR_MESSAGE_SENDER``     
``REACT_APP_appId=YOUR_APP_ID``   
+ Finalmente añadir un archivo con el nombre `variables.env` en el de la carpeta del servidor, con las credenciales para que el back-end se conecte con una DB en PostgreSQL y para la encriptar la autenticación:      

>``DB_NAME=YOUR_DB_NAME``        
``DB_USER=YOUR_DB_USER``        
``DB_PASSWORD=YOUR_DB_PASS``        
``DB_HOST=YOUR_DB_HOST``        
``SECRET=YOUR_SECRET``      
``KEY=YOUR_KEY``        