# old-rod
[![npm
package](https://badge.fury.io/js/old-rod.svg)](http://badge.fury.io/js/old-rod)
[![build](https://travis-ci.org/bakerface/old-rod.svg?branch=master)](https://travis-ci.org/bakerface/old-rod)
[![code
climate](https://codeclimate.com/github/bakerface/old-rod/badges/gpa.svg)](https://codeclimate.com/github/bakerface/old-rod)
[![coverage](https://codeclimate.com/github/bakerface/old-rod/badges/coverage.svg)](https://codeclimate.com/github/bakerface/old-rod/coverage)
[![issues](https://img.shields.io/github/issues/bakerface/old-rod.svg)](https://github.com/bakerface/old-rod/issues)
[![dependencies](https://david-dm.org/bakerface/old-rod.svg)](https://david-dm.org/bakerface/old-rod)
[![devDependencies](https://david-dm.org/bakerface/old-rod/dev-status.svg)](https://david-dm.org/bakerface/old-rod#info=devDependencies)
[![downloads](http://img.shields.io/npm/dm/old-rod.svg)](https://www.npmjs.com/package/old-rod)

The purpose of this package is to simplify error handling in express
applications.

``` javascript
var express = require('express');
var rod = require('old-rod');
var app = express();

app.get('/', function () {
  throw {
    status: 400,
    foo: 'bar'
  };
});

// cast your line and catch your errors
app.use(rod.cast());

// even supply default properties for errors if you choose
app.use(rod.cast({
  name: 'UnexpectedError',
  message: 'An unexpected error has occurred'
}));

app.listen(process.env.PORT);
```
