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

  for (let i = 0; i < elementsSize; i++) {
    for (let j = 0; j < elementsSize; j++) {
      game.fillText(emojis["X"], i * elementsSize, j * elementsSize);
    }
    game.fillText(emojis["X"], i * elementsSize, elementsSize);
  }
}
