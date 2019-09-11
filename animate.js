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

  // Check if asteroid is leaving the boundary, if so, switch sides
  if (SPACE_SHIP.x > GAME.canvas.width) {
    SPACE_SHIP.x = 0;
  } else if (SPACE_SHIP.x < 0) {
    SPACE_SHIP.x = 600;
  } else if (SPACE_SHIP.y > GAME.canvas.height) {
    SPACE_SHIP.y = 0;
  } else if (SPACE_SHIP.y < 0) {
    SPACE_SHIP.y = 300;
  }
}

function handleBulletAnimation() {
  var BULLET_LIFE_TIME = 1800;
  var BULLET_DELAY_MS = 300;
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

function spaceShipAsteroidCollisionCheck() {
    var SPACE_SHIP_SIZE_BOX = 15; // 10px;
    var hit = false;

    ASTEROIDS.asteroids.forEach(function(asteroid) {
      if (
        SPACE_SHIP.latest.x + SPACE_SHIP_SIZE_BOX > asteroid.x &&
        SPACE_SHIP.latest.x - SPACE_SHIP_SIZE_BOX < asteroid.x &&
        SPACE_SHIP.latest.y + SPACE_SHIP_SIZE_BOX > asteroid.y &&
        SPACE_SHIP.latest.y - SPACE_SHIP_SIZE_BOX < asteroid.y)
        {
          // Destroy asteroid
          asteroid.remove = true;
          SPACE_SHIP.health = SPACE_SHIP.health - 1;
          hit = true;
        }
    });

    if (hit) {
      ASTEROIDS.asteroids = ASTEROIDS.asteroids.filter(
        (asteroid) => {
        return (asteroid.remove == false);
      });

      if (SPACE_SHIP.health < 0) {
        GAME.started = false;
      }
    }

    if (ASTEROIDS.asteroids.length == 0) {
      GAME.level++;
      ASTEROIDS.activeCount++;
      for (var i = 0; i < ASTEROIDS.activeCount; i++) {
        AddAsteroid();
      }
    }
}

function bulletAsteroidCollisionCheck() {
    var collision = false;
    SPACE_SHIP.bullets.forEach(function(bullet, index, object) {
      ASTEROIDS.asteroids.forEach(function(asteroid) {
        var asteroidSize = ASTEROIDS.pixelScaleBySize * asteroid.size / 2;
        var bulletSize = bullet.bulletSize;
        if (
          asteroid.x + asteroidSize > bullet.x &&
          asteroid.x - asteroidSize < bullet.x &&
          asteroid.y + asteroidSize > bullet.y &&
          asteroid.y - asteroidSize < bullet.y) {
          bullet.remove = true;
          asteroid.remove = true;
          collision = true;
        }
      });
    });

    if (collision) {
      ASTEROIDS.asteroids = ASTEROIDS.asteroids.filter(
        (asteroid) => {
        return (asteroid.remove == false);
      });
      SPACE_SHIP.bullets = SPACE_SHIP.bullets.filter(
        (bullet) => {
        return (bullet.remove == false);
      });
    }

}

function runGame() {
  var canvas = document.getElementById('mainCanvas');
  var context = canvas.getContext('2d');
  if (GAME.started) {
    handleShipAnimation();
    handleBulletAnimation();
    handleAsteroidAnimation();

    // Check for collisions
    spaceShipAsteroidCollisionCheck();
    bulletAsteroidCollisionCheck();

    context.clearRect(0, 0, 600, 300);
    RenderSpaceship(context);
    RenderBullets(context);
    RenderAsteroids(context);
  } else {
    context.font = "30px Arial";
    context.fillText("Game Over      Level " + GAME.level, 135, 200);
  }
  window.requestAnimationFrame(runGame);

}

window.requestAnimationFrame(runGame);
