const colors = {
    "-1": "red",
    "0": "white",
    "1": "#a8e6cf",
    "2": "#dcedc1",
    "3": "#ffd3b6",
    "4": "#ffaaa5",
    "5": "#ff8b94",
    "6": "#c7ceea",
    "7": "#b5ead7",
    "8": "#ffccf9"
};

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
    const matrix = await response.json();

    drawMatrix(matrix);
}

function drawMatrix(matrix) {
    const container = document.getElementById("tabella");
    container.innerHTML = "";


    for (let i = 0; i < matrix.length; i++) {
        const row = document.createElement("div");
        row.id = "row_" + i;

        for (let j = 0; j < matrix[i].length; j++) {
            const cell = document.createElement("button");
            const value = matrix[i][j];

            cell.textContent = value;
            cell.style.backgroundColor = colors[value] || "gray";
            cell.id = "cell_" + i + "_" + j;

            row.appendChild(cell);
        }

        container.appendChild(row);
    }


}
