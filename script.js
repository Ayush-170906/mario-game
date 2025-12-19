const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Player
const player = {
  x: 50,
  y: 300,
  width: 40,
  height: 50,
  speed: 4,
  dy: 0,
  gravity: 0.8,
  jumpPower: -15,
  onGround: false
};

// Ground
const ground = {
  x: 0,
  y: 400,
  width: 800,
  height: 50
};

// Controls
const keys = {};

document.addEventListener("keydown", e => keys[e.code] = true);
document.addEventListener("keyup", e => keys[e.code] = false);

function update() {
  // Movement
  if (keys["ArrowRight"]) player.x += player.speed;
  if (keys["ArrowLeft"]) player.x -= player.speed;

  // Jump
  if (keys["Space"] && player.onGround) {
    player.dy = player.jumpPower;
    player.onGround = false;
  }

  // Gravity
  player.dy += player.gravity;
  player.y += player.dy;

  // Collision with ground
  if (player.y + player.height >= ground.y) {
    player.y = ground.y - player.height;
    player.dy = 0;
    player.onGround = true;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Player
  ctx.fillStyle = "red";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Ground
  ctx.fillStyle = "green";
  ctx.fillRect(ground.x, ground.y, ground.width, ground.height);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();

