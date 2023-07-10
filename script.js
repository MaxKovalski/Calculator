var btnValue = document.querySelectorAll(".calculator-frame .numbers");
var symbol = document.querySelectorAll(".calculator-frame .btn-symbol");
var displayScreen = document.querySelector(".display");
var number1 = null;
var number2 = null;
var operator = null;
var shouldClearDisplay = false;
btnValue.forEach(function (num) {
    num.addEventListener("click", function () {
        var value = num.value;
        if (shouldClearDisplay) {
            displayScreen.value = value;
            shouldClearDisplay = false;
        }
        else {
            displayScreen.value += value;
        }
        if (operator === null) {
            number1 = parseFloat(displayScreen.value);
        }
        else {
            number2 = parseFloat(displayScreen.value);
        }
    });
});
symbol.forEach(function (btn) {
    btn.addEventListener("click", function () {
        var value = btn.value;
        if (value === "clear") {
            displayScreen.value = "";
            number1 = null;
            number2 = null;
            operator = null;
        }
        else if (value === "=") {
            if (number1 !== null && number2 !== null && operator !== null) {
                var result = performOperation(number1, number2, operator);
                displayScreen.value = result.toString();
                number1 = result;
                number2 = null;
                operator = null;
                shouldClearDisplay = true;
            }
        }
        else if (value === "pos-neg") {
            var currentNumber = parseFloat(displayScreen.value);
            displayScreen.value = (-currentNumber).toString();
            if (operator === null) {
                number1 = -currentNumber;
            }
            else {
                number2 = -currentNumber;
            }
        }
        else if (value === ".") {
            if (!displayScreen.value.includes(".")) {
                displayScreen.value += ".";
            }
        }
        else {
            operator = value;
            shouldClearDisplay = true;
        }
    });
});
function performOperation(num1, num2, operator) {
    switch (operator) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            return num1 / num2;
        case "%":
            return num1 % num2;
        default:
            throw new Error("Invalid operator");
    }
}
