// Gamelogic module
const gameBrain = (() => {

  // Array for storing placed marker locations and set first player's turn. 
  var markers = [];
  var turn = 'playerOne';

  // Assigns marker to square if not already occupied, then checks to see if this is a winning move, switching turns if not. 
  // Receives num as grid square value through eventlistener. 
  const assignSquare = function(num) {
      if (gameBrain.markers.includes(num)) {
      } else {
        markers.push(num);
        if (gameBrain.turn === 'playerOne') {
          player1.markers += num;
          var cell = document.getElementById(`${num}`);
          cell.innerText = "X";
          checkWinner(player1.markers);
          gameBrain.turn = 'playerTwo';
        } else {
          player2.markers += num;
          var cell = document.getElementById(`${num}`);
          cell.innerText = "O";
          checkWinner(player2.markers);
          gameBrain.turn = 'playerOne';
        };
        gameboard.updateTurn();
    }
  };

  // Checks if a player's markers array contains any game-winning combinations.
  // If so, increments player's score and announces result. 
  const checkWinner = function(playerMarkers) {
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
        return playerMarkers.includes(value);
      });
      winnerArr.push(winner);
    };
    if (winnerArr.includes(true) && gameBrain.turn == 'playerOne')  {
      setTimeout(function() {gameboard.declareResult(`${player1.displayName} wins`)}, 300);
      player1.score ++;
      gameboard.updateScore(player1.score, 'playerOneScore');
    } else if (winnerArr.includes(true) && gameBrain.turn == 'playerTwo') {
      setTimeout(function() {gameboard.declareResult(`${player2.displayName} wins`)}, 300);
      player2.score ++;
      gameboard.updateScore(player2.score, 'playerTwoScore');
    } else if (gameBrain.markers.length == 9) {
      setTimeout(function() {gameboard.declareResult("It's a draw")}, 300);
    };
  };
  return {turn, markers, assignSquare};
})();

// Gameboard module for creating board and updating UI.  

const gameboard = (() => {

  // Creates gameboard
  const makeBoard = () => {
    const board = document.getElementById('board');
    for (let i = 1; i < 10; i++) {
      var cell = document.createElement('div');
      cell.classList.add('gridCell');
      cell.setAttribute('id', i);
      cell.value = i;
      cell.addEventListener('click', function() { gameBrain.assignSquare(this.value) });
      board.appendChild(cell);
    };
  };

  // Displays introduction modal.
  const intro = function() {
    document.getElementById('introModal').style.display = "flex";
  }

  // Displays active player on sidebar.
  const updateTurn = function() {
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

  // Hides next turn on sidebar.
  const hideTurn = function() {
    document.getElementById('turn').style.opacity = '0';
  }

  // Shows next turn on sidebar. 
  const showTurn = function() {
    document.getElementById('turn').style.opacity = '100';
  }

  // Declares result on modal once either player has won, or it's a draw.
  const declareResult = function(result) {
    gameboard.hideTurn();
    document.getElementById('result').innerText = `${result}!`;
    document.getElementById('modal').style.display = 'flex';
  };

  // Updates scoreboard.
  const updateScore = function(score, player) {
    document.getElementById(`${player}`).innerText = `${score}`;
  }

  // Starts new game for second round onwards, clearing all marker arrays.
  const newGame = function() {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('board').innerHTML = '';
    gameBrain.markers.splice(0, gameBrain.markers.length);
    player1.markers = [];
    player2.markers = [];
    gameboard.makeBoard();
    gameboard.showTurn();
  }

  // Sets player display names from intro modal if requested (defaults declare if not) updating UI elements after.  
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
    gameboard.updateTurn();
  }

  // Thanks user for playing if new game is declined. 
  const decline = function() {
    document.getElementById('result').innerText = "Thanks for playing!"; 
    document.getElementById('result').style.marginTop = "25vh";
    document.getElementById('question').style.display = "none";
    document.getElementById('yes').style.display = "none";
    document.getElementById('no').style.display = "none";
  }

  return {
    intro,
    makeBoard, 
    updateTurn, 
    hideTurn,
    showTurn,
    declareResult, 
    updateScore, 
    newGame,
    setNames,
    decline,
  };
})();


// Player object factory 
const Player = function(name) {
  var markers = [];
  var score = 0;
  return {name, markers, score};
}

// On loading create player objects, board and display introduction. 
var player1 = Player('playerOne', 'Player One');
var player2 = Player('PlayerTwo', 'Player Two');

gameboard.makeBoard();
gameboard.intro();










