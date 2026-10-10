// Fixes #627 + #648 - 100% delegated, no per-element listeners
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;

  const handlers = {
    'scroll-to-random': () => scrollToRandomUser?.(),
    'level-click': () => handleLevelClick?.(),
    'toggle-theme': () => toggleTheme?.(),
    'close-matrix': () => closeMatrix?.(),
    'reopen-console': () => reopenConsole?.(),
    'minimize-console': () => minimizeConsole?.(),
    'maximize-console': () => maximizeConsole?.(),
    'close-console': () => closeConsole?.(),
    'secret-unlock': () => triggerSecretUnlock?.(btn.dataset.code),
    'force-surge': () => triggerForceSurge?.(),
    'xp-invader': () => { addExperience(XP_SPACE_INVADERS_WIN); playSound?.('levelUp'); },
    'xp-breaker': () => { addExperience(_XP_CODE_BREAKER_WIN); playSound?.('levelUp'); },
    'xp-duel': () => { addExperience(_XP_DEV_DUEL_PLAY); playSound?.('click'); },
    'xp-skill': () => { addExperience(5); playSound?.('click'); },
    'xp-optimize': () => { addExperience(15); playSound?.('restore'); },
    'magic-xp': () => { triggerMagicXP?.(); playSound?.('levelUp'); },
    'screenshot-mode': () => toggleScreenshotMode?.(),
    'jump-level': () => jumpToLevel?.(),
    'self-destruct': () => startSelfDestruct?.(),
    'reset-storage': () => { localStorage.clear(); location.reload(); },
    'launch-codebreaker': () => CodeBreaker?.launch(window.PROFILE_SKILLS, window.PROFILE_NAME),
    'footer-dot': () => handleFooterDotClick?.(),
    'launch-invaders': () => SpaceInvaders?.launch(),
    'launch-breaker-arcade': () => CodeBreaker?.launch(null, 'Arcade Mode'),
    'duel-from-card': () => startDuelFromCard?.(btn.closest('.user-card')),
  };

  handlers[btn.dataset.action]?.();
});

// #648 fix: delegated hover - no querySelectorAll loop
document.addEventListener('mouseover', (e) => {
  const xpEl = e.target.closest('[data-action="floating-xp"], .floating-xp-trigger');
  if (xpEl) createFloatingXP?.(e);
});
