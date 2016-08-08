var express = require('express');
var router = express.Router();
var request = require('request');
var _ = require('underscore');
var async = require('async');
var baseURL = "http://swapi.co/api/";

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
router.get('/character/:name', function (req, res, next) {
    var searchName = req.params.name.toLowerCase();
    request.get({url: baseURL + 'people/'}, function (err, httpResponse, body) {
        if (err) {
            return res.status(500).send(err)
        }
        var body = JSON.parse(body);
        var data = [];
        _.filter(body.results, function (i) {
            if (i.name.toLowerCase().match(searchName)) {
                data.push(i);
            }
        });
        res.render('people', {data: data});

    });

});
router.get('/characters', function (req, res, next) {
    var sortKey = req.query.sort;
    var createUser = function (page, callback) {
        request.get({url: baseURL + 'people/?page' + page}, function (err, httpResponse, body) {
            var body = JSON.parse(body);
            return callback(null, body.results);
        });
    };
// loop 5 times
    async.times(5, function (n, next) {
        createUser(n, function (err, users) {
            next(err, users)
        })
    }, function (err, data) {
        // var data = data[0].concat(data[1],data[2],data[3],data[4]);
        var data = _.flatten(data)
        var sortedData = [];
        if (sortKey === "name") {
            sortedData = _.sortBy(data, function (object) {
                return object[sortKey];
            });
        } else {
            sortedData = _.sortBy(data, function (object) {
                return +object[sortKey];
            });
        }

        res.send(sortedData);
    });

});
router.get('/planetresidents', function (req, res, next) {
    var page = req.query.page ? req.query.page : 1;
    var planetResidents = [];
    request.get({url: baseURL + 'planets/?page=' + page}, function (err, httpResponse, body) {
        if (err) {
            return res.status(500).send(err)
        }
        var body = JSON.parse(body);
        if (body.results.length > 0) {
            var count = 0;
            async.each(body.results, function (item, callback) {
                var key = item.name;
                var obj = {};
                    obj[key] = item.residents;
                    planetResidents.push(obj);
                    count++;
                    if (body.results.length === count) {
                        callback(planetResidents)
                    }
            }, function (planetResidents) {
                res.send(planetResidents);
            });
        }

    });

});

module.exports = router;
