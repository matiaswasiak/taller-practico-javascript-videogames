const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");

window.addEventListener("load", startGame);

function startGame() {
  let canvasSize;

  if (window.innerWidth > window.innerHeight) {
    canvasSize = window.innerHeight * 0.75;
  } else {
    canvasSize = window.innerWidth * 0.75;
  }

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  const elementsSize = canvasSize / 10;

  game.font = `${elementsSize}px Verdana`;

  for (let i = 0; i < elementsSize; i++) {
    game.fillText(emojis["X"], i * elementsSize, elementsSize);
  }
}
