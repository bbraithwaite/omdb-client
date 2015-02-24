'use strict';

module.exports.isValidType = function(obj, property, type) {
  return (obj.hasOwnProperty(property) && 
    typeof(obj[property]) !== type);
};

module.exports.isValidOption = function(obj, property, pattern) {
  return (obj.hasOwnProperty(property) && 
    !obj[property].match(pattern));
};