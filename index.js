'use strict';

/**
 * @param  {function} fn
 * @param  {object}   ctx
 * @param  {...*}     _   Additional arguments
 * @return {function}
 */
module.exports = function promisify(fn, ctx, _) {
  var argsNum = fn.length - 1;
  var argsToPrepend = toArray(arguments).slice(2);

  if (fn.length === 0) {
    throw new Error('promisify accepts functions with explicit arguments declaration');
  }

  if (argsToPrepend.length > argsNum) {
    var name = (fn.name || 'promisified') + ' function doesn\'t accept';
    switch (argsNum) {
    case 0:
      throw new Error(name + ' any additional arguments');
    case 1:
      throw new Error(name + ' more than one argument');
    default:
      throw new Error(name + ' more than ' + argsNum + ' arguments');
    }
  }

  return function promise() {
    var args = toArray(arguments).slice(0, Math.max(argsNum - argsToPrepend.length, 0));

    return new Promise(function (resolve, reject) {
      fn.apply(ctx, argsToPrepend.concat(args, function (er, rs) {
        if (er) {
          return void reject(er);
        }

        resolve(rs);
      }));
    });
  };
};

/**
 * https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments
 *
 * @param  {array|arguments} col
 * @return {array}
 */
function toArray(col) {
  var args = new Array(col.length);
  for (var i = 0; i < args.length; ++i) {
    args[i] = col[i];
  }

  return args;
}
