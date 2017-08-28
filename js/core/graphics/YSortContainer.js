var util = require('util');
var Sprite = require('./Sprite');

/**
 * YSortContainer Class
 */
function YSortContainer(image) {
  YSortContainer.super_.apply(this, arguments);
}

//YSortContainer extends Sprite
util.inherits(YSortContainer, Sprite);
var method = YSortContainer.prototype;

method.render = function (context) {
  this.children.sort(function (a, b) {
    return a.point.y - b.point.y;
  });
};

module.exports = YSortContainer;
