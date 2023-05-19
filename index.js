// Factory Function to Create Players
const playerFactory = (name, marker) => ({ name, marker });

// Storing references to DOM elements for easier access
const DOM = {
  gameMsg: document.querySelector('.game-msg'),
  gameGrid: document.querySelector('.game-grid'),
  gridCells: document.querySelectorAll('.grid-cell'),
};

// Gameboard , contains the board we'll make our play on,
// and methods for marking our board
const gameBoard = (() => {
  const board = ['', '', '',
    '', '', '',
    '', '', ''];

  // Method to retrieve the board through closure
  const getBoard = () => board;

  // validPlay value, changes if a play cannot be made
  let validPlay = true;

  // Method to retrieve reference of validPlay
  const getValid = () => validPlay;

  // Method checks to see if an array is empty at a given index, then place a marker if available,
  // if not then return
  const placeMarker = (marker, index) => {
    // if board is empty at given index, mark with the given marker
    // validPlay status set to true
    if (!board[index] === true) {
      board[index] = marker;
      console.log(`Board marked at ${index} with ${marker}`);
      validPlay = true;
      return { validPlay };

      // if the board is already marked at that index,
      // validPlay status set to false
    } if (!board[index] === false) {
      console.log('Not valid move');
      validPlay = false;
      return { validPlay };
    }
  };

  return { getBoard, placeMarker, getValid };
})();

// Game should control the flow and state of games turns
// as well as win conditions for the game
const game = (() => {
  const playerOne = playerFactory('P One', 'X');
  const playerTwo = playerFactory('P Two', 'O');

  let currentPlayer = playerOne;

  // Method to retrieve the currentPlayer at any point
  const getCurrentPlayer = () => currentPlayer;

  // Method checks the currentPlayer, and switches based on ternary condition
  const switchPlayer = () => {
    currentPlayer === playerOne ? currentPlayer = playerTwo : currentPlayer = playerOne;
  };

  // winConditions
  const winConditions = {};

  // Starts next round by printing new array, and announcing players turn
  const startNewRound = () => {
    // log current players turn
    console.log(`${getCurrentPlayer().name}s turn`);
    // update the board with newly marked board
  };

  // Plays a round of Tic Tac Toe, marks board with current players token in given index
  // console.log the move made, switch player,
  // should clear the board, then show updated board
  const playRound = (index) => {
    // place a marker based on the given index, and the currentplayers marker
    gameBoard.placeMarker(getCurrentPlayer().marker, index);

    // Check the getValid method from gameboard
    // if a valid play has been made then switch players
    if (gameBoard.getValid() === true) {
      switchPlayer();
    }

    // check win conditions, and if a winning move has been display win message

    // start next round/log current players turn
    startNewRound();
  };

  return { getCurrentPlayer, switchPlayer, playRound };
})();

// displayController, reflects changes to the DOM
const displayController = (() => {
  // On page load, display player 1s name
  DOM.gameMsg.innerText = `${game.getCurrentPlayer().name}'s turn!`;

  // When called, display who the current player is
  const updateGameMsg = () => {
    DOM.gameMsg.innerText = `${game.getCurrentPlayer().name}'s turn`;
  };

  // Create an array from our DOM gridCell node list to iterate upon
  const gridCellArray = Array.from(DOM.gridCells);

  // Displays what the gameboard array current values are on the DOM grid
  const updateGrid = () => {
    for (let i = 0; i < gridCellArray.length; i++) {
      gridCellArray[i].innerText = gameBoard.getBoard()[i];
    }
  };

  // Each gridCell given a event handler, when clicked, playRound is called, marking
  // the array gameBoard at the same index as the grid cell being clicked
  // the gridCell is then updated to display the same as the GameBoard array
  gridCellArray.forEach((cell) => {
    cell.addEventListener('click', () => {
      game.playRound(cell.dataset.index);
      updateGrid();
      updateGameMsg();
    });
  });

  return { };
})();
