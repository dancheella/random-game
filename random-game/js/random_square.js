export class Random_square {
  constructor(squareItem) {
    this.randomSquareItem = document.createElement('div');
    this.randomSquareItem.classList.add('game__square-displacement');
    this.setValue(Math.random() > 0.5 ? 2 : 4);
    squareItem.append(this.randomSquareItem);
  }

  setCoordinates = (x, y) => {
    this.x = x;
    this.y = y;
    this.randomSquareItem.style.setProperty('--x', x);
    this.randomSquareItem.style.setProperty('--y', y);
  }

  setValue = (randomSquare) => {
    this.value = randomSquare;
    this.randomSquareItem.textContent = this.value.toString();
    const bgColor = 100 - Math.log2(randomSquare) * 8;
    this.randomSquareItem.style.setProperty('--bg-color', `${bgColor}%`);
    this.randomSquareItem.style.setProperty('--color', `${bgColor < 50 ? 90 : 10}%`);
  }

  removeSquare = () => {
    this.randomSquareItem.remove();
  }
}
