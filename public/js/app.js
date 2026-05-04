const numberColors = {
    1: "#2563eb",
    2: "#15803d",
    3: "#dc2626",
    4: "#7c3aed",
    5: "#b45309",
    6: "#0891b2",
    7: "#111827",
    8: "#6b7280"
};

const grassClasses = ["grass-1", "grass-2", "grass-3", "grass-4"];
const flagImage = "img/flag.png";
const bombImage = "img/bomb.png";

let gameMatrix = [];
let revealed = [];
let flagged = [];
let flagsLeft = 0;
let gameLost = false;

document.getElementById("easy").addEventListener("click", () => {
    loadGame("easy");
});

document.getElementById("midium").addEventListener("click", () => {
    loadGame("medium");
});

document.getElementById("dificult").addEventListener("click", () => {
    loadGame("difficult");
});

async function loadGame(difficulty) {
    const response = await fetch(`/api/game/${difficulty}`);
    const data = await response.json();

    gameMatrix = data.matrix;
    flagsLeft = data.bombs;
    gameLost = false;
    revealed = createStateMatrix(gameMatrix, false);
    flagged = createStateMatrix(gameMatrix, false);

    updateFlagCounter();
    hideGameOver();
    drawMatrix();
}

function createStateMatrix(matrix, value) {
    return matrix.map(row => row.map(() => value));
}

function drawMatrix() {
    const container = document.getElementById("tabella");
    container.innerHTML = "";

    for (let y = 0; y < gameMatrix.length; y++) {
        const row = document.createElement("div");
        row.id = "row_" + y;

        for (let x = 0; x < gameMatrix[y].length; x++) {
            const cell = document.createElement("div");
            cell.id = "cell_" + y + "_" + x;
            cell.dataset.y = y;
            cell.dataset.x = x;
            cell.classList.add("cell");
            cell.classList.add(grassClasses[(y + x) % grassClasses.length]);

            cell.addEventListener("click", () => {
                revealCell(y, x);
            });

            cell.addEventListener("contextmenu", event => {
                event.preventDefault();
                toggleFlag(y, x);
            });

            drawCellContent(cell, y, x);
            row.appendChild(cell);
        }

        container.appendChild(row);
    }
}

function drawCellContent(cell, y, x) {
    cell.innerHTML = "";
    cell.style.color = "";

    if (flagged[y][x] && !revealed[y][x]) {
        const img = document.createElement("img");
        img.src = flagImage;
        img.alt = "Flag";
        cell.appendChild(img);
        cell.classList.add("covered");
        return;
    }

    if (!revealed[y][x]) {
        cell.classList.add("covered");
        return;
    }

    cell.classList.remove("covered", "grass-1", "grass-2", "grass-3", "grass-4");
    cell.classList.add("revealed");

    const value = gameMatrix[y][x];

    if (value === -1) {
        const img = document.createElement("img");
        img.src = bombImage;
        img.alt = "Bomba";
        cell.appendChild(img);
    } else if (value > 0) {
        cell.textContent = value;
        cell.style.color = numberColors[value];
    }
}

function revealCell(y, x) {
    if (gameLost || revealed[y][x] || flagged[y][x]) {
        return;
    }

    if (gameMatrix[y][x] === -1) {
        loseGame();
        return;
    }

    revealEmptyArea(y, x);
    refreshBoard();
}

function revealEmptyArea(startY, startX) {
    const queue = [[startY, startX]];

    while (queue.length > 0) {
        const current = queue.shift();
        const y = current[0];
        const x = current[1];

        if (!isInside(y, x) || revealed[y][x] || flagged[y][x]) {
            continue;
        }

        revealed[y][x] = true;

        if (gameMatrix[y][x] !== 0) {
            continue;
        }

        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                if (dy !== 0 || dx !== 0) {
                    queue.push([y + dy, x + dx]);
                }
            }
        }
    }
}

function toggleFlag(y, x) {
    if (gameLost || revealed[y][x]) {
        return;
    }

    if (flagged[y][x]) {
        flagged[y][x] = false;
        flagsLeft++;
    } else if (flagsLeft > 0) {
        flagged[y][x] = true;
        flagsLeft--;
    }

    updateFlagCounter();
    refreshBoard();
}

function loseGame() {
    gameLost = true;

    for (let y = 0; y < gameMatrix.length; y++) {
        for (let x = 0; x < gameMatrix[y].length; x++) {
            revealed[y][x] = true;
        }
    }

    refreshBoard();
    showGameOver();
}

function refreshBoard() {
    for (let y = 0; y < gameMatrix.length; y++) {
        for (let x = 0; x < gameMatrix[y].length; x++) {
            const cell = document.getElementById("cell_" + y + "_" + x);
            cell.className = "cell";

            if (!revealed[y][x]) {
                cell.classList.add(grassClasses[(y + x) % grassClasses.length]);
            }

            drawCellContent(cell, y, x);
        }
    }
}

function isInside(y, x) {
    return y >= 0 && y < gameMatrix.length && x >= 0 && x < gameMatrix[0].length;
}

function updateFlagCounter() {
    document.getElementById("flagsLeft").textContent = flagsLeft;
}

function showGameOver() {
    document.getElementById("gameOver").classList.add("visible");
}

function hideGameOver() {
    document.getElementById("gameOver").classList.remove("visible");
}
