
// Javascript Asteroids!


function Start() {

  // Initialize Spaceship
  InitializeSpaceship();

  // Initialize Asteroids
  for (var i = 0; i < ASTEROIDS.activeCount; i++) {
    AddAsteroid();
  }
}
