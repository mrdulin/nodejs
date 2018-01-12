const os = require('os');
const networkInterfaces = os.networkInterfaces();

// console.log(networkInterfaces);

function getIPv4() {
  const networkInterfaceIds = Object.keys(networkInterfaces);
  let ip;
  for (let id of networkInterfaceIds) {
    const networkAddresses = networkInterfaces[id];
    for (let networkAddress of networkAddresses) {
      if (networkAddress.internal || networkAddress.family === 'IPv6') continue;
      ip = `${id}: ${networkAddress.address}`;
    }
  }
  return ip;
}

console.log(getIPv4());

module.exports = getIPv4;
