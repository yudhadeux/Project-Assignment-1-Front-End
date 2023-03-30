const subDisplay = document.querySelector(".display .sub-result");
const display = document.querySelector(".display .result");
const inputs = document.querySelectorAll(".input");

let firstNumber = "";
let operator = "";
let secondNumber = "";
let counted = false;

const updateDisplay = (value) => {
  if (counted === true) {
    display.innerText = value;
    counted = false;
  } else {
    if (display.innerText === "0") {
      display.innerText = value;
    } else {
      display.innerText += value;
    }

    if (operator === "") {
      firstNumber = display.innerText;
    } else {
      secondNumber = display.innerText;
    }
  }
};

const updateSubDisplay = (value) => {
  subDisplay.innerText = value;
};

const inputDigit = (input) => {
  updateDisplay(input);
};

const inputOperator = (value) => {
  if (display.innerText === "0") {
    return;
  }
  updateSubDisplay(display.innerText + value);
  display.innerText = "0";

  if (value === "×") {
    operator = "*";
  } else if (value === "÷") {
    operator = "/";
  } else if (value === "+") {
    operator = "+";
  } else {
    operator = "-";
  }
};

const inverseNumber = () => {
  if (display.innerText === "0") {
    return;
  }
  display.innerText = display.innerText * -1;

  if (operator === "") {
    firstNumber = display.innerText;
  } else {
    secondNumber = display.innerText;
  }
};

const commaOperator = () => {
  if (display.innerText.includes(".")) {
    return;
  }

  if (display.innerText === "0") {
    updateDisplay("0.");
  } else {
    updateDisplay(".");
  }
};

const resetDisplay = () => {
  display.innerText = "0";

  if (subDisplay.innerText === "0") {
    firstNumber = "0";
  } else {
    secondNumber = "0";
  }
};

const resetSubDisplay = () => {
  subDisplay.innerText = "0";
  operator = "";
  firstNumber = "0";
  secondNumber = "0";
  resetDisplay();
};

const countResult = () => {
  if (subDisplay.innerText === "") {
    return;
  }

  let result = eval(firstNumber + operator + secondNumber);
  display.innerText = result;

  counted = true;

  operator = "";
  firstNumber = "0";
  secondNumber = "0";
  subDisplay.innerText = "0";
};

const percentageOperator = () => {
  display.innerText = display.innerText / 100;
  if (operator === "") {
    firstNumber = display.innerText;
  } else {
    secondNumber = display.innerText;
  }
};

inputs.forEach((input) => {
  input.addEventListener("click", (e) => {
    let target = e.target;

    if (target.classList.contains("negative")) {
      inverseNumber();
    } else if (target.classList.contains("substract")) {
      inputOperator("-");
    } else if (target.classList.contains("add")) {
      inputOperator("+");
    } else if (target.classList.contains("multiply")) {
      inputOperator("×");
    } else if (target.classList.contains("divide")) {
      inputOperator("÷");
    } else if (target.classList.contains("equal")) {
      countResult();
    } else if (target.classList.contains("clear")) {
      resetDisplay();
    } else if (target.classList.contains("all-clear")) {
      resetSubDisplay();
    } else if (target.classList.contains("comma")) {
      commaOperator();
    } else if (target.classList.contains("percent")) {
      percentageOperator();
    } else {
      inputDigit(target.textContent);
    }
  });
});

window.addEventListener("keydown", (e) => {
  if (e.key === "-") {
    inputOperator("-");
  } else if (e.key === "+") {
    inputOperator("+");
  } else if (e.key === "*") {
    inputOperator("×");
  } else if (e.key === "/") {
    inputOperator("÷");
  } else if (e.key === "=" || e.key === "Enter") {
    countResult();
  } else if (e.key === "Backspace") {
    resetDisplay();
  } else if (e.key === "Escape") {
    resetSubDisplay();
  } else if (e.key === ".") {
    commaOperator();
  } else if (e.key === "%") {
    percentageOperator();
  } else if (e.key >= "0" && e.key <= "9") {
    inputDigit(e.key);
  }
});

const toggleButton = document.querySelector(".toggle-theme");
const content = document.body;

toggleButton.addEventListener("click", function () {
  if (content.classList.contains("dark-mode")) {
    content.classList.remove("dark-mode");
    toggleButton.innerHTML = "Light Mode";
  } else {
    content.classList.add("dark-mode");
    toggleButton.innerHTML = "Dark Mode";
  }
});
