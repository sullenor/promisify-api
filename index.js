var slice = Array.prototype.slice;

/**
 * @param  {function} fn
 * @param  {object}   ctx
 * @return {function}
 */
module.exports = function promisify(fn, ctx) {
  var argsNum = fn.length - 1;

  return function promise() {
    var args = slice.call(arguments, 0, argsNum);

    return new Promise(function (resolve, reject) {
      fn.apply(ctx, args.concat(function (er, rs) {
        if (er) {
          return void reject(er);
        }

        resolve(rs);
      }));
    });
  };
};
