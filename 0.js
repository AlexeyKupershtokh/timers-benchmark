var timers = require('./timers_0.8.12.1.js');
var setTimeout = timers.setTimeout;
var clearTimeout = timers.clearTimeout;

var noop = function() {};
for(var i = 0; i < 1000000; i++) {
  setTimeout(noop, 1);
}
process.exit();
