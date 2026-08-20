const DECIMAL_FIGURES = 10;
let operands = ["", ""]; // Will literally only take 2 values, but looks nicer 
// in array
let currentOperator = "";

function updateData(event) {
    currentIndex = currentOperator === "" ? 0 : 1
    screen.textContent += (operands[currentIndex] === "" ? " " : "") 
    operands[currentIndex] += event.target.textContent;
    screen.textContent += event.target.textContent;
}

const screen = document.querySelector("#screen");
const numbers = document.querySelectorAll(".number");
numbers.forEach(number => {
    number.addEventListener("click", updateData);
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
    if (currentOperator === "div" && operands[1] === "0") { // All this 
        // chunk is for handling division by 0
        let everything = document.querySelectorAll("*"); 
        let body = document.querySelector("body"); 
        let all = body.querySelectorAll("*");
        let niceTry = document.createElement("h1");
        let previousContent = screen.textContent; 
        let previousOperator = currentOperator;

        all.forEach((element) => element.classList.toggle("hidden"));
        body.style.backgroundColor = "#FFCCCC";
        niceTry.textContent = "Nice try buddy!";
        niceTry.id = "niceTry";
        body.appendChild(niceTry);

        setTimeout(() => {
            body.removeChild(niceTry);
            body.style.backgroundColor = "white";
            screen.textContent = previousContent; // So that it restarts exactly 
            // as it was before the second operator (other than div by 0 was 
            // clicked
            currentOperator = previousOperator;
            all.forEach((element) => element.classList.toggle("hidden"));

        }, 2000);
        return;
    } 

    if (Number.isInteger(Number(screen.textContent.at(-1)))){ // is the 
        // last character on screen an integer?
        let result = operate(operands[0], currentOperator, operands[1]);
        screen.textContent = Number(result.toFixed(DECIMAL_FIGURES)); 
        operands[0] = result;
        currentOperator = "";
        operands[1] = "";
    } else {
        screen.textContent = screen.textContent.slice(0, -2);
        currentOperator = "";
    }
}

const operators = document.querySelectorAll(".operator");
operators.forEach(operator => {
    operator.addEventListener("click", () => {
        if (currentOperator !== "") {
            resolve();
        }
        screen.textContent += " " + operator.textContent;
        currentOperator = operator.id;
    });
});

const equal = document.querySelector("#equal");
equal.addEventListener('click', resolve);

const decimalDot = document.querySelector("#decimal");
decimalDot.addEventListener("click", (event) => {
    if (!Array.from(screen.textContent).includes(".")) {
        updateData(event)
    }
});

const deleteButton = document.querySelector("#DEL");
deleteButton.addEventListener('click', () => {
    if (screen.textContent.at(-1) === " ") { // is the last
        // character on screen an integer?
        currentOperator = "";
        screen.textContent = screen.textContent.slice(0, -3);
    } else if (Number.isInteger(Number(screen.textContent.at(-1)))) {
        currentIndex = currentOperator === "" ? 0 : 1;
        operands[currentIndex] = operands[currentIndex].slice(0, -1);
        screen.textContent = screen.textContent.slice(0, -1);
    } else { // In case it is an operator
        currentOperator = "";
        screen.textContent = screen.textContent.slice(0, -2);
    }

    // I'm not sure if this is the easiest or proper way to do it, but although
    // the if and the else look very alike, that difference on -3 and -2 really 
    // made it hard to mix it. The fact that Number.isInteger takes " " as an 
    // integer didn't help 
});