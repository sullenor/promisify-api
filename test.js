const assert = require('assert');
const promisify = require('./');

suite('promisify-api', () => {
  test('respond with result', done => {
    promisify(result)('finally')
      .then(rs => {
        assert.equal(rs, 'finally');
        done();
      })
      .catch(done);
  });

  test('respond with error', done => {
    promisify(error)('oops')
      .then(_ => done(new Error('should throw an error')))
      .catch(er => {
        assert(er instanceof Error, 'not an error');
        assert.equal(er.message, 'oops');
        done();
      });
  });

  test('saves the context', done => {
    const kitty = {
      /**
       * @param {string}   name
       * @param {function} cb
       */
      greet: function (name, cb) {
        setTimeout(_ => cb(null, `${this.name} greets ${name}`), 10);
      },
      name: 'Sally',
    };

    promisify(kitty.greet, kitty)('Jamie')
      .then(msg => {
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
  setTimeout(_ => cb(null, val), 10);
}

/**
 * @param {string}   msg
 * @param {function} cb
 */
function error(msg, cb) {
  setTimeout(_ => cb(new Error(msg)), 10);
}
