const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100, 
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    lauchDate: new Date('December 27, 2030'),
    destination: 'Kepler-4422 b',
    customer: ['ZTM', 'NASA'],
    upcoming: true, 
    success: true,
}

launches.set(launch.flightNumber, launch)


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


module.exports = {
    getAllLaunches,
    addNewLaunch, 
}