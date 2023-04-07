// gameboard object using module pattern
const gameBoard = (() => {
    let _board = [
        ["X", "X", "X"],
        ["X", "X", "X"],
        ["X", "X", "X"],
    ];

    const _cells = document.querySelectorAll(".cell");

    const renderBoard = () => {
        const flatBoard = _board.flat();
        
        [..._cells].map((cell, boardCell) => {
            cell.innerText = flatBoard[boardCell];
        });
    };

    return {renderBoard};
})();

// object to control flow of the game using module pattern
const displayController = (() => {

})();

// player object factory function
const playerFactory = name => {

}
