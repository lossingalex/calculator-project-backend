
const uuidv4 = require('uuid/v4');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const dateUtil = require('./date');

const docClient = new AWS.DynamoDB.DocumentClient({ region: process.env.REGION });

// Async call
function addTransaction(formula, result, type) {
  console.log("=== START addTransaction");
  return new Promise((resolve, reject) => {
    // Add todo in
    const params = {
        TableName: process.env.DYNAMODB_TABLE_REPORTING,
        Item: {
        id: uuidv4(),
        type,
        formula,
        result,
        timestamp: new Date().getTime(),
        dateFormatted: new Date().toISOString()
        },
    };
    console.log('AWS docClient PARAMS', params);

    docClient.put(params, (error, data) => {
        console.log("=== Add Transaction in Reporting DB result", error, data);
        
        // Handle AWS error
        if (error) {
            // TODO Decide what to do in case of failure + sent notification
            console.log("=== Error while trying to add Transaction in Reporting in DB", params, error);
            reject(error);
        }
        // Success
        resolve(params.Item);
    });
  })
}
exports.addTransaction = addTransaction;


function getAllTransactionByDate(type, startTime, endTime) {
    console.log("=== START getAllTransactionByDate");
    return new Promise((resolve, reject) => {
        const params = {
            TableName: process.env.DYNAMODB_TABLE_REPORTING,
            IndexName: process.env.DYNAMODB_TABLE_REPORTING_SEC_INDEX,
            KeyConditionExpression: "#type = :type AND #timestamp BETWEEN :timestampStart AND :timestampEnd",
            ExpressionAttributeNames: { 
                "#type": "type",
                "#timestamp": "timestamp"
            },
            ExpressionAttributeValues: {
                ":type": type,
                ":timestampStart": startTime,
                ":timestampEnd": endTime
            }
            // ,
            // ProjectionExpression: "Artist, SongTitle, Price"
        };
        console.log('AWS docClient PARAMS', params);
  
        // TODO paginagation
        docClient.query(params, (error, data) => {
            console.log("=== getAllTransactionByDate result", error, data);
            
            // Handle AWS error
            if (error) {
                // TODO Decide what to do in case of failure + sent notification
                console.log("=== Error while trying to getAllTransactionByDate in Reporting in DB", params, error);
                reject(error);
            }
            // Success
            resolve(data.Items);
        });
    })
}
exports.getAllTransactionByDate = getAllTransactionByDate;

/**
 * 
 * @param {*} date "2019-09-28"
 */
function getRangeTransactions(date, range) {
    // const start = new Date().getTime() - (1000*60*60*24);
    // const end = new Date().getTime();
    const startEndTimestamp = dateUtil.startEndTimestamp(date, range);

    return getAllTransactionByDate("CALCUL", startEndTimestamp.start, startEndTimestamp.end)
    .then((data) => {
        console.log("=== Result After getAllTransactionByDate", data);
    })
    .catch((e) => {
        console.log("=== Error After getAllTransactionByDate", e);
    });
}
exports.getRangeTransactions = getRangeTransactions;

function getFullDayTransactions(date) {
    return getRangeTransactions(date, 'day');
}
exports.getFullDayTransactions = getFullDayTransactions;

function getFullWeekTransactions(date) {
    return getRangeTransactions(date, 'week');
}

exports.getFullWeekTransactions = getFullWeekTransactions;

function getFullMonthTransactions(date) {
    return getRangeTransactions(date, 'month');
}
exports.getFullMonthTransactions = getFullMonthTransactions;


// FOR Local testing
// DYNAMODB_TABLE_REPORTING=calculator-project-dev-reporting DYNAMODB_TABLE_REPORTING_SEC_INDEX=reporting-by-date REGION=ap-southeast-1 node libs/reporting.js

// addTransaction("1+1", "2", "CALCUL")
// .then((data) => {
//     console.log("=== Result After Transaction", data);
// })
// .catch((e) => {
//     console.log("=== Error After Transaction", e);
// });

// getAllTransactionByDate("CALCUL", new Date().getTime() - (1000*60*60*24), new Date().getTime())
// .then((data) => {
//     console.log("=== Result After getAllTransactionByDate", data);
// })
// .catch((e) => {
//     console.log("=== Error After getAllTransactionByDate", e);
// });

// getFullDayTransactions("2019-09-29")
// .then((data) => {
//     console.log("=== Result After getAllTransactionByDate", data);
// })
// .catch((e) => {
//     console.log("=== Error After getAllTransactionByDate", e);
// });