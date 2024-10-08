const { createReadStream } = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

const {  planets } = require('./planets.mongo');



function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36
        && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6
}


function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
            .pipe(parse({comment: '#', columns: true}))
            .on('data', async (data) => {
                if (isHabitablePlanet(data)) {
                    savePlanets(data);
                }
            })
            .on('error', (error) => {
                console.log(error);
                reject(error);
            }
            ) 
            .on('end', async () => {
                const countPlanetsFound = (await getAllPlanets()).length; 
                console.log(`${countPlanetsFound} habitable planets found!`);   
                resolve();
            })
            })

}


function getAllPlanets() {
    return planets.find({}, { "_id": 0, "__v": 0 });
}

async function savePlanets(planet) {
    try {
        await planets.updateOne({
            keplerName: planet.kepler_name,
        }, {
            keplerName: planet.kepler_name,
        }, {
            upsert: true
        });
    } catch (err) {
        console.error(`Could not save planet ${err}`);
    }
}


module.exports = {
    loadPlanetsData,
    getAllPlanets,
};