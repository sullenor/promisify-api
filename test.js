var assert = require('assert');
var promisify = require('./');

suite('promisify-api', function () {
  test('respond with result', function (done) {
    promisify(result)('finally')
      .then(function (rs) {
        assert.equal(rs, 'finally');
        done();
      })
      .catch(done);
  });

  test('respond with error', function (done) {
    promisify(error)('oops')
      .then(function () {
        done(new Error('should throw an error'));
      })
      .catch(function (er) {
        assert(er instanceof Error, 'not an error');
        assert.equal(er.message, 'oops');
        done();
      });
  });

  test('saves the context', function (done) {
    var kitty = {
      /**
       * @param {string}   name
       * @param {function} cb
       */
      greet: function (name, cb) {
        var self = this;
        setTimeout(function () {
          cb(null, self.name + ' greets ' + name);
        }, 10);
      },
      name: 'Sally',
    };

    promisify(kitty.greet, kitty)('Jamie')
      .then(function (msg) {
        assert.equal(msg, 'Sally greets Jamie');
        done();
      })
      .catch(done);
  });
});

/**
 * @param {string}   msg
 * @param {function} cb
 */
function result(val, cb) {
  setTimeout(function () {
    cb(null, val);
  }, 10);
}

/**
 * @param {string}   msg
 * @param {function} cb
 */
function error(msg, cb) {
  setTimeout(function () {
    cb(new Error(msg));
  }, 10);
}
