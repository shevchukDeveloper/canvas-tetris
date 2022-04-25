export default class Controller {
  constructor(game, view) {
    this.game = game;
    this.view = view;
    this.isPlaying = false;
    this.intervalId = null;

    document.addEventListener("keydown", this.handleKeyDown.bind(this));
    document.addEventListener("keyup", this.handleKeyUp.bind(this));
    this.view.renderStartScreen();
  }

  update() {
    this.game.movePieceDown();
    this.updateView();
  }
  play() {
    this.isPlaying = true;
    this.startTimer();
    this.updateView();
  }
  pause() {
    this.isPlaying = false;
    this.stopTimer();
    this.updateView();
  }
  reset() {
    this.game.reset();
    this.play();
  }
  updateView() {
    const state = this.game.getState();
    if (state.isGameOver) {
      this.view.renderEndScreen(state);
    } else if (!this.isPlaying) {
      this.view.renderPauseScreen();
    } else {
      this.view.renderMainScreen(state);
    }
  }
  startTimer() {
    const speed = 1000 - this.game.getState().level * 100;
    if (!this.intervalId) {
      this.intervalId = setInterval(
        () => {
          this.update();
        },
        speed > 0 ? speed : 100
      );
    }
  }
  stopTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
  handleKeyDown(event) {
    const state = this.game.getState();
    switch (event.keyCode) {
      case 13:
        if (state.isGameOver) {
          this.reset();
        } else if (this.isPlaying) {
          this.pause();
        } else {
          this.play();
        }
        break;
      case 68:
      case 39:
        this.game.movePieceRight();
        break;
      case 65:
      case 37:
        this.game.movePieceLeft();
        break;
      case 83:
      case 40:
        this.stopTimer();
        this.game.movePieceDown();
        this.updateView();
        break;
      case 87:
      case 38:
        this.game.rotatePiece();
        break;
    }
    this.updateView();
  }
  handleKeyUp(event) {
    switch (event.keyCode) {
      case 83:
      case 40:
        this.startTimer();
        break;
    }
    this.updateView();
  }
}
