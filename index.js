// Factory Function to Create Players
const playerFactory = (name, marker) => ({ name, marker });

// Storing references to DOM elements for easier access
const DOM = {
  gameMsg: document.querySelector('.game-msg'),
  gameGrid: document.querySelector('.game-grid'),
  gridCells: document.querySelectorAll('.grid-cell'),
  gameType: document.querySelectorAll('.game-type-menu'),
  pvpBtn: document.querySelectorAll('.pvp-game'),
  playerForm: document.querySelectorAll('.player-form'),
  pOneInput: document.getElementById('player1'),
  pTwoInput: document.getElementById('player2'),
  formSubmit: document.querySelectorAll('.submit'),
  restartBtn: document.getElementById('restart'),
  scoreBoard: document.getElementById('scoreboard'),
  pOneLabel: document.getElementById('p1-label'),
  pTwoLabel: document.getElementById('p2-label'),
  pOneScore: document.getElementById('p1-score'),
  pTwoScore: document.getElementById('p2-score'),
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
  const playerOne = playerFactory('User One', 'X');
  const playerTwo = playerFactory('User Two', 'O');

  let currentPlayer = playerOne;

  // Method to retrieve the currentPlayer at any point
  const getCurrentPlayer = () => currentPlayer;

  // Method checks the currentPlayer, and switches based on ternary condition
  const switchPlayer = () => {
    currentPlayer === playerOne ? currentPlayer = playerTwo : currentPlayer = playerOne;
  };

  // State of Game, updates when win condition has been met
  let gameOver = false;

  // Retrieve state of Game
  const getGameOver = () => gameOver;

  // Variable to fill with winning player
  let winningPlayer = '';

  // Retrieve winner
  const getWinner = () => winningPlayer;

  // Player Scores
  let pOneScore = 0;
  let pTwoScore = 0;

  // Retrieve scores

  const getPOneScore = () => pOneScore;
  const getPTwoScore = () => pTwoScore;

  const updateScore = () => {
    if (winningPlayer == 'User One') {
      ++pOneScore;
      console.log(`Player one score is ${pOneScore}`);
      return (pOneScore);
    } if (winningPlayer == 'User Two') {
      ++pTwoScore;
      return (pTwoScore);
    }
  };

  // Method to run if a win has been made
  const endGame = () => {
    console.log(`${getCurrentPlayer().name} wins `);
    winningPlayer = getCurrentPlayer().name;
    updateScore();
    gameOver = true;
    return { gameOver, winningPlayer };
  };

  // Method to log when a tie has been made,
  const gameTie = () => {
    console.log('Game Tied');
    gameOver = 'tied';
    return (gameOver);
  };

  // Method to check that a winning move has been made, calls endGame
  const checkWin = () => {
    // Check gameBoard Array, if the array items value at the corresponding winCondition index is equal, a win has been made
    if (!gameBoard.getBoard()[0] == false
         && gameBoard.getBoard()[0] == getCurrentPlayer().marker
         && gameBoard.getBoard()[1] == getCurrentPlayer().marker
         && gameBoard.getBoard()[2] == getCurrentPlayer().marker

        || !gameBoard.getBoard()[3] == false
         && gameBoard.getBoard()[3] == getCurrentPlayer().marker
         && gameBoard.getBoard()[4] == getCurrentPlayer().marker
         && gameBoard.getBoard()[5] == getCurrentPlayer().marker

        || !gameBoard.getBoard()[6] == false
         && gameBoard.getBoard()[6] == getCurrentPlayer().marker
         && gameBoard.getBoard()[7] == getCurrentPlayer().marker
         && gameBoard.getBoard()[8] == getCurrentPlayer().marker

    // Column Wins
        || !gameBoard.getBoard()[0] == false
         && gameBoard.getBoard()[0] == getCurrentPlayer().marker
         && gameBoard.getBoard()[3] == getCurrentPlayer().marker
         && gameBoard.getBoard()[6] == getCurrentPlayer().marker

        || !gameBoard.getBoard()[1] == false
         && gameBoard.getBoard()[1] == getCurrentPlayer().marker
         && gameBoard.getBoard()[4] == getCurrentPlayer().marker
         && gameBoard.getBoard()[7] == getCurrentPlayer().marker

        || !gameBoard.getBoard()[2] == false
         && gameBoard.getBoard()[2] == getCurrentPlayer().marker
         && gameBoard.getBoard()[5] == getCurrentPlayer().marker
         && gameBoard.getBoard()[8] == getCurrentPlayer().marker

    // Diagonal Wins
        || !gameBoard.getBoard()[0] == false
        && gameBoard.getBoard()[0] == getCurrentPlayer().marker
        && gameBoard.getBoard()[4] == getCurrentPlayer().marker
        && gameBoard.getBoard()[8] == getCurrentPlayer().marker

       || !gameBoard.getBoard()[2] == false
        && gameBoard.getBoard()[2] == getCurrentPlayer().marker
        && gameBoard.getBoard()[4] == getCurrentPlayer().marker
        && gameBoard.getBoard()[6] == getCurrentPlayer().marker
    ) {
      endGame();
    }
  };

  // Check if gameboard is filled completely
  const checkFilled = (index) => !index == false;

  // Check for Ties, if all cells are filled and no win has been made, its a tie
  const checkTie = () => {
    if (getGameOver() == false
      && gameBoard.getBoard().every(checkFilled) == true) {
      gameTie();
    }
  };

  // Starts next round by printing new array, and announcing players turn
  const startNewRound = () => {
    console.log(gameBoard.getBoard());
    checkWin();
    checkTie();
    if (gameOver == true) {
      console.log('startNewRound says Game is over. end clickability');
    } else if (gameOver == 'tied') {
      console.log('startNewRound says Game is Tied');
    } else {
      console.log(`${getCurrentPlayer().name}'s turn`);
    }
  };

  // Clear gameBoard for start of new game
  const newGame = () => {
    for (let i = 0; i < gameBoard.getBoard().length; i++) {
      gameBoard.getBoard()[i] = '';
    }

    winningPlayer = '';
    currentPlayer = playerOne;
    gameOver = false;

    return (winningPlayer, currentPlayer);
  };

  // Plays a round of Tic Tac Toe, marks board with current players token in given index
  // console.log the move made, switch player,
  // check win conditions
  const playRound = (index) => {
    // place a marker based on the given index, and the currentplayers marker
    gameBoard.placeMarker(getCurrentPlayer().marker, index);

    // Check the getValid method from gameboard
    // if a valid play has been made then check for win, switch players
    if (gameBoard.getValid() === true) {
      checkWin();
      switchPlayer();
    }

    // start next round/log current players turn
    startNewRound();
  };

  return {
    getCurrentPlayer, switchPlayer, playRound, getGameOver, getWinner, newGame, getPOneScore, getPTwoScore,
  };
})();

