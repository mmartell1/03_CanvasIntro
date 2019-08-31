
// Javascript Astroids

var SPACE_SHIP = {
  positionX : 0,
  positionY : 0,
  rotation : 0
};
function RenderSpaceship() {
  var canvas = document.getElementById('mainCanvas');
      var context = canvas.getContext('2d');
      var rectWidth = 15;
      var rectHeight = 7;

      // translate context to center of canvas
      context.translate(canvas.width / 2, canvas.height / 2);

      // rotate 45 degrees clockwise
      context.rotate(Math.PI / 4);

      context.fillStyle = 'blue';
      context.fillRect(rectWidth / -2, rectHeight / -2, rectWidth, rectHeight);
}


function Start() {
  RenderSpaceship();
}
