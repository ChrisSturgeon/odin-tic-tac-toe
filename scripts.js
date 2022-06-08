// Gameboard module

const gameBrain = (() => {
  var boardArr = [];
  var turn = 'playerOne';

  const assignSquare = function(num) {
    if (gameBrain.boardArr.includes(num)) {
      console.log('Number taken!')
    } else {
      console.log(num);
      boardArr.push(num);

      if (gameBrain.turn === 'playerOne') {
        var cell = document.getElementById(`${num}`);
        cell.innerText = "X";
        gameBrain.turn = 'playerTwo';
      } else {
        var cell = document.getElementById(`${num}`);
        cell.innerText = "O";
        gameBrain.turn = 'playerOne';
      }
    };
  };

  return {
    turn,
    boardArr,
    assignSquare,
  };
})();

// displayController module

const gameboard= (() => {
  const makeBoard = () => {
    const container = document.getElementById('container');
    for (let i = 1; i < 10; i++) {
      var cell = document.createElement('div');
      cell.classList.add('gridCell');
      cell.setAttribute('id', i);
      cell.innerText = 'test';
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
  return {name, playerArr};
}

const player1 = Player('playerOne');
const player2 = Player('PlayerTwo');

gameboard.makeBoard();

function updateTurnShow() {
  var turnShow = document.getElementById('turn');
  turnShow.innerText = `Turn: ${gameBrain.turn}`;
}

updateTurnShow();






