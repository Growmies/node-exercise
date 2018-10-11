const express = require('express');
const app = express();
const http = require("http");
const https = require('https');
let logger = require('./util/logger');
let util = require('./util/util');
const _ = require("lodash");
const peopleApiUrl = 'https://swapi.co/api/people/?page=1';
const planetsApiUrl = 'https://swapi.co/api/planets/?page=1';

// please run node src/app.js to run this application
app.get('/', (req, res) => res.send('Welcome to the world of star wars'));

app.get('/people', async (req, res, next) => {
	let sortBy = req.query.sortBy || null;
	let sortOptions = ['name', 'height', 'mass'];

	let result;
	console.log(sortBy);
	try {
		result = await getPeopleData(peopleApiUrl);
	} catch (error) {
		return next(error);
	}
	// Sort people array by Name, Height or Mass - implemented a sortBy function however same can be acheieved using lodash.sortBy()
	// lodash.sortBy would be good if sorting needs to be done based on more than one element ex. _.sortBy(people,['name','height','mass']) 
	//let contactArray = _.sortBy(people,['name']);
	console.log(sortBy);
	let contactArray = result.sortBy(sortBy);
 	let jsonRes= JSON.stringify(contactArray);
	return res.send(jsonRes);

});

app.get('/planets', async function (req, res) {
	
	let people = await getPeopleData(peopleApiUrl);
	let planets = [];
	let page = 1;
	let next = planetsApiUrl;
	let map;
 	for (let i = 0; i < page; i++) {
		let data = await util.makeRequest(next);
		if (data.next) {
			next = data.next;
			page++;
		}
 	
		var ppl_data = [];
        ppl_data.push(data.results);
		 map = _.map(ppl_data,function(ppl){
			 let res_data =[];
			for (k=0; k<ppl.length; k++){
				res_data= ppl[k].residents;
				for(j=0; j<res_data.length; j++){
				 let pplObj= _.find(people, ['url', res_data[j]]);
				 if(pplObj && pplObj!= null && pplObj != undefined){
				 res_data[j] = pplObj.name;
				 }
				}
			}
		
		return ppl;
});
		
		planets = planets.concat(map);
}
	res.send(planets);
// });
});

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};
const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  console.log("Listening on " + bind);
};


const port = util.normalizePort(process.env.PORT || "3001");
app.set("port", port);
const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);

async function getPeopleData(next) {
	let people = [];
	let page = 1;
	try {
 	for (let i = 0; i < page; i++) {
		let res = await util.makeRequest(next);
 		// if next pageurl, increment page number that will be used for next iterative web service call
		if (res.next) {
			next = res.next;
			page++;
		}
 		people = people.concat(res.results);
	}
	
	}catch(ex){
    console.log(ex);
	}
return people;	 
}

Array.prototype.sortBy = (function() {
  var sorters = {
    string: function(a, b) {
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    },

    number: function(a, b) {
      return a - b;
    }
  };

  return function(prop) {
    var type = typeof this[0][prop] || 'string';
    return this.sort(function(a, b) {
      return sorters[type](a[prop], b[prop]);
    });
  };
})();
module.exports = app;