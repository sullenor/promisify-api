const promisify = require('../index');
const Suite = require('benchmark').Suite;

const prDelay = promisify(delay);
const suite = new Suite();

suite.add('delay', {
  defer: true,
  fn: function (deferred) {
    prDelay(1, 2, 3, 4, 5, 6)
      .then(_ => deferred.resolve());
  },
  onComplete: function () {
    // https://benchmarkjs.com/docs#prototype_stats
    console.log(`The sample arithmetic mean (secs): ${this.stats.mean}`);
  },
})
.run({async: true});

function delay(a, b, c, d, e, f, cb) {
  setTimeout(function () {
    cb(null, [a]);
  }, 10);
}
