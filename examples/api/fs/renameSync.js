const fs = require('fs');
const path = require('path');

const oldPathSync = path.normalize('./fs.renametest');
const newPathSync = path.normalize('./renameTest.txt');

fs.renameSync(oldPathSync, newPathSync);
