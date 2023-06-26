const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");

window.addEventListener("load", startGame);

function startGame() {
  // game.fillRect(0, 0, 100, 100);
  // game.clearRect(10, 10, 80, 80);
  // game.strokeRect(20, 20, 60, 60);

  game.font = "25px Verdana";
  game.fillStyle = "red";
  game.fillText("Hello World", 10, 50);
}
