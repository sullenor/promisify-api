'use strict';

/**
 * @param  {function} fn
 * @param  {object}   ctx
 * @param  {...*}     _   Additional arguments
 * @return {function}
 */
module.exports = function promisify(fn, ctx, _) {
  var argsNum = fn.length - 1;
  for (var argsToPrepend = [], i = 2; i < arguments.length; ++i) {
    argsToPrepend.push(arguments[i]);
  }

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
    for (var args = Array(Math.max(argsNum - argsToPrepend.length, 0)), i = 0; i < args.length; ++i) {
      args[i] = arguments[i];
    }

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
