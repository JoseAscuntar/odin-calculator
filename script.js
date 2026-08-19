let operands = ["", ""]; // Will literally only take 2 values, but looks nicer 
// in array
let currentOperator = "";

const screen = document.querySelector("#screen");
const numbers = document.querySelectorAll(".number");
numbers.forEach(number => {
    number.addEventListener("click", () => {
        currentIndex = currentOperator === "" ? 0 : 1
        screen.textContent += (operands[currentIndex] === "" ? " " : "") 
        operands[currentIndex] += number.textContent;
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
    if (currentOperator === "div" && operands[1] === "0") {
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
    let result = operate(operands[0], currentOperator, operands[1]);
    screen.textContent = result; 
    operands[0] = result;
    currentOperator = "";
    operands[1] = "";
}

const operators = document.querySelectorAll(".operator");
operators.forEach(operator => {
    operator.addEventListener("click", () => {
        console.log(screen.textContent)
        if (currentOperator !== "") {
            if (Number.isInteger(Number(screen.textContent.at(-1)))){ // is the 
                // last character on screen an integer?
                resolve();
            } else {
                screen.textContent = screen.textContent.slice(0, -1);
            }
        }
        screen.textContent += " " + operator.textContent;
        currentOperator = operator.id;
    });
});

const equal = document.querySelector("#equal");
equal.addEventListener('click', resolve);