var Sound = require('./Sound');

class Mixer {
  
  constructor(loader, sounds){
    
    // window.AudioContext = (
    //   window.AudioContext ||
    //   window.webkitAudioContext ||
    //   null
    // );

    // if (!AudioContext) {
    //   this.noAudioContext = true;
    // }

    // // Create a new audio context.
    // var ctx = new AudioContext();

    this.sounds = {};

    this.soundsToLoad = sounds;
    this.loader = loader;

    this.soundsLoaded();

    window.mute = ()=>{
      this.mute();
    }
    window.unmute = ()=>{
      this.unmute();
    }

    this.muted = false;
  }

  soundsLoaded(){
    for(let key in this.soundsToLoad){
      let audio = this.loader.get(key);
      if(audio){
        let s = new Sound(audio);
        this.sounds[key] = s;
        if(this.muted) {
          s.mute();
        }
      }
    }
  }

  mute(){
    this.muted = true;
    for(let key in this.sounds){
      this.sounds[key].mute();
    }
  }

  unmute(){
    this.muted = false;
    for(let key in this.sounds){
      this.sounds[key].unmute();
    }
  }

  activateSounds(){
    for(let key in this.sounds){
      this.sounds[key].refresh();
    }
  }

  playSound(key, unique = true, volume = 1){
    if(this.sounds[key])
      this.sounds[key].play(unique, volume);
  }

  playSoundLoop(key, volume = 1){
    if(this.sounds[key])
      this.sounds[key].playLoop(volume);
  }
}

module.exports = Mixer;