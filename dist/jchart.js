;(function() { //Protect scope 


/**
 * Find minimum value of an object or array
 * ============================================================
 * @name root._min
 * @param {Object} or [Array]
 * @return min_value
 */
var color_meter, format, hexToRgb, padZeroMonth, rgbToHex, roundValues, _max, _min;

_min = function(obj) {
  var min, value, _i, _len;
  min = Infinity;
  for (_i = 0, _len = obj.length; _i < _len; _i++) {
    value = obj[_i];
    if ((value != null) && value < min) {
      min = value;
    }
  }
  if (min === Infinity) {
    return null;
  } else {
    return min;
  }
};


/**
 * Find maximum value of an object or array
 * ============================================================
 * @name root._max
 * @param {Object} or [Array]
 * @return max_value
 */

_max = function(obj) {
  var max, value, _i, _len;
  max = -Infinity;
  for (_i = 0, _len = obj.length; _i < _len; _i++) {
    value = obj[_i];
    if ((value != null) && value > max) {
      max = value;
    }
  }
  if (max === -Infinity) {
    return null;
  } else {
    return max;
  }
};


/**
 * ????
 * ============================================================
 * @name Number.prototype.format
 * @param {????} ????
 * @param {String} ????
 * @param {String} ????
 * @return {String}
 */

Number.prototype.format = format = function(decimals, dec, sep) {
  var n, number, prec, s, toFixedFix;
  if (dec == null) {
    dec = '.';
  }
  if (sep == null) {
    sep = ',';
  }
  number = (this + '').replace(/[^0-9+\-Ee.]/g, '');
  if (number === '-99999.99' || (number == null)) {
    return '-';
  }
  n = !isFinite(+number) ? 0 : +number;
  prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
  if (number > 1000000000) {
    return (number / 1000000000).format(decimals) + 'B';
  }
  if (number > 1000000) {
    return (number / 1000000).format(decimals) + 'M';
  }
  toFixedFix = function(n, prec) {
    var k;
    k = Math.pow(10, prec);
    return '' + Math.round(n * k) / k;
  };
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
};


/**
 * RGB to HEX color converter
 * ============================================================
 */

rgbToHex = function(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};


/**
 * HEX to RGB color converter
 * ============================================================
 */

hexToRgb = function(hex) {
  var result;
  result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    };
  } else {
    return null;
  }
};


/**
 * HEX color difference
 * ============================================================
 */

color_meter = function(cwith, ccolor) {
  var p1, p2, p3, perc1, perc2, __b, __g, __r, _b, _ccolor, _cwith, _g, _r;
  if (!cwith && !ccolor) {
    return;
  }
  _cwith = (cwith.charAt(0) === "#" ? cwith.substring(1, 7) : cwith);
  _ccolor = (ccolor.charAt(0) === "#" ? ccolor.substring(1, 7) : ccolor);
  _r = parseInt(_cwith.substring(0, 2), 16);
  _g = parseInt(_cwith.substring(2, 4), 16);
  _b = parseInt(_cwith.substring(4, 6), 16);
  __r = parseInt(_ccolor.substring(0, 2), 16);
  __g = parseInt(_ccolor.substring(2, 4), 16);
  __b = parseInt(_ccolor.substring(4, 6), 16);
  p1 = (_r / 255) * 100;
  p2 = (_g / 255) * 100;
  p3 = (_b / 255) * 100;
  perc1 = Math.round((p1 + p2 + p3) / 3);
  p1 = (__r / 255) * 100;
  p2 = (__g / 255) * 100;
  p3 = (__b / 255) * 100;
  perc2 = Math.round((p1 + p2 + p3) / 3);
  return Math.abs(perc1 - perc2);
};


/**
 * Round data values
 * ============================================================
 */

roundValues = function(arrays) {
  return arrays.forEach(function(item) {
    return item.forEach(function(value, i) {
      if (value !== void 0 && value !== null) {
        return item[i] = parseFloat(value.toFixed(2));
      }
    });
  });
};


/**
 * Pad month with zeros
 * ============================================================
 */

padZeroMonth = function(hash) {
  var key, m, temp, value, year, _ref;
  temp = {};
  for (key in hash) {
    value = hash[key];
    _ref = key.split('-'), year = _ref[0], m = _ref[1];
    if (m.length === 1) {
      m = '0' + m;
    }
    temp["" + year + "-" + m] = value;
  }
  return temp;
};


/**
 * Date helpers
 * ============================================================
 */

Date.prototype.add = function(number, duration) {
  if (duration === 'days') {
    return this.setDate(this.getDate() + number);
  } else if (duration === 'months') {
    return this.setMonth(this.getMonth() + number);
  } else {
    return this.setYear(this.getYear() + number);
  }
};

Date.prototype.diffMonth = function(d1) {
  var d2, months;
  d2 = this;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth() + 1;
  months += d2.getMonth();
  if (months < 0) {
    months = 0;
  }
  return months;
};


/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash include="merge,min,max,size,filter"`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** Used to pool arrays and objects used internally */
var arrayPool = [];

/** Used internally to indicate various things */
var indicatorObject = {};

/** Used as the max size of the `arrayPool` and `objectPool` */
var maxPoolSize = 40;

/** Used to detected named functions */
var reFuncName = /^\s*function[ \n\r\t]+\w/;

/** Used to detect functions containing a `this` reference */
var reThis = /\bthis\b/;

/** Used to fix the JScript [[DontEnum]] bug */
var shadowedProps = [
  'constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable',
  'toLocaleString', 'toString', 'valueOf'
];

/** `Object#toString` result shortcuts */
var argsClass = '[object Arguments]',
    arrayClass = '[object Array]',
    boolClass = '[object Boolean]',
    dateClass = '[object Date]',
    errorClass = '[object Error]',
    funcClass = '[object Function]',
    numberClass = '[object Number]',
    objectClass = '[object Object]',
    regexpClass = '[object RegExp]',
    stringClass = '[object String]';

/** Used as the property descriptor for `__bindData__` */
var descriptor = {
  'configurable': false,
  'enumerable': false,
  'value': null,
  'writable': false
};

/** Used as the data object for `iteratorTemplate` */
var iteratorData = {
  'args': '',
  'array': null,
  'bottom': '',
  'firstArg': '',
  'init': '',
  'keys': null,
  'loop': '',
  'shadowedProps': null,
  'support': null,
  'top': '',
  'useHas': false
};

/** Used to determine if values are of the language type Object */
var objectTypes = {
  'boolean': false,
  'function': true,
  'object': true,
  'number': false,
  'string': false,
  'undefined': false
};

/** Used as a reference to the global object */
var root = (objectTypes[typeof window] && window) || this;

/** Detect free variable `exports` */
var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

/** Detect free variable `module` */
var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports` */
var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;

/** Detect free variable `global` from Node.js or Browserified code and use it as `root` */
var freeGlobal = objectTypes[typeof global] && global;
if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
  root = freeGlobal;
}

/*--------------------------------------------------------------------------*/

/**
 * Used by `_.max` and `_.min` as the default callback when a given
 * collection is a string value.
 *
 * @private
 * @param {string} value The character to inspect.
 * @returns {number} Returns the code unit of given character.
 */
function charAtCallback(value) {
  return value.charCodeAt(0);
}

/**
 * Gets an array from the array pool or creates a new one if the pool is empty.
 *
 * @private
 * @returns {Array} The array from the pool.
 */
function getArray() {
  return arrayPool.pop() || [];
}

/**
 * Checks if `value` is a DOM node in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the `value` is a DOM node, else `false`.
 */
function isNode(value) {
  // IE < 9 presents DOM nodes as `Object` objects except they have `toString`
  // methods that are `typeof` "string" and still can coerce nodes to strings
  return typeof value.toString != 'function' && typeof (value + '') == 'string';
}

/**
 * Releases the given array back to the array pool.
 *
 * @private
 * @param {Array} [array] The array to release.
 */
function releaseArray(array) {
  array.length = 0;
  if (arrayPool.length < maxPoolSize) {
    arrayPool.push(array);
  }
}

/**
 * Slices the `collection` from the `start` index up to, but not including,
 * the `end` index.
 *
 * Note: This function is used instead of `Array#slice` to support node lists
 * in IE < 9 and to ensure dense arrays are returned.
 *
 * @private
 * @param {Array|Object|string} collection The collection to slice.
 * @param {number} start The start index.
 * @param {number} end The end index.
 * @returns {Array} Returns the new array.
 */
function slice(array, start, end) {
  start || (start = 0);
  if (typeof end == 'undefined') {
    end = array ? array.length : 0;
  }
  var index = -1,
      length = end - start || 0,
      result = Array(length < 0 ? 0 : length);

  while (++index < length) {
    result[index] = array[start + index];
  }
  return result;
}

/*--------------------------------------------------------------------------*/

/**
 * Used for `Array` method references.
 *
 * Normally `Array.prototype` would suffice, however, using an array literal
 * avoids issues in Narwhal.
 */
var arrayRef = [];

/** Used for native method references */
var errorProto = Error.prototype,
    objectProto = Object.prototype,
    stringProto = String.prototype;

/** Used to resolve the internal [[Class]] of values */
var toString = objectProto.toString;

/** Used to detect if a method is native */
var reNative = RegExp('^' +
  String(toString)
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replace(/toString| for [^\]]+/g, '.*?') + '$'
);

/** Native method shortcuts */
var fnToString = Function.prototype.toString,
    getPrototypeOf = isNative(getPrototypeOf = Object.getPrototypeOf) && getPrototypeOf,
    hasOwnProperty = objectProto.hasOwnProperty,
    push = arrayRef.push,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    unshift = arrayRef.unshift;

/** Used to set meta data on functions */
var defineProperty = (function() {
  // IE 8 only accepts DOM elements
  try {
    var o = {},
        func = isNative(func = Object.defineProperty) && func,
        result = func(o, o, o) && func;
  } catch(e) { }
  return result;
}());

/* Native method shortcuts for methods with the same name as other `lodash` methods */
var nativeCreate = isNative(nativeCreate = Object.create) && nativeCreate,
    nativeIsArray = isNative(nativeIsArray = Array.isArray) && nativeIsArray,
    nativeKeys = isNative(nativeKeys = Object.keys) && nativeKeys;

/** Used to avoid iterating non-enumerable properties in IE < 9 */
var nonEnumProps = {};
nonEnumProps[arrayClass] = nonEnumProps[dateClass] = nonEnumProps[numberClass] = { 'constructor': true, 'toLocaleString': true, 'toString': true, 'valueOf': true };
nonEnumProps[boolClass] = nonEnumProps[stringClass] = { 'constructor': true, 'toString': true, 'valueOf': true };
nonEnumProps[errorClass] = nonEnumProps[funcClass] = nonEnumProps[regexpClass] = { 'constructor': true, 'toString': true };
nonEnumProps[objectClass] = { 'constructor': true };

(function() {
  var length = shadowedProps.length;
  while (length--) {
    var key = shadowedProps[length];
    for (var className in nonEnumProps) {
      if (hasOwnProperty.call(nonEnumProps, className) && !hasOwnProperty.call(nonEnumProps[className], key)) {
        nonEnumProps[className][key] = false;
      }
    }
  }
}());

/*--------------------------------------------------------------------------*/

/**
 * Creates a `lodash` object which wraps the given value to enable intuitive
 * method chaining.
 *
 * In addition to Lo-Dash methods, wrappers also have the following `Array` methods:
 * `concat`, `join`, `pop`, `push`, `reverse`, `shift`, `slice`, `sort`, `splice`,
 * and `unshift`
 *
 * Chaining is supported in custom builds as long as the `value` method is
 * implicitly or explicitly included in the build.
 *
 * The chainable wrapper functions are:
 * `after`, `assign`, `bind`, `bindAll`, `bindKey`, `chain`, `compact`,
 * `compose`, `concat`, `countBy`, `create`, `createCallback`, `curry`,
 * `debounce`, `defaults`, `defer`, `delay`, `difference`, `filter`, `flatten`,
 * `forEach`, `forEachRight`, `forIn`, `forInRight`, `forOwn`, `forOwnRight`,
 * `functions`, `groupBy`, `indexBy`, `initial`, `intersection`, `invert`,
 * `invoke`, `keys`, `map`, `max`, `memoize`, `merge`, `min`, `object`, `omit`,
 * `once`, `pairs`, `partial`, `partialRight`, `pick`, `pluck`, `pull`, `push`,
 * `range`, `reject`, `remove`, `rest`, `reverse`, `shuffle`, `slice`, `sort`,
 * `sortBy`, `splice`, `tap`, `throttle`, `times`, `toArray`, `transform`,
 * `union`, `uniq`, `unshift`, `unzip`, `values`, `where`, `without`, `wrap`,
 * and `zip`
 *
 * The non-chainable wrapper functions are:
 * `clone`, `cloneDeep`, `contains`, `escape`, `every`, `find`, `findIndex`,
 * `findKey`, `findLast`, `findLastIndex`, `findLastKey`, `has`, `identity`,
 * `indexOf`, `isArguments`, `isArray`, `isBoolean`, `isDate`, `isElement`,
 * `isEmpty`, `isEqual`, `isFinite`, `isFunction`, `isNaN`, `isNull`, `isNumber`,
 * `isObject`, `isPlainObject`, `isRegExp`, `isString`, `isUndefined`, `join`,
 * `lastIndexOf`, `mixin`, `noConflict`, `parseInt`, `pop`, `random`, `reduce`,
 * `reduceRight`, `result`, `shift`, `size`, `some`, `sortedIndex`, `runInContext`,
 * `template`, `unescape`, `uniqueId`, and `value`
 *
 * The wrapper functions `first` and `last` return wrapped values when `n` is
 * provided, otherwise they return unwrapped values.
 *
 * Explicit chaining can be enabled by using the `_.chain` method.
 *
 * @name _
 * @constructor
 * @category Chaining
 * @param {*} value The value to wrap in a `lodash` instance.
 * @returns {Object} Returns a `lodash` instance.
 * @example
 *
 * var wrapped = _([1, 2, 3]);
 *
 * // returns an unwrapped value
 * wrapped.reduce(function(sum, num) {
 *   return sum + num;
 * });
 * // => 6
 *
 * // returns a wrapped value
 * var squares = wrapped.map(function(num) {
 *   return num * num;
 * });
 *
 * _.isArray(squares);
 * // => false
 *
 * _.isArray(squares.value());
 * // => true
 */
