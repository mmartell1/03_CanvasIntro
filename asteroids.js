var ASTEROID  = {
  x : 0,
  y : 0,
  angle : 0
};

var ASTEROIDS = {
  level : 1,
  activeCount : 3,
  asteroids : [],
  maxDirectionAngle : 360,
  spawnDistance : {
    xMin : 50,
    xMax : 100,
    yMin : 50,
    yMax : 100
  },
  baseSpeed : 5
};


function AddAsteroid(size) {
  size = 10;
  // Generate asteroid location
  var locationXY = GetNewAsteroidLocation();
  var direction = GetNewAsteroidDirection();

  // Add asteroid
  ASTEROIDS.asteroids.push(
    {
      x : locationXY[0],
      y : locationXY[1],
      angle : direction,
      size : size
    }
  );
}

/** GetNewAsteroidLocation
 *
 *  Generates a new asteroid location and returns it in array form [x,y]
 *  This returns an asteroid a certain distance from the spaceship
 */
function GetNewAsteroidLocation() {
  var x = SPACE_SHIP.latest.x;
  var y = SPACE_SHIP.latest.y;

  // Create a object which is 50-100 distnace away from the ship
  var xOffset = Math.floor(
    Math.random() * Math.floor(ASTEROIDS.spawnDistance.xMin)
  ) + (ASTEROIDS.spawnDistance.xMax - ASTEROIDS.spawnDistance.xMin);
  var yOffset = Math.floor(
    Math.random() * Math.floor(ASTEROIDS.spawnDistance.xMin)
  ) + (ASTEROIDS.spawnDistance.xMax - ASTEROIDS.spawnDistance.xMin);
  return [xOffset, yOffset];
}

/** GetNewAsteroidDirection
 *
 *  Create new asteroid direction which is between 0-360 degrees
 */
function GetNewAsteroidDirection() {
  return Math.floor(Math.random() * Math.floor(ASTEROIDS.maxDirectionAngle));
}

function RenderAsteroids(context) {
  // This function is run for each asteroid
  ASTEROIDS.asteroids.forEach(
    function(asteroid, index, object) {
        context.moveTo(asteroid.x, asteroid.y);
        context.strokeStyle = 'black';
        context.lineWidth = 2;
        context.strokeRect(asteroid.x, asteroid.y, 10, 10);
  });
}
