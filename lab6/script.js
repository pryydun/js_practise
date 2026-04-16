(function () {
  const boardElement = document.getElementById("board");
  const movesElement = document.getElementById("moves");
  const timerElement = document.getElementById("timer");
  const targetElement = document.getElementById("target");
  const messageElement = document.getElementById("message");
  const newGameBtn = document.getElementById("newGameBtn");
  const restartBtn = document.getElementById("restartBtn");

  let puzzles = [];
  let currentPuzzle = null;
  let currentGrid = [];
  let initialGrid = [];
  let moves = 0;
  let seconds = 0;
  let timerInterval = null;
  let lastPuzzleId = null;
  let lastClick = null;
  let sameClick=false;

  function loadPuzzles() {
    const request = new XMLHttpRequest();
    request.open("GET", "data/puzzles.json", true);

  request.onreadystatechange = function () {
      if (request.readyState === 4) {
        if (request.status === 200) {
          puzzles = JSON.parse(request.responseText);
          startNewGame();
        } else {
          messageElement.textContent = "Помилка завантаження JSON-файлу.";
        }
      }
    };

    request.send();
  }

  function copyGrid(grid) {
    return grid.map(function (row) {
      return [...row];
    });
  }

  function startTimer() {
    clearInterval(timerInterval);
    seconds = 0;
    timerElement.textContent = seconds;

    timerInterval = setInterval(function () {
      seconds++;
      timerElement.textContent = seconds;
    }, 1000);
  }

  function resetStats() {
    moves = 0;
    sameClick = false;
    lastClick = null;
    movesElement.textContent = moves;
    messageElement.textContent = "";
    startTimer();
  }

  function getRandomPuzzle() {
    let availablePuzzles = puzzles.filter(function (puzzle) {
      return puzzle.id !== lastPuzzleId;
    });

    let randomIndex = Math.floor(Math.random() * availablePuzzles.length);
    return availablePuzzles[randomIndex];
  }

  function startNewGame() {
    currentPuzzle = getRandomPuzzle();
    lastPuzzleId = currentPuzzle.id;

    initialGrid = copyGrid(currentPuzzle.grid);
    currentGrid = copyGrid(currentPuzzle.grid);

    targetElement.textContent = currentPuzzle.target;
    resetStats();
    renderBoard();
  }

  function restartGame() {
    currentGrid = copyGrid(initialGrid);
    resetStats();
    renderBoard();
  }

  function toggleCell(row, col) {
    if (row >= 0 && row < 5 && col >= 0 && col < 5) {
      if (currentGrid[row][col] === 1) {
    currentGrid[row][col] = 0;
  } else {
    currentGrid[row][col] = 1;
  }
    }
  }

  function handleCellClick(row, col) {
    toggleCell(row, col);
    toggleCell(row - 1, col);
    toggleCell(row + 1, col);
    toggleCell(row, col - 1);
    toggleCell(row, col + 1);

    if (lastClick && lastClick.row === row && lastClick.col === col&&sameClick===false) {
      moves--;
      sameClick=true;
      if (moves < 0) {
        moves = 0;
      }
    } else {
      moves++;
      sameClick=false;
    }

    lastClick = { row: row, col: col };
    movesElement.textContent = moves;

    renderBoard();
    checkWin();
  }

  function renderBoard() {
    boardElement.innerHTML = "";

    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        const cell = document.createElement("div");
        cell.className = "cell " + (currentGrid[row][col] === 1 ? "on" : "off");

        cell.addEventListener("click", function () {
          handleCellClick(row, col);
        });

        boardElement.appendChild(cell);
      }
    }
  }

  function checkWin() {
    let isWin = currentGrid.every(function (row) {
      return row.every(function (cell) {
        return cell === 0;
      });
    });

    if (isWin) {
      clearInterval(timerInterval);

      if (moves === currentPuzzle.target) {
        messageElement.textContent = "Перемога! Розв’язано за мінімальну кількість ходів!";
      } else {
        messageElement.textContent =
          "Перемога! Твої ходи: " + moves + ". Мінімум: " + currentPuzzle.target + ".";
      }
    }
  }

  newGameBtn.addEventListener("click", startNewGame);
  restartBtn.addEventListener("click", restartGame);

  loadPuzzles();
})();