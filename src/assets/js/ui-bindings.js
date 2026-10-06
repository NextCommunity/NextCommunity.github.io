// Centralized UI click binding - fixes #627
// No inline onclick - all actions handled via data-action
document.addEventListener('click', function(e) {
  const target = e.target.closest('[data-action]');
  if (!target) return;

  const action = target.dataset.action;

  switch(action) {
    case 'scroll-to-random':
      if (typeof scrollToRandomUser === 'function') scrollToRandomUser();
      break;
    case 'level-click':
      if (typeof handleLevelClick === 'function') handleLevelClick();
      break;
    case 'toggle-theme':
      if (typeof toggleTheme === 'function') toggleTheme();
      break;
    case 'close-matrix':
      if (typeof closeMatrix === 'function') closeMatrix();
      break;
  }
});

// Also handle ESC key to close matrix (bonus - was already there but keep it)
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const overlay = document.getElementById('matrix-overlay');
    if (overlay &&!overlay.classList.contains('hidden')) {
      if (typeof closeMatrix === 'function') closeMatrix();
    }
  }
});
