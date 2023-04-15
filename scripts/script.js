// player object factory function
const playerFactory = (name, playerVal) => {
    return {
        name,
        playerVal,
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
    const addMark = (row, col, playerVal) => {
        if (getValue(row, col) === 0) {
            //getValue(row, col) = player;
            _board[row][col] = playerVal;
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
    const board = gameBoard;
    const playerOne = playerFactory("player1", 1);
    const playerTwo = playerFactory("player2", 2);

    //initialize player turn and create method to switch player turn
    const players = [playerOne, playerTwo];
    let activePlayer = players[0];

    const _switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    // get the active player
    const _getActivePlayer = () => activePlayer;

    const _printNewRound = () => {
        console.log(board.getBoard());
        console.log(`${_getActivePlayer().name}'s turn.`);
    };

    const playRound = (row, col) => {
        console.log(`${_getActivePlayer().name} marked row ${row}, column ${col}.`);
        board.addMark(row, col, _getActivePlayer().playerVal);
        
        // check win condition

        _switchPlayerTurn();
        _printNewRound();
    };

    // tie logic to DOM
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');
    const cells = document.querySelectorAll('.cell');

    const updateScreen = () => {
        // get newest version of board and player turn
        const board = gameBoard;
        const boardVals = board.getBoard();
        const activePlayer = _getActivePlayer();

        // display player's turn
        playerTurnDiv.innerText = `${activePlayer.name}'s turn...`;

        // render board squares
        boardVals.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                const cellBtn = document.createElement("button");
                cellBtn.classList.add("btn");
                cellBtn.classList.add("btn-secondary");
                cellBtn.classList.add("btn-lg");
                cellBtn.dataset.cellRow = rowIndex;
                cellBtn.dataset.cellCol = cellIndex;
                cellBtn.innerText = board.getValue(rowIndex, cellIndex);
                boardDiv.appendChild(cellBtn);
            });
        });
    };

    return {
        playRound,
        updateScreen,
    };

})();




