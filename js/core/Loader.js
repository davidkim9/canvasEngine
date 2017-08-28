/**
 * Loader Class
 */
var method = Loader.prototype;

function Loader() {
  this.allLoaded = {};
  this.allLoadedKey = {};

  this.totalLoaded = 0;
  this.maxTotal = 0;

  this.status = null;
}

method.get = function (key) {
  return this.allLoadedKey[key];
};

method.loaded = function () {
  return this.totalLoaded == this.maxTotal;
};

method.loadProgress = function () {
  return this.totalLoaded / this.maxTotal;
};

//TODO: handle loading same assets at the same time
method.load = function (assets, cb) {
  var loaded = {};

  var maxLoad = 0;

  if (assets.constructor == Array) {
    maxLoad = assets.length;
  }else if (assets.constructor == String) {
    assets = [assets];
    maxLoad = 1;
  }else if (assets.constructor == Object && Object.keys(assets).length >= 0) {
    maxLoad = Object.keys(assets).length;
  }else {
    //Wtf is this?
    console.log('%cWtf is this even: ' + assets, 'font-size:20px; color: #f00');
    return;
  }

  this.maxTotal += maxLoad;

  // console.log('max load is', maxLoad, assets.length);

  var failedLoading = '';
  var error = false;

  var loadCounter = 0;
  var _this = this;
  function addLoaded() {
    loadCounter++;
    _this.totalLoaded++;
    // console.log('loaded 1 ' + loadCounter + "/" + _this.totalLoaded);
    // console.log('loaded 2 ' + loadCounter + "/" + maxLoad);

    window.loadProgress && window.loadProgress(loadCounter / maxLoad);

    if (loadCounter >= maxLoad) {
      // console.log('game loaded');
      _this.status = 'game loaded';
      cb(error ? failedLoading : null, loaded);
    }
  }

  for (var key in assets) {
    var asset = assets[key];
    // console.log('load', asset);
    if (this.allLoaded[asset]) {
      loaded[key] = this.allLoaded[asset];
      addLoaded();
    }else {
      //TODO: Add check to see if image
      let ext = asset.substring(asset.length - 3);
      if(ext == "mp3" || ext == "wav"){
        // Audio
        (function (key, asset) {
          _this.loadAudio(global.soundPath + asset, function (err, res) {
            if (err) {
              error = true;
              failedLoading += err + '\n';
              loaded[key] = null;
            }else {
              loaded[key] = res;
              _this.allLoaded[asset] = res;
              _this.allLoadedKey[key] = res;
            }
// console.log('loaded', global.soundPath + asset);
            addLoaded();
          });
        })(key, asset);
      }else if(ext == "png" || ext == "jpg" || ext == "bmp" || ext == "gif"){
        // Image
        (function (key, asset) {
          _this.loadImage(global.assetPath + asset, function (err, res) {
            if (err) {
              error = true;
              failedLoading += err + '\n';
              loaded[key] = null;
            }else {
              loaded[key] = res;
              _this.allLoaded[asset] = res;
              _this.allLoadedKey[key] = res;
            }
// console.log('loaded', global.soundPath + asset);
            addLoaded();
          });
        })(key, asset);
      }
    }
  }
};

method.loadImage = function (src, cb) {
  var imageResource = new Image();
  imageResource.onload = function () {
    cb(null, imageResource);
    imageResource = null;
  };

  imageResource.onerror = function () {
    console.log('%cFailed to load: ' + src, 'color: #f00');
    cb('Failed to load: ' + src);
    imageResource = null;
  };

  imageResource.src = src;
};

method.loadAudio = function (src, cb) {
  var audioResource = new Audio(src);
  // console.log('LOAD AUDIO', src);
  // audioResource.autoplay = false;
  // audioResource.play();
  // audioResource.pause();

  cb(null, audioResource);
  // Audio dont load correctly on mobile

  // let loaded = function() {
  //   audioResource.removeEventListener("canplaythrough", loaded);
  //   audioResource.removeEventListener("error", error);
  //   cb(null, audioResource);
  //   audioResource = null;
  // }

  // let error = function() {
  //   audioResource.removeEventListener("canplaythrough", loaded);
  //   audioResource.removeEventListener("error", error);
  //   console.log('%cFailed to load: ' + src, 'color: #f00');
  //   cb('Failed to load: ' + src);
  //   audioResource = null;
  // }

  // audioResource.addEventListener("canplaythrough", loaded);
  // audioResource.addEventListener("error", error);
  // audioResource.addEventListener("progress", function(e){
  //   console.log(src, "load progress", e);
  // });
  // audioResource.addEventListener("stalled", function(e){
  //   console.log(src, "load stalled", e);
  // });
  //   audioResource.addEventListener("suspend", function(e){
  //   console.log(src, "load suspend", e);
  // });
  //   audioResource.addEventListener("loadstart", function(e){
  //   console.log(src, "load loadstart", e);
  // });
  //     audioResource.addEventListener("loadeddata", function(e){
  //     console.log(src, "load loadeddata", e);
  //   });
  //   audioResource.addEventListener("abort", function(e){
  //   console.log(src, "load aborted", e);
  // });    audioResource.addEventListener("loadedmetadata", function(e){
  //   console.log(src, "load loadedmetadata", e);
  // });
};

module.exports = Loader;
