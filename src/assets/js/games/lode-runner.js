/**
 * lode-runner.js — Lode Runner, Level 1.
 *
 * Classic grid-based platformer. Collect all the gold and avoid the guards!
 *
 * Controls:
 *   Arrow keys  – move left / right / climb up or down a ladder
 *   Z           – dig hole to the left  (must be standing on solid ground)
 *   X           – dig hole to the right (must be standing on solid ground)
 *   ESC         – quit
 *
 * Theme-aware: reads dark / light mode at startup.
 */

const LoadRunner = (() => {
  const GAME_ID  = "lode-runner";
  const TILE     = 28;       // px per grid cell
  const COLS     = 28;
  const ROWS     = 16;
  const MOVE_MS  = 150;      // ms per player step
  const GUARD_MS = 400;      // ms per guard step

  // ── Tile-type constants ─────────────────────────────────────────────────
  const MT = { EMPTY: 0, BRICK: 1, STEEL: 2, LADDER: 3, ROPE: 4, GOLD: 5 };
  const E = MT.EMPTY, B = MT.BRICK, S = MT.STEEL,
        H = MT.LADDER, G = MT.GOLD;

  // ── Level 1 layout — 16 rows × 28 columns ──────────────────────────────
  //
  // Floors:    rows 3, 6, 9, 12, 15 (15 = indestructible steel floor)
  // Ladders:   rows 4-9  at cols 5 & 22 ; rows 10-14 at cols 5 & 16
  // Gold:      rows 2, 5, 8, 11
  // Gap:       row 9 col 12 (fall-through shortcut between upper floors)
  //
  // Player start : row 14 col  1
  // Guards start : row 14 cols 9 & 20
  //
  /* eslint-disable no-multi-spaces */
  const LEVEL = [
    //  0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27
    [S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S], // 0
    [S, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, S], // 1
    [S, E, G, E, E, E, E, G, E, E, E, G, E, E, E, E, G, E, E, E, E, G, E, E, E, E, E, S], // 2
    [S, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, S], // 3
    [S, E, E, E, E, H, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, H, E, E, E, E, S], // 4
    [S, E, E, G, E, H, E, E, G, E, E, E, G, E, E, E, G, E, E, E, E, E, H, E, E, G, E, S], // 5
    [S, B, B, B, B, H, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, H, B, B, B, B, S], // 6
    [S, E, E, E, E, H, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, H, E, E, E, E, S], // 7
    [S, E, E, G, E, H, E, E, E, G, E, E, E, E, G, E, E, E, E, E, E, E, H, E, E, G, E, S], // 8
    [S, B, B, B, B, B, B, B, B, B, B, B, E, B, B, B, B, B, B, B, B, B, B, B, B, B, B, S], // 9  ← gap col 12
    [S, E, E, E, E, H, E, E, E, E, E, E, E, E, E, E, H, E, E, E, E, E, E, E, E, E, E, S], // 10
    [S, E, E, G, E, H, E, E, G, E, E, E, E, G, E, E, H, E, E, G, E, E, E, E, E, G, E, S], // 11
    [S, B, B, B, B, H, B, B, B, B, B, B, B, B, B, B, H, B, B, B, B, B, B, B, B, B, B, S], // 12
    [S, E, E, E, E, H, E, E, E, E, E, E, E, E, E, E, H, E, E, E, E, E, E, E, E, E, E, S], // 13
    [S, E, E, E, E, H, E, E, E, E, E, E, E, E, E, E, H, E, E, E, E, E, E, E, E, E, E, S], // 14
    [S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S], // 15
  ];
  /* eslint-enable no-multi-spaces */

  const PLAYER_START = { r: 14, c: 1 };
  const GUARD_STARTS = [
    { r: 14, c: 9,  dir:  1 },
    { r: 14, c: 20, dir: -1 },
  ];

  const DIG_FILL_MS  = 6000; // ms before a dug hole refills

  // ── Public entry-point ──────────────────────────────────────────────────
  function launch() {
    GameManager.loadPhaser(() => _init());
  }

  // ── Initialisation ──────────────────────────────────────────────────────
  function _init() {
    const theme = getGameTheme();
    const W = COLS * TILE;
    const H = ROWS * TILE;

    GameManager.destroy(GAME_ID);
    GameManager.destroyOverlay(GAME_ID);

    const overlay = GameManager.createOverlay(GAME_ID);

    const titleBar = document.createElement("div");
    titleBar.style.cssText =
      "color:#fff;font-size:0.85rem;font-weight:900;text-transform:uppercase;" +
      "letter-spacing:0.15em;margin-bottom:0.5rem;opacity:0.8;";
    titleBar.textContent = "🏃 LODE RUNNER — Level 1";
    overlay.appendChild(titleBar);

    const canvasWrap = document.createElement("div");
    canvasWrap.style.cssText = "position:relative;";
    overlay.appendChild(canvasWrap);

    const config = {
      type: Phaser.AUTO,
      width: W,
      height: H,
      backgroundColor: theme.isDark ? "#0a0c14" : "#cbd5e1",
      parent: canvasWrap,
      scene: {
        create() { _onCreate(this, theme, W, H); },
        update() { _onUpdate(this); },
      },
    };

    const instance = new Phaser.Game(config);
    GameManager.instances[GAME_ID] = instance;
  }

  // ── Scene create ────────────────────────────────────────────────────────
  function _onCreate(scene, theme, W, H) {
    // Deep-copy the level so we can mutate tiles (dig holes)
    scene.lr_map = LEVEL.map(row => row.slice());
    scene.lr_active   = true;
    scene.lr_score    = 0;
    scene.lr_goldLeft = 0;
    scene.lr_digTimers     = [];  // { r, c, fillAt }
    scene.lr_playerMoveAt  = 0;
    scene.lr_guardMoveAt   = 0;
    scene.lr_dirty         = true;

    // Count gold
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++)
        if (scene.lr_map[r][c] === MT.GOLD) scene.lr_goldLeft++;

    // Graphics layers (back-to-front)
    scene.lr_gfx       = scene.add.graphics();
    scene.lr_playerGfx = scene.add.graphics();
    scene.lr_guardGfx  = scene.add.graphics();

    // Player
    scene.lr_player = { r: PLAYER_START.r, c: PLAYER_START.c };

    // Guards
    scene.lr_guards = GUARD_STARTS.map(g => ({
      r: g.r, c: g.c, dir: g.dir,
      startR: g.r, startC: g.c, startDir: g.dir,
      respawnAt: 0,
    }));

    // HUD texts
    const hudStyle = {
      fontSize: "12px",
      fill: theme.isDark ? "#e2e8f0" : "#1e293b",
      fontStyle: "bold",
    };
    scene.lr_goldText  = scene.add
      .text(8, 3, "Gold: " + scene.lr_goldLeft, hudStyle)
      .setDepth(10);
    scene.lr_scoreText = scene.add
      .text(W - 8, 3, "Score: 0", hudStyle)
      .setOrigin(1, 0)
      .setDepth(10);
    scene.add
      .text(
        W / 2, H - 2,
        "Arrows: move/climb   Z: dig left   X: dig right   ESC: quit",
        { fontSize: "9px", fill: "#94a3b8" },
      )
      .setOrigin(0.5, 1)
      .setDepth(10);

    // Input
    scene.lr_cursors = scene.input.keyboard.createCursorKeys();
    scene.lr_keyZ    = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    scene.lr_keyX    = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    scene.input.keyboard.once("keydown-ESC", _cleanup);

    GameManager.incrementStat("load_runner_plays");
    _draw(scene, theme);
  }

  // ── Scene update ────────────────────────────────────────────────────────
  function _onUpdate(scene) {
    if (!scene.lr_active) return;

    const now   = scene.time.now;
    const theme = getGameTheme();

    // ── Refill dug bricks ──
    const before = scene.lr_digTimers.length;
    scene.lr_digTimers = scene.lr_digTimers.filter(dt => {
      if (now < dt.fillAt) return true;
      const p        = scene.lr_player;
      const occupied =
        (p.r === dt.r && p.c === dt.c) ||
        scene.lr_guards.some(g => g.r === dt.r && g.c === dt.c);
      if (!occupied) {
        scene.lr_map[dt.r][dt.c] = MT.BRICK;
        scene.lr_dirty = true;
        return false;
      }
      dt.fillAt = now + 1000; // retry in 1 s
      return true;
    });
    if (scene.lr_digTimers.length !== before) scene.lr_dirty = true;

    // ── Player turn ──
    if (now >= scene.lr_playerMoveAt) {
      const moved = _playerTurn(scene);
      if (moved) {
        scene.lr_playerMoveAt = now + MOVE_MS;
        scene.lr_dirty = true;
        _checkGold(scene);
        _checkDeath(scene);
      }
    }

    // ── Guard turns ──
    if (now >= scene.lr_guardMoveAt) {
      _guardTurns(scene, now);
      scene.lr_guardMoveAt = now + GUARD_MS;
      scene.lr_dirty = true;
      _checkDeath(scene);
    }

    // ── Redraw only when something changed ──
    if (scene.lr_dirty && scene.lr_active) {
      _draw(scene, theme);
      scene.lr_dirty = false;
    }
  }

  // ── Player input & movement ─────────────────────────────────────────────
  function _playerTurn(scene) {
    const p   = scene.lr_player;
    const map = scene.lr_map;
    const cur = scene.lr_cursors;

    // Gravity first (takes priority over deliberate input)
    if (_fallOne(p, map)) return true;

    // Dig actions
    if (Phaser.Input.Keyboard.JustDown(scene.lr_keyZ)) return _dig(scene, p, -1);
    if (Phaser.Input.Keyboard.JustDown(scene.lr_keyX)) return _dig(scene, p,  1);

    // Directional movement
    if (cur.left.isDown)  return _walk(p, map, 0, -1);
    if (cur.right.isDown) return _walk(p, map, 0,  1);
    if (cur.up.isDown)    return _walk(p, map, -1, 0);
    if (cur.down.isDown)  return _walk(p, map,  1, 0);

    return false;
  }

  /**
   * Attempt to move entity one grid step. Returns true if the move succeeded.
   * Works for both the player and guards.
   */
  function _walk(entity, map, dr, dc) {
    const nr = entity.r + dr;
    const nc = entity.c + dc;
    if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS) return false;

    const curTile  = map[entity.r][entity.c];
    const destTile = map[nr][nc];
    const belowCur = entity.r + 1 < ROWS ? map[entity.r + 1][entity.c] : MT.STEEL;

    // Solid tiles are impassable
    if (destTile === MT.BRICK || destTile === MT.STEEL) return false;

    if (dr === -1) {
      // Moving UP: only on a ladder
      if (curTile !== MT.LADDER) return false;
    }

    if (dr === 1) {
      // Moving DOWN: entity must currently be on a ladder, or dest is a ladder
      if (curTile !== MT.LADDER && destTile !== MT.LADDER) return false;
    }

    if (dc !== 0) {
      // Horizontal movement requires solid ground, a ladder, or a rope underfoot
      const onGround = belowCur === MT.BRICK || belowCur === MT.STEEL;
      const onLadder = curTile === MT.LADDER;
      const onRope   = curTile === MT.ROPE;
      if (!onGround && !onLadder && !onRope) return false;
    }

    entity.r = nr;
    entity.c = nc;
    return true;
  }

  /** Drop entity one row if not supported. Returns true if it fell. */
  function _fallOne(entity, map) {
    const curTile  = map[entity.r][entity.c];
    const belowTile = entity.r + 1 < ROWS ? map[entity.r + 1][entity.c] : MT.STEEL;

    if (curTile === MT.LADDER || curTile === MT.ROPE) return false;
    if (belowTile === MT.BRICK || belowTile === MT.STEEL || belowTile === MT.LADDER) return false;

    if (entity.r + 1 < ROWS) { entity.r++; return true; }
    return false;
  }

  /**
   * Dig the brick one row below the player, one column to the side (dc = ±1).
   * Only legal when standing on solid ground next to a diggable brick.
   */
  function _dig(scene, player, dc) {
    const tr = player.r + 1; // target row  = floor level
    const tc = player.c + dc; // target col  = one tile to the side

    if (tr >= ROWS || tc < 0 || tc >= COLS) return false;
    if (scene.lr_map[tr][tc] !== MT.BRICK) return false;

    // Player must be standing on solid ground (not on a ladder / rope / falling)
    const belowPlayer = tr < ROWS ? scene.lr_map[tr][player.c] : MT.STEEL;
    if (belowPlayer !== MT.BRICK && belowPlayer !== MT.STEEL) return false;

    scene.lr_map[tr][tc] = MT.EMPTY;
    scene.lr_digTimers.push({ r: tr, c: tc, fillAt: scene.time.now + DIG_FILL_MS });
    return true;
  }

  // ── Guard AI ────────────────────────────────────────────────────────────
  function _guardTurns(scene, now) {
    const map = scene.lr_map;
    const p   = scene.lr_player;

    for (const g of scene.lr_guards) {
      // Waiting to respawn after falling into a dug hole
      if (g.respawnAt > 0) {
        if (now >= g.respawnAt) {
          g.r = g.startR; g.c = g.startC; g.dir = g.startDir;
          g.respawnAt = 0;
        }
        continue;
      }

      // Detect if guard has fallen into a dug hole
      const inHole = scene.lr_digTimers.some(dt => dt.r === g.r && dt.c === g.c);
      if (inHole) {
        g.respawnAt = now + 4000; // trapped for 4 s then respawn
        continue;
      }

      // Gravity
      if (_fallOne(g, map)) continue;

      // On a ladder → chase player vertically
      if (map[g.r][g.c] === MT.LADDER) {
        const dr = p.r < g.r ? -1 : 1;
        if (_walk(g, map, dr, 0)) continue;
      }

      // Horizontal patrol: try to move toward player, reverse on block
      const targetDir = p.c >= g.c ? 1 : -1;
      if (g.dir !== targetDir) g.dir = targetDir; // face player
      if (!_walk(g, map, 0, g.dir)) {
        g.dir = -g.dir;
        _walk(g, map, 0, g.dir);
      }
    }
  }

  // ── Gold collection ─────────────────────────────────────────────────────
  function _checkGold(scene) {
    const p = scene.lr_player;
    if (scene.lr_map[p.r][p.c] !== MT.GOLD) return;

    scene.lr_map[p.r][p.c] = MT.EMPTY;
    scene.lr_goldLeft--;
    scene.lr_score += 100;
    scene.lr_goldText.setText("Gold: " + scene.lr_goldLeft);
    scene.lr_scoreText.setText("Score: " + scene.lr_score);
    GameManager.awardXP(5);

    if (scene.lr_goldLeft <= 0) _onVictory(scene);
  }

  // ── Guard collision ─────────────────────────────────────────────────────
  function _checkDeath(scene) {
    if (!scene.lr_active) return;
    const p = scene.lr_player;
    for (const g of scene.lr_guards) {
      if (g.respawnAt > 0) continue; // guard trapped, harmless
      if (g.r === p.r && g.c === p.c) { _onDefeat(scene); return; }
    }
  }

  // ── Win / Lose screens ──────────────────────────────────────────────────
  function _onVictory(scene) {
    if (!scene.lr_active) return;
    scene.lr_active = false;

    GameManager.awardXP(_XP_LOAD_RUNNER_WIN);
    GameManager.setHighScore(GAME_ID, scene.lr_score);
    GameManager.grantAchievement("lode_runner_win");

    const W = COLS * TILE, H = ROWS * TILE;
    _showEnd(
      scene, W, H,
      "🏆 LEVEL COMPLETE!", "#fbbf24",
      "+" + _XP_LOAD_RUNNER_WIN + " XP  •  Score: " + scene.lr_score,
    );
  }

  function _onDefeat(scene) {
    if (!scene.lr_active) return;
    scene.lr_active = false;
    const W = COLS * TILE, H = ROWS * TILE;
    _showEnd(scene, W, H, "💀 CAUGHT!", "#ef4444", "Try again!");
  }

  function _showEnd(scene, W, H, headline, color, sub) {
    scene.add.rectangle(W / 2, H / 2, W, H, 0x000000, 0.75).setDepth(20);
    scene.add
      .text(W / 2, H / 2 - 32, headline, {
        fontSize: "30px", fill: color,
        fontStyle: "bold", stroke: "#000000", strokeThickness: 4,
      })
      .setOrigin(0.5)
      .setDepth(21);
    scene.add
      .text(W / 2, H / 2 + 14, sub, { fontSize: "18px", fill: "#ffffff" })
      .setOrigin(0.5)
      .setDepth(21);
    scene.add
      .text(W / 2, H / 2 + 56, "Click or press ESC to close", {
        fontSize: "11px", fill: "#ffffff",
      })
      .setOrigin(0.5)
      .setDepth(21);
    scene.input.once("pointerdown", _cleanup);
    scene.input.keyboard.once("keydown-ESC", _cleanup);
  }

  function _cleanup() {
    GameManager.destroy(GAME_ID);
    GameManager.destroyOverlay(GAME_ID);
  }

  // ── Rendering ───────────────────────────────────────────────────────────
  function _draw(scene, theme) {
    const T      = TILE;
    const isDark = theme.isDark;
    const map    = scene.lr_map;
    const gfx    = scene.lr_gfx;
    gfx.clear();

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const tile = map[r][c];
        const x = c * T, y = r * T;

        if (tile === MT.STEEL) {
          gfx.fillStyle(isDark ? 0x334155 : 0x64748b, 1);
          gfx.fillRect(x, y, T, T);
          gfx.lineStyle(1, isDark ? 0x475569 : 0x475569, 0.6);
          gfx.strokeRect(x, y, T, T);

        } else if (tile === MT.BRICK) {
          gfx.fillStyle(isDark ? 0x6d28d9 : 0x7c3aed, 1);
          gfx.fillRect(x, y, T, T);
          gfx.lineStyle(1, isDark ? 0x4c1d95 : 0x5b21b6, 0.9);
          gfx.strokeRect(x, y, T, T);
          // horizontal mortar line
          gfx.beginPath();
          gfx.moveTo(x, y + T / 2); gfx.lineTo(x + T, y + T / 2);
          gfx.strokePath();
          // vertical mortar offset per row
          const vx = r % 2 === 0 ? x + T / 2 : x;
          gfx.beginPath();
          gfx.moveTo(vx, y); gfx.lineTo(vx, y + T / 2);
          gfx.strokePath();

        } else if (tile === MT.LADDER) {
          // Draw two rails and three rungs
          gfx.lineStyle(2, 0xfbbf24, 1);
          gfx.beginPath();
          gfx.moveTo(x + T * 0.28, y);    gfx.lineTo(x + T * 0.28, y + T);
          gfx.moveTo(x + T * 0.72, y);    gfx.lineTo(x + T * 0.72, y + T);
          gfx.strokePath();
          for (let rung = 0; rung <= 2; rung++) {
            gfx.beginPath();
            gfx.moveTo(x + T * 0.28, y + rung * T / 2);
            gfx.lineTo(x + T * 0.72, y + rung * T / 2);
            gfx.strokePath();
          }

        } else if (tile === MT.ROPE) {
          gfx.lineStyle(2, 0x78716c, 1);
          gfx.beginPath();
          gfx.moveTo(x, y + T * 0.3); gfx.lineTo(x + T, y + T * 0.3);
          gfx.strokePath();

        } else if (tile === MT.GOLD) {
          gfx.fillStyle(0xfbbf24, 1);
          gfx.fillCircle(x + T / 2, y + T / 2, T * 0.22);
          gfx.lineStyle(1.5, 0xd97706, 1);
          gfx.strokeCircle(x + T / 2, y + T / 2, T * 0.22);
        }
      }
    }

    // ── Player (blue runner) ──
    const pg = scene.lr_playerGfx;
    pg.clear();
    const p  = scene.lr_player;
    const px = p.c * T, py = p.r * T;
    // head
    pg.fillStyle(0xfde68a, 1);
    pg.fillCircle(px + T * 0.5, py + T * 0.2, T * 0.16);
    // body
    pg.fillStyle(0x3b82f6, 1);
    pg.fillRect(px + T * 0.25, py + T * 0.36, T * 0.5, T * 0.38);
    // legs
    pg.fillStyle(0x1d4ed8, 1);
    pg.fillRect(px + T * 0.22, py + T * 0.74, T * 0.22, T * 0.22);
    pg.fillRect(px + T * 0.56, py + T * 0.74, T * 0.22, T * 0.22);

    // ── Guards (red) ──
    const gg = scene.lr_guardGfx;
    gg.clear();
    for (const g of scene.lr_guards) {
      if (g.respawnAt > 0) continue; // don't draw while respawning
      const gx = g.c * T, gy = g.r * T;
      gg.fillStyle(0xfca5a5, 1); // head
      gg.fillCircle(gx + T * 0.5, gy + T * 0.2, T * 0.16);
      gg.fillStyle(0xef4444, 1); // body
      gg.fillRect(gx + T * 0.25, gy + T * 0.36, T * 0.5, T * 0.38);
      gg.fillStyle(0x991b1b, 1); // legs
      gg.fillRect(gx + T * 0.22, gy + T * 0.74, T * 0.22, T * 0.22);
      gg.fillRect(gx + T * 0.56, gy + T * 0.74, T * 0.22, T * 0.22);
    }
  }

  // ── Public API ──────────────────────────────────────────────────────────
  return { launch };
})();
