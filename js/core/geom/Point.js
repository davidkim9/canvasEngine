var util = require('util');
var Body = require('./Body');

var Rectangle;
var Vector;

/**
 * Point Class
 */
class Point extends Body {
  constructor(x, y) {
    super();
    if (!x) x = 0;
    if (!y) y = 0;

    this.x = x;
    this.y = y;

    // These must be loaded here because of a circular dependency
    Vector = Vector ? Vector : require('./Vector');
    Rectangle = Rectangle ? Rectangle : require('./Rectangle');
  }

  /**
   * getPoint()
   * This method should return this Point's location by point
   */
  getPoint() {
    return this;
  };

  /**
   * getBounds()
   * This method should return this Point's outer square boundary
   */
  getBounds() {
    return new Rectangle(new Point(this.x, this.y), new Vector(0, 0));
  };

  getBoundPoints() {
    return [new Point(this.x, this.y), new Point(this.x, this.y)];
  };

  add(p) {
    this.x += p.x;
    this.y += p.y;
  };

  subtract(p) {
    this.x -= p.x;
    this.y -= p.y;
  };

  scalar(n) {
    this.x *= n;
    this.y *= n;
  };

  multiply(p) {
    this.x *= p.x;
    this.y *= p.y;
  };

  dot(v) {
    return this.x * v.x + this.y * v.y;
  };

  distanceSquared(p) {
    return Math.pow(p.x - this.x, 2) + Math.pow(p.y - this.y, 2);
  };

  distance(p) {
    return Math.sqrt(Math.pow(p.x - this.x, 2) + Math.pow(p.y - this.y, 2));
  };

  magnitudeSquared() {
    return this.x * this.x + this.y * this.y;
  };

  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  };

  normalize() {
    var l = this.magnitude();
    this.x = this.x / l;
    this.y = this.y / l;
  };

  clonePoint()
  {
    return new Point(this.x, this.y);
  };

  cloneVector()
  {
    var Vector = require('./Vector');
    return new Vector(this.x, this.y);
  };
}

module.exports = Point;
