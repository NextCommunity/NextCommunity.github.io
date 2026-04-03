/**
 * code-breaker.js — Developer Profile Mini-Game.
 *
 * Skills from the current profile fall as coloured tiles from the top of
 * the screen. Move the catcher left and right to collect them before they
 * hit the ground. Miss too many and you lose a life. Survive the wave to win!
 *
 * Launch:   CodeBreaker.launch(skills, developerName)
 *
 * `skills` is an array of strings (the developer's languages).
 * Falls back to GENERIC_SKILLS if the array is empty.
 *
 * Theme-aware: reads the current dark/light mode at startup.
 */

const CodeBreaker = (function () {
  const GAME_ID = "code-breaker";
  const TILE_SPEED_BASE = 80;
  const TILE_SPEED_INC = 8; // extra px/s per collected tile
  const LIVES = 3;
  const TILE_FONT_SIZE = "16px";
  const CATCHER_WIDTH = 120;
  const CATCHER_HEIGHT = 20;

  // ─── Public entry-point ──────────────────────────────────────────────────

  function launch(skills, devName) {
    GameManager.loadPhaser(function () {
      _init(skills, devName);
    });
  }

  // ─── Initialisation ──────────────────────────────────────────────────────

  function _init(rawSkills, devName) {
    const skills =
      rawSkills && rawSkills.length > 0 ? rawSkills : GENERIC_SKILLS;
    const theme = getGameTheme();
    const W = Math.min(window.innerWidth, 900);
    const H = Math.min(window.innerHeight, 600);

    const overlay = GameManager.createOverlay(GAME_ID);

    // Title bar above the canvas
    const titleBar = document.createElement("div");
    titleBar.style.cssText =
      "color:#fff;font-size:0.85rem;font-weight:900;text-transform:uppercase;" +
      "letter-spacing:0.15em;margin-bottom:0.5rem;opacity:0.8;";
    titleBar.textContent =
      "⌨️ CODE BREAKER" + (devName ? " — " + devName : "");
    overlay.appendChild(titleBar);

    // Canvas container
    const canvasWrap = document.createElement("div");
    canvasWrap.id = "game-canvas-" + GAME_ID;
    canvasWrap.style.cssText = "position:relative;";
    overlay.appendChild(canvasWrap);

    const config = {
      type: Phaser.AUTO,
      width: W,
      height: H,
      backgroundColor: theme.isDark ? "#05070a" : "#f0f4f8",
      parent: canvasWrap,
      physics: {
        default: "arcade",
        arcade: { gravity: { y: 0 }, debug: false },
      },
      scene: {
        create: function () {
          _onSceneCreate(this, skills, devName, theme, W, H);
        },
        update: function () {
          _onSceneUpdate(this);
        },
      },
    };

    GameManager.create(GAME_ID, config);
  }

  // ─── Scene ───────────────────────────────────────────────────────────────

  function _onSceneCreate(scene, skills, devName, theme, W, H) {
    // State stored on scene object
    scene.cb_lives = LIVES;
    scene.cb_score = 0;
    scene.cb_active = true;
    scene.cb_skills = skills.slice();
    scene.cb_tileSpeed = TILE_SPEED_BASE;
    scene.cb_lastSpawn = 0;
    scene.cb_spawnDelay = 1800; // ms between tile spawns

    // Groups
    scene.cb_tiles = scene.physics.add.group();

    // Catcher
    const catcherGfx = scene.add.graphics();
    catcherGfx.fillStyle(0x38bdf8, 1);
    catcherGfx.fillRoundedRect(0, 0, CATCHER_WIDTH, CATCHER_HEIGHT, 6);
    catcherGfx.generateTexture("catcher", CATCHER_WIDTH, CATCHER_HEIGHT);
    catcherGfx.destroy();

    scene.cb_catcher = scene.physics.add.image(
      W / 2,
      H - 40,
      "catcher",
    );
    scene.cb_catcher.setCollideWorldBounds(true);
    scene.cb_catcher.setImmovable(true);

    // HUD
    scene.cb_livesText = scene.add.text(10, 10, "❤️".repeat(LIVES), {
      fontSize: "18px",
    });
    scene.cb_scoreText = scene.add.text(W - 10, 10, "Score: 0", {
      fontSize: "14px",
      fill: theme.accent,
      fontStyle: "bold",
    }).setOrigin(1, 0);

    scene.cb_infoText = scene.add
      .text(W / 2, H - 12, "← → to move  •  catch your skills!", {
        fontSize: "11px",
        fill: theme.muted,
      })
      .setOrigin(0.5, 1);

    // Collision: catcher collects tile
    scene.physics.add.overlap(
      scene.cb_catcher,
      scene.cb_tiles,
      function (catcher, tile) {
        _collectTile(scene, tile, theme, W, H);
      },
    );

    // Input
    scene.cb_cursors = scene.input.keyboard.createCursorKeys();

    // Mouse / touch drag
    scene.input.on("pointermove", function (ptr) {
      if (!scene.cb_active) return;
      scene.cb_catcher.x = Phaser.Math.Clamp(
        ptr.x,
        CATCHER_WIDTH / 2,
        W - CATCHER_WIDTH / 2,
      );
    });

    // ESC to quit
    scene.input.keyboard.once("keydown-ESC", function () {
      _cleanup();
    });

    // Spawn first tile after a short delay
    scene.time.delayedCall(500, function () {
      _spawnTile(scene, theme, W);
    });
  }

  function _onSceneUpdate(scene) {
    if (!scene.cb_active) return;

    const speed = 300;

    if (scene.cb_cursors.left.isDown) {
      scene.cb_catcher.body.setVelocityX(-speed);
    } else if (scene.cb_cursors.right.isDown) {
      scene.cb_catcher.body.setVelocityX(speed);
    } else {
      scene.cb_catcher.body.setVelocityX(0);
    }

    // Schedule next spawn
    const now = scene.time.now;
    if (now - scene.cb_lastSpawn > scene.cb_spawnDelay) {
      scene.cb_lastSpawn = now;
      _spawnTile(scene, getGameTheme(), scene.scale.width);
    }

    // Check if any tile fell off the bottom
    scene.cb_tiles.getChildren().forEach(function (tile) {
      if (tile.y > scene.scale.height + 40) {
        tile.destroy();
        _loseLife(scene);
      }
    });
  }

  // ─── Game logic ──────────────────────────────────────────────────────────

  function _spawnTile(scene, theme, W) {
    if (!scene.cb_active) return;

    const skill =
      scene.cb_skills[Phaser.Math.Between(0, scene.cb_skills.length - 1)];
    const rarity = skillRarity(skill);
    const color = RARITY_COLORS[rarity] || "#94a3b8";
    const hexColor = parseInt(color.replace("#", "0x"));

    const x = Phaser.Math.Between(60, W - 60);

    // Background pill
    const bg = scene.add.graphics();
    bg.fillStyle(hexColor, 0.25);
    bg.fillRoundedRect(-50, -14, 100, 28, 6);
    bg.lineStyle(1, hexColor, 0.8);
    bg.strokeRoundedRect(-50, -14, 100, 28, 6);
    bg.generateTexture("tile_" + skill, 100, 28);
    bg.destroy();

    const tile = scene.physics.add.image(x, -20, "tile_" + skill);
    tile.body.setAllowGravity(false);
    tile.body.setVelocityY(scene.cb_tileSpeed);
    tile.setData("skill", skill);
    tile.setData("rarity", rarity);
    tile.setData("color", color);

    // Skill label on top of the pill
    const label = scene.add.text(x, -20, skill, {
      fontSize: TILE_FONT_SIZE,
      fill: color,
      fontStyle: "bold",
    }).setOrigin(0.5);

    // Keep label synced with the physics body each frame
    scene.events.on("update", function () {
      if (tile.active) {
        label.x = tile.x;
        label.y = tile.y;
      } else {
        label.destroy();
        scene.events.off("update", arguments.callee);
      }
    });

    scene.cb_tiles.add(tile);
    scene.cb_spawnDelay = Math.max(600, scene.cb_spawnDelay - 20);
  }

  function _collectTile(scene, tile, theme, W, H) {
    const skill = tile.getData("skill");
    const rarity = tile.getData("rarity");
    const color = tile.getData("color");

    tile.destroy();

    scene.cb_score += RARITY_WEIGHTS[rarity] || 1;
    scene.cb_tileSpeed = Math.min(
      280,
      TILE_SPEED_BASE + scene.cb_score * TILE_SPEED_INC,
    );

    if (scene.cb_scoreText && scene.cb_scoreText.active) {
      scene.cb_scoreText.setText("Score: " + scene.cb_score);
    }

    // Floating "+rarity" popup
    const popup = scene.add
      .text(
        scene.cb_catcher.x,
        H - 60,
        "+" + (RARITY_WEIGHTS[rarity] || 1) + " " + rarity.toUpperCase(),
        { fontSize: "12px", fill: color, fontStyle: "bold" },
      )
      .setOrigin(0.5);

    scene.tweens.add({
      targets: popup,
      y: H - 120,
      alpha: 0,
      duration: 900,
      onComplete: function () {
        popup.destroy();
      },
    });

    // Award micro-XP each catch
    GameManager.awardXP(1);

    // Win if score threshold reached
    const threshold = scene.cb_skills.length * 3;
    if (scene.cb_score >= threshold) {
      _onVictory(scene, W, H);
    }
  }

  function _loseLife(scene) {
    if (!scene.cb_active) return;

    scene.cb_lives--;

    if (scene.cb_livesText && scene.cb_livesText.active) {
      scene.cb_livesText.setText("❤️".repeat(Math.max(0, scene.cb_lives)));
    }

    // Screen flash
    scene.cameras.main.flash(300, 255, 50, 50, true);

    if (scene.cb_lives <= 0) {
      _onDefeat(scene);
    }
  }

  function _onVictory(scene, W, H) {
    if (!scene.cb_active) return;
    scene.cb_active = false;

    GameManager.awardXP(XP_CODE_BREAKER_WIN);
    const wins = GameManager.incrementStat("code_breaker_wins");
    if (wins >= 10) GameManager.grantAchievement("code_wizard");
    GameManager.setHighScore(GAME_ID, scene.cb_score);

    _showEndScreen(
      scene,
      W,
      H,
      "⌨️ SKILLS MASTERED!",
      "#fbbf24",
      "+" + XP_CODE_BREAKER_WIN + " XP",
    );
  }

  function _onDefeat(scene) {
    scene.cb_active = false;
    const W = scene.scale.width;
    const H = scene.scale.height;
    _showEndScreen(scene, W, H, "💀 CONNECTION LOST", "#ef4444", "Try again!");
  }

  function _showEndScreen(scene, W, H, headline, headlineColor, sub) {
    scene.cb_tiles.clear(true, true);
    scene.cb_catcher.setVelocityX(0);

    scene.add
      .text(W / 2, H / 2 - 40, headline, {
        fontSize: "36px",
        fontStyle: "bold",
        fill: headlineColor,
        stroke: "#000000",
        strokeThickness: 5,
      })
      .setOrigin(0.5);

    scene.add
      .text(W / 2, H / 2 + 10, sub, {
        fontSize: "22px",
        fill: "#ffffff",
      })
      .setOrigin(0.5);

    scene.add
      .text(W / 2, H / 2 + 60, "Click to close", {
        fontSize: "13px",
        fill: "#ffffff",
        alpha: 0.6,
      })
      .setOrigin(0.5);

    scene.input.once("pointerdown", _cleanup);
    scene.input.keyboard.once("keydown-ESC", _cleanup);
  }

  function _cleanup() {
    GameManager.destroy(GAME_ID);
    GameManager.destroyOverlay(GAME_ID);
  }

  // ─── Public API ──────────────────────────────────────────────────────────

  return { launch: launch };
})();
