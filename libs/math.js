const mathjs = require("mathjs");

exports.calculate = formula => {
    return mathjs.evaluate(formula);
}