export class Square {
  constructor(squareItem, x, y) {
    const square = document.createElement('div');
    square.classList.add('game__square');
    squareItem.append(square);
    this.x = x;
    this.y = y;
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
    this.unlinkSquareForMerge()
  }
}
