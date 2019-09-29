const moment = require('moment');

function startEndTimestamp(date, range) {
    console.log("DATE", date);
    const start = moment(date).startOf(range);
    const end = moment(date).endOf(range);
    
    console.log("startEndTimestamp", range, start, end);
    return {
        start: start.valueOf(),
        end: end.valueOf()
    }
}
exports.startEndTimestamp = startEndTimestamp;

// console.log(startEndTimestamp("2019-09-28", 'day'))
// console.log(startEndTimestamp("2019-09-28", 'week'))
// console.log(startEndTimestamp("2019-09-28", 'month'))
