/**
 * Copyright (c) 2016 Christopher M. Baker
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

var express = require('express');
var supertest = require('supertest');
var rod = require('..');

function Status(status) {
  this.status = status;
}

Status.prototype.inherited = 'inherited';

function Name(name) {
  this.name = name;
}

Name.prototype.inherited = 'inherited';

describe('cast(defaults)', function () {
  var app;
  var request;

  beforeEach(function () {
    app = express();

    app.get('/catch/boolean', function (req, res, next) {
      next(true);
    });

    app.get('/catch/name/:name', function (req, res, next) {
      next(new Name(req.params.name));
    });

    app.get('/catch/status/:status', function (req, res, next) {
      next(new Status(req.params.status));
    });
  });

  describe('when default properties are not defined', function () {
    beforeEach(function () {
      app.use(rod.cast());
    });

    describe('catching a boolean', function () {
      beforeEach(function () {
        request = supertest(app).get('/catch/boolean');
      });

      it('should return 500 Internal Server Error', function (done) {
        request.expect(500, { }, done);
      });
    });

    describe('catching an object with a status', function () {
      beforeEach(function () {
        request = supertest(app).get('/catch/status/404');
      });

      it('should return the object status', function (done) {
        request.expect(404, { }, done);
      });
    });

    describe('catching an object with a name', function () {
      beforeEach(function () {
        request = supertest(app).get('/catch/name/CustomError');
      });

      it('should return the object name', function (done) {
        request.expect(500, {
          name: 'CustomError'
        }, done);
      });
    });
  });

  describe('when the default status is defined', function () {
    beforeEach(function () {
      app.use(rod.cast({
        status: 501
      }));
    });

    describe('catching a boolean', function () {
      beforeEach(function () {
        request = supertest(app).get('/catch/boolean');
      });

      it('should return the default status', function (done) {
        request.expect(501, { }, done);
      });
    });

    describe('catching an object with a status', function () {
      beforeEach(function () {
        request = supertest(app).get('/catch/status/404');
      });

      it('should return the object status', function (done) {
        request.expect(404, { }, done);
      });
    });

    describe('catching an object with a name', function () {
      beforeEach(function () {
        request = supertest(app).get('/catch/name/CustomError');
      });

      it('should return the object name and default status', function (done) {
        request.expect(501, {
          name: 'CustomError'
        }, done);
      });
    });
  });

  describe('when a default name is defined', function () {
    beforeEach(function () {
      app.use(rod.cast({
        name: 'Error'
      }));
    });

    describe('catching a boolean', function () {
      beforeEach(function () {
        request = supertest(app).get('/catch/boolean');
      });

      it('should return the default name', function (done) {
        request.expect(500, {
          name: 'Error'
        }, done);
      });
    });

    describe('catching an object with a status', function () {
      beforeEach(function () {
        request = supertest(app).get('/catch/status/404');
      });

      it('should return the object status and default name', function (done) {
        request.expect(404, {
          name: 'Error'
        }, done);
      });
    });

    describe('catching an object with a name', function () {
      beforeEach(function () {
        request = supertest(app).get('/catch/name/CustomError');
      });

      it('should return the object name', function (done) {
        request.expect(500, {
          name: 'CustomError'
        }, done);
      });
    });
  });
});
