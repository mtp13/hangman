import { words } from "./words.js";
const MAX_LENGTH = 3;
const filteredWords = words.filter((word) => word.length <= MAX_LENGTH);
const word = filteredWords[Math.floor(Math.random() * filteredWords.length)];
const letters = word.split("");
const letterGrid = document.querySelector(".letter-grid");
letterGrid.innerHTML = "";
letters.map((letter) => {
  const letterElement = document.createElement("div");
  letterElement.classList.add("letter");
  letterElement.textContent = letter;
  letterGrid.appendChild(letterElement);
});
