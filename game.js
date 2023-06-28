const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

let canvasSize;
let elementsSize;

function setCanvasSize() {
  if (window.innerWidth > window.innerHeight) {
    canvasSize = window.innerHeight * 0.75;
  } else {
    canvasSize = window.innerWidth * 0.75;
  }

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  elementsSize = canvasSize / 10;

  startGame();
}

function startGame() {
  game.font = `${elementsSize}px Verdana`;
  game.textAlign = "end";

  const map = maps[1];
  const mapRows = map.trim().split("\n");
  const mapRowCols = mapRows.map((row) => row.trim().split(""));
  console.log({ map, mapRows, mapRowCols });

  for (let row = 1; row <= 10; row++) {
    for (let col = 1; col <= 10; col++) {
      game.fillText(
        emojis[mapRowCols[row - 1][col - 1]],
        elementsSize * col,
        elementsSize * row
      );
    }
  }
}
