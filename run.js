var Benchmark = require('benchmark').Benchmark;

timer_modules = {
  "0.8.12" : {
    "_ = null": require('./timers_0.8.12.1.js'),
    "delete _; _ = null": require('./timers_0.8.12.2.js'),
    "keep _": require('./timers_0.8.12.3.js'),
  },
  "0.9.3" : {
    "_ = null": require('./timers_0.9.3.1.js'),
    "delete _; _ = null": require('./timers_0.9.3.2.js'),
    "keep _": require('./timers_0.8.12.3.js'),
  },
  "0.9.3 optimized" : {
    "_ = null": require('./timers_my.1.js'),
    "delete _; _ = null": require('./timers_my.2.js'),
    "keep _": require('./timers_my.3.js'),
  }
}

noop = function() {};

var suite = new Benchmark.Suite;

// add tests
suite.add('warmup', function() {
  var d = Date.now();
});
for (var v in timer_modules) {
  for (patch in timer_modules[v]) {
    var name = v + '; ' + patch;
    suite.add(v + '; ' + patch, '\
      var setTimeout2   = timer_modules[\'' + v + '\'][\'' + patch + '\'].setTimeout; \
      var clearTimeout2 = timer_modules[\'' + v + '\'][\'' + patch + '\'].clearTimeout; \
      var t = []; \
      for (var i = 0; i < 1000; i++) t.push(setTimeout2(noop, 1)); \
      for (var i = 0; i < 1000; i++) clearTimeout2(t[i]); \
    ');
  }
}
// add listeners
suite.on('setup', function() {
  console.log('setup');
});
suite.on('cycle', function(event) {
  while(event.target.name.length < 35) { event.target.name += ' '; }
  console.log(String(event.target));
})
suite.on('error', function(event) {
  console.log(event.target.error);
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
})
.run();
