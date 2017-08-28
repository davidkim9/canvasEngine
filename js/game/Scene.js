var core = require('../core');
var Sprite = core.graphics.Sprite;

/**
 * Scene Class
 */
class Scene {
  constructor(){
    this.container = new Sprite();
  }

  update(dt) {
  }

  getSprite() {
    return this.container;
  }
}

module.exports = Scene;
