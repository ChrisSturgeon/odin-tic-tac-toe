// Gameboard module

const gameBrain = (() => {
  var boardArr = [];
  var turn = 'playerOne';
  var active = true;

  const assignSquare = function(num) {
    if (gameBrain.active) {
      if (gameBrain.boardArr.includes(num)) {
        console.log('Number taken!');
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
      gameboard.declareResult('Player One wins');
      player1.score ++;
      gameboard.updateScore(player1.score, 'playerOneScore');
      gameBrain.active = false;
      gameboard.hideTurn();
    } else if (winnerArr.includes(true) && gameBrain.turn == 'playerTwo') {
      setTimeout(gameboard.declareResult('Player Two wins'), 3000);
      player2.score ++;
      gameboard.updateScore(player2.score, 'playerTwoScore');
      gameBrain.active = false;
      gameboard.hideTurn();
    };

    if (gameBrain.boardArr.length == 9) {
      gameboard.declareResult("It's a draw");
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
      turnText.innerText = "Player one's turn:";
      turnPic.innerText = "X";
    } else {
      turnText.innerText = "Player two's turn:";
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

  // Declined new game

  const decline = function() {
    document.getElementById('modal').style.display = 'none';
  }

  return {
    makeBoard, 
    showTurn, 
    hideTurn,
    displayTurn,
    declareResult, 
    updateScore, 
    newGame,
    decline,
  };
})();


// Player factory 

const Player = function(name) {
  var playerArr = [];
  var score = 0;
  return {name, playerArr, score};
}

const player1 = Player('playerOne');
const player2 = Player('PlayerTwo');

gameboard.makeBoard();

function updateTurnShow() {
  var turnShow = document.getElementById('turn');
  turnShow.innerText = `Turn: ${gameBrain.turn}`;
}

gameboard.showTurn();

gameBrain.active = true;









