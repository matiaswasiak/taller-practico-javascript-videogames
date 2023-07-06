const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

let canvasSize;
let elementsSize;

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

  const map = maps[0];
  const mapRows = map.trim().split("\n");
  const mapRowCols = mapRows.map((row) => row.trim().split(""));

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
    console.log("You win!");
    return;
  }

  const collisionWithEnemy = enemyPosition.some((enemy) => {
    return (
      playerPosition.x.toFixed(3) === enemy.x.toFixed(3) &&
      playerPosition.y.toFixed(3) === enemy.y.toFixed(3)
    );
  });

  if (collisionWithEnemy) {
    console.log("You lose!");
    return;
  }

  game.fillText(
    emojis["PLAYER"],
    elementsSize * (playerPosition.x + 1),
    elementsSize * (playerPosition.y + 1)
  );
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
