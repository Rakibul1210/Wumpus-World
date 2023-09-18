class Board {
    constructor(gridSize, numberOfPits, numberOfGold, numberOfWumpus) {
        this.gridSize = gridSize;
        this.grid = new Array(gridSize);
        this.currentRow = 0;
        this.currentCol = 0;

        for (let i = 0; i < gridSize; i++) {
            this.grid[i] = new Array(gridSize).fill('');
        }



        this.placePits(numberOfPits);
        this.placeGold(numberOfGold);
        this.placeWumpus(numberOfWumpus);

        this.placeAgent(this.currentRow, this.currentCol);

        this.addBreeze();
        this.addStench();

    }

    moveLeft() {

        if (this.isValidCoordinate(this.currentRow, this.currentCol - 1)) {


            this.grid[this.currentRow][this.currentCol] = this.grid[this.currentRow][this.currentCol].slice(0, -1);
            this.currentCol -= 1;
            this.grid[this.currentRow][this.currentCol] += 'A';
            return true;
        }
        else {
            return false;
        }
    }

    moveRight() {

        if (this.isValidCoordinate(this.currentRow, this.currentCol + 1)) {


            this.grid[this.currentRow][this.currentCol] = this.grid[this.currentRow][this.currentCol].slice(0, -1);
            this.currentCol += 1;
            this.grid[this.currentRow][this.currentCol] += 'A';
            return true;
        }
        else {
            return false;
        }
    }

    moveUp() {

        if (this.isValidCoordinate(this.currentRow - 1, this.currentCol)) {


            this.grid[this.currentRow][this.currentCol] = this.grid[this.currentRow][this.currentCol].slice(0, -1);
            this.currentRow -= 1;
            this.grid[this.currentRow][this.currentCol] += 'A';
            return true;
        }
        else {
            return false;
        }
    }

    moveDown() {

        if (this.isValidCoordinate(this.currentRow + 1, this.currentCol)) {


            this.grid[this.currentRow][this.currentCol] = this.grid[this.currentRow][this.currentCol].slice(0, -1);
            this.currentRow += 1;
            this.grid[this.currentRow][this.currentCol] += 'A';
            return true;
        }
        else {
            return false;
        }
    }



    addBreeze() {
        console.log('addBreeze');
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                if (this.grid[i][j] == "P") {
                    if (this.isValidCoordinate(i - 1, j)) {
                        if (this.grid[i - 1][j] === "") {
                            this.grid[i - 1][j] = 'B';

                        }
                        else if (this.grid[i - 1][j] === "G") {
                            this.grid[i - 1][j] += 'B';
                        }

                    }

                    if (this.isValidCoordinate(i, j - 1)) {

                        if (this.grid[i][j - 1] === "") {
                            this.grid[i][j - 1] = 'B';

                        }
                        else if (this.grid[i][j - 1] === "G") {
                            this.grid[i][j - 1] += 'B';
                        }
                    }
                    if (this.isValidCoordinate(i, j + 1)) {
                        if (this.grid[i][j + 1] === "") {
                            this.grid[i][j + 1] = 'B';

                        }
                        else if (this.grid[i][j + 1] === "G") {
                            this.grid[i][j + 1] += 'B';
                        }
                    }
                    if (this.isValidCoordinate(i + 1, j)) {
                        if (this.grid[i + 1][j] === "") {
                            this.grid[i + 1][j] = 'B';

                        }
                        else if (this.grid[i + 1][j] === "G") {
                            this.grid[i + 1][j] += 'B';
                        }
                    }


                }

            }

        }

    }


    addStench() {
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                if (this.grid[i][j] == "W") {
                    if (this.isValidCoordinate(i - 1, j)) {
                        if (this.grid[i - 1][j] === "") {
                            this.grid[i - 1][j] = 'S';

                        }
                        else if (this.grid[i - 1][j] === "G" || this.grid[i - 1][j] === "B" || this.grid[i - 1][j] === "GB") {
                            this.grid[i - 1][j] += 'B';
                        }

                    }

                    if (this.isValidCoordinate(i, j - 1)) {

                        if (this.grid[i][j - 1] === "") {
                            this.grid[i][j - 1] = 'S';

                        }
                        else if (this.grid[i][j - 1] === "G" || this.grid[i][j - 1] === "B" || this.grid[i][j - 1] === "GB") {
                            this.grid[i][j - 1] += 'S';
                        }
                    }
                    if (this.isValidCoordinate(i, j + 1)) {
                        if (this.grid[i][j + 1] === "") {
                            this.grid[i][j + 1] = 'S';

                        }
                        else if (this.grid[i][j + 1] === "G" || this.grid[i][j + 1] === "B" || this.grid[i][j + 1] === "GB") {
                            this.grid[i][j + 1] += 'S';
                        }
                    }
                    if (this.isValidCoordinate(i + 1, j)) {
                        if (this.grid[i + 1][j] === "") {
                            this.grid[i + 1][j] = 'S';

                        }
                        else if (this.grid[i + 1][j] === "G" || this.grid[i + 1][j] === "B" || this.grid[i + 1][j] === "GB") {
                            this.grid[i + 1][j] += 'S';
                        }
                    }


                }

            }

        }

    }

    // generateRandomEnvironment(numberOfPits, numberOfGold, hasWumpus) {
    //     this.clearBoard();

    //     this.placePits(numberOfPits);
    //     this.placeGold(numberOfGold);
    //     if (hasWumpus) {
    //         this.placeWumpus();
    //     }
    //     this.placeAgent(0, 0);
    // }

    setCell(x, y, content) {
        if (this.isValidCoordinate(x, y)) {
            this.grid[x][y] = content;
        }
    }

    getCell(x, y) {
        if (this.isValidCoordinate(x, y)) {
            return this.grid[x][y];
        }
        return 'invalid';
    }

    isValidCoordinate(x, y) {
        return x >= 0 && x < this.gridSize && y >= 0 && y < this.gridSize;
    }

    placePits(numberOfPits) {
        for (let i = 0; i < numberOfPits; i++) {
            const x = Math.floor(Math.random() * this.gridSize);
            const y = Math.floor(Math.random() * this.gridSize);
            if ((x == 0 && y == 0) || (x == 0 && y == 1) || (x == 1 && y == 0)) {
                i--;
                continue;
            }
            this.setCell(x, y, 'P');
        }
    }

    placeGold(numberOfGold) {
        for (let i = 0; i < numberOfGold; i++) {
            const x = Math.floor(Math.random() * this.gridSize);
            const y = Math.floor(Math.random() * this.gridSize);
            this.setCell(x, y, 'G');
        }
    }

    placeWumpus(numberOfPits) {
        for (let i = 0; i < numberOfPits; i++) {
            const x = Math.floor(Math.random() * this.gridSize);
            const y = Math.floor(Math.random() * this.gridSize);
            this.setCell(x, y, 'W');
        }
    }

    placeAgent(x, y) {
        this.setCell(x, y, 'A');
    }

    display() {
        for (let x = 0; x < this.gridSize; x++) {
            let row = '';

            for (let y = 0; y < this.gridSize; y++) {
                let cellContent = this.getCell(x, y);
                if (cellContent === '') {
                    cellContent = '-';
                }
                row += cellContent + '\t';
            }

            console.log(row);
        }
    }

}

// Example usage:
// const gridSize = 10; // Specify the grid size
// const numberOfPits = 20; // Specify the number of pits
// const numberOfGold = 3; // Specify the number of gold items
// const hasWumpus = true; // Specify whether the Wumpus is present
// const board = new Board(gridSize, numberOfPits, numberOfGold, hasWumpus);
// board.display(); // Display the current state of the board


module.exports = Board;
