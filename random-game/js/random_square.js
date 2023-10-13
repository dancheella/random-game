export class Random_square {
  constructor(squareItem) {
    this.randomSquareItem = document.createElement('div');
    this.randomSquareItem.classList.add('game__square-displacement');
    this.value = Math.random() > 0.5 ? 2 : 4;
    this.randomSquareItem.textContent = this.value.toString();
    squareItem.append(this.randomSquareItem);
  }

  setCoordinates(x, y) {
    this.x = x;
    this.y = y;
    this.randomSquareItem.style.setProperty('--x', x);
    this.randomSquareItem.style.setProperty('--y', y);
  }
}
