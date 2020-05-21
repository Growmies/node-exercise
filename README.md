# node-exercise
A little exercise using a Star Wars API [https://swapi.dev/](https://swapi.dev/)

## Goal
We want to know that you can: 
* Consume and manipulate API data 
* Use pagination to get the complete list of all of a resource at once.  (Swapi's people endpoint returns 10 at a time by default.  We need the full list of 87)
* Keep the task simple.  (Don't engineer for all possible future solutions, just solve the task at hand).
* Sort an array of objects.
* Replace object field values with more appropriate data.

## Task
* Make an express server that exposes the following 2 endpoints
```
/people
/planets
```
*  The people endpoint must return all people, and must take an optional query param "sortBy" that allows the array to be sorted by 'name', 'height', or 'mass'.
 
*  The planets endpoint must return all planets but we would like the residents field on each planet to be replaced with the residents full names instead of the default from SWAPI which is links to each resident. (don't worry about sorting this one)
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