function lodash() {
  // no operation performed
}

/**
 * An object used to flag environments features.
 *
 * @static
 * @memberOf _
 * @type Object
 */
var support = lodash.support = {};

(function() {
  var ctor = function() { this.x = 1; },
      object = { '0': 1, 'length': 1 },
      props = [];

  ctor.prototype = { 'valueOf': 1, 'y': 1 };
  for (var key in new ctor) { props.push(key); }
  for (key in arguments) { }

  /**
   * Detect if an `arguments` object's [[Class]] is resolvable (all but Firefox < 4, IE < 9).
   *
   * @memberOf _.support
   * @type boolean
   */
  support.argsClass = toString.call(arguments) == argsClass;

  /**
   * Detect if `arguments` objects are `Object` objects (all but Narwhal and Opera < 10.5).
   *
   * @memberOf _.support
   * @type boolean
   */
  support.argsObject = arguments.constructor == Object && !(arguments instanceof Array);

  /**
   * Detect if `name` or `message` properties of `Error.prototype` are
   * enumerable by default. (IE < 9, Safari < 5.1)
   *
   * @memberOf _.support
   * @type boolean
   */
  support.enumErrorProps = propertyIsEnumerable.call(errorProto, 'message') || propertyIsEnumerable.call(errorProto, 'name');

  /**
   * Detect if `prototype` properties are enumerable by default.
   *
   * Firefox < 3.6, Opera > 9.50 - Opera < 11.60, and Safari < 5.1
   * (if the prototype or a property on the prototype has been set)
   * incorrectly sets a function's `prototype` property [[Enumerable]]
   * value to `true`.
   *
   * @memberOf _.support
   * @type boolean
   */
  support.enumPrototypes = propertyIsEnumerable.call(ctor, 'prototype');

  /**
   * Detect if functions can be decompiled by `Function#toString`
   * (all but PS3 and older Opera mobile browsers & avoided in Windows 8 apps).
   *
   * @memberOf _.support
   * @type boolean
   */
  support.funcDecomp = !isNative(root.WinRTError) && reThis.test(function() { return this; });

  /**
   * Detect if `Function#name` is supported (all but IE).
   *
   * @memberOf _.support
   * @type boolean
   */
  support.funcNames = typeof Function.name == 'string';

  /**
   * Detect if `arguments` object indexes are non-enumerable
   * (Firefox < 4, IE < 9, PhantomJS, Safari < 5.1).
   *
   * @memberOf _.support
   * @type boolean
   */
  support.nonEnumArgs = key != 0;

  /**
   * Detect if properties shadowing those on `Object.prototype` are non-enumerable.
   *
   * In IE < 9 an objects own properties, shadowing non-enumerable ones, are
   * made non-enumerable as well (a.k.a the JScript [[DontEnum]] bug).
   *
   * @memberOf _.support
   * @type boolean
   */
  support.nonEnumShadows = !/valueOf/.test(props);

  /**
   * Detect if own properties are iterated after inherited properties (all but IE < 9).
   *
   * @memberOf _.support
   * @type boolean
   */
  support.ownLast = props[0] != 'x';

  /**
   * Detect if `Array#shift` and `Array#splice` augment array-like objects correctly.
   *
   * Firefox < 10, IE compatibility mode, and IE < 9 have buggy Array `shift()`
   * and `splice()` functions that fail to remove the last element, `value[0]`,
   * of array-like objects even though the `length` property is set to `0`.
   * The `shift()` method is buggy in IE 8 compatibility mode, while `splice()`
   * is buggy regardless of mode in IE < 9 and buggy in compatibility mode in IE 9.
   *
   * @memberOf _.support
   * @type boolean
   */
  support.spliceObjects = (arrayRef.splice.call(object, 0, 1), !object[0]);

  /**
   * Detect lack of support for accessing string characters by index.
   *
   * IE < 8 can't access characters by index and IE 8 can only access
   * characters by index on string literals.
   *
   * @memberOf _.support
   * @type boolean
   */
  support.unindexedChars = ('x'[0] + Object('x')[0]) != 'xx';

  /**
   * Detect if a DOM node's [[Class]] is resolvable (all but IE < 9)
   * and that the JS engine errors when attempting to coerce an object to
   * a string without a `toString` function.
   *
   * @memberOf _.support
   * @type boolean
   */
  try {
    support.nodeClass = !(toString.call(document) == objectClass && !({ 'toString': 0 } + ''));
  } catch(e) {
    support.nodeClass = true;
  }
}(1));

/*--------------------------------------------------------------------------*/

/**
 * The template used to create iterator functions.
 *
 * @private
 * @param {Object} data The data object used to populate the text.
 * @returns {string} Returns the interpolated text.
 */
var iteratorTemplate = function(obj) {

  var __p = 'var index, iterable = ' +
  (obj.firstArg) +
  ', result = ' +
  (obj.init) +
  ';\nif (!iterable) return result;\n' +
  (obj.top) +
  ';';
   if (obj.array) {
  __p += '\nvar length = iterable.length; index = -1;\nif (' +
  (obj.array) +
  ') {  ';
   if (support.unindexedChars) {
  __p += '\n  if (isString(iterable)) {\n    iterable = iterable.split(\'\')\n  }  ';
   }
  __p += '\n  while (++index < length) {\n    ' +
  (obj.loop) +
  ';\n  }\n}\nelse {  ';
   } else if (support.nonEnumArgs) {
  __p += '\n  var length = iterable.length; index = -1;\n  if (length && isArguments(iterable)) {\n    while (++index < length) {\n      index += \'\';\n      ' +
  (obj.loop) +
  ';\n    }\n  } else {  ';
   }

   if (support.enumPrototypes) {
  __p += '\n  var skipProto = typeof iterable == \'function\';\n  ';
   }

   if (support.enumErrorProps) {
  __p += '\n  var skipErrorProps = iterable === errorProto || iterable instanceof Error;\n  ';
   }

      var conditions = [];    if (support.enumPrototypes) { conditions.push('!(skipProto && index == "prototype")'); }    if (support.enumErrorProps)  { conditions.push('!(skipErrorProps && (index == "message" || index == "name"))'); }

   if (obj.useHas && obj.keys) {
  __p += '\n  var ownIndex = -1,\n      ownProps = objectTypes[typeof iterable] && keys(iterable),\n      length = ownProps ? ownProps.length : 0;\n\n  while (++ownIndex < length) {\n    index = ownProps[ownIndex];\n';
      if (conditions.length) {
  __p += '    if (' +
  (conditions.join(' && ')) +
  ') {\n  ';
   }
  __p +=
  (obj.loop) +
  ';    ';
   if (conditions.length) {
  __p += '\n    }';
   }
  __p += '\n  }  ';
   } else {
  __p += '\n  for (index in iterable) {\n';
      if (obj.useHas) { conditions.push("hasOwnProperty.call(iterable, index)"); }    if (conditions.length) {
  __p += '    if (' +
  (conditions.join(' && ')) +
  ') {\n  ';
   }
  __p +=
  (obj.loop) +
  ';    ';
   if (conditions.length) {
  __p += '\n    }';
   }
  __p += '\n  }    ';
   if (support.nonEnumShadows) {
  __p += '\n\n  if (iterable !== objectProto) {\n    var ctor = iterable.constructor,\n        isProto = iterable === (ctor && ctor.prototype),\n        className = iterable === stringProto ? stringClass : iterable === errorProto ? errorClass : toString.call(iterable),\n        nonEnum = nonEnumProps[className];\n      ';
   for (k = 0; k < 7; k++) {
  __p += '\n    index = \'' +
  (obj.shadowedProps[k]) +
  '\';\n    if ((!(isProto && nonEnum[index]) && hasOwnProperty.call(iterable, index))';
          if (!obj.useHas) {
  __p += ' || (!nonEnum[index] && iterable[index] !== objectProto[index])';
   }
  __p += ') {\n      ' +
  (obj.loop) +
  ';\n    }      ';
   }
  __p += '\n  }    ';
   }

   }

   if (obj.array || support.nonEnumArgs) {
  __p += '\n}';
   }
  __p +=
  (obj.bottom) +
  ';\nreturn result';

  return __p
};

/*--------------------------------------------------------------------------*/

/**
 * The base implementation of `_.bind` that creates the bound function and
 * sets its meta data.
 *
 * @private
 * @param {Array} bindData The bind data array.
 * @returns {Function} Returns the new bound function.
 */
function baseBind(bindData) {
  var func = bindData[0],
      partialArgs = bindData[2],
      thisArg = bindData[4];

  function bound() {
    // `Function#bind` spec
    // http://es5.github.io/#x15.3.4.5
    if (partialArgs) {
      // avoid `arguments` object deoptimizations by using `slice` instead
      // of `Array.prototype.slice.call` and not assigning `arguments` to a
      // variable as a ternary expression
      var args = slice(partialArgs);
      push.apply(args, arguments);
    }
    // mimic the constructor's `return` behavior
    // http://es5.github.io/#x13.2.2
    if (this instanceof bound) {
      // ensure `new bound` is an instance of `func`
      var thisBinding = baseCreate(func.prototype),
          result = func.apply(thisBinding, args || arguments);
      return isObject(result) ? result : thisBinding;
    }
    return func.apply(thisArg, args || arguments);
  }
  setBindData(bound, bindData);
  return bound;
}

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} prototype The object to inherit from.
 * @returns {Object} Returns the new object.
 */
function baseCreate(prototype, properties) {
  return isObject(prototype) ? nativeCreate(prototype) : {};
}
// fallback for browsers without `Object.create`
if (!nativeCreate) {
  baseCreate = (function() {
    function Object() {}
    return function(prototype) {
      if (isObject(prototype)) {
        Object.prototype = prototype;
        var result = new Object;
        Object.prototype = null;
      }
      return result || root.Object();
    };
  }());
}

/**
 * The base implementation of `_.createCallback` without support for creating
 * "_.pluck" or "_.where" style callbacks.
 *
 * @private
 * @param {*} [func=identity] The value to convert to a callback.
 * @param {*} [thisArg] The `this` binding of the created callback.
 * @param {number} [argCount] The number of arguments the callback accepts.
 * @returns {Function} Returns a callback function.
 */
function baseCreateCallback(func, thisArg, argCount) {
  if (typeof func != 'function') {
    return identity;
  }
  // exit early for no `thisArg` or already bound by `Function#bind`
  if (typeof thisArg == 'undefined' || !('prototype' in func)) {
    return func;
  }
  var bindData = func.__bindData__;
  if (typeof bindData == 'undefined') {
    if (support.funcNames) {
      bindData = !func.name;
    }
    bindData = bindData || !support.funcDecomp;
    if (!bindData) {
      var source = fnToString.call(func);
      if (!support.funcNames) {
        bindData = !reFuncName.test(source);
      }
      if (!bindData) {
        // checks if `func` references the `this` keyword and stores the result
        bindData = reThis.test(source);
        setBindData(func, bindData);
      }
    }
  }
  // exit early if there are no `this` references or `func` is bound
  if (bindData === false || (bindData !== true && bindData[1] & 1)) {
    return func;
  }
  switch (argCount) {
    case 1: return function(value) {
      return func.call(thisArg, value);
    };
    case 2: return function(a, b) {
      return func.call(thisArg, a, b);
    };
    case 3: return function(value, index, collection) {
      return func.call(thisArg, value, index, collection);
    };
    case 4: return function(accumulator, value, index, collection) {
      return func.call(thisArg, accumulator, value, index, collection);
    };
  }
  return bind(func, thisArg);
}

/**
 * The base implementation of `createWrapper` that creates the wrapper and
 * sets its meta data.
 *
 * @private
 * @param {Array} bindData The bind data array.
 * @returns {Function} Returns the new function.
 */
function baseCreateWrapper(bindData) {
  var func = bindData[0],
      bitmask = bindData[1],
      partialArgs = bindData[2],
      partialRightArgs = bindData[3],
      thisArg = bindData[4],
      arity = bindData[5];

  var isBind = bitmask & 1,
      isBindKey = bitmask & 2,
      isCurry = bitmask & 4,
      isCurryBound = bitmask & 8,
      key = func;

  function bound() {
    var thisBinding = isBind ? thisArg : this;
    if (partialArgs) {
      var args = slice(partialArgs);
      push.apply(args, arguments);
    }
    if (partialRightArgs || isCurry) {
      args || (args = slice(arguments));
      if (partialRightArgs) {
        push.apply(args, partialRightArgs);
      }
      if (isCurry && args.length < arity) {
        bitmask |= 16 & ~32;
        return baseCreateWrapper([func, (isCurryBound ? bitmask : bitmask & ~3), args, null, thisArg, arity]);
      }
    }
    args || (args = arguments);
    if (isBindKey) {
      func = thisBinding[key];
    }
    if (this instanceof bound) {
      thisBinding = baseCreate(func.prototype);
      var result = func.apply(thisBinding, args);
      return isObject(result) ? result : thisBinding;
    }
    return func.apply(thisBinding, args);
  }
  setBindData(bound, bindData);
  return bound;
}

