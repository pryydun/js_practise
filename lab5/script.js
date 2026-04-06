(function () {
  const difficulty = document.getElementById("difficulty");
  const color = document.getElementById("color");
  const startBtn = document.getElementById("startBtn");
  const scoreEl = document.getElementById("score");
  const timerEl = document.getElementById("timer");
  const gameArea = document.getElementById("gameArea");
  const target = document.getElementById("target");

  let score = 0;
  let timeLeft = 0;
  let countdown;
  let timeout;
  let gameActive = false;

  const settings = {
    easy: { time: 4, size: 60 },
    medium: { time: 2, size: 50 },
    hard: { time: 1, size: 40 }
  };

  function updateInfo() {
    scoreEl.textContent = "Score: " + score;
    timerEl.textContent = "Time: " + timeLeft;
  }

  function clearTimers() {
    clearInterval(countdown);
    clearTimeout(timeout);
  }

  function moveTarget(size) {
    const x = Math.floor(Math.random() * (gameArea.clientWidth - size));
    const y = Math.floor(Math.random() * (gameArea.clientHeight - size));

    target.style.left = x + "px";
    target.style.top = y + "px";
  }

  function endGame() {
    gameActive = false;
    clearTimers();
    alert("Game Over! Your score: " + score);
  }

  function startRound() {
    clearTimers();

    const current = settings[difficulty.value];
    timeLeft = current.time;

    target.style.width = current.size + "px";
    target.style.height = current.size + "px";

    moveTarget(current.size);
    updateInfo();

    countdown = setInterval(() => {
      timeLeft--;
      timerEl.textContent = "Time: " + timeLeft;

      if (timeLeft <= 0) {
        clearInterval(countdown);
      }
    }, 1000);

    timeout = setTimeout(endGame, current.time * 1000);
  }

  function startGame() {
    if (!difficulty.value || !color.value) {
      alert("Please choose difficulty and color.");
      return;
    }

    score = 0;
    gameActive = true;
    target.style.display = "block";
    target.style.backgroundColor = color.value;

    startRound();
    updateInfo();
  }

  startBtn.addEventListener("click", startGame);

  target.addEventListener("click", () => {
    if (!gameActive) return;

    score++;
    startRound();
    updateInfo();
  });
})();