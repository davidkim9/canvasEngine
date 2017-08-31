var util = require('util');
var Sprite = require('./Sprite');
var Point = require('../geom/Point');
var Rectangle = require('../geom/Rectangle');

/**
 * ChromaticAberation Class
 */
class ChromaticAberation extends Sprite {

  constructor() {
    super();
    this.deviation = 0;
    this.cached = null;
    this.visible = false;
  }

  setDeviation(d){
    this.deviation = d; 
  }

  setVisible(v){
    this.visible = v;
  }

  resetCache(){
    this.cached = null;
  }

  getIndexAt(x, y, width, height){
    let i = y * width + x * 4;
    return i;
  }

  render(context) {
    if(this.deviation <= 0) return;
    if(!this.visible) return;

    let offsetX = 0;
    let offsetY = 0;
    if(!this.cached){
      let width = global.width;
      let height = global.height;
      let data = context.getImageData(offsetX, offsetY, width, height).data;
      let newImage = context.createImageData(width, height);
      let roundDiv = 2;

      var y, x, index, indexLeft, indexRight, yCalc, yCalcA, t;
      for(y = 0; y < height; y++){
        yCalc = y * width;
        yCalcA = y * width;
        for(x = 0; x < width; x++){
          index = (yCalc + x) * 4;
          t = Math.floor(x/roundDiv) * roundDiv;
          indexLeft = (yCalcA + t - this.deviation) * 4;
          indexRight = (yCalcA + t + this.deviation) * 4;

          newImage.data[index] = data[indexLeft];
          newImage.data[index + 1] = data[index + 1];
          newImage.data[index + 2] = data[indexRight + 2];
          newImage.data[index + 3] = 255;
        }
      }
      this.cached = newImage;
    }

    context.putImageData(this.cached, offsetX, offsetY);
  };
  
}

module.exports = ChromaticAberation;
