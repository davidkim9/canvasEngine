var util = require('util');
var Body = require('./Body');
var Point = require('./Point');
var Vector = require('./Vector');
var Rectangle = require('./Rectangle');

/**
 * Circle Class
 * Parameters: Point, Vector
 */
function Circle(p, r) {
  Circle.super_.apply(this, arguments);
  if (!p) p = new Point();
  if (!r) r = 0;
  this.p = p;

  // console.log("circle", this.p);
  this.r = Math.max(0, r);
}

//Circle extends Body
util.inherits(Circle, Body);
var method = Circle.prototype;

/**
 * getPoint()
 * This method should return this Circle's location
 */
method.getPoint = function () {
  return this.p;
};

/**
 * getBoundPoints()
 */
method.getBoundPoints = function () {
  var minX = this.p.x - this.r;
  var minY = this.p.y - this.r;
  var maxX = this.p.x + this.r;
  var maxY = this.p.y + this.r;
  return [new Point(minX, minY), new Point(maxX, maxY)];
};

/**
 * getBounds()
 * This method should return this Circle's outer square boundary
 */
method.getBounds = function () {
  var minX = this.p.x - this.r;
  var minY = this.p.y - this.r;
  return new Rectangle(new Point(minX, minY), new Vector(this.r * 2, this.r * 2));
};

module.exports = Circle;
