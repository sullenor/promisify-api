'use strict';

var slice = Array.prototype.slice;

new require('benchmark')
  .Suite({
    onCycle: function (e) { console.log(String(e.target)); },
  })
  .add('[].slice.call(arguments)           ', function () { arraySlice(1, 2, 3, 4, 5); })
  .add('[].proto.slice.call(arguments)     ', function () { protoSlice(1, 2, 3, 4, 5); })
  .add('do-while-loop                      ', function () { doWhileLoop(1, 2, 3, 4, 5); })
  .add('for-loop with assignment           ', function () { forLoop(1, 2, 3, 4, 5); })
  .add('for-loop with [].push(arguments[i])', function () { arrayPush(1, 2, 3, 4, 5); })
  .add('while-loop                         ', function () { whileLoop(1, 2, 3, 4, 5); })
  .run();

function arrayPush() {
  for (var a = [], i = 0; i < arguments.length; ++i) a.push(arguments[i]);
  return a;
}

function arraySlice() {
  return [].slice.call(arguments);
}

function protoSlice() {
  return slice.call(arguments);
}

function doWhileLoop() {
  var a = Array(arguments.length);
  var l = a.length - 1;

  do {
    a[l] = arguments[l];
  } while (l--);

  return a;
}

function forLoop() {
  for (var a = Array(arguments.length), i = 0; i < a.length; ++i) a[i] = arguments[i];
  return a;
}

function whileLoop() {
  var a = Array(arguments.length);
  var l = a.length;

  while (l--) a[l] = arguments[l];
  return a;
}
