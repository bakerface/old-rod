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

/**
 * An error representing a resource that could not be found.
 *
 * @param {string} resource The resource path.
 *
 */
function ResourceNotFoundError(resource) {
  Error.call(this);
  Error.captureStackTrace(this, this.constructor);

  this.name = 'ResourceNotFoundError';
  this.message = 'The specified resource could not be found';
  this.resource = resource;
  this.status = 404;
}

/**
 * Create express middleware that catches unhandled routes and throws a
 * ResourceNotFoundError.
 *
 * @returns {function} The express middleware.
 *
 */
module.exports = function () {
  return function (req) {
    throw new ResourceNotFoundError(req.path);
  };
};
