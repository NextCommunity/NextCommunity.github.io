/**
 * space-invaders.js — The classic Space Invaders Easter Egg game.
 *
 * Trigger: 5 clicks on the footer heart (handled by eggs.js).
 * API:     SpaceInvaders.launch()
 *
 * Migrated from eggs.js into its own module so it can be managed by
 * GameManager and lazy-loaded alongside the other mini-games.
 */

const SpaceInvaders = (() => {
  const ALIEN_ROWS = ["👾", "👽", "🛸", "🐙", "👾"];
  const GAME_ID = "space-invaders";
  const BULLET_CLEANUP_BUFFER = 40;
  let _audioContext = null;

  // ─── Public entry-point ──────────────────────────────────────────────────

  /**
   * Lazily loads Phaser then starts the Space Invaders experience.
   * Calling this while an instance is already running restarts it.
   */
  function launch() {
    GameManager.loadPhaser(_init);
  }

  // ─── Initialisation ──────────────────────────────────────────────────────

  function _init() {
    // Full-screen transparent canvas placed over the page
    const canvas = document.createElement("canvas");
    canvas.id = "game-canvas-" + GAME_ID;
    Object.assign(canvas.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100vw",
      height: "100vh",
      zIndex: "10000",
      pointerEvents: "auto",
      background: "#000000",
    });
    document.body.appendChild(canvas);

    const config = {
      type: Phaser.CANVAS,
      canvas: canvas,
      width: window.innerWidth,
      height: window.innerHeight,
      transparent: false,
      backgroundColor: "#000000",
      physics: {
        default: "arcade",
        arcade: { gravity: { y: 0 }, debug: false },
      },
      scene: {
        preload: () => {},
        create: _onCreate,
        update: _onUpdate,
      },
    };

    GameManager.create(GAME_ID, config);
  }

  // ─── Scene callbacks ─────────────────────────────────────────────────────

  function _onCreate() {
    _setupGame(this);
  }

  function _onUpdate() {
    if (!this.si_player || !this.si_player.body) return;

    if (this.si_cursors.left.isDown) {
      this.si_player.body.setVelocityX(-400);
    } else if (this.si_cursors.right.isDown) {
      this.si_player.body.setVelocityX(400);
    } else {
      this.si_player.body.setVelocityX(0);
    }

    if (this.si_cursors.space.isDown) {
      _fireBullet(this);
    }

    const bullets = this.si_bullets?.getChildren?.() || [];
    bullets.forEach((bullet) => {
      if (!bullet.active) return;
      if (
        bullet.y < -BULLET_CLEANUP_BUFFER ||
        bullet.x < -BULLET_CLEANUP_BUFFER ||
        bullet.x > this.scale.width + BULLET_CLEANUP_BUFFER
      ) {
        bullet.destroy();
      }
    });
  }

  // ─── Game setup ──────────────────────────────────────────────────────────

  function _setupGame(scene) {
    // Player rocket
    scene.si_player = scene.add.text(
      window.innerWidth / 2,
      window.innerHeight - 80,
      "🚀",
      { fontSize: "50px" },
    );
    scene.physics.add.existing(scene.si_player);
    scene.si_player.body.setCollideWorldBounds(true);

    // Bullet pool
    scene.si_bullets = scene.physics.add.group();

    // Alien grid
    scene.si_aliens = scene.physics.add.group();
    scene.si_lastFired = 0;

    const rows = 5;
    const cols = 10;
    const spacingX = 50;
    const spacingY = 45;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const alien = scene.add.text(
          x * spacingX + 80,
          y * spacingY + 80,
          ALIEN_ROWS[y],
          { fontSize: "24px" },
        );
        scene.physics.add.existing(alien);
        alien.body.setAllowGravity(false);
        alien.body.setSize(24, 24);
        scene.si_aliens.add(alien);
      }
    }

    // Alien movement timer
    scene.si_alienDirection = 1;
    scene.time.addEvent({
      delay: 800,
      callback: _moveAliens,
      callbackScope: scene,
      loop: true,
    });

    // Collision: bullet hits alien
    scene.physics.add.overlap(
      scene.si_bullets,
      scene.si_aliens,
      (bullet, alien) => {
        bullet.destroy();
        alien.destroy();
        _playInvaderHitSound();

        if (scene.si_aliens.countActive() === 0) {
          _onVictory(scene);
        }
      },
    );

    scene.si_cursors = scene.input.keyboard.createCursorKeys();

    // HUD hint
    scene.add
      .text(
        window.innerWidth / 2,
        window.innerHeight - 30,
        "← → MOVE    SPACE SHOOT    ESC QUIT",
        { fontSize: "13px", fill: "#ffffff", alpha: 0.6 },
      )
      .setOrigin(0.5);

    // ESC to quit
    scene.input.keyboard.once("keydown-ESC", () => {
      _cleanup();
    });
  }

  // ─── Game logic helpers ───────────────────────────────────────────────────

  /** Called with `callbackScope: scene` so `this` = scene. */
  function _moveAliens() {
    const padding = 60;
    let hitEdge = false;
    const children = this.si_aliens.getChildren();

    children.forEach((alien) => {
      if (this.si_alienDirection === 1 && alien.x > window.innerWidth - padding)
        hitEdge = true;
      if (this.si_alienDirection === -1 && alien.x < padding) hitEdge = true;
    });

    if (hitEdge) {
      this.si_alienDirection *= -1;
      children.forEach((alien) => {
        alien.y += 40;
        alien.x += this.si_alienDirection * 10;
      });
    } else {
      children.forEach((alien) => {
        alien.x += 25 * this.si_alienDirection;
      });
    }
  }

  function _fireBullet(scene) {
    const now = scene.time.now;
    if (now - scene.si_lastFired < 400) return;

    const bullet = scene.add.text(
      scene.si_player.x + scene.si_player.width / 2 - 10,
      scene.si_player.y - 20,
      "🔥",
      { fontSize: "20px" },
    );

    scene.physics.add.existing(bullet);
    scene.si_bullets.add(bullet);
    bullet.body.setAllowGravity(false);
    bullet.body.setVelocityY(-600);
    bullet.body.isCircle = true;

    scene.si_lastFired = now;
  }

  function _playInvaderHitSound() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    if (!_audioContext) {
      _audioContext = new AudioCtx();
    }
    if (_audioContext.state === "suspended") {
      _audioContext.resume().catch(() => {});
    }

    const now = _audioContext.currentTime;
    const oscillator = _audioContext.createOscillator();
    const gainNode = _audioContext.createGain();

    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(840, now);
    oscillator.frequency.exponentialRampToValueAtTime(280, now + 0.08);

    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.exponentialRampToValueAtTime(0.12, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

    oscillator.connect(gainNode);
    gainNode.connect(_audioContext.destination);

    oscillator.start(now);
    oscillator.stop(now + 0.1);
  }

  // ─── Victory / cleanup ────────────────────────────────────────────────────

  function _onVictory(scene) {
    const w = scene.scale.width;
    const h = scene.scale.height;

    // Award XP
    GameManager.awardXP(XP_SPACE_INVADERS_WIN);

    // Track wins and check achievement
    const wins = GameManager.incrementStat("space_invaders_wins");
    if (wins === 1) GameManager.grantAchievement("first_blood");

    // Update high score (score = wins × 100)
    GameManager.setHighScore(GAME_ID, wins * 100);

    // Victory overlay
    scene.add
      .text(w / 2, h / 2 - 60, "🎉 INVADERS REPELLED! 🎉", {
        fontSize: "40px",
        fontStyle: "bold",
        fill: "#fbbf24",
        stroke: "#000000",
        strokeThickness: 6,
      })
      .setOrigin(0.5);

    scene.add
      .text(w / 2, h / 2 + 10, "+" + XP_SPACE_INVADERS_WIN + " XP Earned!", {
        fontSize: "28px",
        fill: "#10b981",
        stroke: "#000000",
        strokeThickness: 4,
      })
      .setOrigin(0.5);

    scene.add
      .text(w / 2, h / 2 + 70, "Click anywhere to continue", {
        fontSize: "16px",
        fill: "#ffffff",
        alpha: 0.7,
      })
      .setOrigin(0.5);

    scene.input.once("pointerdown", _cleanup);
  }

  function _cleanup() {
    GameManager.destroy(GAME_ID);
  }

  // ─── Public API ──────────────────────────────────────────────────────────

  return { launch: launch };
})();
