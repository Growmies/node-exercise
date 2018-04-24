# node-exercise
A little exercise using a Star Wars API [https://swapi.co/](https://swapi.co/)

## Goal
We want to see that you can consume and manipulate API data, while using pagination to get the complete list of all of a resource at once.  We want to see it done simply.
## General
* Make an express server that exposes the following 2 endpoint
```
/planets
/planets/residents
```
* Each endpoint will respond with a JSON array of star wars planets from the swapi.co api.  (Don't worry about any kind of front end view.  Just plain JSON)

## Endpoints
*  The planets endpoint must return all planets in one single request, and must accept a query param that allows the array to be sorted by 'name', 'population', and 'diameter'.
 
*  The planets/residents endpoint also must return all planets in one single request but we would like the residents field on each planet to be replaced with the residents full names instead of the default from SWAPI which is links to each resident.
    * The default response looks like this:
    ```
	[
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
		},
		{
			"name": "Yavin IV",
			"rotation_period": "24",
			...
		},
		...
	]
    ```
    * Your endpoint to return planet residents must look something like this:
    ```
	[
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
		},
		{
			"name": "Yavin IV",
			"rotation_period": "24",
			...
		},
		...
	]
    ```

