const { default: axios } = require('axios');
const { launches: launchesDatabase } = require('./launches.mongo'); 
const { planets } = require('./planets.mongo');

let DEFAULT_FLIGHT_NUMBER = 100;

const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';
 
async function populateLaunches() {
    console.log("Downloading launch data...");
    
    const response = await axios.post(SPACEX_API_URL, {
       query: {},
       options: {
           pagination: false,  
            populate: [
                {
                    path: "rocket",
                    select: {
                        name: 1
                    }
                },
                {
                    path: "payloads",
                    select: {
                        customers: 1
                    }
                }
            ]
        }
    }).catch(
        function (error) {
            console.log(`Failed to load launches - ${error}`);
            
        }
    ) 

    const launchDocs = response?.data.docs;
    
    for (const launchDoc of launchDocs) {
    
        const payloads = launchDoc.payloads
    
        const customers = payloads.flatMap((payload) => {
            return payload?.customers;
        })
    
        const launch = {
            flightNumber: launchDoc.flight_number,
            mission: launchDoc.name,
            rocket: launchDoc.rocket.name,
            launchDate: launchDoc.date_local,
            upcoming: launchDoc.upcoming,
            success: launchDoc.success,
            customers,
        }
    
        console.log(`Launch saved: ${launch.flightNumber} ${launch.mission}`);
        
        // saveLaunch(launch);
    }   
}

async function loadLaunchData() {
    const firstLaunch = await findLaunch({
        flightNumber: 1,
        rocket: 'Falcon 1',
        mission: 'FalconSat',
    });

    if (firstLaunch) {
        console.log('Launch dara already loaded!')
    } else {
        populateLaunches();
    }
 }


async function findLaunch(filter) {
    return await launchesDatabase.findOne(filter)
}

async function launchWithIdExists(flightNumber) {
    return await findLaunch({ flightNumber: flightNumber })
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

async function getAllLaunches(skip, limit) {
    const fetchedLaunches = await launchesDatabase.find({}, { "_id": 0, "__v": 0 })
        .sort({flightNumber: 1})
        .skip(skip)
        .limit(limit);
    
    return fetchedLaunches;
}

async function saveLaunch(launch) {

    await launchesDatabase.findOneAndUpdate({
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true
    })
}

async function scheduleNewLaunch(launch) {
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
    loadLaunchData,
    launchWithIdExists,
    getAllLaunches,
    scheduleNewLaunch, 
    abortLaunchById,
}





