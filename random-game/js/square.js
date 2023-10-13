export class Square {
  constructor(squareItem, x, y) {
    const square = document.createElement('div');
    square.classList.add('game__square');
    squareItem.append(square);
    this.x = x;
    this.y = y;
  }

  linkRandomSquare(square) {
    square.setCoordinates(this.x, this.y)
    this.linkedRandomSquare = square;
  }

  isEmpty() {
    return !this.linkedRandomSquare;
  }
}
