const screen = document.querySelector("#screen");
const numbers = document.querySelectorAll(".number");
numbers.forEach(number => {
    number.addEventListener("click", () => {
        screen.textContent += number.textContent;
    });
});

const ac = document.querySelector("#AC");
ac.addEventListener('click', () => screen.textContent = "");

function operate(a, operator, b) {
    switch (operator) {
        case "add":
            return a + b;
        case "minus":
            return a - b;
        case "div":
            return a / b;
        case "mult":
            return a * b;
    }
}