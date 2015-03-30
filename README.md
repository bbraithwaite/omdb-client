# OMDb API Client - The Open Movie Database

A node.js and front-end client for the http://www.omdbapi.com API. The OMDb API is a free web service to obtain movie information, all content and images on the site are contributed and maintained by its users.

**Note:** This project is unaffiliated with http://www.omdbapi.com.

## Build Status

[![Build Status](https://travis-ci.org/bbraithwaite/omdb-client.svg?branch=master)](https://travis-ci.org/bbraithwaite/omdb-client)

## Package Availability

Available via NPM:

```bash
npm install omdb-client
```

Available via Bower:

```bash
bower install omdb-client
```

Files in Bower package:

* omdb-client/dist/omdb-client.js (dev)
* omdb-client/dist/omdb-client.min.js (release)

Module is exposed using UMD bundle with the name 'omdb'.

## API Guide

The API supports two functions:

* Get (specific detail)
* Search (broader search)

### Get

Get specific movie:

#### Server-Side

```js
var omdbApi = require('omdb-client');

var params = {
	title: 'Terminator',
	year: 2012
}
omdbApi.get(params, function(err, data) {
	// process response...
});
```

#### Front-End

```js
var params = {
	title: 'Terminator',
	year: 2012
}
window.omdb.get(params, function(err, data) {
	// process response...
});
```

See [more examples](https://github.com/bbraithwaite/omdb-client/blob/master/examples/get.example.js).

The following parameters are available for get:

Parameter Name | Required   		| Data Type       | Valid Options 	| Description
-------------  | -------------  | -------------		| -------------   | -------------
id             | optional* 			| string					| 								|	A valid IMDb ID (e.g. tt1285016)
title          | optional*			| string					| 								|	Movie title to search for.
type           | no							| string          | movie, series, episode			      | Type of result to return.
year           | no							| number					| 								|	Year of release.
plot           | no							|	string	        | short, full 		|	Return short or full plot.
incTomatoes		 | no							| boolean					| 								|	Include Rotten Tomatoes ratings. 
timeout		 | no							| number					| 								|	HTTP request timeout in milliseconds (default is 10 seconds). 


* An id or title must be provided

### Search

Search movies:


#### Server-Side

```js
var omdbApi = require('omdb-client');

var params = {
	query: 'Terminator',
	year: 2012
}
omdbApi.search(params, function(err, data) {
	// process response...
});
```

#### Front-End

```js
var params = {
	query: 'Terminator',
	year: 2012
}
window.omdb.search(params, function(err, data) {
	// process response...
});
```

See [more examples](https://github.com/bbraithwaite/omdb-client/blob/master/examples/search.example.js).

The following parameters are available for search:

Parameter Name | Required   		| Data Type       | Valid Options 	| Description
-------------  | -------------  | -------------		| -------------   | -------------
query          | yes      			| string					| 								|	Movie title to search for.
type           | no							| string          | movie, series, episode			      | Type of result to return.
year           | no							| number					| 								|	Year of release.
plot           | no							|	string	        | short, full 		|	Return short or full plot.
incTomatoes		 | no							| boolean					| 								|	Include Rotten Tomatoes ratings.
timeout		 | no							| number					| 								|	HTTP request timeout in milliseconds (default is 10 seconds).  

* An id or title must be provided

### Dev Commands:

Contributions are welcome. Be aware that there is a pre-commit hook to check linting and tests.

Run tests:

```bash
npm test
```

Run jshint:

```bash
npm run lint
```

Run test coverage report:

```bash
npm run coverage
```