var util = require('util');
var Sprite = require('./Sprite');
var geom = require('../geom');

/**
 * ShapeSprite Class
 */
class ShapeSprite extends Sprite {

  constructor(body, strokeStyle, fillStyle, lineWidth) {
    super();
    this.body = body;
    this.strokeStyle = strokeStyle;// ? strokeStyle : '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
    this.fillStyle = fillStyle ? fillStyle : '#' + (Math.round(Math.random() * 0xFFFFFF).toString(16) + "0").substring(0, 6);
    this.lineWidth = lineWidth ? lineWidth : 1;
    this.origin = new geom.Point();
  }

  render(context) {
    context.beginPath();

    if (this.body instanceof geom.Point || this.body instanceof geom.Vector) {
      context.arc(this.body.x - this.origin.x, this.body.y - this.origin.y, 1, 0, 2 * Math.PI);
    }else if (this.body instanceof geom.Line) {
      context.moveTo(this.body.p.x - this.origin.x, this.body.p.y - this.origin.y);
      context.lineTo(this.body.p.x - this.origin.x + this.body.v.x, this.body.p.y - this.origin.y + this.body.v.y);
    }else if (this.body instanceof geom.Rectangle) {
      context.rect(this.body.p.x - this.origin.x, this.body.p.y - this.origin.y, this.body.v.x, this.body.v.y);
    }else if (this.body instanceof geom.Circle) {
      context.arc(this.body.p.x - this.origin.x, this.body.p.y - this.origin.y, this.body.r, 0, 2 * Math.PI);
    }else if  (this.body instanceof geom.Polygon) {
      let point = this.body.p.clonePoint();
      context.moveTo(point.x - this.origin.x, point.y - this.origin.y);
      for (let i = 0; i < this.body.v.length; i++) {
        point.add(this.body.v[i]);
        context.lineTo(point.x - this.origin.x, point.y - this.origin.y);
      }
    }

    context.strokeStyle = this.strokeStyle;
    context.lineWidth = this.lineWidth;

    if (this.strokeStyle && this.lineWidth) {
      context.stroke();
    }

    context.fillStyle = this.fillStyle;

    if (this.fillStyle)
      context.fill();

    context.closePath();
  };

  getSpriteBounds() {
    var rect = this.body.getBounds();
    var p = rect.p.clonePoint();
    p.add(this.point);
    var v = rect.v.cloneVector();
    return new geom.Rectangle(p, v);
  };
  
}

module.exports = ShapeSprite;
