const mongoose = require('mongoose');

const MONGODB_URL = "mongodb+srv://nasaUser:M65ik6wKi5qQ5e0X@basiccluster.ftcop.mongodb.net/nasa?retryWrites=true&w=majority&appName=BasicCluster";

mongoose.connection.once('open', () => {
    ('MongoDB connection ready');
});

mongoose.connection.on('error', (err) => {
    console.error(err);
});

async function mongoConnect() {
    await mongoose.connect(MONGODB_URL);
}

async function mongoDisconnect() {
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}