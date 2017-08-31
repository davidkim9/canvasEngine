var util = require('util');
var Sprite = require('./Sprite');

/**
 * YSortContainer Class
 * The children of this container will be sorted based off their y position
 */
class YSortContainer extends Sprite {

  constructor(image) {
    super();
  }

  render(context) {
    this.children.sort(function (a, b) {
      return a.point.y - b.point.y;
    });
  };

}

module.exports = YSortContainer;
