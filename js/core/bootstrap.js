var Core = require('./Core');

var instance;
var time = 0;
var unloaded = false;
var intervalTimer;

var main;

//Init
function init(main) {
  //Grab canvas object
  canvas = document.getElementById('gameCanvas');
  var context = canvas.getContext('2d');

  context.imageSmoothingEnabled       = true;
  context.webkitImageSmoothingEnabled = true;
  context.mozImageSmoothingEnabled    = true;
  context.msImageSmoothingEnabled     = true;
  context.oImageSmoothingEnabled      = true;


  canvas.width = global.width;
  canvas.height = global.height;

  window.addEventListener('resize', resize, true);
  resize();

  instance = new Core(context, main);
  instance.init();
}


var wrapper = document.getElementById('gameWrapper');
var container = document.getElementById('gameContainer');
function resize(){
  var canvasRatio = global.height / global.width;
  var parentHeight;
  var parentWidth;
  if(global.resizable){
    parentHeight = wrapper.clientHeight;
    parentWidth = wrapper.clientWidth;
  }else{
    parentHeight = global.height;
    parentWidth = global.width;
  }
  // gameWrapper
  // gameContainer
  // var wrapper = canvas.parentElement;


  /*var windowRatio = parentHeight / parentWidth;
  if(windowRatio > canvasRatio){
    container.style.width = parentWidth + "px";
    container.style.height = parentWidth * canvasRatio + "px";
  }else{
    container.style.width = parentHeight / canvasRatio + "px";
    container.style.height = parentHeight + "px";
  }*/
}

/**
 * Loop logic
 */
function update() {
  var now = new Date().getTime(),
  dt = (now - (time || now)) / 1000;
  time = now;

  // Ensure framedrop isn't too significant
  // This should be disabled on networked games
  dt = Math.min(0.1, dt);

  instance.update(dt);
}

/**
 * IE9 Polyfill
 */
function unload() {
  //Kill timers and animationframe
  unloaded = true;
  if (intervalTimer) {
    clearInterval(intervalTimer);
    instance.unload();
  }
}

function animate() {
  if (unloaded) {
    instance.unload();
    return;
  }

  update();
  requestAnimationFrame(animate);
}

function startLoop() {
  unloaded = false;
  if (window.requestAnimationFrame) {
    requestAnimationFrame(animate);
  }else {
    intervalTimer = setInterval(update, 16);
  }
}

module.exports = {
  init: function (main) {
    init(main);
    startLoop();
  },
};
