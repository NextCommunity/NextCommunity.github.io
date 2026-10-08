// skipcq: JS-0357
/* global scrollToRandomUser, handleLevelClick, toggleTheme, closeMatrix, reopenConsole, minimizeConsole, maximizeConsole, closeConsole, triggerSecretUnlock, triggerForceSurge, addExperience, XP_SPACE_INVADERS_WIN, _XP_CODE_BREAKER_WIN, _XP_DEV_DUEL_PLAY, playSound, triggerMagicXP, toggleScreenshotMode, jumpToLevel, startSelfDestruct, CodeBreaker, handleFooterDotClick, SpaceInvaders, startDuelFromCard, createFloatingXP */

// Fixes #627 - Centralized UI bindings - Refactored to reduce complexity
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

  const handler = handlers[btn.dataset.action];
  if (handler) handler();
});

document.addEventListener('mouseover', (e) => {
  const el = e.target.closest('[data-action="floating-xp"]');
  if (el) createFloatingXP?.(e);
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.floating-xp-trigger').forEach((el) => {
    el.addEventListener('mouseenter', (ev) => createFloatingXP?.(ev));
  });
});
