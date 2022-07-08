const request = require('request');
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  request('https://api.ipify.org/?format=json', (error,response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null); //creates a new Error object that we can pass around. In this case, we pass it back to the callback to indicate that something went wrong.
      return;
    } 
    const ip = JSON.parse(body).ip; //turns the body into a JSON obj and the .ip will allow us to use dot notation and call the ip address 
    callback(null,ip)
  });
};




const fetchCoordsByIP = function(ip,callback) {
  /**
 * Makes a single API request to retrieve the lat/lng for a given IPv4 address.
 * Input:
 *   - The ip (ipv4) address (string)
 *   - A callback (to pass back an error or the lat/lng object)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The lat and lng as an object (null if error). Example:
 *     { latitude: '49.27670', longitude: '-123.13000' }
 */
    request(`http://ipwho.is/${ip}`, (error, response, body) => {
  
      if (error) {
        callback(error, null);
        return;
      }
  
      const parsedBody = JSON.parse(body);
  
      if (!parsedBody.success) {
        const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
        callback(Error(message), null);
        return;
      } 
  
      const { latitude, longitude } = parsedBody;
  
      callback(null, {latitude, longitude});
    });
  };



  // `https://freegeoip.app/json/${ip}`
  /**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
  const fetchISSFlyOverTimes = function(coords, callback) {
    const url = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`  
    request(url, (error, response, body) => {
      if (error) {
      callback(error, null);
      return 
    } 
  
    const parsedBody = JSON.parse(body);
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS passing times. Response: ${body}`;
      callback(Error(msg), null); //creates a new Error object that we can pass around. In this case, we pass it back to the callback to indicate that something went wrong.
      return;
    } 
    // const coords = { latitude: JSON.parse(body).latitude, longitude:JSON.parse(body).longitude };

    const passes = JSON.parse(body).response
    
    callback(null, passes);

  })
};






const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) { //call this function, if error return the eroe, else
      return callback(error,null);
    } 

    fetchCoordsByIP(ip ,(error, coords) => { //call the next, pass the ip to it
      if (error) { //if error, return the error
        return callback(error, null)

    } 
    fetchISSFlyOverTimes(coords, (error, passTimes) => { //else pass the coords to the next function
      if (error) {
        return callback(error, null) //if err, return the err
      }
      callback(null, passTimes) //else pass the passtimes
    });
  });
 });
};







module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };