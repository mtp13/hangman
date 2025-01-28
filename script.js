'use strict';
import { words } from './words.js';
const MAX_WORD_LENGTH = 8;
const HANGMAN = 'McDearmon';
const guesses = document.querySelector('.guesses');
const filteredWords = words.filter((word) => word.length <= MAX_WORD_LENGTH);
const newGameButton = document.getElementById('new-game-button');
let hangman = HANGMAN.split('');
const MAX_GUESSES = hangman.length;
const game = {
  word: '',
  gameOver: false,
  numberOfIncorrectGuesses: 0,
};

function initializeLetters(word) {
  const letters = word.split('');
  const letterGrid = document.querySelector('.letter-grid');
  letterGrid.innerHTML = '';
  letters.map((letter) => {
    const letterElement = document.createElement('div');
    letterElement.classList.add('letter');
    letterElement.classList.add('hidden');
    letterElement.textContent = letter;
    letterGrid.appendChild(letterElement);
  });
}

newGameButton.addEventListener('click', newGame);

function newGame() {
  const index = Math.floor(Math.random() * filteredWords.length);
  game.word = filteredWords.splice(index, 1).toString();
  console.log(game.word);
  hangman = HANGMAN.split('');
  game.numberOfIncorrectGuesses = 0;
  game.gameOver = false;
  guesses.textContent = 'Try to spell the word';
  initializeLetters(game.word);
  initializeKeyboard();
}

function initializeKeyboard() {
  const keyboard = document.querySelector('.keyboard');
  keyboard.innerHTML = '';
  for (let i = 65; i <= 90; i++) {
    const keyLetter = String.fromCharCode(i);

    const keyLetterElement = document.createElement('div');
    keyLetterElement.classList.add('key');
    keyLetterElement.textContent = keyLetter;
    keyboard.appendChild(keyLetterElement);
    keyLetterElement.addEventListener('click', () => {
      if (game.gameOver) {
        return;
      }
      const letterElements = document.querySelectorAll('.letter');
      let found = false;
      letterElements.forEach((letterElement) => {
        if (
          letterElement.textContent.toLowerCase() === keyLetter.toLowerCase()
        ) {
          letterElement.classList.remove('hidden');
          keyLetterElement.classList.add('found');
          found = true;
          const hiddenLetters = document.querySelectorAll('.hidden');
          if (hiddenLetters.length === 0) {
            game.gameOver = true;
            guesses.textContent = 'You won!';
          }
        }
      });
      if (!found) {
        keyLetterElement.classList.add('not-found');
        game.numberOfIncorrectGuesses++;
        updateGuesses(game.numberOfIncorrectGuesses);
      }
    });
  }
}

function updateGuesses(number) {
  const remainingGuesses = MAX_GUESSES - number;
  if (number === 1) {
    guesses.textContent = '';
  }
  guesses.textContent += hangman.shift() + ' ';

  if (remainingGuesses === 0) {
    game.gameOver = true;
    guesses.textContent += '- You lost!';
  }
  if (game.gameOver) {
    const hiddenLetters = document.querySelectorAll('.hidden');
    hiddenLetters.forEach((letter) => {
      letter.classList.remove('hidden');
      letter.classList.add('game-over');
    });
  }
}

newGame();
