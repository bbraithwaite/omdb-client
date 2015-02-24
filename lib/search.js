'use strict';

/**
 * Module dependencies.
 */

var simpleHttp = require('./simple-http');
var validator = require('./validator');

/**
 * Validate the parameters for the get request.
 *
 * @param {Object} params The search parameters
 * @return {Object} The validation state
 * @api private
 */
var _validateParams = function(params) {

  if (!params) {
    return {
      valid: false,
      error: 'params cannot be null.'
    };
  }

  // title and id are optional, but one must be present
  if (!params.hasOwnProperty('query')) {
    return {
      valid: false,
      error: 'query param required.'
    };
  }

  if (validator.isValidType(params, 'query', 'string')) {
    return {
      valid: false,
      error: 'query must be a string.'
    };
  }

  // type: movie, series, episode (optional)
  if (validator.isValidOption(params, 'type', 'movie|series|episode')) {
    return {
      valid: false,
      error: 'type must be: movie, series, episode.'
    };
  }

  // y: year of release (optional)
  if (validator.isValidType(params, 'year', 'number')) {
    return { 
      valid: false,
      error: 'year must be a valid number'
    };
  }

  // default case
  return {
    valid: true
  };  

};

/**
 * Build the url string from the parameters.
 *
 * @param {Object} params The search parameters
 * @return {String} The url to call omdbapi.com
 * @api private
 */
var _createUrl = function(params) {

  var baseUrl = 'http://www.omdbapi.com/';
  var query = '?';
  
  if (params.query) {
    query += 's='.concat(params.query);
  }

  if (params.year) {
    query += '&y='.concat(params.year);
  }

  if (params.type) {
    query += '&type='.concat(params.type);
  }

  return baseUrl.concat(query, '&r=json');
};

/**
 * Search film content from the imdb http service.
 *
 * @param {Object} the search parameters
 * @param {Function} the callback to return data
 * @api public
 */
module.exports = function(params, callback) {

  var validate = _validateParams(params);

  if (!validate.valid) {
    callback(validate.error, null);  
    return;
  }

  simpleHttp.get(_createUrl(params), 2000, function handleResponse(err, data) {
    
    if (err) {
      callback(err, null); 
      return;
    }

    if (data.Error) {
      callback(data.Error, null);  
    } else {
      callback(null, data); 
    }

  });

};