const gameContainer = document.getElementById("game");


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);
    // Decrease counter by 1
    counter--;
    // And swap the last element with it
    let temp = array[counter]; //array[10]-->purple
    // console.log(temp);
    array[counter] = array[index];//--> index for purple NOW equals whatever the random number is
    // console.log(array[counter]);
    array[index] = temp; //and now that new index number for purple NOW equals 'temp'
    // console.log(array[index]);
  }
  return array;
};

let shuffledColors = shuffle(COLORS);
// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    newDiv.style.backgroundColor = 'white';

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // used for keeping the tile revealed if and when matched
    newDiv.setAttribute('id', 'game-card');

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
};

// Game state
let flippedCard = false;
let firstCard;
let secondCard;
let stopFlipping = false; // prevents flipping a third card

// score keeping
let matches = 0;
let nonMatches = 0;

function handleCardClick(event) {
  const clickedCard = event.target;
  let gameScore = Math.round((matches / nonMatches) * 10); // calculates score for scoreboard
  // prevents flipping a third card
  if (stopFlipping) {
    return;
  }

  if (clickedCard === firstCard) {
    return;
  }
  // document.body.style.backgroundColor = `${event.target.classList}`; //changes the background color
  clickedCard.style.backgroundColor = `${clickedCard.classList}`; // colors in the divs
  
  // This will determine first and second card clicks
  // first click
  if (!flippedCard) {
    flippedCard = true;
    firstCard = this;
  }
  // second click
  else {
    flippedCard = false;
    secondCard = this;
    // stopFlipping = true;
   
    // if the cards match
    if (firstCard.style.backgroundColor === secondCard.style.backgroundColor) { // determines if cards match
      firstCard.removeEventListener('click', handleCardClick);
      secondCard.removeEventListener('click', handleCardClick);
      // console.log('No more event listener'); // for testing
      matches++;
    }
    // If colors don't match, timeout function will remove the color.
    else {
      nonMatches++;
      stopFlipping = true
      setTimeout(function () { 
        firstCard.style.backgroundColor = 'white';
        secondCard.style.backgroundColor = 'white';
        stopFlipping = false;
        firstCard = null;
        secondCard = null;
      }, 1000);
    }
    if (gameScore === Infinity || (matches === 1 && nonMatches === 0)) {
      gameScore = 100;
    }
    // if (matches === 0 && nonMatches > 0) {
    //   gameScore = 0;
    // }
    console.log('Nonmatches', nonMatches); // displays the score count
    console.log('Matches', matches); // displays the score count
    console.log(gameScore);
    scoreBoard.innerText = `Score = ${gameScore}`
    // Victory message for when you win the game.
    if (matches * 2 === COLORS.length) {
      endOfGame();
    }
  }
  // console.log({ flippedCard, firstCard, secondCard }); // checks for mouse events
};

function endOfGame() {
  // This code will produce a message box that appears when all the cards have been matched
  // It also makes a button to start a new game
  const gameWon = document.createElement('div'); // victory notification div
  const newGame = document.createElement('div'); // div for new button
  const newGameButton = document.createElement('button'); // creates new button element
  const header = document.createElement('h1');
  const caption = document.createElement('p');
  header.innerText = 'GAME OVER'
  newGame.setAttribute('id', 'new-game');
  newGameButton.innerText = 'New game';
  newGameButton.setAttribute('id', 'new-game-button');
  let gameScore = Math.round((matches / nonMatches) * 10); // calculates points for final score
  gameWon.classList = 'victory';
  gameWon.style.zIndex = 1; // places div above the game board
    if (gameScore === Infinity) {
      gameScore = 100;
    }
  caption.innerText = `Congratulations! :) You scored ${gameScore} points!`;
  newGameButton.addEventListener('click', startNewGame);
  gameWon.append(header);
  gameWon.append(caption);
  newGame.append(newGameButton);
  gameWon.append(newGame);
  document.body.append(gameWon);
};

function startNewGame() {
  console.log('You started a new game'); // for testing
  flippedCard = false;
  firstCard = null;
  secondCard = null;
  stopFlipping = false;
  matches = 0;
  nonMatches = 0;
  
};

// when the DOM loads
createDivsForColors(shuffledColors);


// Scoreboard
const scoreBoard = document.getElementById('scoreboard');
if (!scoreBoard.innerText) {
  scoreBoard.innerText = 'Score = 0'
}
// scoreBoard.innerText = `Matches: = ${matches}`;