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

  game.clearRect(0, 0, canvasSize, canvasSize);

  mapRowCols.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (col == "O") {
        if (playerPosition.x === undefined) {
          playerPosition.x = colIndex;
          playerPosition.y = rowIndex;
        }
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