// displayController, reflects changes to the DOM
const displayController = (() => {
  // When game type has been chosen, hide game type menu, show name input
  DOM.gameGrid.style.display = 'none';
  DOM.scoreBoard.style.display = 'none';
  DOM.gameMsg.innerText = '';
  DOM.playerForm[0].style.display = 'none';

  // Containers for player names entered through form
  let playerOne = '';
  let playerTwo = '';
  let currentPlayer = '';

  // PVP button functionality
  DOM.pvpBtn[0].addEventListener('click', () => {
    DOM.playerForm[0].style.display = 'grid';
    DOM.gameType[0].style.display = 'none';
  });

  // PVC button functionality

  // On submit for name input, hide all menus and show game grid, and show current player
  // DOM.gameMsg.innerText = `${game.getCurrentPlayer().name}'s turn!`;
  DOM.formSubmit[0].addEventListener('click', () => {
    event.preventDefault();
    if (DOM.pOneInput.value == '' || DOM.pOneInput.value == '') {
      alert('Please enter player names');
    } else {
      DOM.playerForm[0].style.display = 'none';
      DOM.gameGrid.style.display = 'grid';

      // Update empty player variables, send through player factory function
      playerOne = playerFactory(DOM.pOneInput.value, 'X');
      playerTwo = playerFactory(DOM.pTwoInput.value, 'O');

      DOM.gameMsg.innerText = `${playerOne.name}'s turn!`;
      return { playerOne, playerTwo };
    }
  });

  // Update player names from game module for DOM
  const updatePlayerName = () => {
    if (game.getCurrentPlayer().name == 'User One') {
      currentPlayer = playerOne;
      return (currentPlayer);
    } if (game.getCurrentPlayer().name == 'User Two') {
      currentPlayer = playerTwo;
      return (currentPlayer);
    }
  };

  // Update Winning player for DOM
  let winner = '';

  const updateWinnerName = () => {
    if (game.getWinner() == 'User One') {
      winner = playerOne.name;
      return (winner);
    } if (game.getWinner() == 'User Two') {
      winner = playerTwo.name;
      return (winner);
    }
  };

  // Displays who the current player is
  const updateGameMsg = () => {
    updatePlayerName();
    DOM.gameMsg.innerText = `${currentPlayer.name}'s turn`;
  };

  // Game Over Message
  const gameOverMsg = () => {
    updateWinnerName();
    DOM.gameMsg.innerText = `${winner} wins`;
  };

  // Tie Game Message
  const tieGameMsg = () => {
    DOM.gameMsg.innerText = 'Game Tied';
  };

  // Stops clickability of grid cells when game is over
  const endFunctionality = () => {
    gridCellArray.forEach((cell) => {
      cell.disabled = true;
    });
  };

  // Create an array from our DOM gridCell node list to iterate upon
  const gridCellArray = Array.from(DOM.gridCells);

  // Displays what the gameboard array current values are on the DOM grid
  const updateGrid = () => {
    for (let i = 0; i < gridCellArray.length; i++) {
      gridCellArray[i].innerText = gameBoard.getBoard()[i];
    }
  };

  // Updates player scores
  // when a round is over, get the score of both players from game module
  // update the DOM
  const updateScoreboard = () => {
    DOM.scoreBoard.style.display = 'grid';
    DOM.pOneLabel.innerText = playerOne.name;
    DOM.pTwoLabel.innerText = playerTwo.name;
    DOM.pOneScore.innerText = game.getPOneScore();
    DOM.pTwoScore.innerText = game.getPTwoScore();
  };

  // New Game Functionality
  const newGame = () => {
    DOM.restartBtn.style.display = 'grid';

    DOM.restartBtn.addEventListener('click', () => {
      game.newGame();
      updateGrid();
      updateGameMsg();
      DOM.restartBtn.style.display = 'none';
      gridCellArray.forEach((cell) => {
        cell.disabled = false;
      });
    });
  };

  // End functionality of game when win state has been reached
  // Change DOM msg
  const gameOver = () => {
    if (game.getGameOver() == true) {
      gameOverMsg();
      endFunctionality();
      updateScoreboard();
      newGame();
    } else if (game.getGameOver() == 'tied') {
      tieGameMsg();
      endFunctionality();
      updateScoreboard();
      newGame();
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
      gameOver();
    });
  });

  return { };
})();
