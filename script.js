// script.js
const board = document.querySelector('#board');
const cells = document.querySelectorAll('.cell');
const restartButton = document.querySelector('#restart');
const message = document.querySelector('#message');

let currentPlayer = 'X';
let gameState = Array(9).fill(null);

// Winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleClick = (e) => {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    if (gameState[index] || checkWin() || checkDraw()) {
        return;
    }

    cell.textContent = currentPlayer;
    gameState[index] = currentPlayer;

    if (checkWin()) {
        message.textContent = `${currentPlayer} wins!`;
        return;
    } 

    if (checkDraw()) {
        message.textContent = "It's a draw!";
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const checkWin = () => {
    return winningCombinations.some(combination => {
        return combination.every(index => gameState[index] === currentPlayer);
    });
};

const checkDraw = () => {
    return gameState.every(cell => cell);
};

const restartGame = () => {
    currentPlayer = 'X';
    gameState.fill(null);
    cells.forEach(cell => cell.textContent = '');
    message.textContent = '';
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);
