'use strict';

/**
 * Module dependencies.
 */
 
var imdbApi = require('../index');

/**
 * Find movie by title.
 */
var paramsWithTitle = {
	title: 'Terminator',
	year: 2012
};

imdbApi.get(paramsWithTitle, function(err, data) {
	console.log(data);
});

/**
 * Find movie by id.
 */
var paramsWithId = {
	id: 'tt0276751'
};

imdbApi.get(paramsWithId, function(err, data) {
	console.log(data);
});

/**
 * Find series by title & type.
 */
var seriesWithOptions = {
	title: 'Terminator',
	type: 'series'
};

imdbApi.get(seriesWithOptions, function(err, data) {
	console.log(data);
});

/**
 * Find movies by title & type. Inlcude full plot and rotten tomatoes review.
 */
var movieWithOptions = {
	title: 'Milk',
	type: 'movie',
	plot: 'full',
	incTomatoes: true
};

imdbApi.get(movieWithOptions, function(err, data) {
	console.log(data);
});