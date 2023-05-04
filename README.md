# JustStreamIt
## Développez une interface utilisateur pour une application web Python

### Comment ça marche :question::question::question:

:one:  Téléchargez le repo zip sur github 

:two:  On viens dézipper l'ensemble de notre repo dans un nouveau dossier que l'on appellera *_Juststreamit_* 

:three:  Il va falloir activer l'environnement virtuel. A l'aide du terminal, on vient choisir notre nouveau dossier :arrow_down:
```
cd Juststreamit
cd OC_Movie_Api
python -m venv env 
.//env/Scripts/activate.ps1

```

Normalement, lors de l'activation vous devriez voir (env) devant le chemin :arrow_down:
```
 (env) PS C:\Users\Arthur\desktop\Juststreamit>

```

:four: Il faut ensuite télécharger les librairies nécessaires depuis *requirements.txt* :arrow_down: 
```
 pipenv install -r requirements.text

```

:five: Créer et alimenter la base de données à l'aide de la commande :arrow_down:
```
pipenv run python manage.py create_db
```

:six: Démarrer le serveur :arrow_down:
```
pipenv run python manage.py runserver
```

### Utilisation :question::question::question:

Pour accéder à la page, ouvrez le fichier index.html dans n'importe quel navigateur Web.

Documentation de l'API [ICI](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR)
