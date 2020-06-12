var util = require('util'),
  events = require('events');

var me = {
  name: 'dul',
  sex: 'male',
  sayName: function () {
    console.log(this.name);
  },
};

//
//util.log(util.inspect(me, {
//    showHidden: true,
//    depth: null,
//    colors: true
//}));

var emitter = new events.EventEmitter();

emitter
  .on('ouch', function (data) {
    console.log(data);
  })
  .on('sleep', function (data) {
    console.log(data);
  });

emitter.emit('ouch', {
  times: 'double',
  actions: 'kick you ass',
});
