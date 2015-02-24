# IMDB Api Client

A lightweight client for the [http://www.omdbapi.com](http://www.omdbapi.com) service in Node.js.

## Example

Get specific movie:

```js
var params = {
	title: 'Terminator',
	year: 2012
}
imdbApi.get(params, function(err, data) {
	// process response...
});
```

See [more examples](https://github.com/bbraithwaite/imdb-api-client/blob/master/examples/get.example.js).

Search movies:

```js
var params = {
	query: 'Terminator',
	year: 2012
}
imdbApi.search(params, function(err, data) {
	// process response...
});
```

See [more examples](https://github.com/bbraithwaite/imdb-api-client/blob/master/examples/search.example.js).

##Dev Commands:

Run tests:

``` bash
npm test
```

Run test coverage report:

``` bash
npm run coverage
```

Run jshint:

``` bash
npm run lint
```
