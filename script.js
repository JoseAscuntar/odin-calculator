const screen = document.querySelector("#screen");
const numbers = document.querySelectorAll(".number");
numbers.forEach(number => {
    number.addEventListener("click", () => {
        screen.textContent += number.textContent;
    });
});

const ac = document.querySelector("#AC");
ac.addEventListener('click', () => screen.textContent = "");