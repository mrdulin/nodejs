import { performance, PerformanceObserver } from 'perf_hooks';

const obs = new PerformanceObserver((items) => {
  console.log('PerformanceObserver measureSquareRootLoop', items.getEntries()[0].duration);
  performance.clearMarks();
});
obs.observe({ entryTypes: ['measure'] });

function work() {
  for (let i = 0; i < 1000000; i++) {
    Math.sqrt(i);
  }
}

performance.mark('beginSquareRootLoop');
// performance.timerify(work)();
work();
performance.mark('endSquareRootLoop');
performance.measure('measureSquareRootLoop', 'beginSquareRootLoop', 'endSquareRootLoop');
