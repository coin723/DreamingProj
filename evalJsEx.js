var webPage = require('webpage');
var page = webPage.create();

page.onConsoleMessage = function(msg) {
  console.log('CONSOLE: ' + msg);
};

page.open('http://phantomjs.org/', function(status) {

  /*var logoUrl = */page.evaluateJavaScript('function() {global logoUrl = document.querySelector("img").getAttribute("src");}');
  console.log(logoUrl); // http://phantomjs.org/img/phantomjs-logo.png
  console.log("end");

  phantom.exit();

});