/**
 * The base implementation of `_.isEqual`, without support for `thisArg` binding,
 * that allows partial "_.where" style comparisons.
 *
 * @private
 * @param {*} a The value to compare.
 * @param {*} b The other value to compare.
 * @param {Function} [callback] The function to customize comparing values.
 * @param {Function} [isWhere=false] A flag to indicate performing partial comparisons.
 * @param {Array} [stackA=[]] Tracks traversed `a` objects.
 * @param {Array} [stackB=[]] Tracks traversed `b` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(a, b, callback, isWhere, stackA, stackB) {
  // used to indicate that when comparing objects, `a` has at least the properties of `b`
  if (callback) {
    var result = callback(a, b);
    if (typeof result != 'undefined') {
      return !!result;
    }
  }
  // exit early for identical values
  if (a === b) {
    // treat `+0` vs. `-0` as not equal
    return a !== 0 || (1 / a == 1 / b);
  }
  var type = typeof a,
      otherType = typeof b;

  // exit early for unlike primitive values
  if (a === a &&
      !(a && objectTypes[type]) &&
      !(b && objectTypes[otherType])) {
    return false;
  }
  // exit early for `null` and `undefined` avoiding ES3's Function#call behavior
  // http://es5.github.io/#x15.3.4.4
  if (a == null || b == null) {
    return a === b;
  }
  // compare [[Class]] names
  var className = toString.call(a),
      otherClass = toString.call(b);

  if (className == argsClass) {
    className = objectClass;
  }
  if (otherClass == argsClass) {
    otherClass = objectClass;
  }
  if (className != otherClass) {
    return false;
  }
  switch (className) {
    case boolClass:
    case dateClass:
      // coerce dates and booleans to numbers, dates to milliseconds and booleans
      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal
      return +a == +b;

    case numberClass:
      // treat `NaN` vs. `NaN` as equal
      return (a != +a)
        ? b != +b
        // but treat `+0` vs. `-0` as not equal
        : (a == 0 ? (1 / a == 1 / b) : a == +b);

    case regexpClass:
    case stringClass:
      // coerce regexes to strings (http://es5.github.io/#x15.10.6.4)
      // treat string primitives and their corresponding object instances as equal
      return a == String(b);
  }
  var isArr = className == arrayClass;
  if (!isArr) {
    // unwrap any `lodash` wrapped values
    var aWrapped = hasOwnProperty.call(a, '__wrapped__'),
        bWrapped = hasOwnProperty.call(b, '__wrapped__');

    if (aWrapped || bWrapped) {
      return baseIsEqual(aWrapped ? a.__wrapped__ : a, bWrapped ? b.__wrapped__ : b, callback, isWhere, stackA, stackB);
    }
    // exit for functions and DOM nodes
    if (className != objectClass || (!support.nodeClass && (isNode(a) || isNode(b)))) {
      return false;
    }
    // in older versions of Opera, `arguments` objects have `Array` constructors
    var ctorA = !support.argsObject && isArguments(a) ? Object : a.constructor,
        ctorB = !support.argsObject && isArguments(b) ? Object : b.constructor;

    // non `Object` object instances with different constructors are not equal
    if (ctorA != ctorB &&
          !(isFunction(ctorA) && ctorA instanceof ctorA && isFunction(ctorB) && ctorB instanceof ctorB) &&
          ('constructor' in a && 'constructor' in b)
        ) {
      return false;
    }
  }
  // assume cyclic structures are equal
  // the algorithm for detecting cyclic structures is adapted from ES 5.1
  // section 15.12.3, abstract operation `JO` (http://es5.github.io/#x15.12.3)
  var initedStack = !stackA;
  stackA || (stackA = getArray());
  stackB || (stackB = getArray());

  var length = stackA.length;
  while (length--) {
    if (stackA[length] == a) {
      return stackB[length] == b;
    }
  }
  var size = 0;
  result = true;

  // add `a` and `b` to the stack of traversed objects
  stackA.push(a);
  stackB.push(b);

  // recursively compare objects and arrays (susceptible to call stack limits)
  if (isArr) {
    // compare lengths to determine if a deep comparison is necessary
    length = a.length;
    size = b.length;
    result = size == length;

    if (result || isWhere) {
      // deep compare the contents, ignoring non-numeric properties
      while (size--) {
        var index = length,
            value = b[size];

        if (isWhere) {
          while (index--) {
            if ((result = baseIsEqual(a[index], value, callback, isWhere, stackA, stackB))) {
              break;
            }
          }
        } else if (!(result = baseIsEqual(a[size], value, callback, isWhere, stackA, stackB))) {
          break;
        }
      }
    }
  }
  else {
    // deep compare objects using `forIn`, instead of `forOwn`, to avoid `Object.keys`
    // which, in this case, is more costly
    forIn(b, function(value, key, b) {
      if (hasOwnProperty.call(b, key)) {
        // count the number of properties.
        size++;
        // deep compare each property value.
        return (result = hasOwnProperty.call(a, key) && baseIsEqual(a[key], value, callback, isWhere, stackA, stackB));
      }
    });

    if (result && !isWhere) {
      // ensure both objects have the same number of properties
      forIn(a, function(value, key, a) {
        if (hasOwnProperty.call(a, key)) {
          // `size` will be `-1` if `a` has more properties than `b`
          return (result = --size > -1);
        }
      });
    }
  }
  stackA.pop();
  stackB.pop();

  if (initedStack) {
    releaseArray(stackA);
    releaseArray(stackB);
  }
  return result;
}

/**
 * The base implementation of `_.merge` without argument juggling or support
 * for `thisArg` binding.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {Function} [callback] The function to customize merging properties.
 * @param {Array} [stackA=[]] Tracks traversed source objects.
 * @param {Array} [stackB=[]] Associates values with source counterparts.
 */
function baseMerge(object, source, callback, stackA, stackB) {
  (isArray(source) ? forEach : forOwn)(source, function(source, key) {
    var found,
        isArr,
        result = source,
        value = object[key];

    if (source && ((isArr = isArray(source)) || isPlainObject(source))) {
      // avoid merging previously merged cyclic sources
      var stackLength = stackA.length;
      while (stackLength--) {
        if ((found = stackA[stackLength] == source)) {
          value = stackB[stackLength];
          break;
        }
      }
      if (!found) {
        var isShallow;
        if (callback) {
          result = callback(value, source);
          if ((isShallow = typeof result != 'undefined')) {
            value = result;
          }
        }
        if (!isShallow) {
          value = isArr
            ? (isArray(value) ? value : [])
            : (isPlainObject(value) ? value : {});
        }
        // add `source` and associated `value` to the stack of traversed objects
        stackA.push(source);
        stackB.push(value);

        // recursively merge objects and arrays (susceptible to call stack limits)
        if (!isShallow) {
          baseMerge(value, source, callback, stackA, stackB);
        }
      }
    }
    else {
      if (callback) {
        result = callback(value, source);
        if (typeof result == 'undefined') {
          result = source;
        }
      }
      if (typeof result != 'undefined') {
        value = result;
      }
    }
    object[key] = value;
  });
}

/**
 * Creates a function that, when called, either curries or invokes `func`
 * with an optional `this` binding and partially applied arguments.
 *
 * @private
 * @param {Function|string} func The function or method name to reference.
 * @param {number} bitmask The bitmask of method flags to compose.
 *  The bitmask may be composed of the following flags:
 *  1 - `_.bind`
 *  2 - `_.bindKey`
 *  4 - `_.curry`
 *  8 - `_.curry` (bound)
 *  16 - `_.partial`
 *  32 - `_.partialRight`
 * @param {Array} [partialArgs] An array of arguments to prepend to those
 *  provided to the new function.
 * @param {Array} [partialRightArgs] An array of arguments to append to those
 *  provided to the new function.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new function.
 */
function createWrapper(func, bitmask, partialArgs, partialRightArgs, thisArg, arity) {
  var isBind = bitmask & 1,
      isBindKey = bitmask & 2,
      isCurry = bitmask & 4,
      isCurryBound = bitmask & 8,
      isPartial = bitmask & 16,
      isPartialRight = bitmask & 32;

  if (!isBindKey && !isFunction(func)) {
    throw new TypeError;
  }
  if (isPartial && !partialArgs.length) {
    bitmask &= ~16;
    isPartial = partialArgs = false;
  }
  if (isPartialRight && !partialRightArgs.length) {
    bitmask &= ~32;
    isPartialRight = partialRightArgs = false;
  }
  var bindData = func && func.__bindData__;
  if (bindData && bindData !== true) {
    // clone `bindData`
    bindData = slice(bindData);
    if (bindData[2]) {
      bindData[2] = slice(bindData[2]);
    }
    if (bindData[3]) {
      bindData[3] = slice(bindData[3]);
    }
    // set `thisBinding` is not previously bound
    if (isBind && !(bindData[1] & 1)) {
      bindData[4] = thisArg;
    }
    // set if previously bound but not currently (subsequent curried functions)
    if (!isBind && bindData[1] & 1) {
      bitmask |= 8;
    }
    // set curried arity if not yet set
    if (isCurry && !(bindData[1] & 4)) {
      bindData[5] = arity;
    }
    // append partial left arguments
    if (isPartial) {
      push.apply(bindData[2] || (bindData[2] = []), partialArgs);
    }
    // append partial right arguments
    if (isPartialRight) {
      unshift.apply(bindData[3] || (bindData[3] = []), partialRightArgs);
    }
    // merge flags
    bindData[1] |= bitmask;
    return createWrapper.apply(null, bindData);
  }
  // fast path for `_.bind`
  var creater = (bitmask == 1 || bitmask === 17) ? baseBind : baseCreateWrapper;
  return creater([func, bitmask, partialArgs, partialRightArgs, thisArg, arity]);
}

/**
 * Creates compiled iteration functions.
 *
 * @private
 * @param {...Object} [options] The compile options object(s).
 * @param {string} [options.array] Code to determine if the iterable is an array or array-like.
 * @param {boolean} [options.useHas] Specify using `hasOwnProperty` checks in the object loop.
 * @param {Function} [options.keys] A reference to `_.keys` for use in own property iteration.
 * @param {string} [options.args] A comma separated string of iteration function arguments.
 * @param {string} [options.top] Code to execute before the iteration branches.
 * @param {string} [options.loop] Code to execute in the object loop.
 * @param {string} [options.bottom] Code to execute after the iteration branches.
 * @returns {Function} Returns the compiled function.
 */
function createIterator() {
  // data properties
  iteratorData.shadowedProps = shadowedProps;

  // iterator options
  iteratorData.array = iteratorData.bottom = iteratorData.loop = iteratorData.top = '';
  iteratorData.init = 'iterable';
  iteratorData.useHas = true;

  // merge options into a template data object
  for (var object, index = 0; object = arguments[index]; index++) {
    for (var key in object) {
      iteratorData[key] = object[key];
    }
  }
  var args = iteratorData.args;
  iteratorData.firstArg = /^[^,]+/.exec(args)[0];

  // create the function factory
  var factory = Function(
      'baseCreateCallback, errorClass, errorProto, hasOwnProperty, ' +
      'indicatorObject, isArguments, isArray, isString, keys, objectProto, ' +
      'objectTypes, nonEnumProps, stringClass, stringProto, toString',
    'return function(' + args + ') {\n' + iteratorTemplate(iteratorData) + '\n}'
  );

  // return the compiled function
  return factory(
    baseCreateCallback, errorClass, errorProto, hasOwnProperty,
    indicatorObject, isArguments, isArray, isString, iteratorData.keys, objectProto,
    objectTypes, nonEnumProps, stringClass, stringProto, toString
  );
}

/**
 * Checks if `value` is a native function.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the `value` is a native function, else `false`.
 */
function isNative(value) {
  return typeof value == 'function' && reNative.test(value);
}

/**
 * Sets `this` binding data on a given function.
 *
 * @private
 * @param {Function} func The function to set data on.
 * @param {Array} value The data array to set.
 */
var setBindData = !defineProperty ? noop : function(func, value) {
  descriptor.value = value;
  defineProperty(func, '__bindData__', descriptor);
};

/**
 * A fallback implementation of `isPlainObject` which checks if a given value
 * is an object created by the `Object` constructor, assuming objects created
 * by the `Object` constructor have no inherited enumerable properties and that
 * there are no `Object.prototype` extensions.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 */
function shimIsPlainObject(value) {
  var ctor,
      result;

  // avoid non Object objects, `arguments` objects, and DOM elements
  if (!(value && toString.call(value) == objectClass) ||
      (ctor = value.constructor, isFunction(ctor) && !(ctor instanceof ctor)) ||
      (!support.argsClass && isArguments(value)) ||
      (!support.nodeClass && isNode(value))) {
    return false;
  }
  // IE < 9 iterates inherited properties before own properties. If the first
  // iterated property is an object's own property then there are no inherited
  // enumerable properties.
  if (support.ownLast) {
    forIn(value, function(value, key, object) {
      result = hasOwnProperty.call(object, key);
      return false;
    });
    return result !== false;
  }
  // In most environments an object's own properties are iterated before
  // its inherited properties. If the last iterated property is an object's
  // own property then there are no inherited enumerable properties.
  forIn(value, function(value, key) {
    result = key;
  });
  return typeof result == 'undefined' || hasOwnProperty.call(value, result);
}

/*--------------------------------------------------------------------------*/

/**
 * Checks if `value` is an `arguments` object.
 *
 * @static
 * @memberOf _
 * @category Objects
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the `value` is an `arguments` object, else `false`.
 * @example
 *
 * (function() { return _.isArguments(arguments); })(1, 2, 3);
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  return value && typeof value == 'object' && typeof value.length == 'number' &&
    toString.call(value) == argsClass || false;
}
// fallback for browsers that can't detect `arguments` objects by [[Class]]
if (!support.argsClass) {
  isArguments = function(value) {
    return value && typeof value == 'object' && typeof value.length == 'number' &&
      hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee') || false;
  };
}

/**
 * Checks if `value` is an array.
 *
 * @static
 * @memberOf _
 * @type Function
 * @category Objects
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the `value` is an array, else `false`.
 * @example
 *
 * (function() { return _.isArray(arguments); })();
 * // => false
 *
 * _.isArray([1, 2, 3]);
 * // => true
 */
var isArray = nativeIsArray || function(value) {
  return value && typeof value == 'object' && typeof value.length == 'number' &&
    toString.call(value) == arrayClass || false;
};

