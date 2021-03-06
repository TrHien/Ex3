var N_SIZE = 5,
  EMPTY = "&nbsp;",
  boxes = [],
  turn = "X",
  timerWidth = 0,
  score,
  moves;

function init() {
  /*
    var boardSize = prompt('Please enter board size:', '3');
    if (boardSize === null || boardSize === '') {
        boardSize = N_SIZE;
    } else {
        N_SIZE = parseInt(boardSize, 10);
    }
    */

  var board = document.getElementById("board");

  var identifier = 1;
  for (var i = 0; i < N_SIZE; i++) {
    var row = document.createElement("div");
    row.classList.add("row");
    board.appendChild(row);
    for (var j = 0; j < N_SIZE; j++) {
      var cell = document.createElement("div");
      cell.classList.add("col", "s" + parseInt(12 / N_SIZE));
      cell.classList.add("col" + j, "row" + i);
      if (i == j) {
        cell.classList.add("diagonal0");
      }
      if (j == N_SIZE - i - 1) {
        cell.classList.add("diagonal1");
      }

      cell.identifier = identifier;
      cell.addEventListener("click", set);
      row.appendChild(cell);
      boxes.push(cell);
      identifier += identifier;
    }
  }

  startNewGame();
  progressBar();
}

function startNewGame() {
  score = {
    X: 0,
    O: 0
  };
  moves = 0;
  turn = "X";
  timerWidth = 0;
  boxes.forEach(function (square) {
    square.innerHTML = EMPTY;
    square.classList.remove("player1", "player2");
  });
}

function win(clicked) {
  var memberOf = clicked.className.split(/\s+/);
  for (var i = 2; i < memberOf.length; i++) {
    var testClass = "." + memberOf[i];

    var items = contains("#board " + testClass, turn);
    if (items.length === N_SIZE) {
      return true;
    }
  }
  return false;
}

function contains(selector, text) {
  var elements = document.querySelectorAll(selector);
  return [].filter.call(elements, function (element) {
    return RegExp(text).test(element.textContent);
  });
}

function progressBar() {
  var progressBar = document.getElementById("myBar");
  var id = setInterval(frame, 100);
  function frame() {
    if (timerWidth >= 100) {
      swapTurn();
    } else {
      timerWidth++;
      progressBar.style.width = timerWidth + "%";
      progressBar.innerHTML = parseInt(timerWidth / 10) + "";
    }
  }
}

function swapTurn() {
  if (turn === "X") {
    turn = "O";
    document.getElementById("turn").textContent = "Player 2";
  } else {
    turn = "X";
    document.getElementById("turn").textContent = "Player 1";
  }
  timerWidth = 0;
}

function set() {
  if (this.innerHTML !== EMPTY) {
    return;
  }
  this.innerHTML = turn;
  moves += 1;
  score[turn] += this.identifier;
  if (win(this)) {
    turn = turn === "X" ? alert("Player 1 won!") : alert("Player 2 won!");
    startNewGame();
  } else if (moves === N_SIZE * N_SIZE) {
    alert("Draw");
    startNewGame();
  } else {
    if (turn === "X") {
      this.classList.add("player1");
      console.log("X: " + this.className);
    } else {
      this.classList.add("player2");
      console.log("O: " + this.className);
    }
    swapTurn();
  }
}

init();
