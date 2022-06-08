// Gameboard module

const gameBrain = (() => {
  var boardArr = [];
  var turn = 'playerOne';

  const assignSquare = function(num) {
    if (gameBrain.boardArr.includes(num)) {
      console.log('Number taken!');
    } else {
      console.log(num);
      boardArr.push(num);

      if (gameBrain.turn === 'playerOne') {
        player1.playerArr += num;
        var cell = document.getElementById(`${num}`);
        cell.innerText = "X";
        checkWinner(player1.playerArr);
        gameBrain.turn = 'playerTwo';
        updateTurnShow();
      } else {
        player2.playerArr += num;
        var cell = document.getElementById(`${num}`);
        cell.innerText = "O";
        checkWinner(player2.playerArr);
        gameBrain.turn = 'playerOne';
        updateTurnShow();
      };
    };
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
      console.log(`Player One wins!`)
      } else if (winnerArr.includes(true) && gameBrain.turn == 'playerTwo') {
        console.log('Player Two wins!')
      }
    


  };

  return {
    turn,
    boardArr,
    assignSquare,
  };
})();

// Gameboard module

const gameboard= (() => {
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

  return {makeBoard};
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

updateTurnShow();









