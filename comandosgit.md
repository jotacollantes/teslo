## Comandos para iniciar Git
git config --global user.name "Juan Collantes"
git config --global user.email "juan@collantes.ec"

## Para ver la información del usuario de Git
git config --global -e

## Para inicializar un proyecto/repositorio
git init

## Para ver el status del proyecto
git status

## Para dar seguimiento a todos los archivos
git add .

## Para remover un archivo del stage
git reset <nombre>


## Para tomar la foto
git commit -m "primer commit"

## Para ver la bitácora
git log

## Para reconstruir el proyecto/repositorio al ultimo comió ejecutado
git checkout -- .

## Ver rama actual
git branch

## Para Cambiar el nombre de la rama de master->main
git branch -m master main


## Para cambiar la rama en forma global
git config --global init.defaultBranch <nombre>

## para dar seguimiento a un archivo
git add .

## para volver a poner un archivo como untrack
git reset README.md

## Para ejecutar un commit sin git add . Previo (esto es posible si se esta haciendo seguimiento al archivo)
git commit -am "Readme updated"


## Para añadir archivos específicos al stage como por ejemplo todos los archivos html
git add *.html

## Para ver el resultado de un git status resumido
git status --short

## Para hacer un alias
git config --global alias.s "status --short"

## Para ver la configuración global y editar
git config --global -e

#Para personalizar la salida del log
git log --oneline
git log --oneline --decorate --all --graph

## para ver las diferencias de un archivo cambiado
git diff

## para ver las diferencias de los archivos que están en el stage y que aun no se han hecho commit
git diff --staged

## Para Cambiar el mensaje en el ultimo commit
git commit --amend -m "Notas anadidas a las instalaciones"

## Para borrar el ultimo commit del head
git reset --soft HEAD^
## se puede usar el hash del penultimo commit
git reset --soft fce5afd
## con mixed se saca los archivos del stages pero las modificaciones en los archivos de mantienen para que posteriormente se suban al stage
git reset --mixed a6fe575

## con hard se borra absolutamente todos los archivos creados o cambios hasta antes del ultimo commit con el has indicado y no estaran disponibles para futuros commit
git reset --hard a6fe575 

## Para ver todos los commit o cambios en el tiempo, esto es util cuando se quiera restaurar un repositorio incluso si se ha usado el reset --hard
git reflog
## Para volver a un repositorio ene l tiempo incluso si ha sido reseteado con hard, solo se debe de especificar el hash del commit del punto en el tiempo deseado


# Para renombrar o mover un archivo 
git mv destruir-mundo.md salvar-mundo.md
# Para verificar el cambio
git status o git s

# Para borrar un archivo
git rm salvar-mundo.md

# Para volverlo a restaurar
git reset --hard 


# COmandos Alias
# Log
git config --global alias.lg "log --graph --abbrev-commit --decorate --format=format:'%C(bold blue)%h%C(reset) - %C(bold green)(%ar)%C(reset) %C(white)%s%C(reset) %C(dim white)- %an%C(reset)%C(bold yellow)%d%C(reset)' --all"

# Status
git config --global alias.s status --short

# Alternativa útil de status
git config --global alias.s status -sb

# Para crear una rama
git branch rama-villanos

# Para moverse de rama
git checkout rama-villanos

# Para hacer un merge uno se debe de posicionar en la rama donde se van a integrar los cambios en este caso hay que posicionarse en la rama main/master.
git checkout master

# para integrar los cambios de una rama ubicados en la rama principal.
git merge rama-villanos

# Una vez integrada la rama alterna a la principal y ya no tiene razon de existir, se puede borrar dicha rama
git branch -d rama-villanos

# Para crear una rama y al mismo tiempo moverse
git checkout -b rama-villanos

# Para crear un tag en el ultimo commit
git tag super-release

# para ver todos los tags
git tag

# para eliminar un tag
git tag -d super-release

# Para crear un tag con notes
git tag -a v1.0.0 -m "Version 1.0.0 Lista"

# Para crear un tag en un commit especifico
git tag -a v0.1.0 64807ee -m "Version Alpha de nuestra app"

# Para ver mas detalles de un tag especifico
git show v0.1.0

# Para guardar cambios en el stash (sin antes hacer comit), lo archivos modificados vuelven a como estaban antes de los cambios.
git stash

# Para ver la lista de stash
git stash list

# Para integrar la informacion que esta en el stash a la rama donde se esta trabajando, en este ejercicio estamos trabajando solo en una rama Master
git stash pop

# Para limpiar todos los stash que quedaron como residuos
git stash clear

# Para integrar un stash especifico a una rama, pero el stash se mantiene en la lista de stash
git stash apply stash@{2}

# Al crear vuelta un stash el stash{0} (que significa el ultimo stash creado) es igual al stash{3}, necesitamos borrar el stash{0}
<!-- jota@MacBook-Pro-de-Juan-2 07-demo-stash % git stash
Directorio de trabajo y estado de 'indice WIP on master: 8b59e48 Conflictos con stash resueltos en archivo readme.md guardados
jota@MacBook-Pro-de-Juan-2 07-demo-stash % git stash list
stash@{0}: WIP on master: 8b59e48 Conflictos con stash resueltos en archivo readme.md
stash@{1}: WIP on master: 8b59e48 Conflictos con stash resueltos en archivo readme.md
stash@{2}: WIP on master: 8b59e48 Conflictos con stash resueltos en archivo readme.md
stash@{3}: WIP on master: 8b59e48 Conflictos con stash resueltos en archivo readme.md -->
jota@MacBook-Pro-de-Juan-2 07-demo-stash % git stash drop stash@{0}

