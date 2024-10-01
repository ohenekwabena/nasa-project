const mongoose = require('mongoose');

const planetSchema = new mongoose.Schema(
    {
        keplerName: {
            type: String,
            required: true
        }
    }
);


const planets = mongoose.model('Planets', planetSchema);

module.exports = {
    planets,
};