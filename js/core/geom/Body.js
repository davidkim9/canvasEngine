/**
 * Body Interface
 */
var method = Body.prototype;

function Body() {}

/**
 * getPoint()
 * This method should return this body's location by point
 */
method.getPoint = function () {};

/**
 * getBounds()
 * This method should return this body's outer square boundary
 */
method.getBounds = function () {};

/**
 * getBoundPoints()
 */
method.getBoundPoints = function () {};

module.exports = Body;
