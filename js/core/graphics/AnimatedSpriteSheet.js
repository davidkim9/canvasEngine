var util = require('util');
var SpriteSheet = require('./SpriteSheet');
var Point = require('../geom/Point');
var Rectangle = require('../geom/Rectangle');

/**
 * AnimatedSpriteSheet constructor
 * @param {[Image]} image AnimatedspriteSheet image reference
 * @param {[Object]} fps spriteWidth spriteHeight startFrame endFrame loop leftPadding topPadding origin
 */
class AnimatedSpriteSheet extends SpriteSheet {

  constructor(image, args) {
    super();
    this.animations = args.animations;
  }

  animationPlaying (){
    return this.animationLabel;
  }

  playAnimation (label){
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

  nextFrame () {
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

  setFrame (frame) {
    this.frame = this.animationStartFrame + frame;
  };

  done () {
    return !this.animationLoop && this.frame == this.animationEndFrame;
  };
  
}

module.exports = AnimatedSpriteSheet;