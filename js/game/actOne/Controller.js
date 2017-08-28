/**
 * Controller Class
 */
class Controller {
  constructor(){
    this.keysPressed = {};
    document.addEventListener('keydown', this.keydown.bind(this));
    document.addEventListener('keyup', this.keyup.bind(this));

    let canvas = document.getElementById('gameCanvas');
    canvas.addEventListener('mousedown', this.onMousedown.bind(this));
    canvas.addEventListener('mouseup', this.onMouseup.bind(this));

    canvas.addEventListener('mousemove', this.onMousemove.bind(this));
    
    this.mousedown = false;
  }

  onMousedown(e) {
   this.mousedown = true;
  };

  onMouseup(e) {
    this.mousedown = false;
  };

  onMousemove(e) {
    this.mouseX = e.offsetX;
    this.mouseY = e.offsetY;
  };

  keydown(e) {
    this.keysPressed[e.keyCode] = true;
  };

  keyup(e) {
    delete this.keysPressed[e.keyCode];
  };

  update(dt) {
    if(global.paused) return;

    this.player.resetMove();
    if(this.keysPressed[38] || this.keysPressed[87]){
      // up
      // this.player.move(0);
    }
    if(this.keysPressed[39] || this.keysPressed[68]){
      // right
      // this.player.move(1);
    }
    if(this.keysPressed[40] || this.keysPressed[83]){
      // down
      // this.player.move(2);
    }
    if(this.keysPressed[37] || this.keysPressed[65]){
      // left
      // this.player.move(3);
    }
  };
}
module.exports = Controller;
