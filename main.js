const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: '#1d1d1d',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: {
    preload,
    create,
    update
  }
};

let player;
let cursors;

const game = new Phaser.Game(config);

function preload() {
  // Example: this.load.image('player', 'assets/player.png');
}

function create() {
  // Example player: replace with your sprite key
  player = this.physics.add.rectangle(400, 300, 32, 32, 0x00ff00);
  player.body.setCollideWorldBounds(true);

  // Input handling
  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  player.body.setVelocity(0);

  if (cursors.left.isDown) player.body.setVelocityX(-200);
  else if (cursors.right.isDown) player.body.setVelocityX(200);

  if (cursors.up.isDown) player.body.setVelocityY(-200);
  else if (cursors.down.isDown) player.body.setVelocityY(200);
}