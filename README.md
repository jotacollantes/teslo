# Next.js OpenJira App
Para correr la aplicacion localmente, se necesita la base de datos
```
docker-compose up -d
```

* El -d significa __detached__ o sea apenas se termina de ejecutar la creacion de la imagen ya se puede utilizar la linea de comando porque quedara liberada

* MongoDB URL Local:
```
mongodb://localhost:27017/entriesdb
```

* Para ver si esta en uso el puerto 27017 
```
nc -zvv localhost 27017
```

* Para ver si esta en ejecucion el servicio de mongodb intalado en la pc
```
sudo brew services list
```

## Para configurar variables de entorno
Renombrar el archivo en el servidor de produccion __.env.template__ a __.env__

## Llenar la base de datos de prueba
```
https://localhost:3000/api/seed
```