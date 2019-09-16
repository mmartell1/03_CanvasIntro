
// Populate a global variable for the spaceship
function InitializeSpaceship() {
  var canvas = document.getElementById('mainCanvas');
  var context = canvas.getContext('2d');
  context.scale(1,1);
  SPACE_SHIP = {
    x : 300,
    y : 150,
    rotation : 0,
    health : 3,
    positions : [
      {
        x : 0,
       	y : 3
      },
      {
        x : 2,
       	y : -3
      },
      {
        x : 0,
       	y : 0
      },
      {
        x : -2,
       	y : -3
      },
      {
        x : 0,
       	y : 3
      }
    ],
    latest : {
        x : SPACE_SHIP.x,
        y : SPACE_SHIP.y,
    },
    scale : 5,
    speed : 3,
    initialized : true,
    bullets : []
  };
}

// Rotate rotates a point around
// cx, cy   :   The central point
// x, y     :   The coordinates of point to be rotatedPoint
// angle    :   Angle in degrees of rotation
function Rotate(cx, cy, x, y, angle) {
    var radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return [nx, ny];
}

// RotateAroundOrigin
// x, y     :   The coordinates of point to be rotatedPoint
// angle    :   Angle in degrees of rotation
function RotateAroundOrigin(x, y, angle) {
  return Rotate(0, 0, x, y, angle);
}

/**  RenderSpaceship
 *
 *  Renders all spaceship points after adjusting them for the rotation and position
 *    in space
 */
function RenderSpaceship(context) {
  if (!SPACE_SHIP.initialized) {
    return;
  }

  // Move to the point where drawing will start
  var rotatedPoint = RotateAroundOrigin(
    SPACE_SHIP.positions[0].x,
    SPACE_SHIP.positions[0].y,
    SPACE_SHIP.rotation
  );
  context.moveTo(SPACE_SHIP.x + rotatedPoint[0],SPACE_SHIP.y +  rotatedPoint[1]);
  SPACE_SHIP.latest.x = SPACE_SHIP.x + rotatedPoint[0];
  SPACE_SHIP.latest.y = SPACE_SHIP.y + rotatedPoint[1];
  // Begin rendering the space ship points (rotating them each time)
  context.beginPath();
  for (var i = 0; i < SPACE_SHIP.positions.length; i++) {
    var rotatedPoint = RotateAroundOrigin(
      SPACE_SHIP.positions[i].x,
      SPACE_SHIP.positions[i].y,
      SPACE_SHIP.rotation
    );
    context.lineTo(
      SPACE_SHIP.x + (rotatedPoint[0] * SPACE_SHIP.scale),
      SPACE_SHIP.y + (rotatedPoint[1] * SPACE_SHIP.scale)
    );
  }
  context.lineWidth = 1;
  switch (SPACE_SHIP.health) {
    case 3:
      context.strokeStyle = 'green';
      break;
    case 2:
      context.strokeStyle = 'blue';
      break;
    case 1:
      context.strokeStyle = 'orange';
      break;
    case 0:
      context.strokeStyle = 'red';
      break;
    default:
      context.strokeStyle = 'white';
      break;
  }
  context.stroke();
}
