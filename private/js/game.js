class GameMatrix {
    constructor(rows, cols, pOne) {
        this.pOne = pOne
        this.matrix = new Array(rows);

        for (let i = 0; i < rows; i++) {
            this.matrix[i] = new Array(cols);
        }

        this.poupolateTable();
    }

    poupolateTable() {
        this.placeBomb();
        this.countBomb();
    }

    placeBomb() {
        let y = this.matrix.length;
        let x = this.matrix[0].length;

        for (let i = 0; i < y; i++) {
            for (let j = 0; j < x; j++) {
                this.matrix[i][j] = this.randomZeroOne();
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

    randomZeroOne() {
        return Math.random() < this.pOne ? -1 : 0;
    }

    getMatrix() {
        return this.matrix.map(row => [...row]);
    }

    toString() {
        let txt = "";

        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix[i].length; j++) {
                txt += this.matrix[i][j] + " ";
            }
            txt += "\n";
        }

        return txt;
    }
}

module.exports = GameMatrix;