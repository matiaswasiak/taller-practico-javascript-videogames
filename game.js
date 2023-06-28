const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

let canvasSize;
let elementsSize;

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

  mapRowCols.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      game.fillText(
        emojis[col],
        elementsSize * (colIndex + 1),
        elementsSize * (rowIndex + 1)
      );
    });
  });
}
