const form = document.getElementById("form");
const numberInput = document.getElementById("number");
const errosElement = document.getElementById("erros");
const chancesElement = document.getElementById("chances");
const dica = document.getElementById("dica");
const restartBtn = document.getElementById("restartBtn");

const MAX_CHANCES = 6;
let secretNumber = Math.floor(Math.random() * 100) + 1;
let guessedNumbers = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const guess = Number(numberInput.value);

  if (guess === secretNumber) {
    displayWin();
    disableForm();
  } else if (guessedNumbers.includes(guess)) {
    alert("You already guessed this number!");
  } else {
    guessedNumbers.push(guess);
    updateDisplay();
    updateHint(guess);

    if (guessedNumbers.length >= MAX_CHANCES) {
      displayLose();
      disableForm();
    }
  }

  numberInput.value = "";
  numberInput.focus();
});

function updateDisplay() {
  const wrongGuesses = guessedNumbers.length;
  const remainingChances = MAX_CHANCES - wrongGuesses;

  errosElement.innerText = `Wrong guesses: ${guessedNumbers.join(", ")}`;
  chancesElement.innerText = `Chances left: ${remainingChances}`;
}

function displayWin() {
  errosElement.innerText = `🎉 Congratulations! You got it right! The number was ${secretNumber}`;
  chancesElement.innerText = "";
  dica.innerText = "";
}

function displayLose() {
  errosElement.innerText = `❌ Game Over! The number was ${secretNumber}`;
  chancesElement.innerText = "Defeat!";
}

function disableForm() {
  form.style.opacity = "0.5";
  numberInput.disabled = true;
  restartBtn.style.display = "block";
}

function updateHint(guess) {
  if (secretNumber > guess) {
    dica.innerText = `📈 Hint: The number is GREATER than ${guess}`;
  } else if (secretNumber < guess) {
    dica.innerText = `📉 Hint: The number is LESS than ${guess}`;
  }
}

restartBtn.addEventListener("click", () => {
  location.reload();
});
