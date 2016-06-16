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

var extend = require('./extend');

var DEFAULT_ERROR = {
  status: 500
};

/**
 * Create express middleware that catches unhandled errors. All properties
 * excluding the `status` property are included in the response. Default
 * properties can be specified if desired.
 *
 * @param {object} [defaults] The default properties for an error.
 * @param {number} [defaults.status=500] The HTTP status code.
 * @returns {function} The express middleware.
 *
 */
module.exports = function (defaults) {
  return function (err, req, res, _) {
    var error = extend(DEFAULT_ERROR, defaults, err);
    var status = error.status;

    delete error.status;
    res.status(status).json(error);
  };
};
