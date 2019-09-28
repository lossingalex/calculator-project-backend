
const STATUS_CODE = require("./errorStatusCode").STATUS_CODE

exports.errorResponse = (code, message) => {
    var returnCode = code ? code : STATUS_CODE.SERVER_ERROR;
    var statusCode = STATUS_CODE[code];

    return {
        statusCode,
        body: JSON.stringify(
          {
            status: statusCode,
            code: returnCode,
            detail: message,
          },
          null,
          2
        ),
    };
}