const util = require('util');

function awkwardFunction(options, data, callback) {
  let item = 'stuff message';
  let response = { data };
  return callback(null, response, item);
}

// callback
// awkwardFunction({ doIt: true }, 'some data', (err, result, item) => {
//   console.log('result:', result);
//   console.log('item:', item);
// });

// Promisify
let awkwardFunctionPromisified = (awkwardFunction[util.promisify.custom] = function (options, data) {
  return new Promise((resolve, reject) => {
    awkwardFunction(options, data, (err, response, item) => {
      if (err) return reject(err);
      resolve({ result: response, item });
    });
  });
});

awkwardFunctionPromisified({ doIt: true }, 'some data').then(({ result, item }) => {
  console.log('result:', result);
  console.log('item:', item);
});
