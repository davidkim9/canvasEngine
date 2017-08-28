var util = require('util');

// Not implemented yet

/**
 * Filter Class
 */
class Filter {
  constructor() {
  }

  _render(sprite, context) {
      let width = global.width;
      let height = global.height;
      let filterContext = context.createImageData(width, height);

      context.drawImage(this.image,
        0, 0, this.image.width, this.image.height, -this.origin.x, -this.origin.y,
        this.image.width, this.image.height);
  };
}

module.exports = Filter;
