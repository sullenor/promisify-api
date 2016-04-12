var readdir = require('fs').readdirSync;
var resolve = require('path').resolve;

var cases = resolve(__dirname, 'cases');
var suite = new require('benchmark').Suite({
  onCycle: function (e) {
    console.log(String(e.target));
  }
});

readdir(cases).forEach(function (name) {
  var testCase = require(resolve(cases, name));

  suite.add(name, {
    defer: testCase.length > 0,
    fn: testCase,
  });
});

suite.run();
