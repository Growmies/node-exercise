'use strict';

const express = require('express');
const app = express();
const https = require('https');

const peopleEndpoint = 'https://swapi.co/api/people/?page=1';
const planetsEndpoint = 'https://swapi.co/api/planets/?page=1';

/**
 * People
 */
app.get('/people', function (req, res) {
	let people = getPeople();
	let sortBy = req.query.sortBy || null;
	let sortOptions = ['name', 'height', 'mass'];

	// sort by name, height, or mass.
	if (sortBy && sortOptions.indexOf(sortBy) !== -1) {
		people.sort((a, b) => {
			if (sortBy === 'name') {
				return a[sortBy] > b[sortBy];
			} else {
				return a[sortBy] - b[sortBy];
			}
		});
	}
	res.send(people);
});

/**
 * Planets
 */
app.get('/planets', async function (req, res) {
	let people = await getPeople();
	let planets = [];
	let page = 1;
	let next = planetsEndpoint;

	for (let i = 0; i < page; i++) {
		let data = await makeRequest(next);

		// if there is a next url, store that for the next loop and increment the page number
		if (data.next) {
			next = data.next;
			page++;
		}

		// replace resident name
		data.results.forEach(item => {
			item.residents = item.residents.map(resident => {
				let id = resident.match(/\/(\d+)\/$/)[1] - 1;

				// when we're missing captain phasma
				if (id && !people[id] || !people[id].name) {
					return makeRequest(resident).name;
				}

				return people[id].name;
			});
		});

		planets = planets.concat(data.results);
	}

	res.send(planets);
});
/**
 * End API
 */

app.listen(8080);

async function makeRequest(url) {
	return new Promise((resolve) => {
		https.get(url, function (res) {
			let data = '';

			res.on('data', (chunk) => {
				data += chunk;
			});

			// return the data
			res.on('end', () => {
				resolve(JSON.parse(data));
			});
		});
	})
}

async function getPeople() {
	let people = [];
	let page = 1;
	let next = peopleEndpoint;

	for (let i = 0; i < page; i++) {
		let data = await makeRequest(next);

		// if there is a next url, store that for the next loop and increment the page number
		if (data.next) {
			next = data.next;
			page++;
		}

		people = people.concat(data.results);
	}

	return people;
}