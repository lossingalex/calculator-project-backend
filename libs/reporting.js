
const uuidv4 = require('uuid/v4');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const docClient = new AWS.DynamoDB.DocumentClient({ region: process.env.REGION });

// Async call
function addTransaction(formula, result) {
  console.log("=== START addTransaction");
  return new Promise((resolve, reject) => {
    // Add todo in
    const params = {
        TableName: process.env.DYNAMODB_TABLE_REPORTING,
        Item: {
        id: uuidv4(),
        formula,
        result,
        date: new Date().getTime(),
        dateFormatted: new Date().toISOString()
        },
    };
    console.log('AWS docClient PARAMS', params);

    docClient.put(params, (error, data) => {
        console.log("=== Transaction DB return");
        console.log("=== Transaction result", error, data);
        
        // Handle AWS error
        if (error) {
            // TODO Decide what to do in case of failure + sent notification
            console.log("=== Error while trying to write in Transaction in DB", params, error);
            reject(error);
        }
        // Success
        resolve(params.Item);
    });
  })
}
exports.addTransaction = addTransaction;

// FOR Local testing
// DYNAMODB_TABLE_REPORTING=calculator-project-dev-reporting REGION=ap-southeast-1 node libs/reporting.js
// addTransaction("1+1", "2")
// .then((data) => {
//     console.log("=== Result After Transaction", data);
//     // Return successfull transaction
// })
// .catch((e) => {
//     console.log("=== Error After Transaction", e);
// });
