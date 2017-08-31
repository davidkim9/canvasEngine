
var Demo = require('./demo/Demo');
var AudioDemo = require('./audioDemo/AudioDemo');
var ActOne = require('./actOne/ActOne');

/**
 * Game Class
 */
class Game {
  constructor(stage, loader) {
    //Called when core is ready
    this.stage = stage;
    this.loader = loader;

    this.active = false;

    this.scenes = {
      "demo": new Demo(),
      "audioDemo": new AudioDemo(this, loader),
      "start": new ActOne(this, loader),
    };

    this.currentScene = null;
    
    this.startGame();
  }

  showScene(k) {
    if(this.currentScene){
      this.stage.removeChild(this.currentScene.getSprite());
    }
    var scene = this.scenes[k];
    this.currentScene = scene;
    this.stage.addChildAt(scene.getSprite());
  }

  isActive() {
    return this.active;
  }

  startGame() {
    //Initialize Game
    this.showScene("audioDemo");
    this.active = true;
  };

  update(dt) {
    if(global.gamePaused) return;
    if(this.active){
      if(this.currentScene)
        this.currentScene.update(dt);
    }
  };
}

module.exports = Game;