/**
 * A fallback implementation of `Object.keys` which produces an array of the
 * given object's own enumerable property names.
 *
 * @private
 * @type Function
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns an array of property names.
 */
var shimKeys = createIterator({
  'args': 'object',
  'init': '[]',
  'top': 'if (!(objectTypes[typeof object])) return result',
  'loop': 'result.push(index)'
});

/**
 * Creates an array composed of the own enumerable property names of an object.
 *
 * @static
 * @memberOf _
 * @category Objects
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns an array of property names.
 * @example
 *
 * _.keys({ 'one': 1, 'two': 2, 'three': 3 });
 * // => ['one', 'two', 'three'] (property order is not guaranteed across environments)
 */
var keys = !nativeKeys ? shimKeys : function(object) {
  if (!isObject(object)) {
    return [];
  }
  if ((support.enumPrototypes && typeof object == 'function') ||
      (support.nonEnumArgs && object.length && isArguments(object))) {
    return shimKeys(object);
  }
  return nativeKeys(object);
};

/** Reusable iterator options shared by `each`, `forIn`, and `forOwn` */
var eachIteratorOptions = {
  'args': 'collection, callback, thisArg',
  'top': "callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3)",
  'array': "typeof length == 'number'",
  'keys': keys,
  'loop': 'if (callback(iterable[index], index, collection) === false) return result'
};

/** Reusable iterator options for `forIn` and `forOwn` */
var forOwnIteratorOptions = {
  'top': 'if (!objectTypes[typeof iterable]) return result;\n' + eachIteratorOptions.top,
  'array': false
};

/**
 * A function compiled to iterate `arguments` objects, arrays, objects, and
 * strings consistenly across environments, executing the callback for each
 * element in the collection. The callback is bound to `thisArg` and invoked
 * with three arguments; (value, index|key, collection). Callbacks may exit
 * iteration early by explicitly returning `false`.
 *
 * @private
 * @type Function
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} [callback=identity] The function called per iteration.
 * @param {*} [thisArg] The `this` binding of `callback`.
 * @returns {Array|Object|string} Returns `collection`.
 */
var baseEach = createIterator(eachIteratorOptions);

/*--------------------------------------------------------------------------*/

/**
 * Iterates over own and inherited enumerable properties of an object,
 * executing the callback for each property. The callback is bound to `thisArg`
 * and invoked with three arguments; (value, key, object). Callbacks may exit
 * iteration early by explicitly returning `false`.
 *
 * @static
 * @memberOf _
 * @type Function
 * @category Objects
 * @param {Object} object The object to iterate over.
 * @param {Function} [callback=identity] The function called per iteration.
 * @param {*} [thisArg] The `this` binding of `callback`.
 * @returns {Object} Returns `object`.
 * @example
 *
 * function Shape() {
 *   this.x = 0;
 *   this.y = 0;
 * }
 *
 * Shape.prototype.move = function(x, y) {
 *   this.x += x;
 *   this.y += y;
 * };
 *
 * _.forIn(new Shape, function(value, key) {
 *   console.log(key);
 * });
 * // => logs 'x', 'y', and 'move' (property order is not guaranteed across environments)
 */
var forIn = createIterator(eachIteratorOptions, forOwnIteratorOptions, {
  'useHas': false
});

/**
 * Iterates over own enumerable properties of an object, executing the callback
 * for each property. The callback is bound to `thisArg` and invoked with three
 * arguments; (value, key, object). Callbacks may exit iteration early by
 * explicitly returning `false`.
 *
 * @static
 * @memberOf _
 * @type Function
 * @category Objects
 * @param {Object} object The object to iterate over.
 * @param {Function} [callback=identity] The function called per iteration.
 * @param {*} [thisArg] The `this` binding of `callback`.
 * @returns {Object} Returns `object`.
 * @example
 *
 * _.forOwn({ '0': 'zero', '1': 'one', 'length': 2 }, function(num, key) {
 *   console.log(key);
 * });
 * // => logs '0', '1', and 'length' (property order is not guaranteed across environments)
 */
var forOwn = createIterator(eachIteratorOptions, forOwnIteratorOptions);

/**
 * Checks if `value` is a function.
 *
 * @static
 * @memberOf _
 * @category Objects
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 */
function isFunction(value) {
  return typeof value == 'function';
}
// fallback for older versions of Chrome and Safari
if (isFunction(/x/)) {
  isFunction = function(value) {
    return typeof value == 'function' && toString.call(value) == funcClass;
  };
}

/**
 * Checks if `value` is the language type of Object.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Objects
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // check if the value is the ECMAScript language type of Object
  // http://es5.github.io/#x8
  // and avoid a V8 bug
  // http://code.google.com/p/v8/issues/detail?id=2291
  return !!(value && objectTypes[typeof value]);
}

/**
 * Checks if `value` is an object created by the `Object` constructor.
 *
 * @static
 * @memberOf _
 * @category Objects
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Shape() {
 *   this.x = 0;
 *   this.y = 0;
 * }
 *
 * _.isPlainObject(new Shape);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 */
var isPlainObject = !getPrototypeOf ? shimIsPlainObject : function(value) {
  if (!(value && toString.call(value) == objectClass) || (!support.argsClass && isArguments(value))) {
    return false;
  }
  var valueOf = value.valueOf,
      objProto = isNative(valueOf) && (objProto = getPrototypeOf(valueOf)) && getPrototypeOf(objProto);

  return objProto
    ? (value == objProto || getPrototypeOf(value) == objProto)
    : shimIsPlainObject(value);
};

/**
 * Checks if `value` is a string.
 *
 * @static
 * @memberOf _
 * @category Objects
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the `value` is a string, else `false`.
 * @example
 *
 * _.isString('fred');
 * // => true
 */
function isString(value) {
  return typeof value == 'string' ||
    value && typeof value == 'object' && toString.call(value) == stringClass || false;
}

/**
 * Recursively merges own enumerable properties of the source object(s), that
 * don't resolve to `undefined` into the destination object. Subsequent sources
 * will overwrite property assignments of previous sources. If a callback is
 * provided it will be executed to produce the merged values of the destination
 * and source properties. If the callback returns `undefined` merging will
 * be handled by the method instead. The callback is bound to `thisArg` and
 * invoked with two arguments; (objectValue, sourceValue).
 *
 * @static
 * @memberOf _
 * @category Objects
 * @param {Object} object The destination object.
 * @param {...Object} [source] The source objects.
 * @param {Function} [callback] The function to customize merging properties.
 * @param {*} [thisArg] The `this` binding of `callback`.
 * @returns {Object} Returns the destination object.
 * @example
 *
 * var names = {
 *   'characters': [
 *     { 'name': 'barney' },
 *     { 'name': 'fred' }
 *   ]
 * };
 *
 * var ages = {
 *   'characters': [
 *     { 'age': 36 },
 *     { 'age': 40 }
 *   ]
 * };
 *
 * _.merge(names, ages);
 * // => { 'characters': [{ 'name': 'barney', 'age': 36 }, { 'name': 'fred', 'age': 40 }] }
 *
 * var food = {
 *   'fruits': ['apple'],
 *   'vegetables': ['beet']
 * };
 *
 * var otherFood = {
 *   'fruits': ['banana'],
 *   'vegetables': ['carrot']
 * };
 *
 * _.merge(food, otherFood, function(a, b) {
 *   return _.isArray(a) ? a.concat(b) : undefined;
 * });
 * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot] }
 */
function merge(object) {
  var args = arguments,
      length = 2;

  if (!isObject(object)) {
    return object;
  }
  // allows working with `_.reduce` and `_.reduceRight` without using
  // their `index` and `collection` arguments
  if (typeof args[2] != 'number') {
    length = args.length;
  }
  if (length > 3 && typeof args[length - 2] == 'function') {
    var callback = baseCreateCallback(args[--length - 1], args[length--], 2);
  } else if (length > 2 && typeof args[length - 1] == 'function') {
    callback = args[--length];
  }
  var sources = slice(arguments, 1, length),
      index = -1,
      stackA = getArray(),
      stackB = getArray();

  while (++index < length) {
    baseMerge(object, sources[index], callback, stackA, stackB);
  }
  releaseArray(stackA);
  releaseArray(stackB);
  return object;
}

/*--------------------------------------------------------------------------*/

/**
 * Iterates over elements of a collection, returning an array of all elements
 * the callback returns truey for. The callback is bound to `thisArg` and
 * invoked with three arguments; (value, index|key, collection).
 *
 * If a property name is provided for `callback` the created "_.pluck" style
 * callback will return the property value of the given element.
 *
 * If an object is provided for `callback` the created "_.where" style callback
 * will return `true` for elements that have the properties of the given object,
 * else `false`.
 *
 * @static
 * @memberOf _
 * @alias select
 * @category Collections
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|Object|string} [callback=identity] The function called
 *  per iteration. If a property name or object is provided it will be used
 *  to create a "_.pluck" or "_.where" style callback, respectively.
 * @param {*} [thisArg] The `this` binding of `callback`.
 * @returns {Array} Returns a new array of elements that passed the callback check.
 * @example
 *
 * var evens = _.filter([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
 * // => [2, 4, 6]
 *
 * var characters = [
 *   { 'name': 'barney', 'age': 36, 'blocked': false },
 *   { 'name': 'fred',   'age': 40, 'blocked': true }
 * ];
 *
 * // using "_.pluck" callback shorthand
 * _.filter(characters, 'blocked');
 * // => [{ 'name': 'fred', 'age': 40, 'blocked': true }]
 *
 * // using "_.where" callback shorthand
 * _.filter(characters, { 'age': 36 });
 * // => [{ 'name': 'barney', 'age': 36, 'blocked': false }]
 */
function filter(collection, callback, thisArg) {
  var result = [];
  callback = lodash.createCallback(callback, thisArg, 3);

  if (isArray(collection)) {
    var index = -1,
        length = collection.length;

    while (++index < length) {
      var value = collection[index];
      if (callback(value, index, collection)) {
        result.push(value);
      }
    }
  } else {
    baseEach(collection, function(value, index, collection) {
      if (callback(value, index, collection)) {
        result.push(value);
      }
    });
  }
  return result;
}

/**
 * Iterates over elements of a collection, executing the callback for each
 * element. The callback is bound to `thisArg` and invoked with three arguments;
 * (value, index|key, collection). Callbacks may exit iteration early by
 * explicitly returning `false`.
 *
 * Note: As with other "Collections" methods, objects with a `length` property
 * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
 * may be used for object iteration.
 *
 * @static
 * @memberOf _
 * @alias each
 * @category Collections
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} [callback=identity] The function called per iteration.
 * @param {*} [thisArg] The `this` binding of `callback`.
 * @returns {Array|Object|string} Returns `collection`.
 * @example
 *
 * _([1, 2, 3]).forEach(function(num) { console.log(num); }).join(',');
 * // => logs each number and returns '1,2,3'
 *
 * _.forEach({ 'one': 1, 'two': 2, 'three': 3 }, function(num) { console.log(num); });
 * // => logs each number and returns the object (property order is not guaranteed across environments)
 */
function forEach(collection, callback, thisArg) {
  if (callback && typeof thisArg == 'undefined' && isArray(collection)) {
    var index = -1,
        length = collection.length;

    while (++index < length) {
      if (callback(collection[index], index, collection) === false) {
        break;
      }
    }
  } else {
    baseEach(collection, callback, thisArg);
  }
  return collection;
}

/**
 * Retrieves the maximum value of a collection. If the collection is empty or
 * falsey `-Infinity` is returned. If a callback is provided it will be executed
 * for each value in the collection to generate the criterion by which the value
 * is ranked. The callback is bound to `thisArg` and invoked with three
 * arguments; (value, index, collection).
 *
 * If a property name is provided for `callback` the created "_.pluck" style
 * callback will return the property value of the given element.
 *
 * If an object is provided for `callback` the created "_.where" style callback
 * will return `true` for elements that have the properties of the given object,
 * else `false`.
 *
 * @static
 * @memberOf _
 * @category Collections
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|Object|string} [callback=identity] The function called
 *  per iteration. If a property name or object is provided it will be used
 *  to create a "_.pluck" or "_.where" style callback, respectively.
 * @param {*} [thisArg] The `this` binding of `callback`.
 * @returns {*} Returns the maximum value.
 * @example
 *
 * _.max([4, 2, 8, 6]);
 * // => 8
 *
 * var characters = [
 *   { 'name': 'barney', 'age': 36 },
 *   { 'name': 'fred',   'age': 40 }
 * ];
 *
 * _.max(characters, function(chr) { return chr.age; });
 * // => { 'name': 'fred', 'age': 40 };
 *
 * // using "_.pluck" callback shorthand
 * _.max(characters, 'age');
 * // => { 'name': 'fred', 'age': 40 };
 */
function max(collection, callback, thisArg) {
  var computed = -Infinity,
      result = computed;

  // allows working with functions like `_.map` without using
  // their `index` argument as a callback
  if (typeof callback != 'function' && thisArg && thisArg[callback] === collection) {
    callback = null;
  }
  if (callback == null && isArray(collection)) {
    var index = -1,
        length = collection.length;

    while (++index < length) {
      var value = collection[index];
      if (value > result) {
        result = value;
      }
    }
  } else {
    callback = (callback == null && isString(collection))
      ? charAtCallback
      : lodash.createCallback(callback, thisArg, 3);

    baseEach(collection, function(value, index, collection) {
      var current = callback(value, index, collection);
      if (current > computed) {
        computed = current;
        result = value;
      }
    });
  }
  return result;
}

