const PIT_DANGER = 2000;
const WUMPUS_DANGER = 500;

class Board {
    constructor(gridSize, numberOfPits, numberOfGold, numberOfWumpus) {
        this.gridSize = gridSize;
        this.grid = new Array(gridSize);
        this.currentRow = 0;
        this.currentCol = 0;
        this.arrow = 1;
        this.moveCount = 0;
        this.goldFound = 0;
        this.totalGold = numberOfGold;

        for (let i = 0; i < gridSize; i++) {
            this.grid[i] = new Array(gridSize).fill("");
        }

        this.visitedRooms = new Array(gridSize)
            .fill(null)
            .map(() => new Array(10).fill(false));
        this.dangerPerRoom = new Array(gridSize)
            .fill(null)
            .map(() => new Array(this.gridSize).fill(0));

        this.adjacentRooms = new Array();
        this.possibelPits = new Array();
        this.possibleWumpus = new Array();

        this.placeGold(numberOfGold);
        this.placePits(numberOfPits);
        this.placeWumpus(numberOfWumpus);

        this.placeAgent(this.currentRow, this.currentCol);

        this.addBreeze();
        this.addStench();
    }

    addBreeze() {
        // console.log("addBreeze");
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                if (this.grid[i][j] == "P") {
                    if (this.isValidCoordinate(i - 1, j)) {
                        if (this.grid[i - 1][j] === "") {
                            this.grid[i - 1][j] = "B";
                        } else if (this.grid[i - 1][j] === "G") {
                            this.grid[i - 1][j] += "B";
                        }
                    }
                    if (this.isValidCoordinate(i, j - 1)) {
                        if (this.grid[i][j - 1] === "") {
                            this.grid[i][j - 1] = "B";
                        } else if (this.grid[i][j - 1] === "G") {
                            this.grid[i][j - 1] += "B";
                        }
                    }
                    if (this.isValidCoordinate(i, j + 1)) {
                        if (this.grid[i][j + 1] === "") {
                            this.grid[i][j + 1] = "B";
                        } else if (this.grid[i][j + 1] === "G") {
                            this.grid[i][j + 1] += "B";
                        }
                    }
                    if (this.isValidCoordinate(i + 1, j)) {
                        if (this.grid[i + 1][j] === "") {
                            this.grid[i + 1][j] = "B";
                        } else if (this.grid[i + 1][j] === "G") {
                            this.grid[i + 1][j] += "B";
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
                            this.grid[i - 1][j] = "S";
                        } else if (
                            this.grid[i - 1][j] === "G" ||
                            this.grid[i - 1][j] === "B" ||
                            this.grid[i - 1][j] === "GB"
                        ) {
                            this.grid[i - 1][j] += "S";
                        }
                    }

                    if (this.isValidCoordinate(i, j - 1)) {
                        if (this.grid[i][j - 1] === "") {
                            this.grid[i][j - 1] = "S";
                        } else if (
                            this.grid[i][j - 1] === "G" ||
                            this.grid[i][j - 1] === "B" ||
                            this.grid[i][j - 1] === "GB"
                        ) {
                            this.grid[i][j - 1] += "S";
                        }
                    }
                    if (this.isValidCoordinate(i, j + 1)) {
                        if (this.grid[i][j + 1] === "") {
                            this.grid[i][j + 1] = "S";
                        } else if (
                            this.grid[i][j + 1] === "G" ||
                            this.grid[i][j + 1] === "B" ||
                            this.grid[i][j + 1] === "GB"
                        ) {
                            this.grid[i][j + 1] += "S";
                        }
                    }
                    if (this.isValidCoordinate(i + 1, j)) {
                        if (this.grid[i + 1][j] === "") {
                            this.grid[i + 1][j] = "S";
                        } else if (
                            this.grid[i + 1][j] === "G" ||
                            this.grid[i + 1][j] === "B" ||
                            this.grid[i + 1][j] === "GB"
                        ) {
                            this.grid[i + 1][j] += "S";
                        }
                    }
                }
            }
        }
    }

    setCell(x, y, content) {
        if (this.isValidCoordinate(x, y)) {
            this.grid[x][y] = content;
        }
    }

    getCell(x, y) {
        if (this.isValidCoordinate(x, y)) {
            return this.grid[x][y];
        }
        return "invalid";
    }

    isValidCoordinate(x, y) {
        return x >= 0 && x < this.gridSize && y >= 0 && y < this.gridSize;
    }

    placePits(numberOfPits) {
        for (let i = 0; i < numberOfPits; i++) {
            const x = Math.floor(Math.random() * this.gridSize);
            const y = Math.floor(Math.random() * this.gridSize);
            if (this.grid[x][y].includes('P') || this.grid[x][y].includes('G') || (x == 0 && y == 0) || (x == 0 && y == 1) || (x == 1 && y == 0)) {
                i--;
                continue;
            }
            this.setCell(x, y, "P");
        }
    }

    placeGold(numberOfGold) {
        for (let i = 0; i < numberOfGold; i++) {
            const x = Math.floor(Math.random() * this.gridSize);
            const y = Math.floor(Math.random() * this.gridSize);
            if (this.grid[x][y].includes('G') || (x == 0 && y == 0)) {
                i--;
                continue;
            }
            this.setCell(x, y, "G");
        }
    }

    placeWumpus(numberOfPits) {
        for (let i = 0; i < numberOfPits; i++) {
            const x = Math.floor(Math.random() * this.gridSize);
            const y = Math.floor(Math.random() * this.gridSize);
            if (this.grid[x][y].includes('W') || this.grid[x][y].includes('P') || (x == 0 && y == 0) || (x == 0 && y == 1) || (x == 1 && y == 0)) {
                i--;
                continue;
            }
            this.setCell(x, y, "W");
        }
    }

    placeAgent(x, y) {
        this.currentRow = x;
        this.currentCol = y;
        this.visitedRooms[x][y] = true;

        if (this.grid[x][y].includes('G')) {
            // console.log("Eite Peyegesiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
            this.goldFound += 1;
        }
        this.grid[x][y] += "A";




        if (this.isValidCoordinate(x - 1, y) && this.visitedRooms[x - 1][y] === false) {

            console.log("pushing ", x - 1, y);
            this.adjacentRooms.push([x - 1, y, 0, 0]);
        }
        if (this.isValidCoordinate(x, y - 1) && this.visitedRooms[x][y - 1] === false) {
            console.log("pushing ", x, y - 1);
            this.adjacentRooms.push([x, y - 1, 0, 0]);
        }
        if (this.isValidCoordinate(x + 1, y) && this.visitedRooms[x + 1][y] === false) {
            console.log("pushing ", x + 1, y);
            this.adjacentRooms.push([x + 1, y, 0, 0]);
        }
        if (this.isValidCoordinate(x, y + 1) && this.visitedRooms[x][y + 1] === false) {
            console.log("pushing ", x, y + 1);
            this.adjacentRooms.push([x, y + 1, 0, 0]);
        }


    }

    display() {
        for (let x = 0; x < this.gridSize; x++) {
            let row = "";

            for (let y = 0; y < this.gridSize; y++) {
                let cellContent = this.getCell(x, y);
                if (cellContent === "") {
                    cellContent = "-";
                }
                row += cellContent + "\t";
            }

            console.log(row);
        }
    }

    displayVisited() {
        for (let x = 0; x < this.gridSize; x++) {
            let row = "";

            for (let y = 0; y < this.gridSize; y++) {
                // let cellContent = this.getCell(x, y);
                let cellContent = this.visitedRooms[x][y];

                row += cellContent + "\t";
            }

            console.log(row);
        }
    }


    shootArrow(x, y) {
        console.log(x, " ", y, "Dishhoooooooooooooooo");
        this.arrow -= 1;
        if (this.grid[x][y].includes('W')) {

            // removing wumpus from the shooted cell
            if (this.grid[x][y] == "W") {
                this.grid[x][y] = '';
            }
            else if (this.grid[x][y] == "WS") {
                this.grid[x][y] = 'S';
            }
            else if (this.grid[x][y] == 'WB') {
                this.grid[x][y] = 'B';
            }
            else if (this.grid[x][y] == 'WBS') {
                this.grid[x][y] = 'BS';
            }

            // removing stench from the adjacent cells
            if (this.isValidCoordinate(x - 1, y)) {
                if (this.grid[x - 1][y] == 'S') {
                    this.grid[x - 1][y] = '';
                }
                else if (this.grid[x - 1][y] == 'BS') {
                    this.grid[x - 1][y] = 'B';
                }
                else if (this.grid[x - 1][y] == 'GS') {
                    this.grid[x - 1][y] = 'G';
                }
                else if (this.grid[x - 1][y] == 'GBS') {
                    this.grid[x - 1][y] = 'GB';
                }
            }
            if (this.isValidCoordinate(x + 1, y)) {
                if (this.grid[x + 1][y] == 'S') {
                    this.grid[x + 1][y] = '';
                }
                else if (this.grid[x + 1][y] == 'BS') {
                    this.grid[x + 1][y] = 'B';
                }
                else if (this.grid[x + 1][y] == 'GS') {
                    this.grid[x + 1][y] = 'G';
                }
                else if (this.grid[x + 1][y] == 'GBS') {
                    this.grid[x + 1][y] = 'GB';
                }
            }
            if (this.isValidCoordinate(x, y - 1)) {
                if (this.grid[x][y - 1] == 'S') {
                    this.grid[x][y - 1] = ''
                }
                else if (this.grid[x][y - 1] == 'BS') {
                    this.grid[x][y - 1] = 'B'
                }
                else if (this.grid[x][y - 1] == 'GS') {
                    this.grid[x][y - 1] = 'G';
                }
                else if (this.grid[x][y - 1] == 'GBS') {
                    this.grid[x][y - 1] = 'GB';
                }
            }
            if (this.isValidCoordinate(x, y + 1)) {
                if (this.grid[x][y + 1] == 'S') {
                    this.grid[x][y + 1] = ''
                }
                else if (this.grid[x][y + 1] == 'BS') {
                    this.grid[x][y + 1] = 'B'
                }
                else if (this.grid[x][y + 1] == 'GS') {
                    this.grid[x][y + 1] = 'G';
                }
                else if (this.grid[x][y + 1] == 'GBS') {
                    this.grid[x][y + 1] = 'GB';
                }


            }


        }

    }

    placeAgentToNewDestination(path) {
        // console.log("#1 we were here", path, this.currentRow, this.currentCol);
        for (const p of path) {
            console.log(p);
            if (p == 'R') {
                this.currentCol += 1;
            }
            else if (p == 'L') {
                this.currentCol -= 1;
            }
            else if (p == 'U') {
                this.currentRow -= 1;
            }
            else if (p == 'D') {
                this.currentRow += 1;
            }
        }

        // console.log("after that: ", this.currentRow, this.currentCol);
        this.placeAgent(this.currentRow, this.currentCol);
    }

    findShortestPath(start, end) {

        const moves = [
            [0, 1, 'R'], // Right
            [0, -1, 'L'], // Left
            [1, 0, 'D'], // Down
            [-1, 0, 'U'], // Up
        ];

        let queue = [[start, '']];
        let visited = new Array(this.gridSize).fill(null).map(() => new Array(this.gridSize).fill(false));


        // console.log("visited", visited);


        while (queue.length > 0) {
            let [s, path] = queue.shift();
            let row = s[0]
            let col = s[1]

            // console.log("row", row, "col", col);
            visited[row][col] = true; // Ensure that visited is correctly initialized

            for (const [dr, dc, direction] of moves) {
                const newRow = row + dr;
                const newCol = col + dc;


                if (newRow === end[0] && newCol === end[1]) {
                    return path + direction;
                }

                if (this.isValidCoordinate(newRow, newCol) && !visited[newRow][newCol] && this.visitedRooms[newRow][newCol]) {
                    queue.push([[newRow, newCol], path + direction]);
                    visited[newRow][newCol] = true;
                }
            }
        }

        return ''; // If the destination is not reachable
    }


    findSafeAndShortestMove() {



        for (let i = 0; i < this.adjacentRooms.length && this.adjacentRooms[0][2] == this.adjacentRooms[i][2]; i++) {
            let start = [this.currentRow, this.currentCol]
            let end = [this.adjacentRooms[i][0], this.adjacentRooms[i][1]]
            let path = this.findShortestPath(start, end);
            console.log("start: ", start, " end:", end, " path: ", path);

            this.adjacentRooms[i][3] = path.length;
        }


    }


    homeComing() {
        let start = [this.currentRow, this.currentCol]
        let end = [0, 0]

        let path = this.findShortestPath(start, end);
        console.log("path to home: ", path);
        return path;

    }


    findBestMove() {

        this.moveCount += 1;
        console.log("--------MOVE-> " + this.moveCount);
        console.log("--------agent-> ", this.currentRow, this.currentCol);

        // console.log("adjacency room from find best move : ", this.adjacentRooms);

        let bestPath;
        // console.log(this.goldFound, this.totalGold);
        if (this.goldFound == this.totalGold) {
            console.log("Ammu basay jabo");
            bestPath = this.homeComing();
            return bestPath;
        }

        for (let i = 0; i < this.adjacentRooms.length; i++) {
            this.adjacentRooms[i][2] = 0;
            this.adjacentRooms[i][3] = 0;
        }



        // Filter out duplicates and update adjacencyRooms
        let seenLists = new Set();
        this.adjacentRooms = this.adjacentRooms.filter(room => {
            let stringifiedRoom = JSON.stringify(room);
            if (!seenLists.has(stringifiedRoom)) {
                seenLists.add(stringifiedRoom);
                return true;
            }
            return false;
        });


        // console.log("uniques adjacentRooms", this.adjacentRooms);

        for (let i = 0; i < this.adjacentRooms.length; i++) {
            let safe = 0;
            let breeze = 0;
            let stench = 0;
            let bs = 0;
            let x = this.adjacentRooms[i][0];
            let y = this.adjacentRooms[i][1];
            // console.log("calculating danger for x=", x, "y=", y)
            if (this.isValidCoordinate(x - 1, y) && this.visitedRooms[x - 1][y]) { //left
                if (this.grid[x - 1][y].includes("BS")) {
                    bs += 1;
                } else if (this.grid[x - 1][y].includes("B")) {
                    breeze += 1;
                } else if (this.grid[x - 1][y].includes("S")) {
                    stench += 1;
                }
                else {
                    safe += 1;
                }
            }

            if (this.isValidCoordinate(x, y - 1) && this.visitedRooms[x][y - 1]) { //up
                if (this.grid[x][y - 1].includes("BS")) {
                    bs += 1;
                } else if (this.grid[x][y - 1].includes("B")) {
                    breeze += 1;
                } else if (this.grid[x][y - 1].includes("S")) {
                    stench += 1;
                }
                else {
                    safe += 1;
                }

            }
            if (this.isValidCoordinate(x + 1, y) && this.visitedRooms[x + 1][y]) { //right
                if (this.grid[x + 1][y].includes("BS")) {
                    bs += 1;
                } else if (this.grid[x + 1][y].includes("B")) {
                    breeze += 1;
                } else if (this.grid[x + 1][y].includes("S")) {
                    stench += 1;
                }
                else {
                    safe += 1;
                }
            }
            if (this.isValidCoordinate(x, y + 1) && this.visitedRooms[x][y + 1]) { //down
                if (this.grid[x][y + 1].includes("BS")) {
                    bs += 1;
                } else if (this.grid[x][y + 1].includes("B")) {
                    breeze += 1;
                } else if (this.grid[x][y + 1].includes("S")) {
                    stench += 1;
                }
                else {
                    safe += 1;
                }
            }


            let danger = 0;
            if (safe) {
                danger = 0;
            }
            else if (breeze && stench) {
                danger = 0;
            }
            else if (breeze) {
                danger = PIT_DANGER * (breeze + bs);
            }
            else if (stench) {
                if (this.arrow)
                    danger = WUMPUS_DANGER * (stench + bs);
                else
                    danger = PIT_DANGER * (stench + bs);
            }
            else if (bs) {
                danger += PIT_DANGER * bs;
            }

            // console.log("adjacency:", this.adjacentRooms[x][y])
            this.adjacentRooms[i][2] = danger;
            // console.log("danger:", danger);
        }


        let start = [this.currentRow, this.currentCol]

        for (let i = 0; i < this.adjacentRooms.length; i++) {
            let end = [this.adjacentRooms[i][0], this.adjacentRooms[i][1]];
            let path = this.findShortestPath(start, end);
            // console.log("start: ", start, " end:", end, " path: ", path);

            this.adjacentRooms[i][3] = path.length;
        }

        this.adjacentRooms.sort((a, b) => {
            if (a[2] !== b[2]) {
                return a[2] - b[2];
            } else {
                return a[3] - b[3];
            }
        });
        console.log("------->sorted by path length adjacentRooms", this.adjacentRooms);





        let end;
        // if (this.adjacentRooms[0][2] == 0 || this.arrow == 0 ) {
        //     end = [this.adjacentRooms[0][0], this.adjacentRooms[0][1]];
        // } else {
        // time to kill some wumpups..........

        var useArrow = false;
        if (this.adjacentRooms[0][2] != 0 && this.adjacentRooms[0][2] < 2000 && this.arrow) {
            console.log("Time to kill some wumpups........");

            useArrow = true;
            for (let i = 0; i < this.adjacentRooms.length && this.adjacentRooms[i][2] < 2000; i++) {
                // find visitable neighbors
                let x = this.adjacentRooms[i][0];
                let y = this.adjacentRooms[i][1];
                let stenchCount = this.adjacentRooms[i][2] / WUMPUS_DANGER;
                let visitable = 0;

                console.log("Possible wumpus at: " + x + ", y: " + y);

                if (this.isValidCoordinate(x - 1, y) && !this.visitedRooms[x - 1][y]) {
                    visitable += 1;
                }
                if (this.isValidCoordinate(x + 1, y) && !this.visitedRooms[x + 1][y]) {
                    visitable += 1;
                }
                if (this.isValidCoordinate(x, y - 1) && !this.visitedRooms[x][y - 1]) {
                    visitable += 1;
                }
                if (this.isValidCoordinate(x, y + 1) && !this.visitedRooms[x][y + 1]) {
                    visitable += 1;
                }
                console.assert(' strench counter: ', stenchCount, " visitable: ", stenchCount);

                if (stenchCount == 3 && visitable == 1) {
                    this.adjacentRooms[i][2] = 100;
                }
                else if (stenchCount == 2 && visitable == 2) {
                    this.adjacentRooms[i][2] = 150;
                }
                else if (stenchCount == 2 && visitable == 1) {
                    this.adjacentRooms[i][2] = 120;
                }
                else if (stenchCount == 1 && visitable == 3) {
                    this.adjacentRooms[i][2] = 250;
                }
                else if (stenchCount == 1 && visitable == 2) {
                    this.adjacentRooms[i][2] = 200;
                }
                else if (stenchCount == 1 && visitable == 1) {
                    this.adjacentRooms[i][2] = 180;
                }


                console.log("New danger for", x, y, " = ", this.adjacentRooms[i][2]);
            }

            this.adjacentRooms.sort((a, b) => {
                if (a[2] !== b[2]) {
                    return a[2] - b[2];
                } else {
                    return a[3] - b[3];
                }
            });
            console.log("# sorted by new danger adjacentRooms ", this.adjacentRooms);
        }


        end = [this.adjacentRooms[0][0], this.adjacentRooms[0][1]];




        bestPath = this.findShortestPath(start, end);
        console.log("bestPath: ", bestPath);

        if (useArrow) {
            this.shootArrow(this.adjacentRooms[0][0], this.adjacentRooms[0][1]);
            bestPath = bestPath.slice(0, -1) + "A" + bestPath.slice(-1);
            console.log("bestPath with arrow: ", bestPath);
        }




        // console.log("before shifting: ", this.adjacentRooms);
        this.adjacentRooms.shift();
        // console.log(" after shifting: ", this.adjacentRooms);


        // remove agent from the last position
        this.grid[this.currentRow][this.currentCol] = this.grid[this.currentRow][this.currentCol].slice(0, -1);
        this.placeAgentToNewDestination(bestPath);
        console.log("Agent final position: ", this.currentRow, this.currentCol);

        console.log("-----------------------------------------------------------------");

        return bestPath;


    }
}

module.exports = Board;