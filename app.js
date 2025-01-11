const word = "apple";
const letters = word.split("");
console.log(letters);
const letterGrid = document.querySelector(".letter-grid");
letterGrid.innerHTML = "";
const l = letters.map((letter) => {
  let newLetter = document.createElement("div");
  newLetter.classList.add("letter");
  newLetter.innerText = letter;
  letterGrid.appendChild(newLetter);
});
// for (let i = 1; i <= numberOfCards; i++) {
//   let newCard = document.createElement("div");
//   newCard.id = `${i}`;
//   newCard.classList.add("card");
//   $grid.appendChild(newCard);
// }
