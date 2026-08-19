let operands = ["", ""]; // Will literally only take 2 values, but looks nicer 
// in array
let currentOperator = "";

const screen = document.querySelector("#screen");
const numbers = document.querySelectorAll(".number");
numbers.forEach(number => {
    number.addEventListener("click", () => {
        operands[currentOperator === "" ? 0 : 1] += number.textContent;
        screen.textContent += number.textContent;
    });
});

const ac = document.querySelector("#AC");
ac.addEventListener('click', () => {
    screen.textContent = "";
    operands = ["", ""];
    currentOperator = "";
});

function operate(a, operator, b) {
    switch (operator) {
        case "add":
            return Number(a) + Number(b);
        case "minus":
            return Number(a) - Number(b);
        case "div":
            return Number(a) / Number(b);
        case "mult":
            return Number(a) * Number(b);
    }
}

function resolve() {
    let result = operate(operands[0], currentOperator, operands[1]);
    screen.textContent = result; 
    operands[0] = result;
    currentOperator = "";
    operands[1] = "";
}

const operators = document.querySelectorAll(".operator");
operators.forEach(operator => {
    operator.addEventListener("click", () => {
        if (currentOperator !== "") {
            resolve();   
        }
        screen.textContent += operator.textContent;
        currentOperator = operator.id;
    });
});

const equal = document.querySelector("#equal");
equal.addEventListener('click', resolve);