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
 * Copies all properties owned by a template object and defined in a source
 * object to a target object.
 *
 * @param {object} target The target object.
 * @param {object} template The template object.
 * @param {object} source The source object.
 * @returns {object} The target object.
 *
 */
function existing(target, template, source) {
  for (var key in template) {
    if (Object.prototype.hasOwnProperty.call(template, key)) {
      var value = source[key];

      if (typeof value !== 'undefined') {
        target[key] = value;
      }
    }
  }

  return target;
}

/**
 * Copies all properties owned by a source object to a target object.
 *
 * @param {object} target The target object.
 * @param {object} source The source object.
 * @returns {object} The target object.
 *
 */
function additional(target, source) {
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      target[key] = source[key];
    }
  }

  return target;
}

/**
 * Extends a target object with properties from a source object.
 *
 * @param {object} target The target object.
 * @param {object} source The source object.
 * @returns {object} The target object.
 *
 */
function extend(target, source) {
  if (source) {
    existing(target, target, source);
    additional(target, source);
  }

  return target;
}

/**
 * Copies all properties owned by an array of source objects to a new object.
 * Properties in objects at the end of the array overwrite properties in objects
 * at the beginning of the array.
 *
 * @param {...object} sources The source objects.
 * @returns {object} A new object containing the source properties.
 *
 */
module.exports = function () {
  return [].concat.apply([], arguments).reduce(extend, { });
};
