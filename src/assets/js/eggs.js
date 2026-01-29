function initPhaserGame() {
  const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: "phaser-container", // Make sure this div exists in your HTML
    transparent: true,
    physics: {
      default: "arcade",
      arcade: { gravity: { y: 300 } },
    },
    scene: {
      preload: preload,
      create: create,
    },
  };

  const game = new Phaser.Game(config);
}

function preload() {
  // No need to preload images if we are only using text/emojis!
}

function create() {
  const emojis = [
    // Gaming & Tech
    "🎮",
    "🕹️",
    "👾",
    "🚀",
    "💻",
    "📱",
    "⌨️",
    "🖱️",
    "🔋",
    "🔌",
    // Magic & Space
    "✨",
    "⭐",
    "🌟",
    "🔮",
    "🌌",
    "🌠",
    "🌙",
    "☄️",
    "🛸",
    "👽",
    // Action & Fun
    "🔥",
    "💥",
    "🧨",
    "⚡",
    "🌈",
    "🎉",
    "🎊",
    "🎈",
    "🎁",
    "💎",
    // Hearts & Expressions
    "💖",
    "🎯",
    "🏆",
    "🥇",
    "🧿",
    "🍀",
    "🍕",
    "🍭",
    "🍦",
    "🍩",
    // Creatures & Icons
    "🤖",
    "👻",
    "🐲",
    "🦄",
    "🦊",
    "🐱",
    "🐧",
    "🦖",
    "🍄",
    "🌍",
  ];
  const heartRect = document
    .getElementById("footer-heart")
    .getBoundingClientRect();

  for (let i = 0; i < 75; i++) {
    // 1. Pick a random emoji
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

    // 2. Create the emoji at the heart's location
    // We use this.add.text instead of this.physics.add.image
    const particle = this.add.text(heartRect.left, heartRect.top, randomEmoji, {
      fontSize: "32px",
    });

    // 3. Manually add physics to the text object
    this.physics.add.existing(particle);

    // 4. Apply the "Explosion" physics
    // Shoots them out in a cone shape upward
    particle.body.setVelocity(
      Phaser.Math.Between(-300, 300),
      Phaser.Math.Between(-500, -1000),
    );

    particle.body.setCollideWorldBounds(true);
    particle.body.setBounce(0.7);

    // Optional: Add a little random rotation for flair
    particle.setAngle(Phaser.Math.Between(0, 360));
  }
}
