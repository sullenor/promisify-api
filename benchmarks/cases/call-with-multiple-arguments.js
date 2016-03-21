var p = require('../../index');
var promisifiedDelay = p(delay);

module.exports = function (deferred) {
  promisifiedDelay(1, 2, 3, 4, 5, 6, 7)
    .then(function () {
      deferred.resolve();
    });
};

function delay(a, b, c, d, e, f, g, cb) {
  setTimeout(function () {
    cb(null, 'done');
  }, 0);
}
