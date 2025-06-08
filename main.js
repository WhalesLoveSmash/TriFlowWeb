class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    // Load assets if any
  }

  create() {
    this.add.text(10, 10, 'TriFlow JS', { font: '24px Arial', fill: '#ffffff' });

    // Dummy player data for now
    this.playerName = prompt("Enter your name:", "Player");
    this.score = Math.floor(Math.random() * 1000);
    this.time = "00:" + (10 + Math.floor(Math.random() * 50)).toString().padStart(2, '0');

    // Simulate a win and submit score after 3 sec
    this.time.delayedCall(3000, () => {
      submitScore(this.playerName, this.score, this.time);
    });
  }

  update() {
    // Game loop logic goes here
  }
}

const API_URL = 'https://script.google.com/macros/s/AKfycbw0aP1EFqBAname4qYQeKMmWYoFPoNRePIP_la8MGRJh_ZqIAr7OthyYn38GDqfQaOtIg/exec';

// Leaderboard logic
function submitScore(name, score, time) {
  fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({ name, score, time }),
    headers: { 'Content-Type': 'application/json' }
  }).then(res => res.text())
    .then(txt => {
      console.log('Submitted:', txt);
      fetchLeaderboard();
    });
}

function fetchLeaderboard() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      data.sort((a, b) => b.score - a.score);
      const leaderboardDiv = document.getElementById('leaderboard');
      leaderboardDiv.innerHTML = '<h2>Leaderboard</h2>';

      data.forEach((entry, index) => {
        const row = document.createElement('div');
        row.textContent = `${index + 1}. ${entry.name} - ${entry.score} (${entry.time})`;
        leaderboardDiv.appendChild(row);
      });
    });
}

// Phaser Game Config
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#000',
  scene: [MainScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  }
};

const game = new Phaser.Game(config);

// Load leaderboard on page load
window.onload = fetchLeaderboard;

// this.score = Math.floor(Math.random() * 1000);
// this.time = "00:34";
//uncomment and add some stuff later to make leaderboard work