'use strict';

var http = require('http');

 /**
 * Get film content from the imdb http service.
 * @param {string} title The film title.
 * @param {string} year The release year.
 * @param {Function} callback The callback for when async op is complete.
 * @static
 */
module.exports = function(title, year, callback) {
  var url = 'http://www.omdbapi.com/?t=' +
    encodeURIComponent(title) +
    '&y=' +
    year +
    '&plot=short&r=json';

  var request = http.get(url, function handleResponse(res) {
    
    var body = '';
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
      body += chunk;
    });

    res.on('end', function() {
      var response = JSON.parse(body);
      if (response.Error) {
        callback(response.Error, null);  
      } else {
        callback(null, response); 
      }
    });

  }).on('error', function(e) {
    callback(e, null);
  });

  // if the request takes longer than 1 second, exit
  request.setTimeout(1000, function handleTimeout() {
    callback('timeout exceeded', null);
  });
};