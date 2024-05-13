const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'data.json');

function readData(callback) {
  fs.readFile(dataFilePath, (err, data) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, JSON.parse(data));
  });
}

function writeData(data, callback) {
  fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), err => {
    if (err) {
      callback(err);
      return;
    }
    callback(null);
  });
}

module.exports = {
  readData,
  writeData,
};