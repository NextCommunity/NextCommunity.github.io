// Centralized UI click binding - fixes #627
document.addEventListener('click', function(e) {
  const target = e.target.closest('[data-action]');
  if (!target) return;
  const action = target.dataset.action;
  if (action === 'scroll-to-random' && typeof scrollToRandomUser === 'function') scrollToRandomUser();
  if (action === 'level-click' && typeof handleLevelClick === 'function') handleLevelClick();
  if (action === 'toggle-theme' && typeof toggleTheme === 'function') toggleTheme();
});