/**
 * Retrieves the minimum value of a collection. If the collection is empty or
 * falsey `Infinity` is returned. If a callback is provided it will be executed
 * for each value in the collection to generate the criterion by which the value
 * is ranked. The callback is bound to `thisArg` and invoked with three
 * arguments; (value, index, collection).
 *
 * If a property name is provided for `callback` the created "_.pluck" style
 * callback will return the property value of the given element.
 *
 * If an object is provided for `callback` the created "_.where" style callback
 * will return `true` for elements that have the properties of the given object,
 * else `false`.
 *
 * @static
 * @memberOf _
 * @category Collections
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|Object|string} [callback=identity] The function called
 *  per iteration. If a property name or object is provided it will be used
 *  to create a "_.pluck" or "_.where" style callback, respectively.
 * @param {*} [thisArg] The `this` binding of `callback`.
 * @returns {*} Returns the minimum value.
 * @example
 *
 * _.min([4, 2, 8, 6]);
 * // => 2
 *
 * var characters = [
 *   { 'name': 'barney', 'age': 36 },
 *   { 'name': 'fred',   'age': 40 }
 * ];
 *
 * _.min(characters, function(chr) { return chr.age; });
 * // => { 'name': 'barney', 'age': 36 };
 *
 * // using "_.pluck" callback shorthand
 * _.min(characters, 'age');
 * // => { 'name': 'barney', 'age': 36 };
 */
function min(collection, callback, thisArg) {
  var computed = Infinity,
      result = computed;

  // allows working with functions like `_.map` without using
  // their `index` argument as a callback
  if (typeof callback != 'function' && thisArg && thisArg[callback] === collection) {
    callback = null;
  }
  if (callback == null && isArray(collection)) {
    var index = -1,
        length = collection.length;

    while (++index < length) {
      var value = collection[index];
      if (value < result) {
        result = value;
      }
    }
  } else {
    callback = (callback == null && isString(collection))
      ? charAtCallback
      : lodash.createCallback(callback, thisArg, 3);

    baseEach(collection, function(value, index, collection) {
      var current = callback(value, index, collection);
      if (current < computed) {
        computed = current;
        result = value;
      }
    });
  }
  return result;
}

/**
 * Gets the size of the `collection` by returning `collection.length` for arrays
 * and array-like objects or the number of own enumerable properties for objects.
 *
 * @static
 * @memberOf _
 * @category Collections
 * @param {Array|Object|string} collection The collection to inspect.
 * @returns {number} Returns `collection.length` or number of own enumerable properties.
 * @example
 *
 * _.size([1, 2]);
 * // => 2
 *
 * _.size({ 'one': 1, 'two': 2, 'three': 3 });
 * // => 3
 *
 * _.size('pebbles');
 * // => 7
 */
function size(collection) {
  var length = collection ? collection.length : 0;
  return typeof length == 'number' ? length : keys(collection).length;
}

/*--------------------------------------------------------------------------*/

/**
 * Creates a function that, when called, invokes `func` with the `this`
 * binding of `thisArg` and prepends any additional `bind` arguments to those
 * provided to the bound function.
 *
 * @static
 * @memberOf _
 * @category Functions
 * @param {Function} func The function to bind.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {...*} [arg] Arguments to be partially applied.
 * @returns {Function} Returns the new bound function.
 * @example
 *
 * var func = function(greeting) {
 *   return greeting + ' ' + this.name;
 * };
 *
 * func = _.bind(func, { 'name': 'fred' }, 'hi');
 * func();
 * // => 'hi fred'
 */
function bind(func, thisArg) {
  return arguments.length > 2
    ? createWrapper(func, 17, slice(arguments, 2), null, thisArg)
    : createWrapper(func, 1, null, null, thisArg);
}

/*--------------------------------------------------------------------------*/

/**
 * Produces a callback bound to an optional `thisArg`. If `func` is a property
 * name the created callback will return the property value for a given element.
 * If `func` is an object the created callback will return `true` for elements
 * that contain the equivalent object properties, otherwise it will return `false`.
 *
 * @static
 * @memberOf _
 * @category Utilities
 * @param {*} [func=identity] The value to convert to a callback.
 * @param {*} [thisArg] The `this` binding of the created callback.
 * @param {number} [argCount] The number of arguments the callback accepts.
 * @returns {Function} Returns a callback function.
 * @example
 *
 * var characters = [
 *   { 'name': 'barney', 'age': 36 },
 *   { 'name': 'fred',   'age': 40 }
 * ];
 *
 * // wrap to create custom callback shorthands
 * _.createCallback = _.wrap(_.createCallback, function(func, callback, thisArg) {
 *   var match = /^(.+?)__([gl]t)(.+)$/.exec(callback);
 *   return !match ? func(callback, thisArg) : function(object) {
 *     return match[2] == 'gt' ? object[match[1]] > match[3] : object[match[1]] < match[3];
 *   };
 * });
 *
 * _.filter(characters, 'age__gt38');
 * // => [{ 'name': 'fred', 'age': 40 }]
 */
function createCallback(func, thisArg, argCount) {
  var type = typeof func;
  if (func == null || type == 'function') {
    return baseCreateCallback(func, thisArg, argCount);
  }
  // handle "_.pluck" style callback shorthands
  if (type != 'object') {
    return property(func);
  }
  var props = keys(func),
      key = props[0],
      a = func[key];

  // handle "_.where" style callback shorthands
  if (props.length == 1 && a === a && !isObject(a)) {
    // fast path the common case of providing an object with a single
    // property containing a primitive value
    return function(object) {
      var b = object[key];
      return a === b && (a !== 0 || (1 / a == 1 / b));
    };
  }
  return function(object) {
    var length = props.length,
        result = false;

    while (length--) {
      if (!(result = baseIsEqual(object[props[length]], func[props[length]], null, true))) {
        break;
      }
    }
    return result;
  };
}

/**
 * This method returns the first argument provided to it.
 *
 * @static
 * @memberOf _
 * @category Utilities
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'name': 'fred' };
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

/**
 * A no-operation function.
 *
 * @static
 * @memberOf _
 * @category Utilities
 * @example
 *
 * var object = { 'name': 'fred' };
 * _.noop(object) === undefined;
 * // => true
 */
function noop() {
  // no operation performed
}

/**
 * Creates a "_.pluck" style function, which returns the `key` value of a
 * given object.
 *
 * @static
 * @memberOf _
 * @category Utilities
 * @param {string} key The name of the property to retrieve.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var characters = [
 *   { 'name': 'fred',   'age': 40 },
 *   { 'name': 'barney', 'age': 36 }
 * ];
 *
 * var getName = _.property('name');
 *
 * _.map(characters, getName);
 * // => ['barney', 'fred']
 *
 * _.sortBy(characters, getName);
 * // => [{ 'name': 'barney', 'age': 36 }, { 'name': 'fred',   'age': 40 }]
 */
function property(key) {
  return function(object) {
    return object[key];
  };
}

/*--------------------------------------------------------------------------*/

lodash.bind = bind;
lodash.createCallback = createCallback;
lodash.filter = filter;
lodash.forEach = forEach;
lodash.forIn = forIn;
lodash.forOwn = forOwn;
lodash.keys = keys;
lodash.max = max;
lodash.merge = merge;
lodash.min = min;
lodash.property = property;

lodash.each = forEach;
lodash.select = filter;

/*--------------------------------------------------------------------------*/

lodash.identity = identity;
lodash.isArguments = isArguments;
lodash.isArray = isArray;
lodash.isFunction = isFunction;
lodash.isObject = isObject;
lodash.isPlainObject = isPlainObject;
lodash.isString = isString;
lodash.noop = noop;
lodash.size = size;

/*--------------------------------------------------------------------------*/

/**
 * The semantic version number.
 *
 * @static
 * @memberOf _
 * @type string
 */
lodash.VERSION = '2.4.1';

/*--------------------------------------------------------------------------*/

// check `_` before overwrite it to root
if (!root._) { root._ = lodash; }

var Jchart;

Jchart = (function() {
  Jchart.prototype.canvas = null;

  Jchart.prototype.ctw = null;

  Jchart.prototype.position = {};

  function Jchart(canvas, data, options, ipo) {
    this.canvas = canvas;
    this.data = data;
    this.options = options != null ? options : null;
    this.ipo = ipo;
    this.options = _.merge({
      chart: {
        width: 1060,
        height: 480,
        paddingLeft: 5,
        paddingTop: 5,
        paddingRight: 5,
        paddingBottom: 5,
        lineWidth: 2,
        font: {
          style: 'normal',
          weight: '400',
          size: '13px',
          family: 'Arial,sans-serif'
        },
        color: '#888',
        background: '#ffffff',
        stretch: false
      },
      graph: {
        border: true,
        marginLeftIfDecimalPoints: 50,
        marginLeft: 'auto',
        marginBottom: 25,
        marginTop: 5,
        marginRight: 20,
        background: '#ffffff',
        background_stripe: '#FCFCFC'
      }
    }, this.options);
    if (this.options == null) {
      this.options = {};
    }
    this.ctx = this.canvas.getContext('2d');
    if (this.options.debug === true) {
      this.rect(this.ctx, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height, 0);
    }
    this.device_ratio = typeof window !== 'undefined' ? this.scaleRatio(this.canvas) : 1;
    if (this.ctx.setLineDash === void 0) {
      this.ctx.setLineDash = (function() {});
    }
  }

  Jchart.prototype.scaleRatio = function(canvas) {
    var backingStoreRatio, context, devicePixelRatio, oldHeight, oldWidth, ratio;
    context = canvas.getContext("2d");
    devicePixelRatio = window.devicePixelRatio < 1.0 || window.devicePixelRatio === void 0 ? 1 : window.devicePixelRatio;
    backingStoreRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
    ratio = devicePixelRatio / backingStoreRatio;
    if (devicePixelRatio !== backingStoreRatio) {
      oldWidth = canvas.width;
      oldHeight = canvas.height;
      canvas.width = oldWidth * ratio;
      canvas.height = oldHeight * ratio;
      canvas.style.width = oldWidth + "px";
      canvas.style.height = oldHeight + "px";
      context.scale(ratio, ratio);
    }
    return ratio;
  };

  Jchart.prototype.process_legend = function() {
    var data_legend, item, legend_width, text_height, x, y, _i, _len, _results;
    legend_width = this.options.legend.width;
    text_height = parseInt(this.options.legend.font.size.replace('px', '')) * 2;
    data_legend = _.filter(this.data, function(item) {
      return item.legend !== false;
    });
    _results = [];
    for (_i = 0, _len = data_legend.length; _i < _len; _i++) {
      item = data_legend[_i];
      x = this.options.chart.width / 2 + ((_i + 1) - (data_legend.length + 1) / 2) * legend_width;
      y = this.options.chart.height - this.options.chart.paddingBottom + this.options.legend.marginTop;
      this.ctx.fillStyle = this.options.legend.color || this.options.chart.color;
      this.ctx.font = this.font_format(this.options.legend.font);
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'top';
      this.ctx.fillText(item.name, x, y);
      this.ctx.strokeStyle = item.style.color;
      this.ctx.lineWidth = this.options.legend.lineWidth;
      if (item.style.line === 'dashed') {
        this.ctx.setLineDash(this.options.line_dash);
      } else {
        this.ctx.setLineDash([]);
      }
      this.ctx.beginPath();
      this.ctx.moveTo(x - legend_width / 2.5, y + text_height);
      this.ctx.lineTo(x + legend_width / 2.5, y + text_height);
      _results.push(this.ctx.stroke());
    }
    return _results;
  };

  Jchart.prototype.addLabel = function(text, option) {
    var font, x, y;
    if (option == null) {
      option = {};
    }
    option = _.merge({
      font: {
        style: this.options.chart.font.style,
        weight: this.options.chart.font.weight,
        size: this.options.chart.font.size,
        family: this.options.chart.font.family
      },
      color: this.options.chart.color,
      background: null,
      textAlign: 'left',
      textBaseline: 'middle',
      verticalAlign: 'middle',
      x: 0,
      y: 0,
      width: 200,
      height: 50
    }, option);
    if (option.background != null) {
      this.ctx.fillStyle = option.background;
      this.ctx.fillRect(option.x, option.y, option.width, option.height);
    }
    font = this.font_format(option.font);
    this.ctx.font = font;
    this.ctx.fillStyle = option.color;
    this.ctx.textBaseline = option.textBaseline;
    this.ctx.textAlign = option.textAlign;
    switch (option.textAlign) {
      case 'left':
        x = option.x;
        break;
      case 'center':
        x = option.x + option.width / 2;
        break;
      case 'right':
        x = option.x;
    }
    switch (option.verticalAlign) {
      case 'top':
        y = option.y;
        break;
      case 'middle':
        y = option.y + option.height / 2;
        break;
      case 'bottom':
        y = option.y + option.height;
    }
    return this.ctx.fillText(text, x, y);
  };

  Jchart.prototype.httpOut = function(resp) {
    var stream;
    resp.contentType('image/png');
    stream = this.canvas.createPNGStream();
    stream.on('data', function(chunk) {
      return resp.write(chunk);
    });
    return stream.on('end', function() {
      return resp.end();
    });
  };

  Jchart.prototype.writeFile = function(filename, callback) {};

  Jchart.prototype.rect = function(ctx, x, y, width, height, radius, fill, stroke) {
    if (radius == null) {
      radius = 0;
    }
    if (stroke === void 0) {
      stroke = true;
    }
    if (radius === void 0) {
      radius = 5;
    }
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    if (stroke) {
      ctx.stroke();
    }
    if (fill) {
      return ctx.fill();
    }
  };

  Jchart.prototype.auto_format = function(num, format) {
    var interval;
    if (format != null) {
      return num.format(format);
    } else {
      interval = this.max_data - this.min_data;
      if (interval > this.options.yAxis.breaks + 2) {
        format = 0;
      } else if (interval > 1) {
        format = 1;
      } else {
        format = 2;
      }
      return num.format(format);
    }
  };

  Jchart.prototype.font_format = function(font) {
    var b;
    font = _.merge(this.options.chart.font, font);
    b = ' ';
    return font.weight + b + font.style + b + font.size + b + font.family;
  };

  return Jchart;

})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Jchart;
} else {
  this.Jchart = Jchart;
}

