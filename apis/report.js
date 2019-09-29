'use strict';
const reporting = require("../libs/reporting");
const error = require("../libs/error");

module.exports.daily = (event, context, callback) => {
  console.log("==== Event.body", event.body);
  // Validation
  if (!event.body) {
    return callback(null, error.errorResponse("BAD_REQUEST", "Missing body request"));
  }
  const requestBody = JSON.parse(event.body);

  if (!requestBody.date) {
    return callback(null, error.errorResponse("BAD_REQUEST", "Missing field: date"));
  }

  reporting.getFullDayTransactions(requestBody.date)
  .then((result) => {
    console.log("=== Result After getFullDayTransactions", result);
    // Return successfull transaction
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(
        {
          result,
        },
        null,
        2
      ),
    };

    return callback(null, response);
  })
  .catch((message) => {
    console.log("=== Error After getFullDayTransactions", message);
    // const message = "====== Internal server Error while trying to add a transaction for:" + requestBody.formula;
    // // Return error message
    const response = error.errorResponse("SERVER_ERROR", message);
    return callback(null, response);
  })
};


module.exports.weekly = (event, context, callback) => {
    console.log("==== Event.body", event.body);
    // Validation
    if (!event.body) {
      return callback(null, error.errorResponse("BAD_REQUEST", "Missing body request"));
    }
    const requestBody = JSON.parse(event.body);
  
    if (!requestBody.date) {
      return callback(null, error.errorResponse("BAD_REQUEST", "Missing field: date"));
    }
  
    reporting.getFullWeekTransactions(requestBody.date)
    .then((result) => {
      console.log("=== Result After getFullDayTransactions", result);
      // Return successfull transaction
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(
          {
            result,
          },
          null,
          2
        ),
      };
  
      return callback(null, response);
    })
    .catch((message) => {
      console.log("=== Error After getFullDayTransactions", message);
      // const message = "====== Internal server Error while trying to add a transaction for:" + requestBody.formula;
      // // Return error message
      const response = error.errorResponse("SERVER_ERROR", message);
      return callback(null, response);
    })
};


module.exports.monthly = (event, context, callback) => {
    console.log("==== Event.body", event.body);
    // Validation
    if (!event.body) {
      return callback(null, error.errorResponse("BAD_REQUEST", "Missing body request"));
    }
    const requestBody = JSON.parse(event.body);
  
    if (!requestBody.date) {
      return callback(null, error.errorResponse("BAD_REQUEST", "Missing field: date"));
    }
  
    reporting.getFullMonthTransactions(requestBody.date)
    .then((result) => {
      console.log("=== Result After getFullDayTransactions", result);
      // Return successfull transaction
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(
          {
            result,
          },
          null,
          2
        ),
      };
  
      return callback(null, response);
    })
    .catch((message) => {
      console.log("=== Error After getFullDayTransactions", message);
      // const message = "====== Internal server Error while trying to add a transaction for:" + requestBody.formula;
      // // Return error message
      const response = error.errorResponse("SERVER_ERROR", message);
      return callback(null, response);
    })
};

