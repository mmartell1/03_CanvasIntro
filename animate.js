function handleShipAnimation() {
  if (CONTROLS.ship.forward) {
    var radians = (Math.PI / 180) * SPACE_SHIP.rotation,
        cos = Math.cos(radians),
        sin = Math.sin(radians);
    SPACE_SHIP.x += SPACE_SHIP.speed * sin;
    SPACE_SHIP.y +=  SPACE_SHIP.speed * cos;
  }
  if (CONTROLS.ship.backward) {
    var radians = (Math.PI / 180) * SPACE_SHIP.rotation,
        cos = Math.cos(radians),
        sin = Math.sin(radians);
    SPACE_SHIP.x -= SPACE_SHIP.speed * sin;
    SPACE_SHIP.y -=  SPACE_SHIP.speed * cos;
  }
  if (CONTROLS.ship.rotateClockwise) {
    SPACE_SHIP.rotation -= 4;
  }
  if (CONTROLS.ship.rotateCounterClockwise) {
    SPACE_SHIP.rotation += 4;
  }
}

function handleBulletAnimation() {
  if (CONTROLS.fire.active) {
    if (CONTROLS.fire.lastFireTime > (new Date().valueOf()+ 1000)) {
      CONTROLS.fire.lastFireTime = new Date().valueOf();

    }
  }
}

function runGame() {
  handleShipAnimation();
  handleBulletAnimation();


    var canvas = document.getElementById('mainCanvas');
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, 600, 300);
      RenderSpaceship(context);
  window.requestAnimationFrame(runGame);

}

window.requestAnimationFrame(runGame);
