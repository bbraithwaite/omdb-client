'use strict';

require('should');

var imdbApi = require('../index');

describe('Get', function() {

	it('returns content matching film', function(done) {
		imdbApi.get('Milk', '2008', function(err, data) {
			data.should.eql({ Title: 'Milk',
				Year: '2008',
				Rated: 'R',
				Released: '30 Jan 2009',
				Runtime: '128 min',
				Genre: 'Biography, Drama, History',
				Director: 'Gus Van Sant',
				Writer: 'Dustin Lance Black',
				Actors: 'Sean Penn, Emile Hirsch, Josh Brolin, Diego Luna',
				Plot: 'The story of Harvey Milk, and his struggles as an ' +
					'American gay activist who fought for gay rights and became ' +
					'California\'s first openly gay elected official.',
				Language: 'English',
				Country: 'USA',
				Awards: 'Won 2 Oscars. Another 64 wins & 97 nominations.',
				Poster: 'http://ia.media-imdb.com/images/' + 
					'M/MV5BMTI2OTM5NjUzMV5BMl5BanBnXkFtZTcwMzY1MTM5MQ@@._V1_SX300.jpg',
				Metascore: '84',
				imdbRating: '7.7',
				imdbVotes: '119,543',
				imdbID: 'tt1013753',
				Type: 'movie',
				Response: 'True' });
			done();
		});
	});

	it('returns error message for invalid film title', function(done) {
		imdbApi.get('Invalid Film Title', '2004', function(err, data) {
			err.should.equal('Movie not found!');
			done();
		});
	});

});