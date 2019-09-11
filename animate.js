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
  var BULLET_LIFE_TIME = 1500;
  var BULLET_DELAY_MS = 500;
  if (!SPACE_SHIP.initialized) {
    return;
  }

  var timeNow = new Date().valueOf();
  if (CONTROLS.fire.active) {
    if ((CONTROLS.fire.lastFireTime + BULLET_DELAY_MS) < timeNow) {
      CONTROLS.fire.lastFireTime = new Date().valueOf();
      AddBullet();
    }
  }

  SPACE_SHIP.bullets.forEach(function(bullet, index, object) {

      // Move the bullet forward
        var radians = (Math.PI / 180) * bullet.rotation,
            cos = Math.cos(radians),
            sin = Math.sin(radians);
        bullet.x += SPACE_SHIP.speed * sin;
        bullet.y +=  SPACE_SHIP.speed * cos;

        // If the bullet expired, remove bullet
        if ((bullet.date + BULLET_LIFE_TIME) < timeNow ) {
          bullet.remove = true;
        }
  });

  SPACE_SHIP.bullets = SPACE_SHIP.bullets.filter(
    (bullet) => {
    return (bullet.remove == false);
  });
}

function handleAsteroidAnimation() {
    ASTEROIDS.asteroids.forEach(function(asteroid, index, object) {

        // Move the bullet forward
          var radians = (Math.PI / 180) * asteroid.angle,
              cos = Math.cos(radians),
              sin = Math.sin(radians);
          asteroid.x += ASTEROIDS.baseSpeed * sin;
          asteroid.y +=  ASTEROIDS.baseSpeed * cos;

          // Check if asteroid is leaving the boundary, if so, switch sides
          if (asteroid.x > GAME.canvas.width) {
            asteroid.x = 0;
          } else if (asteroid.x < 0) {
            asteroid.x = 600;
          } else if (asteroid.y > GAME.canvas.height) {
            asteroid.y = 0;
          } else if (asteroid.y < 0) {
            asteroid.y = 300;
          }
    });

}


function runGame() {
  handleShipAnimation();
  handleBulletAnimation();
  handleAsteroidAnimation();

  //

  var canvas = document.getElementById('mainCanvas');
  var context = canvas.getContext('2d');
  context.clearRect(0, 0, 600, 300);
  RenderSpaceship(context);
  RenderBullets(context);
  RenderAsteroids(context);
  window.requestAnimationFrame(runGame);

}

window.requestAnimationFrame(runGame);
