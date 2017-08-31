var util = require('util');
var Sprite = require('./Sprite');

/**
 * CanvasSprite Class
 * This is just an alias for Sprite to override the render method
 */

class CanvasSprite extends Sprite {

  constructor() {
    super();
  }

  render(context) {
  }

}

module.exports = CanvasSprite;
