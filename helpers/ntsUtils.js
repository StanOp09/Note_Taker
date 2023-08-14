const fs = require('fs');
const { fileURLToPath } = require('url');
const util = require('util');

// Promiise version of fs.readfile
const readFromFile = util.promisify(fs.readFile);
/**
 * Function to write data to the JSON file given a destination and some content
 * @param {string} destination The file you want to write to.
 * @param {object} content The content to write to file.
 * @returns {void} Nothing
 */
const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
        err? console.error(err) : console.info(`\nData can be found at ${destination}`)
    );
/**
 * Function to read data from given a file and append some content
 * @param {object} content The content you want to append to the file.
 * @param {string} file The path to the file you want to save to.
 * @returns {void} Nothing
 */
const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parseData = JSON.parse(data);
            parseData.push(content);
            writeToFile(file, parseData);
        }
    });
};

module.exports = { readFromFile, writeToFile, readAndAppend };