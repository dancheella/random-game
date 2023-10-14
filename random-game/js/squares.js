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

    this.cellColumns = this.cellsByColumn();
    this.cellColumnsReversed = this.cellColumns.map(column => [...column].reverse());
    this.cellRows = this.cellsByRow();
    this.cellRowsReversed = this.cellRows.map(row => [...row].reverse());

  }

  getRandomSquare = () => {
    const emptySquare = this.squares.filter(square => square.isEmpty());
    const randomIndexSquare = Math.floor(Math.random() * emptySquare.length);
    return emptySquare[randomIndexSquare];
  }

  cellsByColumn = () => {
    return this.squares.reduce((groupedSquare, square) => {
      groupedSquare[square.x] = groupedSquare[square.x] || [];
      groupedSquare[square.x][square.y] = square;
      return groupedSquare;
    },[])
  }

  cellsByRow = () => {
    return this.squares.reduce((groupedSquare, square) => {
      groupedSquare[square.y] = groupedSquare[square.y] || [];
      groupedSquare[square.y][square.x] = square;
      return groupedSquare;
    },[])
  }
}