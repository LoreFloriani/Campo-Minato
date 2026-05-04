const express = require('express');
const GameMatrix = require('./private/js/game');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname + '/public' });
});

app.get('/api/game/:difficulty', (req, res) => {
    let rows;
    let cols;
    let pOne;

    if (req.params.difficulty === 'easy') {
        rows = 8;
        cols = 10;
        pOne = 0.12;
    } else if (req.params.difficulty === 'medium') {
        rows = 12;
        cols = 18;
        pOne = 0.16;
    } else if (req.params.difficulty === 'difficult') {
        rows = 15;
        cols = 26;
        pOne = 0.19;
    } else {
        return res.status(400).json({ error: 'Difficolta non valida' });
    }

    const game = new GameMatrix(rows, cols, pOne);
    const matrix = game.getMatrix();

    res.json(matrix);
});

app.use((req, res) => {
    res.status(404).send('<h1>Risorsa non trovata!!</h1>');
});

app.listen(port, () => {
    console.log(`Server avviato su http://localhost:${port}`);
});
