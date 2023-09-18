// import Board from './models/board.js';
const Board = require('./models/board');

const gridSize = 10; // Specify the grid size
const numberOfPits = 20; // Specify the number of pits
const numberOfGold = 3; // Specify the number of gold items
const numberOfWumpus = 2; // Specify whether the Wumpus is present
const board = new Board(gridSize, numberOfPits, numberOfGold, numberOfWumpus);
board.display();


console.log("Moving Right");
board.moveRight();
board.display();

console.log("Moving Down");
board.moveDown();
board.display();

console.log("Moving Left");
board.moveLeft();
board.display();

console.log("Moving Up");
board.moveUp();
board.display();











// const express = require('express');
// const app = express();
// const port = 3000;

// app.get('/', (req, res) => {
//     res.send('Hello, Wumpus World!');
// });

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
