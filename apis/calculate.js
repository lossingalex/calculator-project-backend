'use strict';
const math = require("../libs/math");
const reporting = require("../libs/reporting");
const error = require("../libs/error");

module.exports.main = (event, context, callback) => {
  console.log("==== Event.body", event.body);
  // Validation
  if (!event.body) {
    return error.errorResponse("BAD_REQUEST", "Missing body request");
  }
  const data = JSON.parse(event.body);

  if (!data.formula) {
    return error.errorResponse("BAD_REQUEST", "Missing field: formula");
  }

  const formula = data.formula;

  // Calculate result
  try {
    var result = math.calculate(formula);
    console.log("=== Result", result);
  }
  catch (e) {
    const message = "Invalid formula:" + formula;
    // Async call to reporting
    reporting.addTransaction(formula, message);
    // Return error message
    return error.errorResponse("BAD_REQUEST", message);
  }

  console.log("=== START Transaction");
  // Async call to reporting
  reporting.addTransaction(formula, result)
  .then((data) => {
    console.log("=== Result After Transaction", data);
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
    console.log("=== Error After Transaction", e);
    const message = "Internal server Error while trying to add a transaction for:" + formula;
    // Return error message
    const response = error.errorResponse("SERVER_ERROR", message);
    return callback(null, response);
  })
};
