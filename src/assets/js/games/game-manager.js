/**
 * game-manager.js — Centralised lifecycle controller for all Phaser mini-games.
 *
 * Responsibilities:
 *  - Lazy-loading the Phaser CDN script once (shared across all games)
 *  - Creating / destroying Phaser.Game instances without leaks
 *  - Bridging game events to the site-wide XP system (addExperience)
 *  - Persisting per-game high scores and achievement flags in localStorage
 */

const GameManager = (function () {
  /** Active Phaser.Game instances keyed by game id. */
  const _instances = {};

  /** Callbacks waiting for Phaser to finish loading. */
  let _phaserCallbacks = [];
  let _phaserLoading = false;

  // ─── Phaser Lazy-Loader ─────────────────────────────────────────────────

  /**
   * Ensures Phaser is available then invokes `callback`.
   * If Phaser is already on the page nothing extra is loaded.
   */
  function loadPhaser(callback) {
    if (typeof Phaser !== "undefined") {
      callback();
      return;
    }

    _phaserCallbacks.push(callback);

    if (_phaserLoading) return;
    _phaserLoading = true;

    const script = document.createElement("script");
    script.src = PHASER_CDN_URL;
    script.onload = function () {
      _phaserLoading = false;
      const cbs = _phaserCallbacks.slice();
      _phaserCallbacks = [];
      cbs.forEach(function (cb) {
        cb();
      });
    };
    script.onerror = function () {
      console.error("[GameManager] Failed to load Phaser from CDN.");
      _phaserLoading = false;
      _phaserCallbacks = [];
    };
    document.head.appendChild(script);
  }

  // ─── Instance Management ────────────────────────────────────────────────

  /**
   * Creates a new Phaser.Game instance, destroying any existing one with the
   * same `id` first to prevent memory leaks.
   *
   * @param {string} id      Unique game identifier (e.g. 'space-invaders').
   * @param {object} config  Full Phaser game config object.
   * @returns {Phaser.Game}
   */
  function create(id, config) {
    destroy(id);
    const instance = new Phaser.Game(config);
    _instances[id] = instance;
    return instance;
  }

  /**
   * Destroys the Phaser.Game instance with the given `id` and removes its
   * canvas from the DOM if it was appended there.
   */
  function destroy(id) {
    if (_instances[id]) {
      _instances[id].destroy(true, false);
      delete _instances[id];
    }
    // Remove any dedicated full-screen canvas left in the DOM.
    const canvas = document.getElementById("game-canvas-" + id);
    if (canvas) canvas.remove();
  }

  /** Destroys every active game instance. */
  function destroyAll() {
    Object.keys(_instances).forEach(destroy);
  }

  // ─── XP Bridge ──────────────────────────────────────────────────────────

  /**
   * Awards XP through the site-wide addExperience function.
   * Silently no-ops if the function is not yet available.
   *
   * @param {number} amount
   */
  function awardXP(amount) {
    if (typeof addExperience === "function") {
      addExperience(amount);
    }
  }

  // ─── Persistence ────────────────────────────────────────────────────────

  /** Returns the stored high score for a game (0 if none). */
  function getHighScore(gameId) {
    return parseInt(localStorage.getItem("hs_" + gameId)) || 0;
  }

  /**
   * Updates the stored high score if `score` beats the current record.
   * @returns {boolean} true when a new record was set.
   */
  function setHighScore(gameId, score) {
    if (score > getHighScore(gameId)) {
      localStorage.setItem("hs_" + gameId, score);
      return true;
    }
    return false;
  }

  /**
   * Increments a named play/win counter in localStorage.
   * @returns {number} The new total.
   */
  function incrementStat(statId) {
    const next = getStat(statId) + 1;
    localStorage.setItem("stat_" + statId, next);
    return next;
  }

  /** Reads a named counter from localStorage (0 if absent). */
  function getStat(statId) {
    return parseInt(localStorage.getItem("stat_" + statId)) || 0;
  }

  // ─── Achievements ────────────────────────────────────────────────────────

  const ACHIEVEMENT_META = {
    first_blood: {
      emoji: "🩸",
      name: "First Blood",
      desc: "Defeated the Space Invaders!",
      xp: 0,
    },
    code_wizard: {
      emoji: "🧙",
      name: "Code Wizard",
      desc: "10 Code Breaker victories!",
      xp: 100,
    },
    duelist: {
      emoji: "⚔️",
      name: "Duelist",
      desc: "Played 5 Developer Duels!",
      xp: 75,
    },
  };

  /** Returns the full achievements object stored in localStorage. */
  function getAchievements() {
    try {
      return JSON.parse(localStorage.getItem("gameAchievements") || "{}");
    } catch (_) {
      return {};
    }
  }

  /**
   * Grants `achievementId` if not already earned.
   * Awards attached XP and shows a toast notification.
   * @returns {boolean} true when newly granted.
   */
  function grantAchievement(achievementId) {
    const achievements = getAchievements();
    if (achievements[achievementId]) return false;

    achievements[achievementId] = { date: new Date().toISOString() };
    localStorage.setItem("gameAchievements", JSON.stringify(achievements));

    const meta = ACHIEVEMENT_META[achievementId];
    if (meta && meta.xp > 0) awardXP(meta.xp);
    _showAchievementToast(achievementId);
    return true;
  }

  /** Returns whether the player has earned a specific achievement. */
  function hasAchievement(achievementId) {
    return Boolean(getAchievements()[achievementId]);
  }

  // ─── UI Helpers ─────────────────────────────────────────────────────────

  /**
   * Displays a bottom-right achievement toast for 5 seconds.
   */
  function _showAchievementToast(achievementId) {
    const meta =
      ACHIEVEMENT_META[achievementId] || {
        emoji: "🏆",
        name: achievementId,
        desc: "Achievement unlocked!",
      };

    const toast = document.createElement("div");
    toast.className =
      "fixed bottom-6 right-6 z-[9999] px-6 py-4 bg-[var(--bg-card)] " +
      "border-2 border-[var(--accent)] rounded-2xl shadow-2xl flex items-center " +
      "gap-4 transition-opacity duration-500";
    toast.innerHTML =
      '<span class="text-4xl">' +
      meta.emoji +
      "</span>" +
      '<div class="text-left">' +
      '<p class="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)]">Achievement Unlocked</p>' +
      '<p class="font-black text-accent">' +
      meta.name +
      "</p>" +
      '<p class="text-[10px] text-[var(--text-muted)]">' +
      meta.desc +
      "</p>" +
      "</div>";

    document.body.appendChild(toast);

    setTimeout(function () {
      toast.style.opacity = "0";
      setTimeout(function () {
        toast.remove();
      }, 500);
    }, 5000);
  }

  /**
   * Creates and returns a full-screen overlay div for a Phaser game.
   * The overlay blocks page interaction while the game is active.
   *
   * @param {string} id  Game id used to generate the element's id.
   * @returns {HTMLElement}
   */
  function createOverlay(id) {
    destroyOverlay(id);

    const overlay = document.createElement("div");
    overlay.id = "game-overlay-" + id;
    Object.assign(overlay.style, {
      position: "fixed",
      inset: "0",
      zIndex: "10000",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(0,0,0,0.92)",
    });

    // Close button (top-right)
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "✕ Close";
    closeBtn.style.cssText =
      "position:absolute;top:1rem;right:1rem;padding:0.5rem 1rem;" +
      "background:rgba(255,255,255,0.1);color:#fff;border:1px solid rgba(255,255,255,0.2);" +
      "border-radius:0.5rem;cursor:pointer;font-weight:bold;font-size:0.75rem;z-index:1;";
    closeBtn.addEventListener("click", function () {
      destroy(id);
      destroyOverlay(id);
    });

    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);
    return overlay;
  }

  /** Removes the overlay div for a game from the DOM. */
  function destroyOverlay(id) {
    const el = document.getElementById("game-overlay-" + id);
    if (el) el.remove();
  }

  // ─── Public API ─────────────────────────────────────────────────────────

  return {
    loadPhaser,
    create,
    destroy,
    destroyAll,
    awardXP,
    getHighScore,
    setHighScore,
    incrementStat,
    getStat,
    getAchievements,
    grantAchievement,
    hasAchievement,
    createOverlay,
    destroyOverlay,
    get instances() {
      return _instances;
    },
  };
})();
