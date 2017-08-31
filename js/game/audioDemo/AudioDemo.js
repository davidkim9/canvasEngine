var core = require('../../core');
var Scene = require('../Scene');
var geom = core.geom;

var Point = core.geom.Point;
var Vector = core.geom.Vector;
var Line = core.geom.Line;

var graphics = core.graphics;
var Sprite = core.graphics.Sprite;

var loadSounds = require('../sounds.json');

/**
 * AudioDemo Class
 */
class AudioDemo extends Scene {

  constructor(stage, loader) {
    super();

    this.container = new Sprite();

    var sound = loader.get("music");
    sound.play();

    var audioContext = new AudioContext();
    this.analyser = audioContext.createAnalyser();
    var source = audioContext.createMediaElementSource(sound);
    source.connect(this.analyser);
    this.analyser.connect(audioContext.destination);
    console.log("play", sound);

    // Create line objects
    this.shapes = [];
    this.divide = 32;
    var padding = 20;
    var count = parseInt(this.analyser.frequencyBinCount / this.divide);
    for(var i = 0; i < count; i++) {
      this.shapes[i] = Array(count);
      for(var j = 0; j < count; j++) {
        var shape = new geom.Circle(new geom.Point(i * padding, j * padding), padding);
        var shapeSprite = new graphics.ShapeSprite(shape, null, '#' + Math.floor((i + 2) / count * 0xFFFFFF).toString(16), null, null);
        this.container.addChild(shapeSprite);
        this.shapes[i][j] = shape;
      }
    }
  }

  update (dt) {
    var freqByteData = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(freqByteData);

    var waveByteData = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteTimeDomainData(waveByteData);
    
    for(var i = 0; i < this.shapes.length; i++) {
      let freq = freqByteData[i * this.divide];
      for(var j = 0; j < this.shapes.length; j++) {
        let wave = waveByteData[(j * this.divide + i * j) % waveByteData.length];
        var circle = this.shapes[i][j];
        circle.r = (wave / 256 * 5) + (freq / 256 * 10);
        // console.log(circle.r);
      }
    }

    // for(var i = 0; i < this.lines.length; i++) {
    //   this.lines[i].v.y = -waveByteData[i];
    // }
  };

  getSprite () {
    return this.container;
  };
}


module.exports = AudioDemo;
