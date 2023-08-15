const { v4: uuidv4 } = require('uuid'); // Import the uuid package

module.exports = function getUniqueId() {
    return uuidv4(); // Returns a randomly generated UUID from version 4 of the UUID library
}