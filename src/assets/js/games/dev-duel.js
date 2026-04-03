/**
 * dev-duel.js — Developer Card Battle Mini-Game.
 *
 * Two developer cards from the homepage grid face off in a Phaser battle
 * scene. Each card's power is calculated from the rarity weights of its
 * skill tags. The card with the higher total power wins.
 *
 * Launch:   DevDuel.launch(challengerData, opponentData)
 *
 * Each data object: { name, role, skills: string[] }
 *
 * Theme-aware: reads the current dark/light mode at startup.
 */

const DevDuel = (() => {
  const GAME_ID = "dev-duel";

  // ─── Public entry-point ──────────────────────────────────────────────────

  /**
   * @param {{ name:string, role:string, skills:string[] }} challenger
   * @param {{ name:string, role:string, skills:string[] }} opponent
   */
  function launch(challenger, opponent) {
    GameManager.loadPhaser(() => {
      _init(challenger, opponent);
    });
  }

  // ─── Initialisation ──────────────────────────────────────────────────────

  function _init(challenger, opponent) {
    const theme = getGameTheme();
    const W = Math.min(window.innerWidth, 900);
    const H = Math.min(window.innerHeight, 520);

    // Destroy any previous game instance BEFORE building the new overlay so
    // that GameManager.destroy() (which removes "#game-canvas-{id}") doesn't
    // rip out the canvas wrapper we are about to create.
    GameManager.destroy(GAME_ID);
    GameManager.destroyOverlay(GAME_ID);

    const overlay = GameManager.createOverlay(GAME_ID);

    const titleBar = document.createElement("div");
    titleBar.style.cssText =
      "color:#fff;font-size:0.85rem;font-weight:900;text-transform:uppercase;" +
      "letter-spacing:0.15em;margin-bottom:0.5rem;opacity:0.8;";
    titleBar.textContent = "⚔️ DEVELOPER DUEL";
    overlay.appendChild(titleBar);

    // Canvas container — intentionally has NO id matching "game-canvas-{GAME_ID}"
    // to avoid being removed by a subsequent GameManager.destroy() call before
    // Phaser has a chance to mount inside it.
    const canvasWrap = document.createElement("div");
    overlay.appendChild(canvasWrap);

    const config = {
      type: Phaser.AUTO,
      width: W,
      height: H,
      backgroundColor: theme.isDark ? "#0f172a" : "#e2e8f0",
      parent: canvasWrap,
      scene: {
        create: function () {
          _onSceneCreate(this, challenger, opponent, theme, W, H);
        },
      },
    };

    // Register the instance directly so destroy() can still clean it up,
    // but skip the internal destroy() pre-call (already done above).
    var instance = new Phaser.Game(config);
    GameManager.instances[GAME_ID] = instance;
  }

  // ─── Scene ───────────────────────────────────────────────────────────────

  function _onSceneCreate(scene, challenger, opponent, theme, W, H) {
    const cPower = _calcPower(challenger.skills);
    const oPower = _calcPower(opponent.skills);

    // Title
    scene.add
      .text(W / 2, 20, "⚔️ DEVELOPER DUEL", {
        fontSize: "20px",
        fontStyle: "bold",
        fill: "#fbbf24",
      })
      .setOrigin(0.5, 0);

    // Cards
    _drawCard(scene, challenger, cPower, W * 0.22, H / 2 - 20, theme, false);
    _drawCard(scene, opponent, oPower, W * 0.78, H / 2 - 20, theme, true);

    // VS label
    scene.add
      .text(W / 2, H / 2 - 20, "VS", {
        fontSize: "42px",
        fontStyle: "bold",
        fill: "#ef4444",
        stroke: "#000",
        strokeThickness: 6,
        alpha: 0.9,
      })
      .setOrigin(0.5);

    // Power bars
    _drawPowerBar(
      scene,
      challenger.name,
      cPower,
      W * 0.02,
      H - 90,
      W * 0.44,
      theme,
    );
    _drawPowerBar(
      scene,
      opponent.name,
      oPower,
      W * 0.54,
      H - 90,
      W * 0.44,
      theme,
    );

    // Animate the battle after a short delay
    scene.time.delayedCall(800, () => {
      _animateBattle(scene, challenger, opponent, cPower, oPower, W, H, theme);
    });
  }

  function _drawCard(scene, dev, power, cx, cy, theme, flipSide) {
    const cardW = 160;
    const cardH = 200;
    const x = cx - cardW / 2;
    const y = cy - cardH / 2;

    // Card background
    const gfx = scene.add.graphics();
    gfx.fillStyle(theme.isDark ? 0x1e293b : 0xffffff, 1);
    gfx.lineStyle(2, 0x38bdf8, 0.8);
    gfx.fillRoundedRect(x, y, cardW, cardH, 12);
    gfx.strokeRoundedRect(x, y, cardW, cardH, 12);

    // Name
    scene.add
      .text(cx, y + 18, dev.name || "Developer", {
        fontSize: "13px",
        fontStyle: "bold",
        fill: theme.text,
        wordWrap: { width: cardW - 16 },
        align: "center",
      })
      .setOrigin(0.5, 0);

    // Role
    scene.add
      .text(cx, y + 40, dev.role || "", {
        fontSize: "9px",
        fill: "#38bdf8",
        wordWrap: { width: cardW - 16 },
        align: "center",
      })
      .setOrigin(0.5, 0);

    // Power score
    scene.add
      .text(cx, y + 65, "⚡ PWR: " + power, {
        fontSize: "15px",
        fontStyle: "bold",
        fill: "#fbbf24",
      })
      .setOrigin(0.5, 0);

    // Top skills (up to 5)
    const skills = (dev.skills || []).slice(0, 5);
    skills.forEach((skill, i) => {
      const rarity = skillRarity(skill);
      const color = RARITY_COLORS[rarity] || "#94a3b8";
      scene.add
        .text(cx, y + 92 + i * 18, skill, {
          fontSize: "10px",
          fill: color,
          fontStyle: "bold",
        })
        .setOrigin(0.5, 0);
    });
  }

  function _drawPowerBar(scene, label, power, x, y, maxW, theme) {
    const totalPossible = 120; // rough max
    const barW = Math.min((power / totalPossible) * maxW, maxW);

    scene.add.text(x, y, label, {
      fontSize: "9px",
      fill: theme.muted,
      fontStyle: "bold",
    });

    // Bar background
    const bgGfx = scene.add.graphics();
    bgGfx.fillStyle(0x1e293b, 0.6);
    bgGfx.fillRoundedRect(x, y + 14, maxW, 10, 3);

    // Bar fill
    const fillGfx = scene.add.graphics();
    fillGfx.fillStyle(0x38bdf8, 1);
    fillGfx.fillRoundedRect(x, y + 14, 0, 10, 3);

    // Animate bar fill
    scene.tweens.add({
      targets: { w: 0 },
      w: barW,
      duration: 800,
      ease: "Power2",
      onUpdate: (tween, target) => {
        fillGfx.clear();
        fillGfx.fillStyle(0x38bdf8, 1);
        fillGfx.fillRoundedRect(x, y + 14, target.w, 10, 3);
      },
    });

    scene.add.text(x + maxW + 4, y + 14, power, {
      fontSize: "9px",
      fill: "#fbbf24",
      fontStyle: "bold",
    });
  }

  // ─── Battle animation ─────────────────────────────────────────────────────

  function _animateBattle(
    scene,
    challenger,
    opponent,
    cPower,
    oPower,
    W,
    H,
    theme,
  ) {
    // Flash attacks back and forth
    let round = 0;
    const maxRounds = 5;

    const attackFlash = () => {
      if (round >= maxRounds) {
        scene.time.delayedCall(400, () => {
          _showResult(scene, challenger, opponent, cPower, oPower, W, H, theme);
        });
        return;
      }

      round++;
      const fromLeft = round % 2 === 1;
      const startX = fromLeft ? W * 0.22 : W * 0.78;
      const endX = fromLeft ? W * 0.78 : W * 0.22;

      const bolt = scene.add
        .text(startX, H / 2 - 20, "⚡", { fontSize: "28px" })
        .setOrigin(0.5);

      scene.tweens.add({
        targets: bolt,
        x: endX,
        duration: 350,
        ease: "Power2",
        onComplete: () => {
          bolt.destroy();
          scene.cameras.main.shake(120, 0.008);
          scene.time.delayedCall(200, attackFlash);
        },
      });
    };

    attackFlash();
  }

  // ─── Result screen ────────────────────────────────────────────────────────

  function _showResult(
    scene,
    challenger,
    opponent,
    cPower,
    oPower,
    W,
    H,
    theme,
  ) {
    const challengerWins = cPower >= oPower;
    const winner = challengerWins ? challenger : opponent;

    // Dim overlay
    const dimGfx = scene.add.graphics();
    dimGfx.fillStyle(0x000000, 0.6);
    dimGfx.fillRect(0, 0, W, H);

    // Award XP for playing (all players earn this) and track stats
    GameManager.awardXP(XP_DEV_DUEL_PLAY);
    const duels = GameManager.incrementStat("dev_duel_plays");
    if (duels >= 5) GameManager.grantAchievement("duelist");
    GameManager.setHighScore(GAME_ID, Math.max(cPower, oPower));

    // Winner banner
    scene.add
      .text(W / 2, H / 2 - 70, "🏆 WINNER", {
        fontSize: "16px",
        fill: "#fbbf24",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    scene.add
      .text(W / 2, H / 2 - 40, winner.name || "Developer", {
        fontSize: "30px",
        fontStyle: "bold",
        fill: "#ffffff",
        stroke: "#000",
        strokeThickness: 4,
      })
      .setOrigin(0.5);

    const powerDiff = Math.abs(cPower - oPower);
    scene.add
      .text(W / 2, H / 2 + 5, "Power advantage: +" + powerDiff + " pts", {
        fontSize: "14px",
        fill: "#94a3b8",
      })
      .setOrigin(0.5);

    scene.add
      .text(W / 2, H / 2 + 35, "+" + XP_DEV_DUEL_PLAY + " XP for playing!", {
        fontSize: "18px",
        fill: "#10b981",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    scene.add
      .text(W / 2, H / 2 + 75, "Click to close", {
        fontSize: "12px",
        fill: "#ffffff",
        alpha: 0.5,
      })
      .setOrigin(0.5);

    scene.input.once("pointerdown", _cleanup);
    scene.input.keyboard.once("keydown-ESC", _cleanup);
  }

  // ─── Helpers ──────────────────────────────────────────────────────────────

  /**
   * Sums rarity weights for each skill. Higher rarity → higher power.
   */
  function _calcPower(skills) {
    if (!skills || skills.length === 0) return 1;
    return skills.reduce((total, skill) => {
      const rarity = skillRarity(skill);
      return total + (RARITY_WEIGHTS[rarity] || 1);
    }, 0);
  }

  function _cleanup() {
    GameManager.destroy(GAME_ID);
    GameManager.destroyOverlay(GAME_ID);
  }

  // ─── Public API ──────────────────────────────────────────────────────────

  return { launch: launch };
})();

// ─── Homepage Integration ─────────────────────────────────────────────────────

/**
 * Reads a developer card's data from its DOM element.
 * Called by the "Duel" button click handlers in index.njk.
 *
 * @param {HTMLElement} cardEl  The .user-card element.
 * @returns {{ name:string, role:string, skills:string[] }}
 */
function getCardData(cardEl) {
  return {
    name: (cardEl.dataset.name || "").trim(),
    role: (cardEl.dataset.role || "").trim(),
    skills: (cardEl.dataset.skills || "").trim().split(/\s+/).filter(Boolean),
  };
}

/**
 * Triggered when the player clicks "Duel" on a homepage developer card.
 * Picks a random *different* card as the opponent and launches the duel.
 *
 * @param {HTMLElement} challengerCard  The card element that was clicked.
 */
function startDuelFromCard(challengerCard) {
  const allCards = Array.from(
    document.querySelectorAll(".user-card[data-name]"),
  );
  const others = allCards.filter((c) => c !== challengerCard);

  if (others.length === 0) return;

  const opponent = others[Math.floor(Math.random() * others.length)];
  DevDuel.launch(getCardData(challengerCard), getCardData(opponent));
}
