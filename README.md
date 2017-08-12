# Understanding-Clinical-Placement-App

>A log of activities that students undertake during clinical placements.


## Prerequisites
* nodejs
* npm
* git
* heroku-cli 


Clone this repository
```
git clone https://github.com/Perth155/clinicalog
```

To run the server from ```localhost:3000```

Install all dependencies
```
npm install
```
Start the node webserver
```
npm start
```

## Deploy on Heroku

Heroku URL: https://clinicalog.herokuapp.com/

```
git push heroku master
```
Run the server
```
heroku ps:scale web=1
```
Check server
```
heroku ps
``` 
Launch
```
heroku open
```


