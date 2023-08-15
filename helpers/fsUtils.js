// const { DESTRUCTION } = require('dns');
const fs = require('fs');
const util = require('util');

// Promise approach to fs.readFile
const readFileNotes = util.promisify(fs.readFile);
/**
 * Function to write data to JSON file with a specific destination
 * @param {string} destination File to write to
 * @param {object} content Content to write into file
 * @returns {void} Nothing
 */
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`Note written to ${destination}`)
  );
/**
 * Function to read data from file and concatenate the content
 * @param {object} content Content to concatenate to file
 * @param {string} file Path to file to save to
 * @returns {void} Nothing
 */
const readAndConcat = (content, file) => {
  fs.readFile(file, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const dataParsed = JSON.parse(data);
      dataParsed.push(content);
      writeToFile(file, dataParsed);
    }
  });
};


module.exports = { readFileNotes, writeToFile, readAndConcat };