'use strict';

var p = require('../index');
var pDelayWithArgs = p(delayWithArgs);
var pDelayWithoutArgs = p(delayWithoutArgs);

new require('benchmark')
  .Suite({
    onCycle: function (e) { console.log(String(e.target)); },
  })
  .add('promise call with 3 arguments      ', function (deferred) {
    pDelayWithArgs(1, 2, 3)
      .then(function () {
        deferred.resolve();
      });
  })
  .add('promise call with zero arguments   ', function (deferred) {
    pDelayWithoutArgs(1, 2, 3)
      .then(function () {
        deferred.resolve();
      });
  })
  .run({async: true});

function delayWithArgs(a, b, c, cb) {
  setTimeout(function () {
    cb(null, 'done');
  }, 0);
}

function delayWithoutArgs(cb) {
  setTimeout(function () {
    cb(null, 'done');
  }, 0);
}
