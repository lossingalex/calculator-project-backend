'use strict';
const math = require("../libs/math");
const error = require("../libs/error");

module.exports.main = (event, context, callback) => {
  console.log("==== Event.body", event.body);
  // Validation
  if (!event.body) {
    return callback(null, error.errorResponse("BAD_REQUEST", "Missing body request"));
  }
  const requestBody = JSON.parse(event.body);

  if (!requestBody.formula) {
    return callback(null, error.errorResponse("BAD_REQUEST", "Missing field: formula"));
  }

  math.calculateAndLogTransaction(requestBody.formula)
  .then((result) => {
    console.log("=== Result After calculateAndLogTransaction", result);
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
  .catch((e) => {
    console.log("=== Error After calculateAndLogTransaction", e);
    const message = "====== Internal server Error while trying to add a transaction for:" + requestBody.formula;
    // Return error message
    const response = error.errorResponse("SERVER_ERROR", message);
    return callback(null, response);
  })
};
