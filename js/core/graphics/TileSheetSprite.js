var util = require('util');
var Sprite = require('./Sprite');
var Point = require('../geom/Point');
var Rectangle = require('../geom/Rectangle');

/**
 * TileSheetSprite constructor
 * @param {[Image]} image spritesheet image reference
 * @param {[Object]}
 */
function TileSheetSprite(image, args) {
  TileSheetSprite.super_.apply(this, arguments);
  this.image = image;

  this.spriteWidth = args.spriteWidth ? args.spriteWidth : 128;
  this.spriteHeight = args.spriteHeight ? args.spriteHeight : 128;
  this.leftPadding = args.leftPadding ? args.leftPadding : 0;
  this.topPadding = args.topPadding ? args.topPadding : 0;

  this.tiles = args.tiles ? args.tiles : 1;
  this.tileWidth = args.tileWidth ? args.tileWidth : this.spriteWidth;
  this.tileHeight = args.tileHeight ? args.tileHeight : this.spriteHeight;

  this.origin = args.origin ? args.origin : new Point();

  this.imageWidth = image.width;
  this.imageHeight = image.height;

  this.spritesPerRow = parseInt(this.imageWidth / this.spriteWidth);
  this.spritesPerCol = parseInt(this.imageHeight / this.spriteHeight);
}

//TileSheetSprite extends Sprite
util.inherits(TileSheetSprite, Sprite);
var method = TileSheetSprite.prototype;

method.render = function (context) {
  for (var i = 0; i < this.tiles.length; i++) {
    var y = this.tileHeight * i;
    for (var j = 0; j < this.tiles[i].length; j++) {
      var x = this.tileWidth * j;
      var tileData = this.tiles[i][j];
      if (tileData == -1) continue;
      var sx = (tileData % this.spritesPerRow) * this.spriteWidth + this.leftPadding;
      var sy = parseInt(tileData / this.spritesPerRow) * this.spriteHeight + this.topPadding;
      context.drawImage(this.image,
        sx, sy, this.spriteWidth, this.spriteHeight,
        x - this.origin.x, y - this.origin.y, this.spriteWidth, this.spriteHeight);
    }
  }
};

method.getSpriteBounds = function () {
  return new Rectangle(this.point.x, this.point.y, this.image.width, this.image.height);
};

module.exports = TileSheetSprite;
