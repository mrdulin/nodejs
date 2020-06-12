'use strict';
const { performance, PerformanceObserver } = require('perf_hooks');
const request = require('request');

function queryEngines(done) {
  const urls = ['http://www.google.com', 'http://yahoo.com', 'http://bing.com', 'http://duckduckgo.com'];

  let results = [];

  urls.forEach((url) => {
    performance.mark(url + '-init'); //initial mark for the current URL

    request(url, (err, cnt) => {
      performance.mark(url + '-end'); //final mark for the same URL
      performance.measure(url, url + '-init', url + '-end'); //calculate the time difference between the start and end

      results.push(cnt);
      if (results.length === urls.length) {
        return done(results);
      }
    });
  });
}

// Activate the observer
const obs = new PerformanceObserver((list) => {
  const entry = list.getEntries()[0];
  console.log(`Time for ('${entry.name}')`, entry.duration);
});
obs.observe({ entryTypes: ['measure'], buffered: false }); //we want to react to full measurements and not individual marks

queryEngines((pages) => {
  console.log('Done!');
});
