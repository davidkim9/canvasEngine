var util = require('util');
var core = require('../../core');
var Sprite = core.graphics.Sprite;

var TestRect = require('./TestRect');
var Scene = require('../Scene');
/**
 * Demo Class
 */
var method = Demo.prototype;

function Demo() {
  this.container = new Sprite();

  this.rectangleSprites = [];
  for (var i = 0; i < 100; i++) {
    var rect = new TestRect();

    this.container.addChild(rect.getShape());
    this.rectangleSprites.push(rect);
  }
}

//Demo extends Scene
util.inherits(Demo, Scene);
var method = Demo.prototype;

method.update = function (dt) {
  // Process game logic
  for (var i = 0; i < this.rectangleSprites.length; i++) {
    this.rectangleSprites[i].update(dt);
  }
};

method.getSprite = function () {
  return this.container;
};

module.exports = Demo;
