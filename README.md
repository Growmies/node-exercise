# node-exercise
A little exercise using a Star Wars API [https://swapi.co/](https://swapi.co/)

## Goal
Make a small RESTful API centered around Star Wars using an express server.
This will hopefully demonstrate to us abilities to make an express app, RESTful design, consume data from an API, and manipulate that data into some desired way

## General
* Make a RESTful API using express that fetches and returns the following:
    - People
        - An endpoint that returns all data about 1 person. 
        - An endpoint that returns data about ALL people in the API.
    - Planets
        - An endpoint that returns all data about 1 planet.
            - Residents
        - An endpoint that returns data about ALL planets in the API.
* Use the API at [https://swapi.co/](https://swapi.co/) to get your Star Wars Data 
* When making calls to fetch people and planets, although you could fetch the entire list at once, limit each response to 10, so you can demonstrate that you understand how to use their API and pagination to get all of the data.  Your response should still be an array of ALL the objects from the SWAPI API.
* All endpoints should return JSON.

## Endpoints
*  The endpoints that return all planets or people should be able to be sorted by some optional property on the planets/people.  People must be sortable by ['name', 'mass', 'height'], planets must be sortable by ['name', 'population', 'diameter'].
*  The endpoint that returns a single planet or person should just return the basic info for that individual.
*  The endpoint that returns a single planet should also have an optional endpoint to return the basic planet information with the names of all the residents instead of the default from SWAPI which is links to each person.
    * Alderaan looks like this:
    ```
    {
	"name": "Alderaan",
	"rotation_period": "24",
	"orbital_period": "364",
	"diameter": "12500",
	"climate": "temperate",
	"gravity": "1 standard",
	"terrain": "grasslands, mountains",
	"surface_water": "40",
	"population": "2000000000",
	"residents": [
		"https://swapi.co/api/people/5/",
		"https://swapi.co/api/people/68/",
		"https://swapi.co/api/people/81/"
	],
	"films": [
		"https://swapi.co/api/films/6/",
		"https://swapi.co/api/films/1/"
	],
	"created": "2014-12-10T11:35:48.479000Z",
	"edited": "2014-12-20T20:58:18.420000Z",
	"url": "https://swapi.co/api/planets/2/"
    }
    ```
    * Your endpoint to return planet residents must look something like this:
    ```
    {
	"name": "Alderaan",
	"rotation_period": "24",
	"orbital_period": "364",
	"diameter": "12500",
	"climate": "temperate",
	"gravity": "1 standard",
	"terrain": "grasslands, mountains",
	"surface_water": "40",
	"population": "2000000000",
	"residents": [
		"Leia Organa",
		"Bail Prestor Organa",
		"Raymus Antilles"
	],
	"films": [
		"https://swapi.co/api/films/6/",
		"https://swapi.co/api/films/1/"
	],
	"created": "2014-12-10T11:35:48.479000Z",
	"edited": "2014-12-20T20:58:18.420000Z",
	"url": "https://swapi.co/api/planets/2/"
    }
    ```
