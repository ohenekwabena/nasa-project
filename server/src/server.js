const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');
const {loadPlanetsData} = require('./models/planets.model');

const PORT = process.env.PORT || 8000;

const MONGODB_URL = "mongodb+srv://nasaUser:M65ik6wKi5qQ5e0X@basiccluster.ftcop.mongodb.net/nasa?retryWrites=true&w=majority&appName=BasicCluster";

const server = http.createServer(app);

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready');
});

mongoose.connection.on('error', (err) => {
    console.error(err);
});

async function startServer() {
    await mongoose.connect(MONGODB_URL);

    await loadPlanetsData();
    
server.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}...`);
    
})
}
startServer();
