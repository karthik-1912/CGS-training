document.addEventListener("DOMContentLoaded", function() {
    const board = document.getElementById('tic-tac-toe-board');
    const gameStatus = document.getElementById('game-status');
    const restartButton = document.getElementById('restart');

    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ["", "", "", "", "", "", "", "", ""];

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

    
    function createBoard() {
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('tic-tac-toe-cell');
            cell.setAttribute('data-index', i);
            cell.addEventListener('click', handleCellClick);
            board.appendChild(cell);
        }
    }

    
    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = clickedCell.getAttribute('data-index');

        
        if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }

        
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;

        
        checkResult();
    }

    
    function checkResult() {
        let roundWon = false;

        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];

            if (a === "" || b === "" || c === "") {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            gameStatus.innerHTML = `Player ${currentPlayer} wins!`;
            gameActive = false;
            return;
        }

        if (!gameState.includes("")) {
            gameStatus.innerHTML = `It's a tie!`;
            gameActive = false;
            return;
        }

        
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        gameStatus.innerHTML = `Player ${currentPlayer}'s turn`;
    }

    
    function restartGame() {
        currentPlayer = 'X';
        gameActive = true;
        gameState = ["", "", "", "", "", "", "", "", ""];
        gameStatus.innerHTML = `Player X's turn`;
        document.querySelectorAll('.tic-tac-toe-cell').forEach(cell => {
            cell.innerHTML = "";
        });
    }

    
    restartButton.addEventListener('click', restartGame);

    
    createBoard();
});