var JchartCoordinate,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

JchartCoordinate = (function(_super) {
  __extends(JchartCoordinate, _super);

  function JchartCoordinate(canvas, data, options, ipo) {
    this.canvas = canvas;
    this.data = data;
    this.options = options != null ? options : null;
    this.ipo = ipo;
    this.options = _.merge({
      legend: {
        width: 75,
        lineWidth: 2,
        font: {
          style: 'italic',
          weight: '400',
          size: '11px'
        },
        color: 'rgba(0,0,0,0.3)',
        enable: true,
        layout: 'horizontal',
        marginTop: 35,
        marginBottom: 0
      },
      xAxis: {
        data: [],
        title: '',
        border: {
          enable: true,
          color: "#888"
        },
        grid: {
          enable: true,
          align: 'margin',
          type: 'dash',
          dashStyled: [2, 1],
          color: this.options.chart.color,
          lineWidth: 1
        },
        tick: {
          enable: true,
          align: 'margin',
          size: 10
        },
        label: {
          enable: true,
          align: 'margin',
          font: {},
          color: '#000',
          prefix: '',
          suffix: ''
        },
        min: null,
        max: null,
        breaks: 5
      },
      yAxis: {
        data: [],
        title: '',
        border: {
          enable: true,
          color: "#888"
        },
        grid: {
          enable: false,
          align: 'margin',
          type: 'solid',
          dashStyled: [2, 1],
          color: this.options.chart.color,
          lineWidth: 5
        },
        tick: {
          enable: true,
          size: 10
        },
        label: {
          enable: true,
          align: 'left',
          font: {},
          color: '#000',
          prefix: '',
          suffix: ''
        },
        min: null,
        max: null,
        breaks: 5,
        rightAlign: false
      }
    }, this.options);
    JchartCoordinate.__super__.constructor.call(this, this.canvas, this.data, this.options, this.ipo);
  }

  JchartCoordinate.prototype.convertToJChartArray = function(data, key_value) {
    var currentValue, diff_month, hasedIndexArray, i, key, key_monthly, keys, last_key, last_year_value, month, monthly, newValuesArray, nullCount, nullRightPad, nullRightPadoriginalArrayFillValue, num, originalArrayFill, originalArrayFillValue, run_month, temp, this_year_value, value, year, _i, _j, _k, _l, _len, _len1, _len2, _m, _ref;
    monthly = {};
    temp = padZeroMonth(data);
    keys = Object.keys(temp);
    i = 0;
    for (_i = 0, _len = keys.length; _i < _len; _i++) {
      key = keys[_i];
      last_key = keys[i - 1];
      if ((temp[key] != null) && (temp[last_key] != null)) {
        last_year_value = temp[last_key].value;
        this_year_value = temp[key].value;
        run_month = new Date("" + last_key);
        monthly[last_key] = {};
        monthly[last_key][key_value] = last_year_value;
        diff_month = (new Date("" + key)).diffMonth(new Date("" + last_key)) + 1;
        for (month = _j = 1; 1 <= diff_month ? _j <= diff_month : _j >= diff_month; month = 1 <= diff_month ? ++_j : --_j) {
          if (run_month > key) {
            break;
          }
          run_month.add(1, 'months');
          key_monthly = run_month.getFullYear() + '-' + (parseInt(run_month.getMonth()) + 1);
          monthly[key_monthly] = {};
          monthly[key_monthly][key_value] = null;
          if (last_year_value === null) {
            monthly[key_monthly][key_value] = null;
          } else if (this_year_value || this_year_value === 0) {
            monthly[key_monthly][key_value] = last_year_value + (this_year_value - last_year_value) / diff_month * month;
          }
          if (monthly[key_monthly] < 0) {
            monthly[key_monthly][key_value] = 0;
          }
        }
      }
      i++;
    }
    currentValue = null;
    originalArrayFillValue = null;
    nullRightPad = 0;
    nullRightPadoriginalArrayFillValue = 0;
    newValuesArray = [];
    newValuesArray.push(null);
    hasedIndexArray = [];
    hasedIndexArray.push(null);
    originalArrayFill = [];
    originalArrayFill.push(null);
    _ref = this.options.xAxis.data;
    for (_k = 0, _len1 = _ref.length; _k < _len1; _k++) {
      year = _ref[_k];
      for (num = _l = 1; _l <= 12; num = ++_l) {
        key = year + '-' + num;
        hasedIndexArray.push(key);
        if (monthly.hasOwnProperty(key)) {
          currentValue = monthly[key][key_value];
          if (key_value === 'formatted') {
            currentValue = (currentValue === null) || (currentValue === void 0) ? null : currentValue.toFixed(2);
          }
          nullRightPad = 0;
        }
        nullRightPad++;
        if (data.hasOwnProperty(key)) {
          originalArrayFillValue = data[key][key_value];
          nullRightPadoriginalArrayFillValue = 0;
        }
        nullRightPadoriginalArrayFillValue++;
        newValuesArray.push(currentValue);
        originalArrayFill.push(originalArrayFillValue);
      }
    }
    nullCount = 1;
    for (key = _m = 0, _len2 = newValuesArray.length; _m < _len2; key = ++_m) {
      value = newValuesArray[key];
      if (nullCount < nullRightPad) {
        newValuesArray[(newValuesArray.length - 1) - key] = null;
      } else {
        break;
      }
      nullCount++;
    }
    return {
      newValuesArray: newValuesArray,
      nullPadRight: nullRightPad,
      hasedIndexArray: hasedIndexArray,
      originalArrayFill: originalArrayFill
    };
  };

  JchartCoordinate.prototype.normalize_data = function() {
    var converted, current, data_item, k, key, keys, max, max_obj, max_pad, minNullPadLefts, minNullPadRight, min_pad, newPadMax, newPadMin, newXAxis, nullPadLefts, nullPadRights, raw_data, y, years, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3, _results;
    if (this.options.xAxis.data.length === 0) {
      this.options.xAxis.data = [new Date().getFullYear()];
    }
    keys = [];
    years = [];
    _ref = this.data;
    for (key = _i = 0, _len = _ref.length; _i < _len; key = ++_i) {
      data_item = _ref[key];
      if (!Array.isArray(data_item.data)) {
        keys = keys.concat(Object.keys(data_item.data));
      }
    }
    for (_j = 0, _len1 = keys.length; _j < _len1; _j++) {
      k = keys[_j];
      years.push(parseInt(k.substring(0, k.indexOf('-'))));
    }
    this.options.xAxis.hash_min_year = _.min(years);
    this.options.xAxis.hash_max_year = _.max(years);
    min_pad = [];
    max_pad = [];
    if (this.options.xAxis.hash_min_year < _.min(this.options.xAxis.data)) {
      y = _.min(this.options.xAxis.data) - this.options.xAxis.hash_min_year;
      current = this.options.xAxis.hash_min_year;
      min_pad = Array.apply(null, {
        length: y
      }).map(Number.call, function() {
        return current++;
      });
      this.options.xAxis.padMinArraySize = y * 12;
      this.options.xAxis.padMinArray = true;
    }
    if (this.options.xAxis.hash_max_year > _.max(this.options.xAxis.data)) {
      y = this.options.xAxis.hash_max_year - _.max(this.options.xAxis.data);
      current = _.max(this.options.xAxis.data);
      max_pad = Array.apply(null, {
        length: y
      }).map(Number.call, function() {
        return ++current;
      });
      this.options.xAxis.padMaxArraySize = y * 12;
      this.options.xAxis.padMaxArray = true;
    }
    newXAxis = min_pad.concat(this.options.xAxis.data, max_pad);
    this.options.xAxis.data = newXAxis;
    raw_data = [];
    nullPadLefts = [];
    nullPadRights = [];
    _ref1 = this.data;
    for (key = _k = 0, _len2 = _ref1.length; _k < _len2; key = ++_k) {
      data_item = _ref1[key];
      if (Array.isArray(data_item.data)) {
        if (this.options.xAxis.hasOwnProperty('padMinArray')) {
          min_pad = Array.apply(null, {
            length: this.options.xAxis.padMinArraySize
          }).map(Number.call, function() {
            return null;
          });
          newPadMin = min_pad.concat(data_item.data);
          this.data[key].data = newPadMin;
          if (this.ipo !== null) {
            this.ipo = this.ipo + this.options.xAxis.padMinArraySize / 2;
          }
        }
        if (this.options.xAxis.hasOwnProperty('padMaxArray')) {
          max_pad = Array.apply(null, {
            length: this.options.xAxis.padMaxArraySize
          }).map(Number.call, function() {
            return null;
          });
          newPadMax = data_item.data.concat(max_pad);
          this.data[key].data = newPadMax;
        }
        raw_data.push(data_item.data);
      } else {
        try {
          this.data[key].formatted = this.convertToJChartArray(data_item.data, 'formatted').newValuesArray;
        } catch (_error) {}
        this.data[key].original_data = data_item.data;
        converted = this.convertToJChartArray(data_item.data, 'value');
        this.data[key].data = converted.newValuesArray;
        this.data[key].nullPadRight = converted.nullPadRight;
        this.data[key].hasedIndexArray = converted.hasedIndexArray;
        this.data[key].originalArrayFill = converted.originalArrayFill;
        raw_data.push(data_item.data);
        nullPadRights.push(this.data[key].nullPadRight);
      }
    }
    max_obj = _.max(this.data, function(item) {
      return _max(item.data);
    });
    max = _.max(max_obj.data);
    if (max >= 1.00) {
      roundValues(raw_data);
    }
    if (this.options.chart.stretch) {
      _ref2 = this.data;
      for (key = _l = 0, _len3 = _ref2.length; _l < _len3; key = ++_l) {
        data_item = _ref2[key];
        data_item.nullPadLeft = 0;
        data_item.data.some(function(item) {
          if (item === null) {
            data_item.nullPadLeft++;
            return false;
          } else {
            return true;
          }
        });
        nullPadLefts.push(data_item.nullPadLeft);
      }
      minNullPadLefts = _.min(nullPadLefts);
      minNullPadRight = _.min(nullPadRights);
      _ref3 = this.data;
      _results = [];
      for (key in _ref3) {
        data_item = _ref3[key];
        if (data_item.processed_data === void 0) {
          data_item.processed_data = data_item.data.slice();
          data_item.processed_data.splice(0, minNullPadLefts);
          data_item.processed_data.splice((data_item.processed_data.length + 1) - minNullPadRight, minNullPadRight);
          data_item.data = data_item.processed_data;
          data_item.processed_hased_index = data_item.hasedIndexArray.slice();
          data_item.processed_hased_index.splice(0, minNullPadLefts);
          data_item.processed_hased_index.splice((data_item.processed_hased_index.length + 1) - minNullPadRight, minNullPadRight);
          data_item.hasedIndexArray = data_item.processed_hased_index;
          data_item.processed_originalArrayFill = data_item.originalArrayFill.slice();
          data_item.processed_originalArrayFill.splice(0, minNullPadLefts);
          data_item.processed_originalArrayFill.splice((data_item.processed_originalArrayFill.length + 1) - minNullPadRight, minNullPadRight);
          _results.push(data_item.originalArrayFill = data_item.processed_originalArrayFill);
        } else {
          data_item.data = data_item.processed_data;
          data_item.processed_hased_index = data_item.hasedIndexArray;
          _results.push(data_item.processed_originalArrayFill = data_item.originalArrayFill);
        }
      }
      return _results;
    }
  };

  JchartCoordinate.prototype.preprocess_data = function() {
    var barWidth, base10, digit, item, lower, max, max_data, max_obj, max_text, min, min_obj, pad, power10, value, _i, _j, _len, _len1, _ref, _ref1;
    if (this.options.yAxis.min != null) {
      this.min_data = this.options.yAxis.min;
    }
    if (this.options.yAxis.max != null) {
      this.max_data = this.options.yAxis.max;
    }
    if ((this.options.yAxis.min == null) || (this.options.yAxis.max == null)) {
      min_obj = _.min(this.data, function(item) {
        return _min(item.data);
      });
      min = _.min(min_obj.data);
      max_obj = _.max(this.data, function(item) {
        return _max(item.data);
      });
      max = _.max(max_obj.data);
      pad = (max - min) * 0.1;
      if (pad === 0) {
        pad = this.options.yAxis.breaks;
      }
      pad = 0;
      if (this.options.yAxis.max == null) {
        this.max_data = max + pad;
      }
      if (this.options.yAxis.min == null) {
        this.min_data = min;
      }
    }
    power10 = Math.pow(10, Math.floor(Math.log(this.max_data) / Math.log(10)));
    base10 = this.max_data / power10;
    lower = base10 - Math.floor(base10) < 0.5 && base10 - Math.floor(base10) > 0;
    max_data = Math.ceil(base10) * power10;
    if (lower) {
      max_data -= power10 / 2;
    }
    this.max_data = max_data;
    if (this.options.graph.marginLeft === 'auto') {
      if (this.auto_format(this.max_data).indexOf(".") > 0) {
        this.options.graph.marginLeft = this.options.graph.marginLeftIfDecimalPoints;
      } else {
        if (this.max_data > 10) {
          this.max_data = Math.round(this.max_data);
        }
        max_text = this.options.yAxis.label.prefix + this.max_data + this.options.yAxis.label.suffix;
        digit = max_text.replace('.', '').length;
        this.options.graph.marginLeft = 10 + digit * 8 + this.options.yAxis.tick.size;
      }
    }
    this.graph_width = this.options.chart.width - this.options.chart.paddingLeft - this.options.chart.paddingRight;
    this.graph_height = this.options.chart.height - this.options.chart.paddingTop - this.options.chart.paddingBottom;
    this.interval = this.max_data - this.min_data;
    this.inner_width = this.graph_width - (this.options.graph.marginLeft + this.options.graph.marginRight);
    this.inner_height = this.graph_height - (this.options.graph.marginTop + this.options.graph.marginBottom);
    this.pl = this.options.chart.paddingLeft;
    this.pt = this.options.chart.paddingTop;
    _ref = this.data;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      item = _ref[_i];
      barWidth = this.inner_width / (_.size(item.data) - 1);
      item.plot = [];
      _ref1 = item.data;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        value = _ref1[_j];
        if (value != null) {
          item.plot.push({
            x: this.pl + _j * barWidth + this.options.graph.marginLeft,
            y: this.pt + this.inner_height - (value - this.min_data) / this.interval * this.inner_height + this.options.graph.marginTop
          });
        } else {
          item.plot.push(null);
        }
      }
    }
    return this.xAxiz_zero_position = this.pt + this.inner_height - (0 - this.min_data) / this.interval * this.inner_height + this.options.graph.marginTop;
  };

  JchartCoordinate.prototype.preprocess_style = function() {
    var legend_height;
    this.ctx.font = this.font_format(this.options.chart.font);
    if (this.options.legend.enable) {
      legend_height = parseInt(this.options.legend.font.size.replace('px', '')) * 2 + this.options.legend.marginTop + this.options.legend.marginBottom;
      return this.options.chart.paddingBottom += legend_height;
    }
  };

  JchartCoordinate.prototype.drawGraph = function() {
    var line, _i, _len, _ref;
    this.ctx.strokeStyle = this.options.chart.color;
    this.horizontal_line();
    this.vertical_line();
    if (this.volume) {
      this.drawVolume(this.volume);
    }
    _ref = this.data;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      line = _ref[_i];
      this.addLine(line);
    }
    if (this.ipo != null) {
      this.addFlag(this.ipo, "IPO\nDATE");
    }
    if (this.options.legend.enable) {
      return this.process_legend();
    }
  };

  JchartCoordinate.prototype.horizontal_line = function() {
    var height, i, interval, leftOffset, lines, start_position, value, y, yAxisLabelOffset, _i, _ref;
    interval = this.max_data - this.min_data;
    lines = this.options.yAxis.breaks;
    this.ctx.beginPath();
    height = this.graph_height - (this.options.graph.marginTop + this.options.graph.marginBottom);
    for (i = _i = 0, _ref = this.options.yAxis.breaks; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      value = this.min_data + interval / lines * i;
      y = height - height / lines * i + this.options.graph.marginTop;
      if (this.options.graph.background_stripe) {
        if (i % 2 === 0) {
          this.ctx.fillStyle = this.options.graph.background_stripe;
          this.ctx.fillRect(this.pl + this.options.graph.marginLeft + this.options.chart.lineWidth, this.pt + y - height / lines - this.options.chart.lineWidth - 1, this.pl + this.inner_width - this.options.chart.paddingRight, this.pt + height / lines - this.options.chart.lineWidth - 1);
        }
      }
      if (this.options.yAxis.grid.enable) {
        this.ctx.strokeStyle = this.options.yAxis.grid.color;
        if (this.options.yAxis.grid.type === 'dash') {
          this.ctx.setLineDash(this.options.yAxis.grid.dashStyled);
        }
        this.ctx.beginPath();
        this.ctx.moveTo(this.pl + this.options.graph.marginLeft, this.pt + y);
        this.ctx.lineTo(this.pl + this.graph_width, this.pt + y, 2);
        this.ctx.stroke();
        this.ctx.setLineDash([]);
        this.ctx.strokeStyle = this.options.chart.color;
      }
      if (this.options.yAxis.label.enable) {
        this.ctx.fillStyle = this.options.yAxis.label.color || this.options.chart.label.color;
        this.ctx.font = this.font_format(this.options.yAxis.label.font);
        leftOffset = this.options.yAxis.rightAlign ? this.graph_width - this.options.graph.marginRight + this.options.graph.marginLeft + this.options.chart.lineWidth + this.options.yAxis.tick.size : this.options.graph.marginLeft;
        if (this.options.yAxis.label.align === 'left') {
          this.ctx.textAlign = 'right';
          this.ctx.textBaseline = this.options.yAxis.label.textBaseline || 'middle';
          yAxisLabelOffset = this.options.yAxis.label.offset || -12;
          start_position = this.pl + leftOffset + yAxisLabelOffset;
          if (this.options.yAxis.tick.enable) {
            start_position -= this.options.yAxis.tick.size;
          }
        } else {
          this.ctx.textAlign = 'left';
          this.ctx.textBaseline = this.options.yAxis.label.textBaseline || 'bottom';
          start_position = this.pl + leftOffset;
        }
        this.ctx.fillText(this.options.yAxis.label.prefix + this.auto_format(value) + this.options.yAxis.label.suffix, start_position, this.pt + y);
      }
      if (this.options.yAxis.tick.enable) {
        leftOffset = this.options.yAxis.rightAlign ? this.graph_width - this.options.graph.marginRight + this.options.yAxis.tick.size : this.options.graph.marginLeft;
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.options.chart.color;
        this.ctx.moveTo(this.pl + leftOffset - this.options.chart.lineWidth + 1, this.pt + y);
        this.ctx.lineTo(this.pl + leftOffset - this.options.chart.lineWidth - this.options.yAxis.tick.size + 1, this.pt + y);
        this.ctx.stroke();
        this.ctx.closePath();
      }
    }
    this.ctx.stroke();
    if (this.options.xAxis.border.enable) {
      this.ctx.strokeStyle = this.options.xAxis.border.color;
      this.ctx.lineWidth = this.options.chart.lineWidth;
      this.ctx.moveTo(this.pl + this.options.graph.marginLeft, this.xAxiz_zero_position);
      this.ctx.lineTo(this.pl + this.graph_width - this.options.graph.marginRight, this.xAxiz_zero_position);
      this.ctx.stroke();
    }
    return this.ctx.closePath();
  };

  JchartCoordinate.prototype.vertical_line = function() {
    var barWidth, leftOffset, value, width, x, y, _i, _len, _ref, _x, _y;
    width = this.graph_width - (this.options.graph.marginLeft + this.options.graph.marginRight);
    this.ctx.beginPath();
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = this.options.xAxis.color || this.options.chart.color;
    this.ctx.strokeStyle = this.options.xAxis.color || this.options.chart.color;
    if ((this.options.xAxis.data != null) && this.options.xAxis.data.length > 0) {
      barWidth = width / this.options.xAxis.data.length;
      _ref = this.options.xAxis.data;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        value = _ref[_i];
        x = (_i + 1) * barWidth + this.options.graph.marginLeft;
        y = this.graph_height - this.options.graph.marginBottom;
        if (this.options.xAxis.label.enable) {
          this.ctx.fillStyle = this.options.xAxis.label.color || this.options.chart.label.color;
          this.ctx.font = this.font_format(this.options.xAxis.label.font);
          _x = x;
          if (this.options.xAxis.label.align === 'center') {
            _x = x - barWidth / 2;
          } else if (this.options.xAxis.label.align === 'right') {
            _x = x;
          }
          _y = y + this.options.xAxis.tick.size;
          this.ctx.textBaseline = 'top';
          this.ctx.fillText(this.options.xAxis.label.prefix + value + this.options.xAxis.label.suffix, this.pl + _x, this.pt + _y);
        }
        if (this.options.xAxis.grid.enable) {
          if (this.options.xAxis.grid.align === 'center') {
            _x = x - barWidth / 2;
          } else {
            _x = x;
          }
          this.ctx.strokeStyle = this.options.xAxis.grid.color;
          this.ctx.lineWidth = this.options.xAxis.grid.lineWidth;
          if (this.options.xAxis.grid.type === 'dash') {
            this.ctx.setLineDash(this.options.xAxis.grid.dashStyled);
          }
          this.ctx.beginPath();
          this.ctx.moveTo(this.pl + _x, this.pt);
          this.ctx.lineTo(this.pl + _x, this.pt + y);
          this.ctx.stroke();
          this.ctx.setLineDash([]);
          this.ctx.strokeStyle = this.options.xAxis.color || this.options.chart.color;
        }
        if (this.options.xAxis.tick.enable) {
          if (this.options.xAxis.tick.align === 'center') {
            _x = x - barWidth / 2;
          } else {
            _x = x;
          }
          this.ctx.beginPath();
          this.ctx.lineWidth = this.options.chart.lineWidth;
          this.ctx.moveTo(this.pl + _x, this.pt + y);
          this.ctx.lineTo(this.pl + _x, this.pt + y + this.options.xAxis.tick.size);
          if ((this.graph_width - this.options.graph.marginRight) !== _x) {
            this.ctx.stroke();
          }
        }
      }
    }
    if (this.options.yAxis.border.enable) {
      leftOffset = this.options.yAxis.rightAlign ? this.graph_width - this.options.graph.marginRight : this.options.graph.marginLeft;
      this.ctx.strokeStyle = this.options.yAxis.border.color;
      this.ctx.lineWidth = this.options.chart.lineWidth;
      this.ctx.moveTo(this.pl + leftOffset, this.pt);
      this.ctx.lineTo(this.pl + leftOffset, this.pt + this.graph_height - this.options.graph.marginBottom);
      this.ctx.stroke();
    }
    return this.ctx.closePath();
  };

  return JchartCoordinate;

})(Jchart);

