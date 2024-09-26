const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100, 
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-4422 b',
    customer: ['ZTM', 'NASA'],
    upcoming: true, 
    success: true,
}

launches.set(launch.flightNumber, launch)

function launchWithIdExists(flightNumber) {
    return launches.has(flightNumber);
}

function getAllLaunches() {
    return Array.from(launches.values());
}

function addNewLaunch(launch) {
    latestFlightNumber++;

    launches.set(latestFlightNumber, Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ["Afriwave Telecom", "NASA"],
        flightNumber: latestFlightNumber,
    }))
}

function abortLaunchById(flightNumber) {
    const abortedLaunch = launches.get(flightNumber);

    abortedLaunch.upcoming = false;
    abortedLaunch.success = false;

    return abortedLaunch;
}


module.exports = {
    launchWithIdExists,
    getAllLaunches,
    addNewLaunch, 
    abortLaunchById,
}