import {Squares} from "./squares.js";
import {Random_square} from "./random_square.js";

const gameField = document.getElementById('game');

const square = new Squares(gameField);
square.getRandomSquare().linkRandomSquare(new Random_square(gameField));
square.getRandomSquare().linkRandomSquare(new Random_square(gameField));


const oneTimeInputSetup = () => {
  window.addEventListener('keydown', processInputData, {once: true});
}

const processInputData = (e) => {
  switch (e.key) {
    case "ArrowUp":
      buttonUp();
      break;
    case "ArrowDown":
      buttonDown();
      break;
    case "ArrowLeft":
      buttonLeft();
      break;
    case "ArrowRight":
      buttonRight();
      break;
    default:
      oneTimeInputSetup();
      return;
  }
  oneTimeInputSetup();
}

  oneTimeInputSetup();

const buttonUp = () => {
  slideSquares(square.cellColumns);
}

const buttonDown = () => {
  slideSquares(square.cellColumnsReversed);
}


const buttonLeft = () => {
  slideSquares(square.cellRows);
}


const buttonRight = () => {
  slideSquares(square.cellRowsReversed);
}

const slideSquares = (groupedSquares) => {
  groupedSquares.forEach(group => groupSlideAnimation(group));

  square.squares.forEach(square => {
    square.hasSquareForMerge() && square.mergeSquare();
  })
}

const groupSlideAnimation = (group) => {
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

    if (activeSquare.isEmpty()) {
      activeSquare.linkRandomSquare(squareWithSquare.linkedRandomSquare);
    } else {
      activeSquare.linkSquareForMerge(squareWithSquare.linkedRandomSquare);
    }

    squareWithSquare.unlinkSquare();
  }
}