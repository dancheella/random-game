import {Square} from "./square.js";

const SQUARE_SIZE = 4;
const SQUARES_AMOUNT = SQUARE_SIZE * SQUARE_SIZE;

export class Squares {
  constructor(squareItem) {
    this.squares = [];
    for (let i = 0; i < SQUARES_AMOUNT; i++) {
      this.squares.push(
        new Square(squareItem, i % SQUARE_SIZE, Math.floor(i / SQUARE_SIZE))
      )
    }
  }

  getRandomSquare() {
    const emptySquare = this.squares.filter(square => square.isEmpty());
    const randomIndexSquare = Math.floor(Math.random() * emptySquare.length);
    return emptySquare[randomIndexSquare];
  }
}