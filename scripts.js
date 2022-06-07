// Gameboard module

const gameBrain = (() => {
  var boardArr = [];

  const assignSquare = function(num) {
    if (gameBrain.boardArr.includes(num)) {
      console.log('Number taken!')
    } else {
      console.log(num);
      boardArr.push(num);


      var cell = document.querySelector('div[value=45]');
      cell.innerText = "Success"
      
      
    };
  };

  return {
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
      cell.innerText = 'test';
      cell.value = i;
      cell.addEventListener('click', function() { gameBrain.assignSquare(this.value) });
      container.appendChild(cell);
    };
  };

  return {makeBoard};
})();

// Player factory 

const Player = function(name) {
  return {name};
}

const player1 = Player('playerOne');
const player2 = Player('PlayerTwo');

gameboard.makeBoard();




