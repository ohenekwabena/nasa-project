const http = require('http');

const app = require('./app');
const {loadPlanetsData} = require('./models/planets.model');
const { mongoConnect } = require('./services/mongo');

const PORT = process.env.PORT || 8000;


const server = http.createServer(app);


async function startServer() {
    await mongoConnect();

    await loadPlanetsData();
    
server.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}...`);
    
})
}
startServer();
