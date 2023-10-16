import {Squares} from "./squares.js";
import {Random_square} from "./random_square.js";
import {score} from "./square.js";

const gameField = document.getElementById('game');
const gameOverSound = new Audio('assets/audio/0961f580f9e00da.mp3');

const square = new Squares(gameField);
square.getRandomSquare().linkRandomSquare(new Random_square(gameField));
square.getRandomSquare().linkRandomSquare(new Random_square(gameField));

const popup = document.getElementById('popup');
// const closeButton = document.getElementById('close');

const openPopup = () => {
  popup.style.display = 'flex';
  gameOverSound.play();
};

const oneTimeInputSetup = () => {
  window.addEventListener('keydown', processInputData, {once: true});
}

const processInputData = async (e) => {
  switch (e.key) {
    case "ArrowUp":
      if (!upButtonAvailable()){
        oneTimeInputSetup();
        return;
      }
      await buttonUp();
      break;
    case "ArrowDown":
      if (!downButtonAvailable()){
        oneTimeInputSetup();
        return;
      }
      await buttonDown();
      break;
    case "ArrowLeft":
      if (!leftButtonAvailable()){
        oneTimeInputSetup();
        return;
      }
      await buttonLeft();
      break;
    case "ArrowRight":
      if (!rightButtonAvailable()){
        oneTimeInputSetup();
        return;
      }
      await buttonRight();
      break;
    default:
      oneTimeInputSetup();
      return;
  }
  const newSquare = new Random_square(gameField);
  square.getRandomSquare().linkRandomSquare(newSquare);

  if (!upButtonAvailable() && !downButtonAvailable() && !leftButtonAvailable() && !rightButtonAvailable()) {
    await newSquare.waitEndAnimation();
    openPopup();
  }

  oneTimeInputSetup();
}

window.addEventListener('keydown', (e) => {
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
    e.preventDefault();
  }
});

oneTimeInputSetup();

const buttonUp = async() => {
  await slideSquares(square.cellColumns);
}

const buttonDown = async() => {
  await slideSquares(square.cellColumnsReversed);
}

const buttonLeft = async () => {
  await slideSquares(square.cellRows);
}


const buttonRight = async () => {
  await slideSquares(square.cellRowsReversed);
}

 const slideSquares = async (groupedSquares) => {
  const promises = [];
  groupedSquares.forEach(group => groupSlideAnimation(group, promises));

  await Promise.all(promises);

  square.squares.forEach(square => {
    square.hasSquareForMerge() && square.mergeSquare();
  });
}

const groupSlideAnimation = (group, promises) => {
  for (let i = 1; i < group.length; i++) {
    if (group[i].isEmpty()) {
      continue;
    }

    const squareWithSquare = group[i];

    let activeSquare;
    let j = i - 1;
    while (j >= 0 && group[j].canAccept(squareWithSquare.linkedRandomSquare)) {
      activeSquare = group[j];
      j--;
    }

    if (!activeSquare) {
      continue;
    }

    promises.push(squareWithSquare.linkedRandomSquare.waitEndTransform());

    if (activeSquare.isEmpty()) {
      activeSquare.linkRandomSquare(squareWithSquare.linkedRandomSquare);
    } else {
      activeSquare.linkSquareForMerge(squareWithSquare.linkedRandomSquare);
    }

    squareWithSquare.unlinkSquare();
  }
}

const upButtonAvailable = () => {
  return buttonAvailable(square.cellColumns);
}

const downButtonAvailable = () => {
  return buttonAvailable(square.cellColumnsReversed);
}

const leftButtonAvailable = () => {
  return buttonAvailable(square.cellRows);
}

const rightButtonAvailable = () => {
  return buttonAvailable(square.cellRowsReversed);
}

const buttonAvailable = (groupedSquares) => {
  return groupedSquares.some(group => buttonAvailableGroup(group));
}

const buttonAvailableGroup = (group) => {
  return group.some((square, index) => {
    if (index === 0) {
      return false;
    }

    if (square.isEmpty()) {
      return false;
    }

    const activeSquare = group[index - 1];
    return activeSquare.canAccept(square.linkedRandomSquare);
  })
}

const winPopup = document.getElementById('winPopup');
const continueButton = document.getElementById('continueButton');
const winAudio = new Audio('assets/audio/1984a9f3474ab6d.mp3');

export const openWinPopup = () => {
  winPopup.style.display = 'flex';

  winAudio.play()

  const hideWinPopup = () => {
    winPopup.style.display = 'none';
  }

  continueButton.addEventListener('click', hideWinPopup);
}

const localData = () => {
  const savedGames = JSON.parse(localStorage.getItem('savedGames')) || [];

  savedGames.push(score);

  if (savedGames.length > 10) {
    savedGames.shift();
  }

  localStorage.setItem('savedGames', JSON.stringify(savedGames));
}

const resetButton = document.getElementById('resetButton');
const endGameButton = document.getElementById('endGameButton');

const resetGame = () => {
  localData();
  window.location.reload();
}

resetButton.addEventListener('click', resetGame);
endGameButton.addEventListener('click', resetGame);