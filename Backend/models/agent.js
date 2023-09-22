class Agent {
    constructor(row, col) {
        this.current_position = {
            row: row,
            col: col
        };
        this.visitedRooms = [];
        this.visitedRooms.push(this.current_position);
        this.adjacentRooms = [];

    }


    getCurrentPosition() {
        return [this.current_position.row, this.current_position.col];
    }

    addAdjacentRoom(row, col) {
        const isNewRoom = !this.adjacentRooms.some(room => room.row === row && room.col === col);

        if (isNewRoom) {
            this.adjacentRooms.push({ row: row, col: col });
        }
    }

}