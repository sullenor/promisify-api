'use strict';

/**
 * @param  {function} fn
 * @param  {object}   ctx
 * @param  {...*}     _   Additional arguments
 * @return {function}
 */
module.exports = function promisify(fn, ctx, _) {
  for (var prependedArgs = [], i = 2; i < arguments.length; ++i) {
    prependedArgs.push(arguments[i]);
  }

  var possibleArgs = fn.length - 1;
  var maxArgs = Math.max(possibleArgs - prependedArgs.length, 0);

  if (fn.length === 0) {
    throw new Error('promisify accepts functions with explicit arguments declaration');
  }

  if (prependedArgs.length > possibleArgs) {
    var name = (fn.name || 'promisified') + ' function doesn\'t accept';
    switch (possibleArgs) {
    case 0:
      throw new Error(name + ' any additional arguments');
    case 1:
      throw new Error(name + ' more than one argument');
    default:
      throw new Error(name + ' more than ' + possibleArgs + ' arguments');
    }
  }

  return function promise() {
    for (var args = Array(maxArgs), i = 0; i < args.length; ++i) {
      args[i] = arguments[i];
    }

    return new Promise(function (resolve, reject) {
      fn.apply(ctx, prependedArgs.concat(args, function (er, rs) {
        if (er) {
          return void reject(er);
        }

        resolve(rs);
      }));
    });
  };
};
