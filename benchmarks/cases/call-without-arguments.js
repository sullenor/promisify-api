var p = require('../../index');
var promisifiedDelay = p(delay);

module.exports = function (deferred) {
  promisifiedDelay()
    .then(function () {
      deferred.resolve();
    });
};

function delay(cb) {
  setTimeout(function () {
    cb(null, 'done');
  }, 0);
}
