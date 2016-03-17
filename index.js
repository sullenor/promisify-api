const slice = Array.prototype.slice;

/**
 * @param  {function} fn
 * @param  {object}   ctx
 * @return {function}
 */
module.exports = function promisify(fn, ctx) {
  const argsNum = fn.length - 1;

  return function promise() {
    const args = slice.call(arguments, 0, argsNum);

    return new Promise((resolve, reject) => {
      fn.apply(ctx, args.concat((er, rs) => {
        if (er) {
          return void reject(er);
        }

        resolve(rs);
      }));
    });
  };
};
