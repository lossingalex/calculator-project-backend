const mathjs = require("mathjs");
const reporting = require("./reporting");

const calculate = formula => {
    return mathjs.evaluate(formula);
}
exports.calculate = calculate;

exports.calculateAndLogTransaction = formula => {
    return new Promise((resolve, reject) => {
        var result = "";
        var calculationError = false;
        // Calculate result
        try {
            result = calculate(formula);
            console.log("=== Result", result);
        }
        catch (e) {
            result = "Invalid formula:" + formula;
            calculationError = true;
            console.log("=== Math Error", result);
        }

        console.log("=== START Transaction Log");
        // Async call to reporting
        return reporting.addTransaction(formula, result, 'CALCUL')
        .then((data) => {
            console.log("=== Result After Transaction Log", data);
            // Return successfull transaction
            if (calculationError){
                reject(result);
            }
            resolve(result);
        })
        .catch((e) => {
            console.log("=== Error After Transaction Log", e);
            result = "Internal server Error while trying to add a transaction for:" + formula;
            reject(result);
        })  
    })
}