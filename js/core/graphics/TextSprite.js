var util = require('util');
var Sprite = require('./Sprite');
var geom = require('../geom');

/**
 * TextSprite Class
 */
class TextSprite extends Sprite{
  constructor(text, font, strokeStyle, fillStyle, lineWidth) {
    super();
    this.strokeStyle = strokeStyle ? strokeStyle: "#000";
    this.fillStyle = fillStyle ? fillStyle : '#fff';
    this.lineWidth = lineWidth ? lineWidth : 1;
    this.font = font ? font : '30px Arial';
    this.origin = new geom.Point();
    this.text = text;
  }

  render(context) {
    context.strokeStyle = this.strokeStyle;
    context.fillStyle = this.fillStyle;
    context.lineWidth = this.lineWidth;
    context.font = this.font;
    if (this.strokeStyle && this.lineWidth) {
      context.strokeText(this.text, -this.origin.x, -this.origin.y);
    }
    if (this.fillStyle) {
      context.fillText(this.text, -this.origin.x, -this.origin.y);
    }
  };

  getSpriteBounds() {
    var rect = this.body.getBounds();
    var p = rect.p.clonePoint();
    p.add(this.point);
    var v = rect.v.cloneVector();
    return new geom.Rectangle(p, v);
  };
}

module.exports = TextSprite;
