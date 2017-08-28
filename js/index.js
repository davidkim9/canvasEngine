/**
 * Main Start!
 */
var config = require('./config');
var bootstrap = require('./core/bootstrap');
var Main = require('./game/Main');
var ui = require('./ui/ui');

var main = new Main();
bootstrap.init(main);