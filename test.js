'use strict';

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

  test('prepends additional arguments', function (done) {
    promisify(result, null, 6)()
      .then(function (rs) {
        assert.equal(rs, 6);
        done();
      })
      .catch(done);
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

  test('throws an exception for functions with implicit argument declaration', function () {
    try {
      promisify(function () {});
      done(new Error('failure'));
    } catch(er) {
      assert.equal(er.message, 'promisify accepts functions with explicit arguments declaration');
    }
  });

  test('throws an exception for the additional argument', function () {
    try {
      promisify(result, null, 6, 'excess');
      done(new Error('failure'));
    } catch(er) {
      assert.equal(er.message, 'result function doesn\'t accept more than one argument');
    }
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
