const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");
const spanLives = document.querySelector("#lives");
const spanTime = document.querySelector("#time");

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;

let timeStart;
let timeInterval;

const playerPosition = {
  x: undefined,
  y: undefined,
};

const giftPosition = {
  x: undefined,
  y: undefined,
};

let enemyPosition = [];

function setCanvasSize() {
  if (window.innerWidth > window.innerHeight) {
    canvasSize = window.innerHeight * 0.8;
  } else {
    canvasSize = window.innerWidth * 0.8;
  }

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  elementsSize = canvasSize / 10;

  startGame();
}

function startGame() {
  game.font = `${elementsSize}px Verdana`;
  game.textAlign = "end";

  const map = maps[level];

  if (!map) {
    gameWin();
    return;
  }

  if (!timeStart) {
    timeStart = Date.now();
    timeInterval = showTime();
  }

  const mapRows = map.trim().split("\n");
  const mapRowCols = mapRows.map((row) => row.trim().split(""));

  showLives();

  enemyPosition = [];
  game.clearRect(0, 0, canvasSize, canvasSize);

  mapRowCols.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (col == "O") {
        if (playerPosition.x === undefined) {
          playerPosition.x = colIndex;
          playerPosition.y = rowIndex;
        }
      } else if (col == "I") {
        giftPosition.x = colIndex;
        giftPosition.y = rowIndex;
      } else if (col == "X") {
        enemyPosition.push({
          x: colIndex,
          y: rowIndex,
        });
      }

      game.fillText(
        emojis[col],
        elementsSize * (colIndex + 1),
        elementsSize * (rowIndex + 1)
      );
    });
  });

  movePlayer();
}

function movePlayer() {
  const collisionWithGift =
    playerPosition.x.toFixed(3) === giftPosition.x.toFixed(3) &&
    playerPosition.y.toFixed(3) === giftPosition.y.toFixed(3);

  if (collisionWithGift) {
    levelWin();
  }

  const collisionWithEnemy = enemyPosition.some((enemy) => {
    return (
      playerPosition.x.toFixed(3) === enemy.x.toFixed(3) &&
      playerPosition.y.toFixed(3) === enemy.y.toFixed(3)
    );
  });

  if (collisionWithEnemy) {
    levelFail();
  }

  game.fillText(
    emojis["PLAYER"],
    elementsSize * (playerPosition.x + 1),
    elementsSize * (playerPosition.y + 1)
  );
}

function levelWin() {
  console.log("You win!");
  level++;
  startGame();
}

function levelFail() {
  console.log("You crashed!");
  lives--;

  if (lives <= 0) {
    level = 0;
    lives = 3;
    timeStart = Date.now();
  }

  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
}

function gameWin() {
  console.log("You win the game!");

  // stops the time
  clearInterval(timeInterval);
}

function showLives() {
  const heartsArray = Array(lives).fill(emojis["HEART"]);

  spanLives.innerText = heartsArray.map((heart) => heart).join(" ");
}

function showTime() {
  return setInterval(() => {
    const timeNow = Date.now();
    const timeDiff = timeNow - timeStart;

    const timeFormatted = new Date(timeDiff).toISOString().slice(14, -1);

    spanTime.innerText = timeFormatted;
  }, 10);
}

window.addEventListener("keydown", move);
btnUp.addEventListener("click", moveUp);
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);
btnDown.addEventListener("click", moveDown);

function move(event) {
  switch (event.key) {
    // UP
    case "ArrowUp":
      moveUp();
      break;
    case "w":
      moveUp();
      break;

    // LEFT
    case "ArrowLeft":
      moveLeft();
      break;
    case "a":
      moveLeft();
      break;

    // RIGHT
    case "ArrowRight":
      moveRight();
      break;
    case "d":
      moveRight();
      break;

    // DOWN
    case "ArrowDown":
      moveDown();
      break;
    case "s":
      moveDown();
      break;
  }
}

function moveUp() {
  if (playerPosition.y === 0) {
    return;
  }

  playerPosition.y--;
  startGame();
}

function moveLeft() {
  if (playerPosition.x === 0) {
    return;
  }

  playerPosition.x--;
  startGame();
}

function moveRight() {
  if (playerPosition.x === 9) {
    return;
  }

  playerPosition.x++;
  startGame();
}

function moveDown() {
  if (playerPosition.y === 9) {
    return;
  }

  playerPosition.y++;
  startGame();
}
