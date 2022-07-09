const {fetchMyIP} = require('./iss_promised');
const {fetchCoordsByIP} = require('./iss_promised');
const {fetchISSFlyOverTimes} = require('./iss_promised');
const {nextISSTimesForMyLocation} = require('./iss_promised');




// fetchMyIP()
// .then(fetchCoordsByIP)
// .then(fetchISSFlyOverTimes)
// // .then(nextISSTimesForMyLocation) no need to add this since
// .then(body => console.log(body));

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) { // got the loop but my date time is undefined need to convert 
    const datetime = new Date(0); //sets the seconds for a specified date according to universal time.
    datetime.setUTCSeconds(pass.risetime);
    console.log(`Next pass at ${pass.datetime} for ${pass.duration} seconds!`); //i got this 
  }
}; 

nextISSTimesForMyLocation()
.then((passTimes) => {
  printPassTimes(passTimes);
}).catch((error) => {
  console.log("It didn't work: ", error.message);
});