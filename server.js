
	var express = require('express');
	var bodyParser = require('body-parser');
	var url = require('url');
	
	
	var port = process.env.PORT || 3001;
	var app = express();
	var jsonResponse = {};

	app.use(bodyParser.json({limit: '50mb'}));
	app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

	


	/*"people": "http://swapi.co/api/people/", 
    "planets": "http://swapi.co/api/planets/", 
    "films": "http://swapi.co/api/films/", 
    "species": "http://swapi.co/api/species/", 
    "vehicles": "http://swapi.co/api/vehicles/", 
    "starships": "http://swapi.co/api/starships/"*/

    var peopleRouter = require('./routes/PeopleRouter');
    var planetsRouter = require('./routes/PlanetsRouter');
    var filmsRouter = require('./routes/FilmsRouter');
    var speciesRouter = require('./routes/SpeciesRouter');
    var vehiclesRouter = require('./routes/VehiclesRouter');
    var starshipsRouter = require('./routes/StarshipsRouter');



	
	app.use('/people', peopleRouter);
	app.use('/planets', planetsRouter);
	app.use('/films', filmsRouter);
	app.use('/species', speciesRouter);
	app.use('/vehicles', vehiclesRouter);
	app.use('/starships', starshipsRouter);



	

    
	// Error Handling
	app.use(function(err, req, res, next) {
		json = {};
		jsonResponse = {};
		json.statusCode = '9998';
		json.statusDesc = 'Unknown Error :'+err.message;
		jsonResponse.responseMetaData = json;
		res.json(jsonResponse);
	});

	app.listen(port);
	console.log("Server listening on port: " + port);



