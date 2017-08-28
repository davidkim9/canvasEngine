var util = require('util');
var SpriteSheet = require('./SpriteSheet');
var Point = require('../geom/Point');
var Rectangle = require('../geom/Rectangle');

/**
 * AnimatedSpriteSheet constructor
 * @param {[Image]} image AnimatedspriteSheet image reference
 * @param {[Object]} fps spriteWidth spriteHeight startFrame endFrame loop leftPadding topPadding origin
 */
function AnimatedSpriteSheet(image, args) {
  AnimatedSpriteSheet.super_.apply(this, arguments);
  this.animations = args.animations;
}

//AnimatedSpriteSheet extends SpriteSheet
util.inherits(AnimatedSpriteSheet, SpriteSheet);
var method = AnimatedSpriteSheet.prototype;

method.animationPlaying = function(){
  return this.animationLabel;
}

method.playAnimation = function(label){
  this.animationLabel = label;
  var animation = this.animations[label];
  if(animation){
    var offset = animation.column ? this.spritesPerRow * animation.column : 0;
    this.animationStartFrame = offset + animation.startFrame;
    this.animationEndFrame = offset + animation.endFrame;
    this.animationLoop = animation.loop ? animation.loop: false;
    this.frame = this.animationStartFrame;
    this.timeCount = 0;
  }
}

method.nextFrame = function () {
  this.frame++;
  if (this.frame > this.animationEndFrame) {
    if (this.animationLoop) {
      this.frame = this.animationStartFrame;
    }else {
      this.frame = this.animationEndFrame;
    }
  }
  // console.log(this.frame);
};

method.setFrame = function (frame) {
  this.frame = this.animationStartFrame + frame;
};

method.done = function () {
  return !this.animationLoop && this.frame == this.animationEndFrame;
};

module.exports = AnimatedSpriteSheet;