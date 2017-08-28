// var audio = new Audio('/audio/' + name + '.wav');

class Sound {
  constructor(audio){
    this.audio = audio;
    this.muted = false;
  }

  play(unique = true, volume = 1){
    if(this.muted) return;
    unique = false;
    let audio;
    if(unique){
      audio = this.audio.cloneNode();
    }else{
      audio = this.audio;
    }
    audio.volume = volume;
    audio.currentTime = 0;
    audio.play();
    this.oldVolume = 0;
  }

  mute(){
    this.oldVolume = this.audio.volume;
    this.audio.volume = 0;
    this.muted = true;
  }

  unmute(){
    this.audio.volume = this.oldVolume;
    this.muted = false;
  }

  stop(){
    audio.currentTime=0;
    this.audio.pause();
  }

  pause(){
    audio.currentTime=0;
    this.audio.pause();
  }

  refresh(){
    this.audio.play();
    this.audio.pause();
  }

  playLoop(volume = 1){
    if(this.muted) return;
    this.audio.volume = volume;
    this.audio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    this.audio.play();
  }
}

module.exports = Sound;
