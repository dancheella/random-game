import {Squares} from "./squares.js";
import {Random_square} from "./random_square.js";

const gameField = document.getElementById('game');

const square = new Squares(gameField);
square.getRandomSquare().linkRandomSquare(new Random_square(gameField));