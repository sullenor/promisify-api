var slice = Array.prototype.slice;

/**
 * @param  {function} fn
 * @param  {object}   ctx
 * @return {function}
 */
module.exports = function promisify(fn, ctx) {
  var argsNum = fn.length - 1;
  var argsToPrepend = slice.call(arguments, 2);

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
    var args = slice.call(arguments, 0, Math.max(argsNum - argsToPrepend.length, 0));

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
