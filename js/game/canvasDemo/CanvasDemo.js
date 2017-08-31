var core = require('../../core');
var Scene = require('../Scene');
var geom = core.geom;

var Point = core.geom.Point;
var Vector = core.geom.Vector;
var Line = core.geom.Line;

var graphics = core.graphics;
var Sprite = core.graphics.Sprite;

var SpectrumSprite = require('./SpectrumSprite');

var loadSounds = require('../sounds.json');

/**
 * CanvasDemo Class
 */
class CanvasDemo extends Scene {

  constructor(stage, loader) {
    super();

    this.container = new Sprite();

    var sound = loader.get("music");
    sound.play();

    var spectrumSprite = new SpectrumSprite(sound);
    this.container.addChild(spectrumSprite);
  }

  update (dt) {
  };

  getSprite () {
    return this.container;
  };
}


module.exports = CanvasDemo;
