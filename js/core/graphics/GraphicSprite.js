var util = require('util');
var Sprite = require('./Sprite');
var Point = require('../geom/Point');
var Rectangle = require('../geom/Rectangle');

/**
 * GraphicSprite Class
 */
class GraphicSprite extends Sprite {

  constructor(image) {
    super();
    this.image = image;
    this.origin = new Point();
  }

  render(context) {
    context.drawImage(this.image,
      0, 0, this.image.width, this.image.height, -this.origin.x, -this.origin.y,
      this.image.width, this.image.height);
  }

  getSpriteBounds() {
    return new Rectangle(this.point.x, this.point.y, this.image.width, this.image.height);
  }
  
}

module.exports = GraphicSprite;
