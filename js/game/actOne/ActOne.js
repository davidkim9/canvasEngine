var core = require('../../core');
var Scene = require('../Scene');
var Camera = require('./Camera');
var Controller = require('./Controller');
var Point = core.geom.Point;
var Sprite = core.graphics.Sprite;
var GraphicSprite = core.graphics.GraphicSprite;
var Mixer = core.sound.Mixer;

var loadSounds = require('../sounds.json');

/**
 * ActOne Class
 */
class ActOne extends Scene {

  constructor(game, loader) {
    super();

    global.Sound = new Mixer(loader, loadSounds);
    this.gameStarted = false;
    this.game = game;
    this.loader = loader;

    this.controller = new Controller();

    this.camera = new Camera();
    this.container = new Sprite();

    // sky
    this.sky = new GraphicSprite(this.loader.get('sky'));
    this.container.addChild(this.sky);

    this.startGame();
    
  }

  startGame(){
    this.gameStarted = true;
  }

  update (dt) {
    if(!this.gameStarted) return;
    //Process logic
    // Fake framedrop
    // for(let i = 0; i < 5000000; i++){this.v = Math.random()}
  };

  getSprite () {
    return this.container;
  };
}


module.exports = ActOne;
