var util = require('util');
var Point = require('./Point');
var Rectangle = require('./Rectangle');

/**
 * Vector Class
 */
class Vector extends Point {
  constructor(x, y) {
    super(x, y);
  }

  /**
   * getBounds()
   * This method should return this Vector's direction from the origin
   */
  getBounds() {
    return new Rectangle(new Point(0, 0), new Vector(this.x, this.y));
  };

  crossProductLength(v) {
    return this.x * v.y - this.y * v.x;
  };

  crossProduct() {
    return new Vector(-this.y, this.x);
  };
}

module.exports = Vector;
