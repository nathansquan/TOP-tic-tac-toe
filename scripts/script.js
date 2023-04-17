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

    const _playRound = (row, col) => {
        console.log(`${_getActivePlayer().name} marked row ${row}, column ${col}.`);
        board.addMark(row, col, _getActivePlayer().playerVal);
        
        // check win condition
        if (_checkHorizontalWin(board.getBoard()) || 
            _checkVerticalWin(board.getBoard()) || 
            _checkMainDiagonalWin(board.getBoard()) ||
            _checkOffDiagonalWin(board.getBoard())) {
            return alert(`${_getActivePlayer().name} wins!!!`);
        }

        _switchPlayerTurn();
        _printNewRound();
    };

    const _allEqual = arr => arr.every(val => val === arr[0]);
    const _transpose = matrix => {
        return matrix[0].map((col, i) => matrix.map(row => row[i]));
    }

    // check win conditions
    const _checkHorizontalWin = (board) => {
        //const boardVals = gameBoard.getBoard();
        let flag = false;
        // check horizontal 3-in-a-row
        board.forEach(row => {
            if (row[0] !== 0 && _allEqual(row)) {
                flag = true;
            }
        });
        return flag;
    };

    const _checkVerticalWin = (board) => {
        const boardT = _transpose(board);
        return _checkHorizontalWin(boardT);
    };

    const _checkMainDiagonalWin = (board) => {
        let flag = false;
        let diag = [];

        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {
                if (row === col) {
                    diag.push(board[row][col]);
                } 
            } 
        }
        
        if (diag[0] !== 0 && _allEqual(diag)) {
            flag = true;
        }

        return flag;
    }

    const _checkOffDiagonalWin = (board) => {
        let flag = false;
        let diag = [];
        const nRows = board.length;
        const nCols = board[0].length;

        // grab values from off diagonal
        for (let row = 0; row < nRows; row++) {
            for (let col = 0; col < nCols; col++) {
                let nColsFromLast = nCols - 1 - col;
                let nRowsFromFirst = row;

                if (row === 0 && col === nCols - 1) {
                    diag.push(board[row][col]);
                } else if (row === nRows - 1 && col === 0) {
                    diag.push(board[row][col]);
                } else if (nRowsFromFirst === nColsFromLast) {
                    diag.push(board[row][col]);
                }
            } 
        }
        
        if (diag[0] !== 0 && _allEqual(diag)) {
            flag = true;
        }

        return flag;
    }

    // tie logic to DOM
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');

    const updateScreen = () => {
        // clear the board
        boardDiv.textContent = "";

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
                cellBtn.classList.add("rounded-0");
                cellBtn.classList.add("fs-1");
                cellBtn.dataset.cellRow = rowIndex;
                cellBtn.dataset.cellCol = cellIndex;

                if (board.getValue(rowIndex, cellIndex) === 1) {
                    cellBtn.innerText = "X"; 
                } else if (board.getValue(rowIndex, cellIndex) === 2) {
                    cellBtn.innerText = "O"; 
                } else {
                    cellBtn.innerText = "";
                }

                boardDiv.appendChild(cellBtn);
            });
        });
    };

    function _clickHandlerBoard(e) {
        if (e.target.classList.contains("btn")) {
            const selectedCellRow = e.target.dataset.cellRow;
            const selectedCellCol = e.target.dataset.cellCol;

            _playRound(selectedCellRow, selectedCellCol);
            updateScreen();
        }
    };

    boardDiv.addEventListener("click", _clickHandlerBoard);

    return {
        updateScreen,
    };
})();

// Initial render
displayController.updateScreen();


