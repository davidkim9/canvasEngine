var config = require('../config');
var Loader = require('./Loader');
var Sprite = require('./graphics/Sprite');

/**
 * Core Class
 */
var method = Core.prototype;

function Core(context, main) {
  this.context = context;
  this.gameState = {};
  this.loader = new Loader();

  this.stage = new Sprite();

  this.main = main;

  //Easier to see the framerate
  this.fpsSample = 0;
  this.fpsSampleMax = 5;
  this.averageFPS = 0;
  this.fpsLastAverage = 0;
}

method.init = function () {
  this.main.init(this.stage, this.loader);
};

method.gameStep = function (dt) {
  //Process game logic
  this.main.update(dt);
};

method.render = function (dt) {

  var context = this.context;
  // context.clearRect(0, 0, canvas.width, canvas.height);
  context.rect(0, 0, canvas.width, canvas.height);
  context.fillStyle = '#000';
  context.fill();

  //Render logic
  this.stage._render(context);

  if (global.showFPS) {
    if (dt == 0) return;
    this.averageFPS += Math.round(1 / dt);
    if (this.fpsSample >= this.fpsSampleMax) {
      this.fpsSample = 0;
      this.fpsLastAverage = Math.round(this.averageFPS / this.fpsSampleMax);
      this.averageFPS = 0;
    }

    context.lineWidth = 4;
    context.strokeStyle = '#000000';
    context.fillStyle = '#FF0';
    context.font = '30px Arial';
    context.strokeText(this.fpsLastAverage, 15, 35);
    context.fillText(this.fpsLastAverage, 15, 35);
    this.fpsSample++;
  }
};

method.update = function (dt) {
  this.gameStep(dt);
  this.render(dt);
};

module.exports = Core;
