// Gameboard module

const gameBrain = (() => {
  var boardArr = [];
  var turn = 'playerOne';
  var active = true;

  const assignSquare = function(num) {
    if (gameBrain.active) {
      if (gameBrain.boardArr.includes(num)) {
      } else {
        boardArr.push(num);
  
        if (gameBrain.turn === 'playerOne') {
          player1.playerArr += num;
          var cell = document.getElementById(`${num}`);
          cell.innerText = "X";
          checkWinner(player1.playerArr);
          gameBrain.turn = 'playerTwo';
        } else {
          player2.playerArr += num;
          var cell = document.getElementById(`${num}`);
          cell.innerText = "O";
          checkWinner(player2.playerArr);
          gameBrain.turn = 'playerOne';
          
        };
        gameboard.showTurn();
      };
    }
  };

  // Compare each player's placements to see if they match game-winning combinations.

  const checkWinner = function(playerArr) {
    const winningCombos = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [7, 5, 3]
    ];
    var winnerArr = [];

    for (let i = 0; i < winningCombos.length; i++) {
      const winner = winningCombos[i].every(value => {
        return playerArr.includes(value);
      });
      winnerArr.push(winner);
    };

    if (winnerArr.includes(true) && gameBrain.turn == 'playerOne')  {
      setTimeout(function() {gameboard.declareResult(`${player1.displayName} wins`)}, 300);
      player1.score ++;
      gameboard.updateScore(player1.score, 'playerOneScore');
      gameBrain.active = false;
      gameboard.hideTurn();
    } else if (winnerArr.includes(true) && gameBrain.turn == 'playerTwo') {
      setTimeout(function() {gameboard.declareResult(`${player2.displayName} wins`)}, 300);
      player2.score ++;
      gameboard.updateScore(player2.score, 'playerTwoScore');
      gameBrain.active = false;
      gameboard.hideTurn();
    } else if (gameBrain.boardArr.length == 9) {
      setTimeout(function() {gameboard.declareResult("It's a draw")}, 300);
      gameBrain.active = false;
      gameboard.hideTurn();
    }
  };

  return {
    turn,
    boardArr,
    assignSquare,
  };
})();

// Gameboard module for displaying the board and scores. 

// Display start intro modal

const intro = function() {
  document.getElementById('introModal').style.display = "flex";
}

const gameboard = (() => {
  const makeBoard = () => {
    const board = document.getElementById('board');
    for (let i = 1; i < 10; i++) {
      var cell = document.createElement('div');
      cell.classList.add('gridCell');
      cell.setAttribute('id', i);
      cell.innerText = '';
      cell.value = i;
      cell.addEventListener('click', function() { gameBrain.assignSquare(this.value) });
      board.appendChild(cell);
    };
  };

  // Show whose turn it is.

  const showTurn = function() {
    var turnText = document.getElementById('turnText');
    var turnPic = document.getElementById('turnPic')

    if (gameBrain.turn == "playerOne") {
      turnText.innerText = `${player1.displayName}'s turn:`;
      
      turnPic.innerText = "X";
    } else {
      turnText.innerText = `${player2.displayName}'s turn:`;
      turnPic.innerText = "O";
    };
  };

  // Hide next turn 

  const hideTurn = function() {
    document.getElementById('turn').style.opacity = '0';
  }

  // Show next turn 

  const displayTurn = function() {
    document.getElementById('turn').style.opacity = '100';
  }

  // Declare result once either player has won, or it's a draw.

  const declareResult = function(result) {

    document.getElementById('result').innerText = `${result}!`;
    document.getElementById('modal').style.display = 'flex';
  };

  // Update the scoreboard.

  const updateScore = function(score, player) {
    document.getElementById(`${player}`).innerText = `${score}`;
  }

  // Start new game. 

  const newGame = function() {
    document.getElementById('modal').style.display = 'none';
    gameBrain.active = true;
    document.getElementById('board').innerHTML = '';
    document.getElementById('result').innerText = 'Result:'
    gameBrain.boardArr.splice(0, gameBrain.boardArr.length);
    player1.playerArr = [];
    player2.playerArr = [];
    gameboard.makeBoard();
    gameboard.displayTurn();
  }

  // Set player display names

  const setNames = function() {

    var p1 = document.getElementById('p1').value;
    var p2 = document.getElementById('p2').value;
    
    if (p1.length > 0 && p1.length < 8) {
      player1.displayName = p1;
      document.getElementById('p1Name').innerText = player1.displayName;
    } else {
      player1.displayName = 'Player One';
    };
    if (p2.length > 0 && p2.length < 8) {
      player2.displayName = p2;
      document.getElementById('p2Name').innerText = player2.displayName;
    } else {
      player2.displayName = 'Player Two';
    };

    document.getElementById('introModal').style.display = 'none';
    document.getElementById('turn').style.opacity = '100';
    document.getElementById('scores').style.opacity = '100';
    gameboard.showTurn();
  }

  // Declined new game

  const decline = function() {
    document.getElementById('modal').style.display = 'none';
  }

  return {
    intro,
    makeBoard, 
    showTurn, 
    hideTurn,
    displayTurn,
    declareResult, 
    updateScore, 
    newGame,
    setNames,
    decline,
  };
})();


// Player factory 

const Player = function(name) {
  var playerArr = [];
  var score = 0;

  return {name, playerArr, score};
}

var player1 = Player('playerOne', 'Player One');
var player2 = Player('PlayerTwo', 'Player Two');



gameboard.makeBoard();
gameBrain.active = true;
gameboard.intro();
gameboard.showTurn();










