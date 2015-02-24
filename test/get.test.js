'use strict';

var should = require('should');

var simpleHttp = require('../lib/simple-http');
var imdbApi = require('../index');
var sinon = require('sinon');

var _errorShouldNotExist = function(params, done) {
	imdbApi.get(params, function(err) {
		should.not.exist(err);
		done();
	});
};

var _errorShouldHaveMessage = function(params, message, done) {
	imdbApi.get(params, function(err) {
		err.should.eql(message);
		done();
	});
};

var _shouldBeCalledWithUrl = function(params, expectedUrl, done) {
	imdbApi.get(params, function() {
		simpleHttp.get
		.calledWith(expectedUrl)
		.should.equal(true);
		done();
	});
};

describe('Get Film', function() {

	beforeEach(function() {
		sinon.stub(simpleHttp, 'get');
		simpleHttp.get.yields(null, { foo: 'bar' });
	});

	afterEach(function() {
		simpleHttp.get.restore();
	});

	describe('with invalid mandatory params', function() {
		
		it('returns error when params object is null', function(done) {
			_errorShouldHaveMessage(
				null, 
				'params cannot be null.', 
				done);
		});

		it('returns error when id and title is empty', function(done) {
			_errorShouldHaveMessage(
				{}, 
				'id or title param required.', 
				done);
		});

	});

	describe('with "title" parameter', function() {

		it('returns error for invalid string', function(done) {
			var params = {
				title: 50
			};

			_errorShouldHaveMessage(params, 'title must be a string.', done);
		});

		it('calls omdbapi with title querystring param', function(done) {
			var params = {
				title: 'Milk'
			};

			_shouldBeCalledWithUrl(
				params,
				'http://www.omdbapi.com/' +
					'?t=Milk&r=json',
				done);
		});

		it('calls omdbapi with title and id querystring param', function(done) {
			var params = {
				title: 'Milk',
				id: 'tt1013753'
			};

			_shouldBeCalledWithUrl(
				params,
				'http://www.omdbapi.com/' +
					'?i=tt1013753&t=Milk&r=json',
				done);
		});
	});

	describe('with "id" parameter', function() {

		it('returns error for invalid string', function(done) {
			var params = {
				id: 123
			};

			_errorShouldHaveMessage(params, 'id must be a string.', done);
		});

		it('calls omdbapi with id querystring param', function(done) {
			var params = {
				id: 'tt1013753'
			};

			_shouldBeCalledWithUrl(
				params,
				'http://www.omdbapi.com/' +
					'?i=tt1013753&r=json',
				done);
		});
	});

	describe('with "year" parameter', function() {
		
		it('returns error when type is not number', function(done) {
			var params = {
				title: 'Milk',
				year: 'movie'
			};

			_errorShouldHaveMessage(
				params, 
				'year must be a valid number', 
				done);
		});

		it('calls omdbapi with year querystring param', function(done) {
			var params = {
				id: 'tt1013753',
				year: 2008
			};

			_shouldBeCalledWithUrl(
				params,
				'http://www.omdbapi.com/' +
					'?i=tt1013753&y=2008&r=json',
				done);
		});

	});

	describe('with "incTomatoes" parameter', function() {
		
		it('returns error when type is not boolean', function(done) {
			var params = {
				title: 'Milk',
				incTomatoes: 'yes'
			};

			_errorShouldHaveMessage(
				params, 
				'incTomatoes must be a boolean.',
				done);
		});

		it('calls omdbapi with incTomatoes querystring param', function(done) {
			var params = {
				id: 'tt1013753',
				incTomatoes: true,
			};

			_shouldBeCalledWithUrl(
				params,
				'http://www.omdbapi.com/' +
					'?i=tt1013753&tomatoes=true&r=json',
				done);
		});

	});

	describe('with "type" parameter', function() {

		it('returns error for invalid value', function(done) {
			var params = {
				title: 'Milk',
				type: 'film'
			};

			_errorShouldHaveMessage(
				params, 
				'type must be: movie, series, episode.', 
				done);
		});

		it('returns no error for value: "movie"', function(done) {
			var params = {
				title: 'Milk',
				type: 'movie'
			};

			_errorShouldNotExist(params, done);
		});

		it('returns no error for value: "series"', function(done) {
			var params = {
				title: 'Milk',
				type: 'series'
			};

			_errorShouldNotExist(params, done);
		});

		it('returns no error for value: "episode"', function(done) {
			var params = {
				title: 'Milk',
				type: 'episode'
			};

			_errorShouldNotExist(params, done);
		});

		it('calls omdbapi with type querystring param', function(done) {
			var params = {
				id: 'tt1013753',
				type: 'episode'
			};

			_shouldBeCalledWithUrl(
				params,
				'http://www.omdbapi.com/' +
					'?i=tt1013753&type=episode&r=json',
				done);
		});

	});

	describe('with "plot" parameter', function() {

		it('returns error for invalid value', function(done) {
			var params = {
				title: 'Milk',
				plot: 'big'
			};

			_errorShouldHaveMessage(
				params, 
				'plot must be: short, full.',
				done);
		});

		it('returns no error for value: "short"', function(done) {
			var params = {
				title: 'Milk',
				plot: 'short'
			};

			_errorShouldNotExist(params, done);
		});

		it('returns no error for value: "full"', function(done) {
			var params = {
				title: 'Milk',
				plot: 'full'
			};

			_errorShouldNotExist(params, done);
		});

		it('calls omdbapi with plot querystring param', function(done) {
			var params = {
				id: 'tt1013753',
				plot: 'full'
			};

			_shouldBeCalledWithUrl(
				params,
				'http://www.omdbapi.com/' +
					'?i=tt1013753&plot=full&r=json',
				done);
		});

	});

});