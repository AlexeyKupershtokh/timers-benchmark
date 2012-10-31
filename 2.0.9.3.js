var timers = require('./timers_0.9.3.2.js');
var setTimeout = timers.setTimeout;
var clearTimeout = timers.clearTimeout;

var noop = function() {};
setTimeout(noop, 1); // in order to preserve linked list not empty
for(var i = 0; i < 1000000; i++) {
  var t = setTimeout(noop, 1);
  clearTimeout(t);
}
