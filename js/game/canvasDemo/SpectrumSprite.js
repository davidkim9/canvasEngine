var util = require('util');
var core = require('../../core');
var CanvasSprite = core.graphics.CanvasSprite;

/**
 * SpectrumSprite Class
 */

class SpectrumSprite extends CanvasSprite {

  constructor(audio) {
    super();

    var audioContext = new AudioContext();
    this.analyser = audioContext.createAnalyser();
    var source = audioContext.createMediaElementSource(audio);
    source.connect(this.analyser);
    this.analyser.connect(audioContext.destination);
  }

  getHSL(H) {
    return "hsl(" + H + ",100%,50%)";
  }

  render(context) {
    var freqByteData = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(freqByteData);

    var waveByteData = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteTimeDomainData(waveByteData);

    // Draw Spectrum
    context.beginPath();
    for(var i = 0; i < freqByteData.length; i++) {
      var freq = freqByteData[i];
      context.rect(i, 0, 1, freq);
    }

    context.fillStyle = this.getHSL(0);
    context.fill();
    context.closePath();

    // Draw Wave
    let halfScreenHeight = global.height / 2;
    for(var i = 0; i < waveByteData.length; i++) {
      context.beginPath();
      var wave = waveByteData[i];
      context.rect(i, halfScreenHeight - (wave - 128), 1, (wave - 128) * 2);
      context.fillStyle = this.getHSL(wave);
      context.fill();
      context.closePath();
    }
  }

}

module.exports = SpectrumSprite;
