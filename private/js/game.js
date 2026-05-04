class GameMatrix {
    constructor(rows, cols, pOne) {
        this.pOne = pOne;
        this.matrix = new Array(rows);

        for (let i = 0; i < rows; i++) {
            this.matrix[i] = new Array(cols);
        }

        this.populateTable();
    }

    populateTable() {
        this.placeBomb();
        this.countBomb();
    }

    placeBomb() {
        const rows = this.matrix.length;
        const cols = this.matrix[0].length;

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                this.matrix[y][x] = this.randomBomb();
            }
        }
    }

    countBomb() {
        const rows = this.matrix.length;
        const cols = this.matrix[0].length;

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                if (this.matrix[y][x] === -1) {
                    continue;
                }

                let count = 0;

                for (let dy = -1; dy <= 1; dy++) {
                    for (let dx = -1; dx <= 1; dx++) {
                        if (dy === 0 && dx === 0) {
                            continue;
                        }

                        const nextY = y + dy;
                        const nextX = x + dx;

                        if (this.isInside(nextY, nextX) && this.matrix[nextY][nextX] === -1) {
                            count++;
                        }
                    }
                }

                this.matrix[y][x] = count;
            }
        }
    }

    isInside(y, x) {
        return y >= 0 && y < this.matrix.length && x >= 0 && x < this.matrix[0].length;
    }

    randomBomb() {
        return Math.random() < this.pOne ? -1 : 0;
    }

    countTotalBombs() {
        let total = 0;

        for (let y = 0; y < this.matrix.length; y++) {
            for (let x = 0; x < this.matrix[y].length; x++) {
                if (this.matrix[y][x] === -1) {
                    total++;
                }
            }
        }

        return total;
    }

    getMatrix() {
        return this.matrix.map(row => [...row]);
    }
}

module.exports = GameMatrix;
