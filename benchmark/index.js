var readdir = require('fs').readdirSync;
var resolve = require('path').resolve;
var suite = new require('benchmark').Suite();

var cases = resolve(__dirname, 'cases');

readdir(cases).forEach(function (name) {
  var testCase = require(resolve(cases, name));

  suite.add(name, {
    defer: testCase.length > 0,
    fn: testCase,
  })
});

suite
.on('complete', function () {
  this.forEach(function (benchmark) {
    // https://benchmarkjs.com/docs#prototype_stats
    console.log(benchmark.name);
    console.log(' → The sample arithmetic mean (secs): ' + benchmark.stats.mean);
  });
})
.run({async: true});
