var util = require('util');
var Sprite = require('./Sprite');
var Point = require('../geom/Point');
var Rectangle = require('../geom/Rectangle');

/**
 * GraphicSprite Class
 */
function GraphicSprite(image) {
  GraphicSprite.super_.apply(this, arguments);
  this.image = image;
  this.origin = new Point();
}

//GraphicSprite extends Sprite
util.inherits(GraphicSprite, Sprite);
var method = GraphicSprite.prototype;

method.render = function (context) {
  // var p = this.getOffset();
  // var s = this.getScale();

  context.drawImage(this.image,
    0, 0, this.image.width, this.image.height, -this.origin.x, -this.origin.y,
    this.image.width, this.image.height);
};

method.getSpriteBounds = function () {
  return new Rectangle(this.point.x, this.point.y, this.image.width, this.image.height);
};

module.exports = GraphicSprite;
