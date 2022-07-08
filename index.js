const {fetchMyIP} = require('./iss');
const {fetchCoordsByIP} = require('./iss');
const {fetchISSFlyOverTimes} = require('./iss')
const { nextISSTimesForMyLocation } = require('./iss');



// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log('It didn\t work!', error);
//     return; //if there was an error then stop here
//   } 

//   console.log('It worked! Returned IP:', ip)
// })

// fetchCoordsByIP('174.3.143.28',(error, coordinates) => {
//    if (error) {
//     console.log('It didn\t work!', error);
//     return; 
//   } 
//   console.log('It worked! Returned coordinates:' , coordinates);

// });

// const exampleCoords = { latitude: '49.27670', longitude: '-123.13000' };
// fetchISSFlyOverTimes(exampleCoords, (error, passTimes) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned flyover times:' , passTimes);
// });

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) { // got the loop but my date time is undefined need to convert 
    const datetime = new Date(0); //sets the seconds for a specified date according to universal time.
    datetime.setUTCSeconds(pass.risetime);
    console.log(`Next pass at ${pass.datetime} for ${pass.duration} seconds!`); //i got this 
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printPassTimes(passTimes); //give the passtime to the printing function that will loop and make the statement s
});
