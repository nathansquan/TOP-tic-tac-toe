// player object factory function
const playerFactory = name => {
    return {
        name,
    };
}

// gameboard object using module pattern
// 0: no mark in a square
// 1: Player One's mark
// 2: Player Two's mark
const gameBoard = (() => {
    const _rows = 3;
    const _cols = 3;
    const _board = [];
    let _cellVal = 0;

    // create 2d array to represent state of game board
    for (let i = 0; i < _rows; i++) {
        _board[i] = [];
        for (let j = 0; j < _cols; j++) {
            _board[i].push(_cellVal); 
        }
    }

    // to get board state for UI to render
    const getBoard = () => _board;

    const getValue = (row, col) => _board[row][col];

    // assign _cellVal with the player's value, 1 or 2
    const addMark = (row, col, player) => {
        if (getValue(row, col) === 0) {
            //getValue(row, col) = player;
            _board[row][col] = player;
        } else {
            alert("There is already a mark made on this square!"); 
        }
    };

    return {
        getBoard,
        getValue,
        addMark,
    };
})();


// object to control flow of the game using module pattern
const displayController = (() => {
    const playerOne = playerFactory("player1");
    const playerTwo = playerFactory("player2");

})();




