// The Gameboard module
const Gameboard = (() => {
    const rows = 3;
    const columns = 3;
    const board = Array(rows).fill().map(() => Array(columns).fill(0));

    const getBoard = () => board;

    const placeMarker = (row, col, player) => {
        if (board[row][col] === 0) {
            board[row][col] = player;
            return true;
        }
        return false;
    };

    const checkWinner = () => {
        // Check rows
        for (let row = 0; row < rows; row++) {
            if (board[row][0] !== 0 && 
                board[row][0] === board[row][1] && 
                board[row][0] === board[row][2]) {
                return board[row][0];
            }
        }

        // Check columns
        for (let col = 0; col < columns; col++) {
            if (board[0][col] !== 0 && 
                board[0][col] === board[1][col] && 
                board[0][col] === board[2][col]) {
                return board[0][col];
            }
        }

        // Check diagonals
        if (board[0][0] !== 0 && 
            board[0][0] === board[1][1] && 
            board[0][0] === board[2][2]) {
            return board[0][0];
        }

        if (board[0][2] !== 0 && 
            board[0][2] === board[1][1] && 
            board[0][2] === board[2][0]) {
            return board[0][2];
        }

        return 0; // No winner
    };

    const isDraw = () => {
        return board.flat().every(cell => cell !== 0) && checkWinner() === 0;
    };

    const resetBoard = () => {
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
                board[row][col] = 0;
            }
        }
    };

    return { getBoard, placeMarker, checkWinner, isDraw, resetBoard };
})();

// Game controller
const GameController = (() => {
    let currentPlayer = 1;
    const displayBoard = document.getElementById("display-board");
    const cells = document.querySelectorAll(".cell");
    const resetButton = document.getElementById("reset");

    const updateDisplay = (message) => {
        displayBoard.textContent = message;
    };

    const disableAllCells = () => {
        cells.forEach(cell => {
            cell.disabled = true;
        });
    };

    const enableAllCells = () => {
        cells.forEach(cell => {
            cell.disabled = false;
            cell.textContent = "";
            cell.classList.remove("x", "o");
        });
    };

    const handleCellClick = (e) => {
        const cell = e.target;
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);

        if (Gameboard.placeMarker(row, col, currentPlayer)) {
            cell.textContent = currentPlayer === 1 ? "X" : "O";
            cell.classList.add(currentPlayer === 1 ? "x" : "o");
            cell.disabled = true;

            const winner = Gameboard.checkWinner();
            if (winner !== 0) {
                updateDisplay(`Player ${winner === 1 ? 'X' : 'O'} wins!`);
                disableAllCells();
            } else if (Gameboard.isDraw()) {
                updateDisplay("It's a draw!");
            } else {
                currentPlayer = currentPlayer === 1 ? 2 : 1;
                updateDisplay(`Player ${currentPlayer === 1 ? 'X' : 'O'}'s turn`);
            }
        }
    };

    const resetGame = () => {
        Gameboard.resetBoard();
        enableAllCells();
        currentPlayer = 1;
        updateDisplay("Player X's turn");
    };

    const init = () => {
        cells.forEach(cell => {
            cell.addEventListener("click", handleCellClick);
        });
        resetButton.addEventListener("click", resetGame);
    };

    return { init };
})();

// Initialize the game
GameController.init();