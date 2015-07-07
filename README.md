## App Engine AngularJS  Python

[Demo:](http://desembarcodeltemplario.appspot.com/)  

Author: Aron Collados


## Project setup

1. Descarga [App Engine Python SDK](https://developers.google.com/appengine/downloads)
2. Instalar node [npm](https://nodejs.org/download/)
3. Instalar AngularJs desde linea de comando install angular@version o descargarlo desde la pagina oficial de [Angular](https://angularjs.org/)
4. Descarga [Phyton](https://www.python.org/downloads/)

## Probar la app el local

En la carpeta google_engine:
```
dev_appserver.py rutaCarpetaProyecto
```


## Deploying

To deploy the application:

1. Create una cuenta de [Google Engine](https://appengine.google.com/)
2. Crea una nueva aplicacion
3. Sustituye `your-app-id`en  `app.yaml` con la id de la aplicacion que hayas creado
4. Lanza la aplicacion:

En la carpeta google_engine:
```
appcfg.py rutaCarpetaProyecto
```


# Licensing

See [LICENSE](LICENSE)
