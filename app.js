const word = "apples";
const letters = word.split("");
console.log(letters);
const letterGrid = document.querySelector(".letter-grid");
letterGrid.innerHTML = "";
letters.map((letter) => {
  const letterElement = document.createElement("div");
  letterElement.classList.add("letter");
  letterElement.textContent = letter;
  letterGrid.appendChild(letterElement);
});
