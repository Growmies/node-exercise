var express = require('express');
var swapi = require('swapi-node');

var app = express();
app.set('view engine', 'ejs');

var allChars = [];
app.get('/', function(req, res) {
  // console.log(req);
  res.render('pages/index', {message: 'Welcome to Naarsys'});
});
swapi.get('http://swapi.co/api/people/').then(function (result) {
    console.log('1: ', result);
    result.results.forEach(function(r) {
      allChars.push(r)
    });
    return result.nextPage();
}).then(function (result) {
    console.log('2: ',result);
    result.results.forEach(function(r) {
      allChars.push(r)
    });
    return result.nextPage();
}).then(function (result) {
    console.log('3: ', result);
    result.results.forEach(function(r) {
      allChars.push(r)
    });
    return result.nextPage();
}).then(function (result) {
    console.log('3: ', result);
    result.results.forEach(function(r) {
      allChars.push(r)
    });
    return result.nextPage()
}).then(function (result) {
    console.log('3: ', result);
    result.results.forEach(function(r) {
      allChars.push(r)
    });
    return result.nextPage();
}).then(function (result) {
    console.log('3: ', result);
    result.results.forEach(function(r) {
      allChars.push(r)
    });
    return result.nextPage();
}).then(function (result) {
    console.log('3: ', result);
    result.results.forEach(function(r) {
      allChars.push(r)
    });
    return result.nextPage();
}).then(function (result) {
    console.log('3: ', result);
    result.results.forEach(function(r) {
      allChars.push(r)
    });
    return result.nextPage();
}).then(function (result) {
    console.log('3: ', result);
    result.results.forEach(function(r) {
      allChars.push(r)
    });
    console.log(allChars.length)
}).catch(function (err) {
    console.log(err);
});

app.get('/character/:*', function(req, res) {
  var character = req.params[0];
  console.log('Query to get details of character: ', character);
  var regExp = new RegExp(character, "i");
  console.log(regExp)

  var resultToshow = allChars.filter(function (people) {
    return people.name.match(regExp);
  });
  console.log('resultToshow: ', resultToshow[0])
  if (resultToshow.length === 0) {
    res.render('pages/index', {message: 'Internal server error/this charcter does not exist'});
    res.end();
  }
  res.render('pages/characterView', {characters: resultToshow, message: 'Result:'});

});

app.get('/characters/', function(req, res) {
  if(req.query && req.query.sort) {
    console.log(req.query)
    switch(req.query.sort) {
      case 'height':
      allChars.sort(function(a, b) {
			return b.height - a.height;
    }).slice(0, 50);
      res.render('pages/characterView', {characters: allChars, message: 'Result:'});
      break;
      case 'mass':
      allChars.sort(function(a, b) {
			return b.mass - a.mass;
		  });
      res.render('pages/characterView', {characters: allChars, message: 'Result:'});
      break;
      case 'name':
      allChars.sort(function(a, b) {
        if(a.name < b.name) return -1;
        if(a.name > b.name) return 1;
        return 0;
		  });
      res.render('pages/characterView', {characters: allChars, message: 'Result:'});
      default:
      res.end('Wrong choice');
    }
  } else {
    res.render('pages/characterView', {characters: allChars.slice(0, 49), message: 'Result:'});
  }
})

var planetresidents = {};

app.get('/planetresidents/', function(req, res) {
  // allChars.forEach(function (char) {
  //   var planet = char.homeworld.split('/');
  //   planet = planet[planet.length-1];
  // });
  swapi.get('http://swapi.co/api/planets/').then(function (result) {
      console.log(result.results);
      var planets = result.results;

      planets.forEach(function(planet) {
        allChars.forEach(function(char) {
          if (planet.url === char.homeworld) {
            if(planetresidents[planet.name]) {
              planetresidents[planet.name].push(char.name)
            } else {
              planetresidents[planet.name] = [char.name];
            }
          }
        })
      });
      console.log(planetresidents);
      res.end(JSON.stringify(planetresidents))
  }).catch(function (err) {
    console.log(err)
    res.end(err.toString());
  })
})
app.listen(8080);
