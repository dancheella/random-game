let score = 0;
export { score };
let popupShown = false;
const scoreElement = document.querySelector('.score-number');
const popupText = document.querySelector('.popup__text');

import {openWinPopup} from "./scripts.js";

export class Square {
  constructor(squareItem, x, y) {
    const square = document.createElement('div');
    square.classList.add('game__square');
    squareItem.append(square);
    this.x = x;
    this.y = y;
    this.mergeSound = new Audio('assets/audio/vyibor-nujnogo-deystviya.mp3');
  }

  linkRandomSquare = (square) => {
    square.setCoordinates(this.x, this.y);
    this.linkedRandomSquare = square;
  }

  unlinkSquare = () => {
    this.linkedRandomSquare = null;
  }

  isEmpty = () => {
    return !this.linkedRandomSquare;
  }

  linkSquareForMerge = (square) => {
    square.setCoordinates(this.x, this.y);
    this.squareForMerge = square;
  }

  unlinkSquareForMerge = () => {
    this.squareForMerge = null;
  }

  hasSquareForMerge = () => {
    return !!this.squareForMerge;
  }

  canAccept = (newSquare) => {
    return this.isEmpty() || (!this.hasSquareForMerge() && this.linkedRandomSquare.value === newSquare.value);
  }

  mergeSquare = () => {
    this.linkedRandomSquare.setValue(this.linkedRandomSquare.value + this.squareForMerge.value);
    this.squareForMerge.removeSquare();
    this.unlinkSquareForMerge();

    this.mergeSound.play();

    score += this.linkedRandomSquare.value;
    scoreElement.textContent = score;
    if (this.linkedRandomSquare.value === 32 && !popupShown) {
      openWinPopup();
      popupShown = true;
    } else {
      popupText.textContent = `Вы проиграли! Ваш счет: ${score}.`;
    }
  }
}