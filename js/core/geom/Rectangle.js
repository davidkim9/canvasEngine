var util = require('util');
var Body = require('./Body');
var Point = require('./Point');
var Vector = require('./Vector');

/**
 * Rectangle Class
 * Parameters: Point, Vector
 */
class Rectangle extends Body {
  constructor(p = new Point(), v = new Vector()) {
    super();

    this.p = p;
    this.v = v;
  }
  /**
   * getPoint()
   * This method should return this Rectangle's location
   */
  getPoint() {
    return this.p;
  };

  /**
   * getBoundPoints()
   * This method should return this Rectangle's location by Point
   */
  getBoundPoints() {
    var minX = this.p.x;
    var minY = this.p.y;
    var maxX = this.p.x + this.v.x;
    var maxY = this.p.y + this.v.y;
    var t;
    if (minX > maxX) {
      t = minX;
      minX = maxX;
      maxX = t;
    }

    if (minY > maxY) {
      t = minY;
      minY = maxY;
      maxY = t;
    }

    return [new Point(minX, minY), new Point(maxX, maxY)];
  };

  /**
   * getBounds()
   * This method should return this Rectangle's outer square boundary
   */
  getBounds() {
    return this;
  };
}


module.exports = Rectangle;

// /**
//  * getBounds()
//  * This method should return this Vector's direction from the origin
//  */
// method.getBounds = function(){
//   return new Rectangle(new Point(0, 0), new Vector(this.x, this.y));
// }

// method.crossProductLength = function(v) {
//   return this.x * v.y - this.y * v.x;
// }

// method.crossProduct = function() {
//   return new Vector(-this.y, this.x);
// }

// module.exports = Vector;
