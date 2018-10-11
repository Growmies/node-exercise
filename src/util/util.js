let request = require('request');
let logger = require('./logger');
async function makeRequest(url) {
  let options = {
    method: 'GET',
    uri: url,
    json: true,
  };

  logger.info('**** API OPTIONS: ', options);

  return new Promise(function(resolve, reject) {
    return apiCall(options)
    .then(function(response) {
      resolve(response);
    })
    .catch(function(err) {
      reject(err);
    });
  });
};

let apiCall = function(options) {
  return new Promise(function(resolve, reject) {
    request(options, function(error, response, body) {
      if (error) {
        logger.info('API Call failed... API details: ', options, error);
        reject(error);
      } else {
        if (response && (response.statusCode == 200)) {
          resolve(body);
        } else {
          reject(body, response);
        }
      }
    });
  });
};

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};



module.exports = {
  apiCall,
  makeRequest,
  normalizePort
};