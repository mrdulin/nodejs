const os = require('os');

const networkInterfaces = os.networkInterfaces();
// console.log(networkInterfaces);

function getIPv4() {
  const networkInterfaceIds = Object.keys(networkInterfaces);
  let ip;
  for (const id of networkInterfaceIds) {
    const networkAddresses = networkInterfaces[id];
    for (const networkAddress of networkAddresses) {
      if (networkAddress.family === 'IPv4') {
        ip = `${id}: ${networkAddress.address}`;
      }
    }
  }
  return ip;
}

console.log(getIPv4());

module.exports = getIPv4;
