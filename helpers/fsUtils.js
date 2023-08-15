const fs = require('fs');
const util = require('util');
// Asynchronous version of reading a file
const fetchFromFile = util.promisify(fs.readFile);
const saveToFile = (path, data) =>
  fs.writeFile(path, JSON.stringify(data, null, 4), (error) =>
    error ? console.error(error) : console.log(`Data stored in ${path}`)
  );
const appendToFile = (data, path) => {
  fs.readFile(path, 'utf8', (error, fileData) => {
    if (error) {
      console.error(error);
    } else {
      const existingData = JSON.parse(fileData);
      existingData.push(data);
      saveToFile(path, existingData);
    }
  });
};
module.exports = { fetchFromFile, saveToFile, appendToFile };