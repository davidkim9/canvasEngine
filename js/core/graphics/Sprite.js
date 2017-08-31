var Point = require('../geom/Point');
var Rectangle = require('../geom/Rectangle');

/**
 * Sprite Interface
 */
class Sprite {

  constructor() {
    this.children = [];
    this.parent = null;
    this.point = new Point();
    this.rotation = 0;
    this.scale = 1;
    this.scaleX = 1;
    this.scaleY = 1;

    this.opacity = 1;

    // this.parentIndex = -1;
    this.origin = new Point();
    this.filter = '';
  }

  //Protected Methods
  _isVisibleOnScreen() {
    return true;
    this.calculateBounds();
    if (!this.lastBounds) {
      return false;
    }

    return this.lastBounds[1].x + global.renderPadding >= 0 &&
            this.lastBounds[1].y + global.renderPadding >= 0 &&
            this.lastBounds[0].x - global.renderPadding <= global.width &&
            this.lastBounds[0].y - global.renderPadding <= global.height;
  };

  _applyFilter(context){
    // Fix combining like filters later
    
    // try{
    //   let filters = context.filter.split(' ');
    //   for(let i = 0; i < filters.length; i++){

    //   }
    // }catch(e){
    //   console.log('Invalid Filter: ', this.filter);
    // }
    
    if(context.filter != 'none'){
      context.filter += ' ' + this.filter;
    }else{
      context.filter = this.filter;
    }
  }

  _render(context) {
    // if (this._isVisibleOnScreen()) {
    //Apply Transformations
    var angleInRadians = this.rotation * Math.PI / 180;
    var currentScale = new Point(this.scale * this.scaleX, this.scale * this.scaleY);
    context.translate(this.point.x, this.point.y);
    context.rotate(angleInRadians);
    context.scale(currentScale.x, currentScale.y);

    //opacity
    var beforeAlpha = context.globalAlpha;
    context.globalAlpha *= this.opacity;

    let prevFilter = context.filter;
    this._applyFilter(context);

    this.render(context);

    //Render children
    for (var i = 0; i < this.children.length; i++) {
      this.children[i]._render(context);
    }

    context.filter = prevFilter;

    context.globalAlpha = beforeAlpha;

    context.scale(1 / currentScale.x, 1 / currentScale.y);
    context.rotate(-angleInRadians);
    context.translate(-this.point.x, -this.point.y);
    // }
  };

  render(context) {

  };

  calculateBounds() {
    this.lastBounds = this.getBounds();

    // console.log(this.lastBounds);
  };

  addChild(sprite) {
    // console.log(sprite.parent);
    if (sprite.parent) {
      sprite.parent.removeChild(sprite);
    }

    // sprite.parentIndex = this.children.length;
    sprite.parent = this;
    this.children.push(sprite);
    this.calculateBounds();
  };

  addChildAt(sprite, index) {
    if (sprite.parent) {
      sprite.parent.removeChild(sprite);
    }

    this.children.splice(index, 0, sprite);
    // sprite.parentIndex = index;
    sprite.parent = this;
    this.calculateBounds();
  };

  contains(sprite) {
    return sprite.parent == this;
  };

  getChildAt(index) {
    return this.children[index];
  };

  getChildIndex(sprite) {
    if (sprite.parent == this) {
      return this.children.indexOf(sprite);
    }
    return -1;
  };

  removeChild(sprite) {
    var index = this.getChildIndex(sprite);
    if (index != -1) {
      
      this.removeChildAt(index);
    }
  };

  removeChildAt(index) {
    // this.children[index].parentIndex = -1;
    this.children[index].parent = null;
    this.children.splice(index, 1);
    this.calculateBounds();
  };

  setChildIndex(sprite, index) {
    this.removeChild(sprite);
    this.addChildAt(index);
  };

  swapChildrenAt(index1, index2) {
    var t = this.children[index1];
    this.children[index1] = this.children[index2];
    this.children[index2] = t;
  };

  removeChildren() {
    for (var i in this.children) {
      this.children[i].parent = null;
    }

    this.children = [];
    this.calculateBounds();
  };

  numChildren() {
    return this.children.length;
  };

  getSpriteBounds() {
    return null;
  };

  getBounds() {
    return;//
    var curBounds = this.getSpriteBounds();
    var bounds = curBounds ? curBounds.getBoundPoints() : null;

    //Render children
    for (var i = 0; i < this.children.length; i++) {
      var r = this.children[i].getBounds();
      if (r != null) {
        if (!bounds) {
          bounds = r;
        }else {
          bounds[0].x = Math.min(bounds[0].x, r[0].x);
          bounds[0].y = Math.min(bounds[0].y, r[0].y);
          bounds[1].x = Math.max(bounds[1].x, r[1].x);
          bounds[1].y = Math.max(bounds[1].y, r[1].y);
        }
      }
    }

    return bounds;
  };

  setPoint(point) {
    this.point = point;
  };

  getPoint() {
    return this.point;
  };

  clone() {
    var obj = new this.constructor();

    //Copy properties
    for (var k in this) obj[k] = this[k];
    return obj;
  };

}

module.exports = Sprite;
