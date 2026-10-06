// Fixes #627
document.addEventListener('click', function(e) {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  const action = btn.dataset.action;
  switch(action) {
    case 'scroll-to-random': scrollToRandomUser?.(); break;
    case 'level-click': handleLevelClick?.(); break;
    case 'toggle-theme': toggleTheme?.(); break;
    case 'close-matrix': closeMatrix?.(); break;
    case 'reopen-console': reopenConsole?.(); break;
    case 'minimize-console': minimizeConsole?.(); break;
    case 'maximize-console': maximizeConsole?.(); break;
    case 'close-console': closeConsole?.(); break;
    case 'secret-unlock': triggerSecretUnlock?.(btn.dataset.secret); break;
    case 'force-surge': triggerForceSurge?.(); break;
    case 'xp-invader': addExperience(XP_SPACE_INVADERS_WIN); playSound?.('levelUp'); break;
    case 'xp-breaker': addExperience(_XP_CODE_BREAKER_WIN); playSound?.('levelUp'); break;
    case 'xp-duel': addExperience(_XP_DEV_DUEL_PLAY); playSound?.('click'); break;
    case 'xp-skill': addExperience(5); playSound?.('click'); break;
    case 'xp-optimize': addExperience(15); playSound?.('restore'); break;
    case 'magic-xp': triggerMagicXP?.(); playSound?.('levelUp'); break;
    case 'screenshot-mode': toggleScreenshotMode?.(); break;
    case 'jump-level': jumpToLevel?.(); break;
    case 'self-destruct': startSelfDestruct?.(); break;
    case 'reset-storage': localStorage.clear(); location.reload(); break;
    case 'launch-codebreaker': CodeBreaker?.launch(window.PROFILE_SKILLS, window.PROFILE_NAME); break;
    case 'footer-dot': handleFooterDotClick?.(); break;
    case 'launch-invaders': SpaceInvaders?.launch(); break;
    case 'launch-breaker-arcade': CodeBreaker?.launch(null, 'Arcade Mode'); break;
    case 'duel-from-card': startDuelFromCard?.(btn.closest('.user-card')); break;
  }
});
document.addEventListener('mouseover', function(e) {
  const el = e.target.closest('[data-action="floating-xp"]');
  if (el) createFloatingXP?.(e);
});
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.floating-xp-trigger').forEach(el => {
    el.addEventListener('mouseenter', (e) => createFloatingXP?.(e));
  });
});
