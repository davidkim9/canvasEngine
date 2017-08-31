var util = require('util');
var Sprite = require('./Sprite');
var Point = require('../geom/Point');
var Rectangle = require('../geom/Rectangle');

/**
 * SpriteSheet constructor
 * @param {[Image]} image spritesheet image reference
 * @param {[Object]} fps spriteWidth spriteHeight startFrame endFrame loop leftPadding topPadding origin
 */
class SpriteSheet extends Sprite {
  
  constructor(image, args) {
    super();
    this.image = image;

    this.fps = args.fps ? args.fps : 10;
    this.spriteWidth = args.spriteWidth ? args.spriteWidth : 128;
    this.spriteHeight = args.spriteHeight ? args.spriteHeight : 128;
    this.startFrame = args.startFrame ? args.startFrame : 0;
    this.endFrame = args.endFrame ? args.endFrame : 1;
    this.loop = args.loop ? args.loop : false;
    this.leftPadding = args.leftPadding ? args.leftPadding : 0;
    this.topPadding = args.topPadding ? args.topPadding : 0;
    this.origin = args.origin ? args.origin : new Point();

    this.timeCount = 0;
    this.timePerFrame = 1000 / this.fps;
    this.imageWidth = image.width;
    this.imageHeight = image.height;
    this.frame = this.startFrame;

    this.spritesPerRow = parseInt(this.imageWidth / this.spriteWidth);
    this.spritesPerCol = parseInt(this.imageHeight / this.spriteHeight);
  }

  render(context) {
    var sx = (this.frame % this.spritesPerRow) * this.spriteWidth + this.leftPadding;
    var sy = parseInt(this.frame / this.spritesPerRow) * this.spriteHeight + this.topPadding;
    context.drawImage(this.image, sx, sy, this.spriteWidth, this.spriteHeight, -this.origin.x, -this.origin.y, this.spriteWidth, this.spriteHeight);
  };

  getSpriteBounds() {
    return new Rectangle(this.point.x, this.point.y, this.image.width, this.image.height);
  };

  setFrame(frame) {
    this.frame = this.startFrame + frame;
  };

  nextFrame() {
    this.frame++;
    if (this.frame > this.endFrame) {
      if (this.loop) {
        this.frame = this.startFrame;
      }else {
        this.frame = this.endFrame;
      }
    }
  };

  done() {
    return !this.loop && this.frame == this.endFrame;
  };

  play(dt) {
    this.timeCount += dt * 1000;
    if (this.timeCount > this.timePerFrame) {
      this.nextFrame();
      this.timeCount %= this.timePerFrame;
    }
  };
}

module.exports = SpriteSheet;