# Para ver detalles de un stash 
git stash show stash@{0}

# Para guardar cambios en un stash pero con un nombre detallado
git stash save "agregamos a loki en villanos.md"
<!--
jota@MacBook-Pro-de-Juan-2 07-demo-stash % git stash list
stash@{0}: On master: agregamos a loki en villanos.md
-->

# Para ver algo mas de informacion
git stash list --stat


# Rebase para reubicar commits hechos en master antes de los commit hechos en la rama alterna, estando ubicados en la rama alterna ejecutamos el rebase.
git rebase master
# AHora una vez al dia la rama alterna con la informacion que habia en el master, ahora ubicados en el master integramos la informacion que esta en la rama alterna a la rama master. ubicados en la rama master ejecutamos lo siguiente:
git merge rama-misiones-completadas
# Borramos la rama añterna
git branch -d rama-misiones-completadas


# Para fusionar commits que estan seguidos
git rebase -i HEAD~4
<!-- Luego en el menu iteractivo solo se ingresa el comando squash en un commit para que se fusione con el superior que debe de permanecer en pick.
Para renombrar el message de un commit usamos el comando del menu interactivo reword
-->
# Para volver a la version antes de la modificacion de un archivo en particular
git checkout -- README.md
# Para volver a la version de un archivo en un commit especifico y no en el ultimo.
git checkout 7efaa89 miembros.md




# En caso de un commit ejecutado mandarlo a 2 commits por separado
git rebase -i HEAD~2
<!-- Luego en el menu interactivo colocamos edit al hash del commit que queremos separar -->
# Para mover los archivos justo antes de subir al stage para manadarlos a commits separados
git reset head^
<!-- Luego se hace los git add y git commit por cad archivo -->
# Una vez hecho los nuevos commit por separado hay que decirle a git que salga del modo interactivo
git rebase --continue




# Subir tags
git push --tags

# Para traerse los ultimos cambios desde github
git pull

# Para especificar el tipo de estrategia al momento de unir el repositorio remoto y el local del tipo fast foward
git config --global pull.ff only

# Para ver repositorios remotos
git remote -v

# Para Clonar un repositorio en caso de restauracion de un repositorio local que fue eliminado
git clone https://github.com/jotacollantes/liga-justicia.git

# Para resolver un conflicto se debe de configurar la siguiente estrategia:
git config --global pull.rebase true
 <!-- Luego se hace el git pull, aparecera el conflicto, se lo resuelve y luego hay que ingresar -->
git rebase --continue
<!-- Tambien se debe de poner al dia el repo remoto -->
git push


# Para actualizar solo las referencias de los cambios hechos en el repositorio remoto
git fetch
# Se actualizaron las referencias pero el puntero apunta al head en el commit d681735
<!-- jota@MacBook-Pro-de-Juan-2 09-liga-justicia % git lg
* 495ac7c - (hace 4 minutos) Delete flash.md - J2 Systems (origin/main, origin/HEAD)
* 95bb651 - (hace 4 minutos) Rename historia.flash.md to flash.md - J2 Systems
* c863578 - (hace 6 minutos) Create historia.flash.md - J2 Systems
*   d681735 - (hace 9 minutos) Merge pull request #4 from jotacollantes/jotacollantes-patch-final-de-batman - J2 Systems (HEAD -> main) -->
# Para mover el puntero al head hay que actualizar el repositorio local
git pull

# Para configurar un repositorio para upstream en caso de actualizar nuestro repositorio con los cambios que otro usuario haya hecho cambios u que estos hayan sido confirmado via pull request en el mismo repositorio que se hizo fork
git remote add upstream https://github.com/Klerith/legion-del-mal.git
# para traer los cambios del upstream para traer los cambios o el fetch para traerme el historial de commits
git pull upstream master


# ############### Ramas #########################
# Lo mas recomendable es crear la rama al momento de crear un archivo que va a incluir la nueva funcionabilidad. En este caso creamos el archivo villanos que por tratarse de un archivo nuevo git no le esta dando seguimiento. Es en este momento que creamos la nueva rama.
git checkout -b rama-villanos
<!-- Se hañade el nuevo archivo en el state y se hace el commit -->
git add .
git commit -m "Villanos agregados"

# Subimos los cambios a gitHub, este comando creara la rama, de ahi en adelante ya ubicados en la rama solo se usa git push
git push --set-upstream origin rama-villanos
# Una vez usada y fusionada la feature branch con la rama main la podemos eliminar.
git branch -d rama-villanos

# Para ver todas las locales y remotas
git branch -a
* main
  remotes/origin/main
  remotes/origin/rama-misiones
  remotes/origin/rama-villanos
git checkout rama-misiones
<!-- rama 'rama-misiones' configurada para rastrear 'origin/rama-misiones'. -->


# Para borrar una rama primero hay que ubicarse en la rama main
git checkout main
git branch -d rama-villanos

# Para limpiar las ramas remotas que ya han sido eliminadas
git remote prune origin

# Para hacer un commit cerrando un Issue (Fixes #4:)
git commit -am "Fixes #4: Hecho se borro a Capitan Marvel"