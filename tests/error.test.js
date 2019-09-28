const error = require("../libs/error");

test("error 500", () => {
    const code = "SERVER_ERROR";
    const message = "Internal server error";

    const result = error.errorResponse(code, message);
    expect(result.statusCode).toEqual(500);

    const body = JSON.parse(result.body);
    expect(body.status).toEqual(500);
    expect(body.code).toEqual(code);
    expect(body.detail).toEqual(message);
});

test("error 400", () => {
    const code = "BAD_REQUEST";
    const message = "Bad Reqeust";

    const result = error.errorResponse(code, message);
    expect(result.statusCode).toEqual(400);

    const body = JSON.parse(result.body);
    expect(body.status).toEqual(400);
    expect(body.code).toEqual(code);
    expect(body.detail).toEqual(message);
});