var JchartLine,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

JchartLine = (function(_super) {
  __extends(JchartLine, _super);

  function JchartLine(canvas, data, options, ipo, volume) {
    var _ref;
    this.canvas = canvas;
    this.data = data;
    this.options = options != null ? options : null;
    this.ipo = ipo;
    this.volume = volume;
    this.options = _.merge({
      line_dash: [6, 2]
    }, this.options);
    JchartLine.__super__.constructor.call(this, this.canvas, this.data, this.options, this.ipo, this.volume);
    this.normalize_data();
    this.draw();
    if (((_ref = this.options.chart.linePoint) != null ? _ref.enable : void 0) === true) {
      this.addMouseHoverEvent();
    }
  }

  JchartLine.prototype.draw = function() {
    this.preprocess_style();
    this.preprocess_data();
    return this.drawGraph();
  };

  JchartLine.prototype.addLine = function(data) {
    return this.draw_line_graph(data);
  };

  JchartLine.prototype.addMouseHoverEvent = function() {
    var circles, data, firstHit, hasChanged, index, lineWidth, original_data, original_datas, plot, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3;
    circles = [];
    original_datas = [];
    _ref = this.data;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      data = _ref[_i];
      original_data = Object.keys(data.original_data).sort(function(s1, s2) {
        return s1.localeCompare(s2);
      }).map(function(key) {
        return data.original_data[key];
      });
      original_datas = original_datas.concat(original_data);
      lineWidth = data.style.lineWidth || 2;
      index = 0;
      firstHit = false;
      _ref1 = data.plot;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        plot = _ref1[_j];
        if (plot != null) {
          if (!firstHit) {
            circles.push({
              'plot': plot,
              'lineWidth': lineWidth
            });
            firstHit = true;
          } else {
            hasChanged = (_ref2 = data.original_data) != null ? _ref2[(_ref3 = data.hasedIndexArray) != null ? _ref3[index] : void 0] : void 0;
            if (hasChanged !== void 0) {
              circles.push({
                'plot': plot,
                'lineWidth': lineWidth
              });
            }
          }
        }
        index++;
      }
    }
    return this.canvas.addEventListener('mousemove', (function(e) {
      var circle, hoverCircleEvent, i, r, rect, x, y, _k, _len2, _ref4;
      rect = this.canvas.getBoundingClientRect();
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
      if (circles.length > 0) {
        i = 0;
        for (_k = 0, _len2 = circles.length; _k < _len2; _k++) {
          circle = circles[_k];
          lineWidth = circle.lineWidth;
          plot = circle.plot;
          r = ((_ref4 = this.options.chart.linePoint) != null ? _ref4.size : void 0) || 5;
          r += lineWidth;
          if ((x >= plot.x - r && x <= plot.x + r) && (y >= plot.y - r && y <= plot.y + r)) {
            hoverCircleEvent = new CustomEvent('data-hover', {
              'detail': original_datas[i]
            });
            this.canvas.dispatchEvent(hoverCircleEvent);
            return;
          }
          i++;
        }
      }
    }).bind(this));
  };

  JchartLine.prototype.draw_line_graph = function(data) {
    var circles, firstHit, hasChanged, index, last_data, null_count, plot, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _results;
    if (data.style.fill_area) {
      this.fillArea(data);
    }
    this.ctx.beginPath();
    this.ctx.lineWidth = data.style.lineWidth || 2;
    this.ctx.strokeStyle = data.style.color || '#000';
    this.ctx.fillStyle = data.style.color || '#000';
    if (data.style.line === 'dashed') {
      this.ctx.setLineDash(this.options.line_dash);
    } else {
      this.ctx.setLineDash([]);
    }
    null_count = 0;
    circles = [];
    index = 0;
    firstHit = false;
    _ref = data.plot;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      plot = _ref[_i];
      if (plot != null) {
        null_count = 0;
        if (!firstHit) {
          circles.push(plot);
          firstHit = true;
        }
        if (data.style.line === 'point') {
          this.ctx.fillRect(plot.x, plot.y, 3, 3);
        } else {
          this.ctx.lineTo(plot.x, plot.y);
          hasChanged = (_ref1 = data.original_data) != null ? _ref1[(_ref2 = data.hasedIndexArray) != null ? _ref2[index] : void 0] : void 0;
          if (hasChanged !== void 0) {
            circles.push(plot);
          }
        }
        last_data = plot;
      } else {
        if (plot != null) {
          this.ctx.moveTo(plot.x, plot.y);
        }
      }
      if (plot == null) {
        null_count++;
      }
      index++;
    }
    this.ctx.stroke();
    this.ctx.closePath();
    if (((_ref3 = this.options.chart.linePoint) != null ? _ref3.enable : void 0) === true) {
      this.ctx.setLineDash([]);
      this.ctx.fillStyle = ((_ref4 = this.options.chart.linePoint) != null ? _ref4.fill : void 0) || '#FFF';
      _results = [];
      for (_j = 0, _len1 = circles.length; _j < _len1; _j++) {
        plot = circles[_j];
        this.ctx.beginPath();
        this.ctx.arc(plot.x, plot.y, ((_ref5 = this.options.chart.linePoint) != null ? _ref5.size : void 0) || 5, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.stroke();
        _results.push(this.ctx.closePath());
      }
      return _results;
    }
  };

  JchartLine.prototype.addFlag = function(index, text) {
    var barWidth, diff, overlap, width, x, y, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
    width = this.graph_width - (this.options.graph.marginLeft + this.options.graph.marginRight);
    barWidth = width / _.size(this.data[0].data);
    x = index * barWidth + this.options.chart.paddingLeft + this.options.graph.marginLeft;
    y = this.graph_height - this.options.graph.marginBottom;
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = this.data[0].style.color;
    this.ctx.setLineDash([3, 2]);
    this.ctx.beginPath();
    this.ctx.moveTo(x, this.options.chart.paddingTop);
    this.ctx.lineTo(x, this.options.chart.paddingTop + y);
    this.ctx.stroke();
    this.ctx.setLineDash([]);
    overlap = 0;
    if (((_ref = this.data[0]) != null ? (_ref1 = _ref.plot[index]) != null ? _ref1.y : void 0 : void 0) != null) {
      if (((_ref2 = this.data[1]) != null ? (_ref3 = _ref2.plot[index]) != null ? _ref3.y : void 0 : void 0) != null) {
        diff = Math.abs((this.data[1].plot[index].y - this.data[0].plot[index].y) / this.data[0].plot[index].y * 100);
        if (diff < 15) {
          if (((_ref4 = this.data[1].plot[index - 1]) != null ? _ref4.y : void 0) > ((_ref5 = this.data[1]) != null ? _ref5.plot[index].y : void 0)) {
            overlap = -20;
          } else {
            overlap = 20;
          }
        }
      }
      if ((this.data[0].plot[index].y - this.pt) / this.inner_height * 100 > 92) {
        overlap -= 15;
      }
      if ((this.data[0].plot[index].y - this.pt) / this.inner_height * 100 < 8) {
        overlap += 15;
      }
      this.options.chart.font.weight = 'normal';
      this.options.chart.font.size = '13px';
      this.ctx.font = this.font_format(this.options.chart.font);
      this.ctx.fillStyle = this.data[0].style.color;
      this.ctx.textBaseline = 'bottom';
      this.ctx.textAlign = 'center';
      return this.multiLine(this.ctx, text, x - 3 * barWidth, this.data[0].plot[index].y + overlap);
    }
  };

  JchartLine.prototype.multiLine = function(ctx, text, x, y) {
    var lineHeight, t, texts, _i, _len, _results;
    texts = text.split('\n');
    lineHeight = this.options.chart.font.size.replace('px', '');
    _results = [];
    for (_i = 0, _len = texts.length; _i < _len; _i++) {
      t = texts[_i];
      _results.push(ctx.fillText(t, x, y + _i * lineHeight));
    }
    return _results;
  };

  JchartLine.prototype.shade = function() {
    var a, above, above_color, b, barWidth, before_above, below_color, change, i, index, last_change, start, x, y, y1, y2, _i, _j, _k, _ref, _ref1, _results;
    before_above = null;
    above_color = 'rgba(253, 115, 109, 0.4)';
    below_color = 'rgba(0, 183, 151, 0.4)';
    this.ctx.fillStyle = above_color;
    last_change = 0;
    start = false;
    _results = [];
    for (i = _i = 0, _ref = this.data[0].plot.length; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      if (((this.data[0].plot[i] == null) || (this.data[1].plot[i] == null)) && !start) {
        _results.push(last_change = i + 1);
      } else if (((this.data[0].plot[i] == null) || (this.data[1].plot[i] == null)) && start) {
        for (index = _j = _ref1 = i - 1; _ref1 <= last_change ? _j <= last_change : _j >= last_change; index = _ref1 <= last_change ? ++_j : --_j) {
          this.ctx.lineTo(this.data[1].plot[index].x, this.data[1].plot[index].y);
        }
        this.ctx.closePath();
        this.ctx.fillStyle = before_above ? above_color : below_color;
        this.ctx.fill();
        break;
      } else if ((this.data[0].plot[i] != null) && (this.data[1].plot[i] != null) && !start) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.data[0].plot[i].x, this.data[0].plot[i].y);
        _results.push(start = true);
      } else {
        above = this.data[0].plot[i].y < this.data[1].plot[i].y ? true : false;
        change = (before_above != null) && before_above !== above ? true : false;
        if (!change) {
          this.ctx.lineTo(this.data[0].plot[i].x, this.data[0].plot[i].y);
        } else {
          if ((this.data[0].plot[i - 1] != null) && (this.data[1].plot[i - 1] != null)) {
            y1 = this.data[0].plot[i - 1].y;
            y2 = this.data[0].plot[i].y;
            a = y1 - _min([y1, y2]);
            b = y2 - _min([y1, y2]);
            barWidth = this.data[0].plot[i].x - this.data[0].plot[i - 1].x;
            x = this.data[0].plot[i - 1].x + (a * barWidth / (a + b));
            y = _min([y1, y2]) + (a * b) / (a + b);
            this.ctx.lineTo(x, y);
            for (index = _k = i; i <= last_change ? _k <= last_change : _k >= last_change; index = i <= last_change ? ++_k : --_k) {
              this.ctx.lineTo(this.data[1].plot[index].x, this.data[1].plot[index].y);
            }
            this.ctx.closePath();
            this.ctx.fillStyle = above ? below_color : above_color;
            this.ctx.fill();
            this.ctx.beginPath();
            this.ctx.moveTo(this.data[0].plot[i - 1].x, this.data[0].plot[i - 1].y);
            this.ctx.lineTo(x, y);
            this.ctx.lineTo(this.data[0].plot[i].x, this.data[0].plot[i].y);
            last_change = i;
          }
        }
        _results.push(before_above = above);
      }
    }
    return _results;
  };

  JchartLine.prototype.fillArea = function(data) {
    var color, ctx, dataToFill;
    ctx = this.ctx;
    if (hexToRgb(data.style.color)) {
      color = hexToRgb(data.style.color);
    } else {
      color = data.style.color;
    }
    ctx.fillStyle = 'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', 0.2)';
    ctx.globalCompositeOperation = this.options.chart.fillBlendMode || 'multiply';
    ctx.beginPath();
    dataToFill = [];
    data.plot.forEach(function(item) {
      if (item) {
        return dataToFill.push(item);
      }
    });
    if (dataToFill.length) {
      ctx.beginPath();
      ctx.moveTo(dataToFill[0].x, this.options.chart.height - (this.options.chart.paddingBottom + this.options.graph.marginBottom));
      dataToFill.forEach(function(item) {
        return ctx.lineTo(item.x, item.y);
      });
      ctx.lineTo(dataToFill[dataToFill.length - 1].x, this.options.chart.height - (this.options.chart.paddingBottom + this.options.graph.marginBottom));
      ctx.closePath();
      return ctx.fill();
    }
  };

  JchartLine.prototype.drawVolume = function(volume) {
    var barWidth, columnWidth, ctx, interval, max, max_height, min, value, width, x, y, _i, _j, _len, _ref, _results;
    ctx = this.ctx;
    max = _.max(volume.data);
    min = _.min(volume.data);
    interval = max - min;
    width = this.graph_width - this.options.graph.marginLeft;
    max_height = (this.graph_height - (this.options.graph.marginTop + this.options.graph.marginTop)) / 5;
    if (this.options.chart.stretch) {
      barWidth = width / _.size(this.data[0].processed_hased_index);
    } else {
      barWidth = width / _.size(volume.data);
    }
    columnWidth = barWidth / 2;
    _i = 0;
    _ref = volume.data;
    _results = [];
    for (_j = 0, _len = _ref.length; _j < _len; _j++) {
      value = _ref[_j];
      if (value != null) {
        x = (_i + 1) * barWidth - barWidth / 2 + this.options.chart.paddingLeft + this.options.graph.marginLeft;
        y = this.options.chart.height - (value - min + 1) / interval * max_height - this.options.graph.marginBottom - this.options.chart.paddingBottom;
        ctx.fillStyle = volume.color || '#000';
        if (this.options.chart.stretch) {
          try {
            ctx.fillRect(this.data[0].plot[_i].x - barWidth / 4, y, columnWidth, (value - min + 1) / interval * max_height - this.options.chart.lineWidth + 1);
          } catch (_error) {}
        } else {
          ctx.fillRect(x - columnWidth / 2, y, columnWidth, (value - min + 1) / interval * max_height - this.options.chart.lineWidth + 1);
        }
      }
      _results.push(_i++);
    }
    return _results;
  };

  return JchartLine;

})(JchartCoordinate);

