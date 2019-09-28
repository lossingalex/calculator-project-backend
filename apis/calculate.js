'use strict';
const math = require("../libs/math");


module.exports.main = async event => {
  console.log("==== Event.body", event.body);

  // TODO data validation
  const data = JSON.parse(event.body);
  console.log(data);

  // Calculate result
  var result = math.calculate(data.formula);
  console.log("=== Result", result);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        result,
      },
      null,
      2
    ),
  };
};
