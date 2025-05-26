// The Gameboard represents the state of the board
function Gameboard () {
    const rows = 3;
    const columns = 3;
    const board = [];

    // Create a 2d array that will represent the state of the game board
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Grid())
        }
    }

    // Method to get the current state of the board
    const getBoard = () => board;

    // To place a marker, we need to find an available grids
    /* const getAvailableGrids = () => {
        const availableGrids = [];

        for (let row of board) {
            for (let cell of row) {
                if (cell.getValue() === 0) {
                    availableGrids.push(cell);
                }
            }
        }
        return availableGrids;
    } */

    // Method to place a marker on the board
    const placeMarker = (row, col, player) => {
        const cell = board[row][col];
        if(cell.getValue() === 0) {
            cell.marker(player);
            return true;
        }
        return false;
    };

    // Method to check for a winner
    const checkWinner = () => {
        const lines = [
            // Rows
            [board[0][0], board[0][1], board[0][2]],
            [board[1][0], board[1][1], board[1][2]],
            [board[2][0], board[2][1], board[2][2]],
            // Columns
            [board[0][0], board[1][0], board[2][0]],
            [board[0][1], board[1][1], board[2][1]],
            [board[0][2], board[1][2], board[2][2]],
    
            // Diagonals
            [board[0][0], board[1][1], board[2][2]],
            [board[0][2], board[1][1], board[2][0]],
        ];
    
        for (let line of lines) {
            const [a, b, c] = line;
            if (a.getValue() !== 0 && a.getValue() === b.getValue() && a.getValue() === c.getValue()) {
                return a.getValue(); // Returns 1 or 2 indicating the winning player
            }
        }
        return 0; // No winner
    };


    // Method to check for a Draw
    const isDraw = () => {
        for (let row of board) {
            for(let cell of row) {
                if (cell.getValue() === 0) {
                    return false; // At least one cell is unmarked
                }
            }
        }

        return checkWinner() === 0 // True if no winner and all cells are marked
    }

    // Method to reset board 
    const resetBoard = () => {
        for (let row of board) {
            for (let cell of row) {
                cell.marker(0); // Reset each cell to unmarked
            }
        }
    };

    return { 
        getBoard, placeMarker, checkWinner, isDraw, resetBoard
    };

    
}

/*
** A Grid represents one "square" on the board and can have one of
** 0: no mark is in the square,
** 1: Player One's mark,
** 2: Player two's mark
*/

function Grid () {
    let value = 0;
    
    // Accept a player's mark to change the value of the grid
    const marker = (player) => {
        if(value === 0) {
            value = player;
            return true; //Mark successful
        }

        return false; // Cell already marked
    };

    // How we will retrieve the current value of this grid through closure

    const getValue = () => value;

    return {marker, getValue}

}


