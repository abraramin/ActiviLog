# Understanding-Clinical-Placement-App
>A log of activities that students undertake during clinical placements.


## Prerequisites
* nodejs
* npm
* git
* heroku-cli 

## Running the node webserver from localhost
Clone this repository
```
git clone https://github.com/Perth155/clinicalog
```
Install all dependencies
```
npm install
```
Start the node webserver
```
npm start
```
Project sould be running on ```localhost:3000```.


## Deploy on Heroku
```
git push heroku master
```
Run the server
```
heroku ps:scale web=1
```
Check on the server status
```
heroku ps
``` 
Launch
```
heroku open
```
Currently deployed on Heroku- URL: https://clinicalog.herokuapp.com/


