var loadAssets = require('./assets.json');
var loadSounds = require('./sounds.json');
var Game = require('./Game');

var TextSprite = require('../core/graphics/TextSprite');

/**
 * Main Class
 */

class Main {

  init(stage, loader) {
    //Called when core is ready
    this.stage = stage;
    this.loader = loader;
    window.stage = this.stage;
    var _this = this;

    // console.log('add text');
    // this.text = new TextSprite('loading');
    // this.text.point.x = 100;
    // this.text.point.y = 100;
    // this.stage.addChild(this.text);

    // let assets = Object.assign({}, loadAssets, loadSounds);
    loader.load(loadAssets, function (err, loaded) {
      // console.log('start main');
      _this.assets = loaded;
      _this.loaded = true;
      _this.onLoad();
    });

    // Load sounds on click event for mobile
    // let a = document.document;
    // a.addEventListener('click', this.loadSounds.bind(this), false);
    this.soundLoaded = false;

    this.loader.load(loadSounds, function(){ });
  }

  loadSounds(){
    if(!this.soundLoaded){
      this.soundLoaded = true;
      global.Sound.activateSounds();
    }
  }

  onLoad() {
    this.game = new Game(this.stage, this.loader);
    window.game = this.game;
  }

  update(dt) {
    // this.text.text = this.loader.status;
    if (this.loaded && this.game.isActive()) {
      this.game.update(dt);
    }
  }
}
module.exports = Main;
