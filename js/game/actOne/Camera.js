var core = require('../../core');
var Point = core.geom.Point;

/**
 * Camera Class
 */
class Camera {
  constructor() {
    this.point = new Point(0, 0);
    this.zoom = 1;
  }
}

module.exports = Camera;
