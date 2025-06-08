let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#000000',
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

let game = new Phaser.Game(config);

let player;
let cursors;

function preload() {
  // Load assets if any here
}

function create() {
  // Create a green rectangle for the player
  player = this.add.rectangle(400, 300, 32, 32, 0x00ff00);

  // Enable physics body on rectangle
  this.physics.add.existing(player);

  // Allow player to collide with world bounds
  player.body.setCollideWorldBounds(true);

  // Zero initial velocity
  player.body.setVelocity(0);

  // Setup keyboard input
  cursors = this.input.keyboard.createCursorKeys();

  // Add a Start button to enable AudioContext on user gesture
  const startButton = this.add.text(350, 280, 'Start Game', { fontSize: '24px', fill: '#00aaee' })
    .setInteractive()
    .on('pointerdown', () => {
      this.sound.context.resume();
      startButton.destroy(); // remove button after starting
    });
}

function update() {
  if (!player || !player.body) return;

  const speed = 200;
  let vx = 0;
  let vy = 0;

  if (cursors.left.isDown) {
    vx = -speed;
  } else if (cursors.right.isDown) {
    vx = speed;
  }

  if (cursors.up.isDown) {
    vy = -speed;
  } else if (cursors.down.isDown) {
    vy = speed;
  }

  player.body.setVelocity(vx, vy);

  // Optional: Normalize velocity so diagonal movement isn't faster
  if (vx !== 0 && vy !== 0) {
    player.body.setVelocity(vx * Math.SQRT1_2, vy * Math.SQRT1_2);
  }
}