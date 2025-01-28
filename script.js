'use strict';
import { words } from './words.js';
const MAX_WORD_LENGTH = 8;
const HANGMAN_STAGES = 'McDearmon';
const guessesDisplay = document.querySelector('.guesses');
const allowedWords = words.filter((word) => word.length <= MAX_WORD_LENGTH);
const newGameButton = document.getElementById('new-game-button');
let hangmanSequence = HANGMAN_STAGES.split('');
const MAX_GUESSES = hangmanSequence.length;
const gameState = {
  word: '',
  gameOver: false,
  numberOfIncorrectGuesses: 0,
};

function setupLetterGrid(word) {
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

newGameButton.addEventListener('click', startNewGame);

function startNewGame() {
  const index = Math.floor(Math.random() * allowedWords.length);
  gameState.word = allowedWords.splice(index, 1).toString();
  console.log(gameState.word);
  hangmanSequence = HANGMAN_STAGES.split('');
  gameState.numberOfIncorrectGuesses = 0;
  gameState.gameOver = false;
  guessesDisplay.textContent = 'Try to spell the word';
  setupLetterGrid(gameState.word);
  setupKeyboard();
}

function setupKeyboard() {
  const keyboard = document.querySelector('.keyboard');
  keyboard.innerHTML = '';
  for (let i = 65; i <= 90; i++) {
    const keyLetter = String.fromCharCode(i);

    const keyLetterElement = document.createElement('div');
    keyLetterElement.classList.add('key');
    keyLetterElement.textContent = keyLetter;
    keyboard.appendChild(keyLetterElement);
    keyLetterElement.addEventListener('click', () => {
      if (gameState.gameOver) {
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
            gameState.gameOver = true;
            guessesDisplay.textContent = 'You won!';
          }
        }
      });
      if (!found) {
        keyLetterElement.classList.add('not-found');
        gameState.numberOfIncorrectGuesses++;
        updateHangmanProgress(gameState.numberOfIncorrectGuesses);
      }
    });
  }
}

function updateHangmanProgress(number) {
  const remainingGuesses = MAX_GUESSES - number;
  if (number === 1) {
    guessesDisplay.textContent = '';
  }
  guessesDisplay.textContent += hangmanSequence.shift() + ' ';

  if (remainingGuesses === 0) {
    gameState.gameOver = true;
    guessesDisplay.textContent += '- You lost!';
  }
  if (gameState.gameOver) {
    const hiddenLetters = document.querySelectorAll('.hidden');
    hiddenLetters.forEach((letter) => {
      letter.classList.remove('hidden');
      letter.classList.add('game-over');
    });
  }
}

startNewGame();
