# OMDb API Client - The Open Movie Database

A node.js client for the http://www.omdbapi.com API. The OMDb API is a free web service to obtain movie information, all content and images on the site are contributed and maintained by our users.

## Example

Get specific movie:

```js
var params = {
	title: 'Terminator',
	year: 2012
}
omdbApi.get(params, function(err, data) {
	// process response...
});
```

See [more examples](https://github.com/bbraithwaite/omdb-api-client/blob/master/examples/get.example.js).

Search movies:

```js
var params = {
	query: 'Terminator',
	year: 2012
}
omdbApi.search(params, function(err, data) {
	// process response...
});
```

See [more examples](https://github.com/bbraithwaite/omdb-api-client/blob/master/examples/search.example.js).

##Dev Commands:

Run tests:

```bash
npm test
```

Run test coverage report:

```bash
npm run coverage
```

Run jshint:

```bash
npm run lint
```