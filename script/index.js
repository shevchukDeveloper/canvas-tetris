import Game from "./game.js";
import View from "./view.js";
const root = document.querySelector("#root");
const game = new Game();
const view = new View(root, 320, window.innerHeight - 115, 20, 10);
window.game = game;
window.view = view;
console.log(game);
document.addEventListener("keydown", (event) => {
  switch (event.keyCode) {
    case 68:
      game.movePieceRight();
      break;
    case 65:
      game.movePieceLeft();
    case 83:
      game.movePieceDown();
    case 87:
      game.rotatePiece();
      break;
  }
  view.render(game.getState());
});
