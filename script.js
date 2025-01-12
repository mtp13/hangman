import { words } from "./words.js";
const MAX_LENGTH = 4;

const filteredWords = words.filter((word) => word.length <= MAX_LENGTH);
const word = filteredWords[Math.floor(Math.random() * filteredWords.length)];
console.log(word);
let hangman = "HANGMAN".split("");
const MAX_GUESSES = hangman.length;
let numberOfIncorrectGuesses = 0;
let gameOver = false;

function initializeLetters(word) {
  const letters = word.split("");
  const letterGrid = document.querySelector(".letter-grid");
  letterGrid.innerHTML = "";
  letters.map((letter) => {
    const letterElement = document.createElement("div");
    letterElement.classList.add("letter");
    letterElement.classList.add("hidden");
    letterElement.textContent = letter;
    letterGrid.appendChild(letterElement);
  });
}
function initializeKeyboard() {
  const keyboard = document.querySelector(".keyboard");
  keyboard.innerHTML = "";
  for (let i = 65; i <= 90; i++) {
    const keyLetter = String.fromCharCode(i);

    const keyLetterElement = document.createElement("div");
    keyLetterElement.classList.add("key");
    keyLetterElement.textContent = keyLetter;
    keyboard.appendChild(keyLetterElement);
    keyLetterElement.addEventListener("click", () => {
      if (gameOver) {
        return;
      }
      const letterElements = document.querySelectorAll(".letter");
      let found = false;
      letterElements.forEach((letterElement) => {
        if (
          letterElement.textContent.toLowerCase() === keyLetter.toLowerCase()
        ) {
          letterElement.classList.remove("hidden");
          keyLetterElement.classList.add("found");
          found = true;
        }
      });
      if (!found) {
        keyLetterElement.classList.add("not-found");
        // const hangman = document.querySelector(".hangman");
        // hangman.classList.add("show");
        numberOfIncorrectGuesses++;
        updateGuesses(numberOfIncorrectGuesses);
      }
    });
  }
}

function updateGuesses(number) {
  const guesses = document.querySelector(".guesses");
  const remainingGuesses = MAX_GUESSES - number;
  if (number === 1) {
    guesses.textContent = "";
  }
  guesses.textContent += hangman.shift();
  const hiddenLetters = document.querySelectorAll(".hidden");
  if (hiddenLetters.length === 0) {
    gameOver = true;
    guesses.textContent = "You won!";
  }
  if (remainingGuesses === 0) {
    gameOver = true;
    guesses.textContent = "You lost!";
  }
  if (gameOver) {
    const hiddenLetters = document.querySelectorAll(".hidden");
    hiddenLetters.forEach((letter) => {
      letter.classList.remove("hidden");
      letter.classList.add("game-over");
    });
  }
}
initializeLetters(word);
initializeKeyboard();
// updateGuesses(numberOfGuesses);
