// Factory Function to Create Players
const playerFactory = (name, marker) => ({ name, marker });

// Storing references to DOM elements for easier access
const DOM = {
  gameMsg: document.querySelector('.game-msg'),
  gameGrid: document.querySelector('.game-grid'),
  gridCells: document.querySelectorAll('.grid-cell'),
};

// Gameboard , contains the board we'll make our play on
const gameBoard = (() => {
  const board = ['X', 'X', 'X',
    'O', 'O', 'O',
    'X', 'X', 'X'];
  const getBoard = () => board;
  return { getBoard };
})();

// Game contains rules for gameplay
const game = (() => {
  const playerOne = playerFactory('P One', 'X');
  const playerTwo = playerFactory('P Two', 'O');
  const currentPlayer = playerOne;

  return { currentPlayer };
})();

// displayController, reflects changes to the DOM
const displayController = (() => {
  // On page load, display who the current player is and their marker
  const gameMsg = DOM.gameMsg.innerText = `Player: ${game.currentPlayer.name} Marker: ${game.currentPlayer.marker}`;

  // Convert DOM Node List to an Array
  const gridCellsArray = Array.from(DOM.gridCells);

  // On page load, fill the grid with the corresponding array indexes
  for (let i = 0; i < gridCellsArray.length; i++) {
    gridCellsArray[i].innerText = gameBoard.getBoard()[i];
  }
})();
