var util = require('util');
var graphics = require('../../core/graphics');
var geom = require('../../core/geom');

/**
 * TestRect Class
 */

function TestRect() {
  var rect = new geom.Rectangle(new geom.Point(0, 0), new geom.Vector(100, 100));
  var rectangleSprite = new graphics.ShapeSprite(rect, null, '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16), null);
  rectangleSprite.origin.x = 5;
  rectangleSprite.origin.y = 5;
  rectangleSprite.point.x = Math.random() * global.width;
  rectangleSprite.point.y = Math.random() * global.height;

  this.rectangleSprite = rectangleSprite;
  var speed = 5;

  this.velocity = new geom.Vector(-speed + Math.random() * speed * 2, -speed + Math.random() * speed * 2);
}

var method = TestRect.prototype;

method.update = function (dt) {
  this.rectangleSprite.point.add(this.velocity);
  if (this.rectangleSprite.point.x < -100 || this.rectangleSprite.point.x > global.width) {
    this.velocity.x *= -1;
  }

  if (this.rectangleSprite.point.y < -100 || this.rectangleSprite.point.y > global.height) {
    this.velocity.y *= -1;
  }
};

method.getShape = function () {
  return this.rectangleSprite;
};

module.exports = TestRect;
