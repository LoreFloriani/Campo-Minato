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
        let yi = this.matrix.length;
        let xi = this.matrix[0].length;

        for (let y = 0; y < yi; y++) {
            for (let x = 0; x < xi; x++) {

                if (this.matrix[y][x] != -1) {

                    let sotto = y == 0;
                    let sopra = y == yi - 1;
                    let sx = x == 0;
                    let dx = x == xi - 1;

                    if (sotto && !dx && !sx && !sopra) {
                        let count = 0;

                        count += (this.matrix[y][x + 1] == -1) ? 1 : 0;
                        count += (this.matrix[y][x - 1] == -1) ? 1 : 0;
                        count += (this.matrix[y + 1][x - 1] == -1) ? 1 : 0;
                        count += (this.matrix[y + 1][x] == -1) ? 1 : 0;
                        count += (this.matrix[y + 1][x + 1] == -1) ? 1 : 0;

                        this.matrix[y][x] = count;
                    }

                    else if (!sotto && !dx && !sx && sopra) {
                        let count = 0;

                        count += (this.matrix[y - 1][x - 1] == -1) ? 1 : 0;
                        count += (this.matrix[y - 1][x] == -1) ? 1 : 0;
                        count += (this.matrix[y - 1][x + 1] == -1) ? 1 : 0;
                        count += (this.matrix[y][x + 1] == -1) ? 1 : 0;
                        count += (this.matrix[y][x - 1] == -1) ? 1 : 0;

                        this.matrix[y][x] = count;
                    }

                    else if (!sotto && dx && !sx && !sopra) {
                        let count = 0;

                        count += (this.matrix[y - 1][x - 1] == -1) ? 1 : 0;
                        count += (this.matrix[y - 1][x] == -1) ? 1 : 0;
                        count += (this.matrix[y][x - 1] == -1) ? 1 : 0;
                        count += (this.matrix[y + 1][x - 1] == -1) ? 1 : 0;
                        count += (this.matrix[y + 1][x] == -1) ? 1 : 0;

                        this.matrix[y][x] = count;
                    }

                    else if (!sotto && !dx && sx && !sopra) {
                        let count = 0;

                        count += (this.matrix[y - 1][x] == -1) ? 1 : 0;
                        count += (this.matrix[y - 1][x + 1] == -1) ? 1 : 0;
                        count += (this.matrix[y][x + 1] == -1) ? 1 : 0;
                        count += (this.matrix[y + 1][x] == -1) ? 1 : 0;
                        count += (this.matrix[y + 1][x + 1] == -1) ? 1 : 0;

                        this.matrix[y][x] = count;
                    }

                    else if (sotto && sx) {
                        let count = 0;

                        count += (this.matrix[y][x + 1] == -1) ? 1 : 0;
                        count += (this.matrix[y + 1][x] == -1) ? 1 : 0;
                        count += (this.matrix[y + 1][x + 1] == -1) ? 1 : 0;

                        this.matrix[y][x] = count;
                    }

                    else if (sotto && dx) {
                        let count = 0;

                        count += (this.matrix[y][x - 1] == -1) ? 1 : 0;
                        count += (this.matrix[y + 1][x - 1] == -1) ? 1 : 0;
                        count += (this.matrix[y + 1][x] == -1) ? 1 : 0;

                        this.matrix[y][x] = count;
                    }

                    else if (sopra && sx) {
                        let count = 0;

                        count += (this.matrix[y - 1][x] == -1) ? 1 : 0;
                        count += (this.matrix[y - 1][x + 1] == -1) ? 1 : 0;
                        count += (this.matrix[y][x + 1] == -1) ? 1 : 0;

                        this.matrix[y][x] = count;
                    }

                    else if (sopra && dx) {
                        let count = 0;

                        count += (this.matrix[y - 1][x - 1] == -1) ? 1 : 0;
                        count += (this.matrix[y - 1][x] == -1) ? 1 : 0;
                        count += (this.matrix[y][x - 1] == -1) ? 1 : 0;

                        this.matrix[y][x] = count;
                    }

                    else {
                        let count = 0;

                        count += (this.matrix[y - 1][x - 1] == -1) ? 1 : 0;
                        count += (this.matrix[y - 1][x] == -1) ? 1 : 0;
                        count += (this.matrix[y - 1][x + 1] == -1) ? 1 : 0;
                        count += (this.matrix[y][x + 1] == -1) ? 1 : 0;
                        count += (this.matrix[y][x - 1] == -1) ? 1 : 0;
                        count += (this.matrix[y + 1][x - 1] == -1) ? 1 : 0;
                        count += (this.matrix[y + 1][x] == -1) ? 1 : 0;
                        count += (this.matrix[y + 1][x + 1] == -1) ? 1 : 0;

                        this.matrix[y][x] = count;
                    }
                }
            }
        }
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
