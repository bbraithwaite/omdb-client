'use strict';

/**
 * Validate a data type for a given object's property.
 *
 * @param {Object} the object
 * @param {String} property name
 * @param {String} expected data type
 * @return {Boolean} whether the property is valid
 * @api public
 */
module.exports.isValidType = function(obj, property, type) {
  return (obj.hasOwnProperty(property) && 
    typeof(obj[property]) !== type);
};

/**
 * Validate a option type (a || b || c etc.) for a given object's property.
 *
 * @param {Object} the object
 * @param {String} property name
 * @param {String} expected options as a regex pattern
 * @return {Boolean} whether the property is valid
 * @api public
 */
module.exports.isValidOption = function(obj, property, pattern) {
  return (obj.hasOwnProperty(property) && 
    !obj[property].match(pattern));
};