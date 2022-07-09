const request = require('request-promise-native');

const fetchMyIP = function(callback) {
  return request('https://api.ipify.org/?format=json')
  
};


const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
        return request(`https://freegeoip.app/json/${ip}`);
  };


  const fetchISSFlyOverTimes = function(coords, callback) {
    const { latitude, longitude } =  JSON.parse(body);
    const url = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`  
     return request(url)
};


const nextISSTimesForMyLocation = function(callback) {
  return fetchMyIP()
   .then(fetchMyIP)
   .then(fetchCoordsByIP)
   .then(fetchISSFlyOverTimes)
   .then((data) => {
    const { response } = JSON.parse(data);
    return response;
  });
};

  





module.exports = { fetchMyIP , fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation};
