'use strict';
const math = require("../libs/math");
const error = require("../libs/error");

module.exports.main = async event => {
  console.log("==== Event.body", event.body);
  // Validation
  if (!event.body) {
    return error.errorResponse("BAD_REQUEST", "Missing body request");
  }
  const data = JSON.parse(event.body);
  console.log(data);

  if (!data.formula) {
    return error.errorResponse("BAD_REQUEST", "Missing field: formula");
  }

  // Calculate result
  try {
    var result = math.calculate(data.formula);
    console.log("=== Result", result);
  }
  catch (e) {
    return error.errorResponse("BAD_REQUEST", "Invalid formula:" + data.formula);
  }

  return {
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
};