Jchart.line = JchartLine;

var JchartBar,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

JchartBar = (function(_super) {
  __extends(JchartBar, _super);

  function JchartBar(canvas, data, options, ipo) {
    this.canvas = canvas;
    this.data = data;
    this.options = options != null ? options : null;
    this.ipo = ipo;
    this.options = _.merge({
      captionMargin: 0
    }, this.options);
    JchartBar.__super__.constructor.call(this, this.canvas, this.data, this.options, this.ipo);
    this.normalize_data();
    this.draw();
  }

  JchartBar.prototype.draw = function() {
    this.preprocess_style();
    this.preprocess_data();
    return this.drawGraph();
  };

  JchartBar.prototype.addLine = function(data) {
    return this.draw_column_graph(data);
  };

  JchartBar.prototype.draw_column_graph = function(data) {
    var barWidth, columnWidth, value, x, y, _i, _len, _ref, _results;
    barWidth = this.inner_width / _.size(data.data);
    columnWidth = barWidth / 2;
    this.ctx.textBaseline = 'bottom';
    _ref = data.data;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      value = _ref[_i];
      if (value != null) {
        x = (_i + 1) * barWidth + this.options.graph.marginLeft;
        if (this.options.xAxis.label.align === 'center' || this.options.xAxis.tick.align === 'center') {
          x -= barWidth / 2;
        }
        y = this.inner_height - (value - this.min_data) / this.interval * this.inner_height + this.options.graph.marginTop;
        this.ctx.fillStyle = data.style.color;
        this.ctx.fillRect(this.pl + x - columnWidth / 2, this.pt + y, columnWidth, (value - this.min_data) / this.interval * this.inner_height - this.options.chart.lineWidth + 1);
        if (data.caption) {
          this.ctx.fillStyle = this.options.chart.color;
          _results.push(this.ctx.fillText(value.format(2), this.pl + x, this.pt + y - this.options.captionMargin));
        } else {
          _results.push(void 0);
        }
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  return JchartBar;

})(JchartCoordinate);

Jchart.bar = JchartBar;

var JchartPie,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

JchartPie = (function(_super) {

  __extends(JchartPie, _super);

  function JchartPie(canvas, data, options) {
  
    this.canvas = canvas;
    this.data = data;
    this.options = options != null ? options : null;
    JchartPie.__super__.constructor.call(this, this.canvas, this.data, this.options);
    this.build();
  
  }

  JchartPie.prototype.build = function () {
  
    this.process();
    this.draw();
    this.events();
  
  };

  JchartPie.prototype.process = function (highlight) {
    
    var data = this.data;
    var all = 0;
    
    data.forEach(function(item) {
      all += item.value;
    });
    
    data.all = all;
    
    data.forEach(function(item, i) {

      var percent = (item.value * 100) / all;
      var degress = (percent * 360) / 100;
      data[i].percent = percent;
      data[i].degrees = degress;

      var color = hexToRgb(item.color);
      if ( highlight && color_meter(item.color.toLowerCase(), rgbToHex(highlight[0], highlight[1], highlight[2]).toLowerCase()) == 0) {
        data[i].rgb = 'rgba('+color.r+', '+color.g+', '+color.b+', 1.0)';
      }
      else {
        data[i].rgb = 'rgba('+color.r+', '+color.g+', '+color.b+', 0.7)';
      }
    
    });
    
    this.data = data;
    
    //console.log(this.data);
  
  };

  JchartPie.prototype.draw = function () {
    
    var ctx = this.ctx;
    var data = this.data;
    var options = this.options;
    var last = {
      degrees: 0,
      radians: 0
    };
    var radius = options.chart.width/2 - ( options.chart.paddingLeft + options.chart.paddingRight );

    data.forEach(function(item, i) {
      
      var degrees = item.degrees + last.degrees;
      //var xPoint = radius * Math.sin(0);
      //var yPoint = radius * Math.cos(0);
      var radians = (Math.PI / 180) * degrees;

      //console.log(degrees);

      ctx.strokeStyle = '#FFFFFF';
      ctx.fillStyle = item.rgb;
      ctx.lineWidth = 3;
      //console.log('last.radians: '+last.radians+' radians: '+radians);
      
      ctx.beginPath();

      ctx.arc(options.chart.width/2, options.chart.height/2, radius, last.radians, radians);
      //ctx.fill();
      ctx.stroke();

      ctx.lineTo(options.chart.width/2, options.chart.height/2);
      //this.ctx.lineTo(xPoint, yPoint);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();

      last.degrees = degrees;
      last.radians = radians;

    });
  
  };

  JchartPie.prototype.events = function () {
    var lastPixel;
    this.canvas.addEventListener('mousemove', (function (e) {
      var pixel = this.ctx.getImageData(e.x, e.y, 1,1).data;
      //console.log(rgbToHex(pixel[0], pixel[1], pixel[2]));
      if ( lastPixel == undefined || rgbToHex(pixel[0], pixel[1], pixel[2]) != rgbToHex(lastPixel[0], lastPixel[1], lastPixel[2])) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.process(pixel);
        this.draw();
      }
      lastPixel = pixel
    }).bind(this));
  
  };

  return JchartPie;

})(Jchart);

Jchart.pie = JchartPie;

}.call(this)); //Protect scope