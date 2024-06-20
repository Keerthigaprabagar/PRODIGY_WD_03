let gameBoard = document.getElementById('gameBoard');
let cells = Array.from(document.getElementsByClassName('cell'));
let statusDisplay = document.getElementById('status');
let resetButton = document.getElementById('reset');
let playerVsPlayerButton = document.getElementById('playerVsPlayer');
let playerVsAIButton = document.getElementById('playerVsAI');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let playMode = 'playerVsPlayer';

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const displayStatus = (message) => {
    statusDisplay.innerHTML = message;
};

const handleCellClick = (clickedCellEvent) => {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (board[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
};

const handleCellPlayed = (clickedCell, clickedCellIndex) => {
    board[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
};

const handleResultValidation = () => {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        displayStatus(`Player ${currentPlayer} has won!`);
        gameActive = false;
        return;
    }

    let roundDraw = !board.includes('');
    if (roundDraw) {
        displayStatus(`Game ended in a draw!`);
        gameActive = false;
        return;
    }

    handlePlayerChange();
};

const handlePlayerChange = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    displayStatus(`It's ${currentPlayer}'s turn`);
};

const handleResetGame = () => {
    gameActive = true;
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    displayStatus(`It's ${currentPlayer}'s turn`);
    cells.forEach(cell => cell.innerHTML = '');
};

const aiMove = () => {
    if (!gameActive) return;

    let emptyCells = board.map((cell, index) => cell === '' ? index : null).filter(val => val !== null);
    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    if (randomIndex !== undefined) {
        board[randomIndex] = currentPlayer;
        cells[randomIndex].innerHTML = currentPlayer;
        handleResultValidation();
    }
};

const handleGameMode = (mode) => {
    playMode = mode;
    handleResetGame();
    if (playMode === 'playerVsAI') {
        handlePlayerChange();
    }
};

cells.forEach(cell => cell.addEventListener('click', (event) => {
    handleCellClick(event);
    if (playMode === 'playerVsAI' && currentPlayer === 'O' && gameActive) {
        setTimeout(aiMove, 500);
    }
}));

resetButton.addEventListener('click', handleResetGame);
playerVsPlayerButton.addEventListener('click', () => handleGameMode('playerVsPlayer'));
playerVsAIButton.addEventListener('click', () => handleGameMode('playerVsAI'));

displayStatus(`It's ${currentPlayer}'s turn`);


