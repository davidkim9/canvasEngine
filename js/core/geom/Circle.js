var util = require('util');
var Body = require('./Body');
var Point = require('./Point');
var Vector = require('./Vector');
var Rectangle = require('./Rectangle');

/**
 * Circle Class
 * Parameters: Point, Vector
 */
 class Circle extends Body {

  constructor(p = new Point(), r = 0) {
    super();
    this.p = p;
    this.r = Math.max(0, r);
  }


  /**
   * getPoint()
   * This method should return this Circle's location
   */
  getPoint() {
    return this.p;
  }

  /**
   * getBoundPoints()
   */
  getBoundPoints() {
    var minX = this.p.x - this.r;
    var minY = this.p.y - this.r;
    var maxX = this.p.x + this.r;
    var maxY = this.p.y + this.r;
    return [new Point(minX, minY), new Point(maxX, maxY)];
  }

  /**
   * getBounds()
   * This method should return this Circle's outer square boundary
   */
  getBounds() {
    var minX = this.p.x - this.r;
    var minY = this.p.y - this.r;
    return new Rectangle(new Point(minX, minY), new Vector(this.r * 2, this.r * 2));
  }
}

module.exports = Circle;
