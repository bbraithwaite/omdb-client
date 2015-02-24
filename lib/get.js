'use strict';

var simpleHttp = require('./simple-http');
var validator = require('./validator');

var _validateParams = function(params) {

  if (!params) {
    return {
      valid: false,
      error: 'params cannot be null.'
    };
  }

  // title and id are optional, but one must be present
  if (!params.hasOwnProperty('id') && !params.hasOwnProperty('title')) {
    return {
      valid: false,
      error: 'id or title param required.'
    };
  }

  if (validator.isValidType(params, 'title', 'string')) {
    return {
      valid: false,
      error: 'title must be a string.'
    };
  }

  if (validator.isValidType(params, 'id', 'string')) {
    return {
      valid: false,
      error: 'id must be a string.'
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

  // plot: short, full (optional)
  if (validator.isValidOption(params, 'plot', 'short|full')) {
    return { 
      valid: false,
      error: 'plot must be: short, full.'
    };
  }

  // tomatoes: Include Rotten Tomatoes ratings. (optional)
  if (validator.isValidType(params, 'incTomatoes', 'boolean')) {
    return { 
      valid: false,
      error: 'incTomatoes must be a boolean.'
    };
  }

  // default case
  return {
    valid: true
  };  

};

var _createUrl = function(params) {

  var baseUrl = 'http://www.omdbapi.com/';
  var query = '?';
  
  if (params.id) {
    query += 'i='.concat(params.id);
  }

  if (params.title) {

    if (params.id) {
      query += '&t=';
    } else {
      query += 't=';
    }

    query += encodeURIComponent(params.title);
  }

  if (params.year) {
    query += '&y='.concat(params.year);
  }

  if (params.incTomatoes) {
    query += '&tomatoes='.concat(params.incTomatoes);
  }

  if (params.type) {
    query += '&type='.concat(params.type);
  }

  if (params.plot) {
    query += '&plot='.concat(params.plot);
  }

  return baseUrl.concat(query, '&r=json');
};

/**
 * Get film content from the imdb http service.
 * @param {Object} params The search parameters.
 * @param {Function} callback The callback to return data.
 * @static
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