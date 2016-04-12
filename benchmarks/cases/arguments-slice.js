'use strict';

var slice = Array.prototype.slice;

module.exports = function () {
  sliceArgs(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20);
};

function sliceArgs() {
  return slice.call(arguments);
}
