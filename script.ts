let btnValue = document.querySelectorAll(
  ".calculator-frame .numbers"
) as NodeListOf<HTMLButtonElement>;
let symbol = document.querySelectorAll(
  ".calculator-frame .btn-symbol"
) as NodeListOf<HTMLButtonElement>;
const displayScreen = document.querySelector(".display") as HTMLInputElement;
let number1: number | null = null;
let number2: number | null = null;
let operator: string | null = null;
let shouldClearDisplay = false;

btnValue.forEach((num: HTMLButtonElement) => {
  num.addEventListener("click", () => {
    let value = num.value;

    if (shouldClearDisplay) {
      displayScreen.value = value;
      shouldClearDisplay = false;
    } else {
      displayScreen.value += value;
    }

    if (operator === null) {
      number1 = parseFloat(displayScreen.value);
    } else {
      number2 = parseFloat(displayScreen.value);
    }
  });
});
symbol.forEach((btn: HTMLButtonElement) => {
  btn.addEventListener("click", () => {
    let value = btn.value;
    if (value === "clear") {
      displayScreen.value = "";
      number1 = null;
      number2 = null;
      operator = null;
    } else if (value === "=") {
      if (number1 !== null && number2 !== null && operator !== null) {
        let result = performOperation(number1, number2, operator);
        displayScreen.value = result.toString();
        number1 = result;
        number2 = null;
        operator = null;
        shouldClearDisplay = true;
      }
    } else if (value === "pos-neg") {
      let currentNumber = parseFloat(displayScreen.value);
      displayScreen.value = (-currentNumber).toString();
      if (operator === null) {
        number1 = -currentNumber;
      } else {
        number2 = -currentNumber;
      }
    } else {
      operator = value;
      shouldClearDisplay = true;
    }
  });
});
function performOperation(
  num1: number,
  num2: number,
  operator: string
): number {
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
