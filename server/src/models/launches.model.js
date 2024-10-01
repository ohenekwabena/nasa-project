const launches = new Map();

const { launches: launchesDatabase } = require('./launches.mongo'); 
const { planets } = require('./planets.mongo');

let DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
    flightNumber: 100, 
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customers: ['ZTM', 'NASA'],
    upcoming: true, 
    success: true,
}

 saveLaunch(launch);

async function launchWithIdExists(flightNumber) {
    return await launchesDatabase.findOne({ flightNumber: flightNumber });
}


async function getLatestFlightNumber() {
    const latestFlightNumber = (await launchesDatabase
        .findOne()
        .sort("-flightNumber")
    ).flightNumber;

    if(!latestFlightNumber) {
        return DEFAULT_FLIGHT_NUMBER;
    }
    return latestFlightNumber;
}

async function getAllLaunches() {
    const fetchedLaunches = await launchesDatabase.find({}, { "_id": 0, "__v": 0 });
    
    return fetchedLaunches;
}

async function saveLaunch(launch) {
    let planet
    try {
         planet = await planets.findOne({
        keplerName: launch.target,
    })
    }catch(err) {
        return console.log(err);
    }
    

    if(!planet) {
        throw new Error("No matching planet found");
    }

    await launchesDatabase.findOneAndUpdate({
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true
    })
}

async function scheduleNewLaunch(launch) {
    const newFlightNumber = (await getLatestFlightNumber()) + 1;
    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ["Afriwave Telecom", "NASA"],
        flightNumber: newFlightNumber,
    });

    await saveLaunch(newLaunch);
}


async function abortLaunchById(flightNumber) {

    const aborted = await launchesDatabase.updateOne({
            flightNumber: flightNumber
        }, {
            upcoming: false,
            success: false
    })
    
    return aborted.modifiedCount === 1 && aborted.matchedCount === 1;
}


module.exports = {
    launchWithIdExists,
    getAllLaunches,
    scheduleNewLaunch, 
    abortLaunchById,
}