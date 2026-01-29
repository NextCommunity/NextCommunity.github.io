/**
 * eggs.js - The Space Invaders Easter Egg
 * Logic: 5 Heart Clicks -> Emoji Explosion -> 80s Space Invaders
 */

// 1. GLOBAL CONSTANTS & STATE
const emojiBurst = [
  "🎮",
  "🕹️",
  "👾",
  "🚀",
  "✨",
  "⭐",
  "🔥",
  "💥",
  "🌈",
  "🎉",
  "💖",
  "💎",
  "🤖",
  "👻",
  "🦄",
  "🍄",
  "🌍",
  "⚡",
  "🏆",
  "🎯",
  "🛸",
  "👽",
  "👾",
  "🐙",
  "🦖",
  "🪐",
  "🌌",
  "🌠",
  "☄️",
  "🌙",
];

let heartClickCount = 0;
let phaserStarted = false;
let gameInstance;
let player;
let cursors;
let aliens;
let bullets;
let lastFired = 0;

// 2. DOM TRIGGER LOGIC (Integrate this with your footer heart)
const heart = document.getElementById("footer-heart");

if (heart) {
  heart.style.cursor = "pointer";
  heart.style.display = "inline-block"; // Necessary for transforms

  heart.addEventListener("click", () => {
    if (phaserStarted) return;

    heartClickCount++;

    // Visual feedback: Heart grows
    const scaleAmount = 1 + heartClickCount * 0.3;
    heart.style.transition =
      "transform 0.1s cubic-bezier(0.17, 0.67, 0.83, 0.67)";
    heart.style.transform = `scale(${scaleAmount})`;

    if (heartClickCount === 5) {
      phaserStarted = true;
      heart.innerHTML = "🎮"; // Swap to gamer emoji
      heart.style.transform = "scale(1.5)";

      setTimeout(() => {
        heart.style.opacity = "0"; // Fade out the heart
        initPhaserGame();
      }, 300);
    }
  });
}

// 3. PHASER ENGINE INITIALIZATION
function initPhaserGame() {
  // Create dedicated Canvas
  const canvas = document.createElement("canvas");
  canvas.id = "phaser-game-canvas";
  Object.assign(canvas.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    zIndex: "10000",
    pointerEvents: "none", // Start as click-through
  });
  document.body.appendChild(canvas);

  const config = {
    type: Phaser.CANVAS,
    canvas: canvas,
    width: window.innerWidth,
    height: window.innerHeight,
    transparent: true,
    physics: {
      default: "arcade",
      arcade: { gravity: { y: 0 }, debug: false },
    },
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
  };

  gameInstance = new Phaser.Game(config);
}

// 4. PHASER SCENE FUNCTIONS
function preload() {
  // No assets to load - we use emojis!
}

function create() {
  const particles = spawnExplosion(this);

  // After 5 seconds, clear explosion and start the real game
  this.time.delayedCall(5000, () => {
    this.tweens.add({
      targets: particles.getChildren(),
      alpha: 0,
      duration: 1000,
      onComplete: () => {
        particles.clear(true, true);

        // Make the game interactive
        const canvas = document.getElementById("phaser-game-canvas");
        if (canvas) canvas.style.pointerEvents = "auto";

        setupSpaceInvaders.call(this);
      },
    });
  });
}

function update() {
  if (!player || !player.body) return;

  // Movement
  if (cursors.left.isDown) {
    player.body.setVelocityX(-400);
  } else if (cursors.right.isDown) {
    player.body.setVelocityX(400);
  } else {
    player.body.setVelocityX(0);
  }

  // Shooting
  if (cursors.space.isDown) {
    fireBullet(this);
  }
}

// 5. HELPER FUNCTIONS (The Mechanics)

function spawnExplosion(scene) {
  const heartRect = document
    .getElementById("footer-heart")
    .getBoundingClientRect();
  const particles = scene.add.group();

  for (let i = 0; i < 40; i++) {
    const emoji = Phaser.Utils.Array.GetRandom(emojiBurst);
    const p = scene.add.text(heartRect.left, heartRect.top, emoji, {
      fontSize: "32px",
    });

    scene.physics.add.existing(p);
    p.body.setVelocity(
      Phaser.Math.Between(-400, 400),
      Phaser.Math.Between(-600, -1200),
    );
    p.body.setBounce(0.6);
    p.body.setCollideWorldBounds(true);
    p.body.setAngularVelocity(Phaser.Math.Between(-200, 200));

    particles.add(p);
  }
  return particles;
}

function setupSpaceInvaders() {
  // Player Rocket
  player = this.add.text(window.innerWidth / 2, window.innerHeight - 80, "🚀", {
    fontSize: "50px",
  });
  this.physics.add.existing(player);
  player.body.setCollideWorldBounds(true);

  // Bullets
  bullets = this.physics.add.group();

  // Aliens Grid - Adjusted for smaller size
  aliens = this.physics.add.group();
  const rows = 5;
  const cols = 10;
  const spacingX = 50; // Tighter horizontal spacing
  const spacingY = 45; // Tighter vertical spacing

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const alienEmoji = ["👾", "👽", "🛸", "🐙", "👾"][y];
      // Shrink from 35px to 24px
      const alien = this.add.text(
        x * spacingX + 80,
        y * spacingY + 80,
        alienEmoji,
        { fontSize: "24px" },
      );

      this.physics.add.existing(alien);
      alien.body.setAllowGravity(false);
      // Shrink the collision box to match the smaller emoji
      alien.body.setSize(24, 24);

      aliens.add(alien);
    }
  }

  // Alien Movement Timer
  this.alienDirection = 1;
  this.time.addEvent({
    delay: 800,
    callback: moveAliens,
    callbackScope: this,
    loop: true,
  });

  // Collisions
  this.physics.add.overlap(bullets, aliens, (bullet, alien) => {
    bullet.destroy();
    alien.destroy();
    if (aliens.countActive() === 0) {
      alert("INVADERS REPELLED! YOU WIN!");
      window.location.reload();
    }
  });

  cursors = this.input.keyboard.createCursorKeys();
}

function moveAliens() {
  let hitEdge = false;
  const padding = 60;
  const children = aliens.getChildren();

  children.forEach((alien) => {
    if (this.alienDirection === 1 && alien.x > window.innerWidth - padding)
      hitEdge = true;
    if (this.alienDirection === -1 && alien.x < padding) hitEdge = true;
  });

  if (hitEdge) {
    this.alienDirection *= -1;
    children.forEach((alien) => {
      alien.y += 40;
      alien.x += this.alienDirection * 10;
    });
  } else {
    children.forEach((alien) => {
      alien.x += 25 * this.alienDirection;
    });
  }
}
function fireBullet(scene) {
  const now = scene.time.now;
  if (now - lastFired < 400) return;

  // 1. Create the bullet slightly above the player's center
  const bullet = scene.add.text(
    player.x + player.width / 2 - 10,
    player.y - 20,
    "🔥",
    {
      fontSize: "20px",
    },
  );

  // 2. Add to physics and the group
  scene.physics.add.existing(bullet);
  bullets.add(bullet);

  // 3. FAIL-SAFES
  bullet.body.setAllowGravity(false); // Ensure gravity isn't pulling it down
  bullet.body.setImmovable(false); // Ensure it's allowed to move
  bullet.body.setVelocityY(-600); // Set the upward speed

  // 4. Force a sync between the physics body and the Text object
  bullet.body.isCircle = true; // Often helps with collision detection for small objects

  lastFired = now;
}
