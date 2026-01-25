/**
 * THEME LOGIC: Light -> Dark -> Random
 */
function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    let nextTheme;

    if (currentTheme === 'light') nextTheme = 'dark';
    else if (currentTheme === 'dark') nextTheme = 'random';
    else nextTheme = 'light';

    applyTheme(nextTheme);
}

function applyTheme(theme) {
    const html = document.documentElement;
    localStorage.setItem('theme', theme);

    // Reset all custom properties and classes
    html.classList.remove('dark');
    const props = ['--bg-page', '--bg-card', '--bg-footer', '--text-main', '--text-muted', '--border-color', '--accent'];
    props.forEach(p => html.style.removeProperty(p));

    if (theme === 'dark') {
        html.classList.add('dark');
    } else if (theme === 'random') {
        // Generate a random Hue (0-360)
        const h = Math.floor(Math.random() * 360);

        // Apply a cohesive HSL palette
        html.style.setProperty('--bg-page', `hsl(${h}, 40%, 8%)`);
        html.style.setProperty('--bg-card', `hsl(${h}, 35%, 12%)`);
        html.style.setProperty('--bg-footer', `hsl(${h}, 35%, 15%)`);
        html.style.setProperty('--text-main', `hsl(${h}, 20%, 95%)`);
        html.style.setProperty('--text-muted', `hsl(${h}, 15%, 70%)`);
        html.style.setProperty('--border-color', `hsl(${h}, 30%, 20%)`);
        html.style.setProperty('--accent', `hsl(${(h + 150) % 360}, 80%, 65%)`); // Harmonious contrast
    }

    updateIcon(theme);
}

function updateIcon(theme) {
    const icon = document.getElementById('theme-icon');
    if (!icon) return;
    if (theme === 'light') icon.innerText = '🌙';      // Next is Dark
    else if (theme === 'dark') icon.innerText = '🎲';       // Next is Random
    else icon.innerText = '☀️';                        // Next is Light
}

/**
 * SURPRISE ME LOGIC
 */
function scrollToRandomUser() {
    const cards = document.querySelectorAll('.user-card');
    cards.forEach(c => c.classList.remove('highlight-pulse'));
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    randomCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    randomCard.classList.add('highlight-pulse');
    setTimeout(() => randomCard.classList.remove('highlight-pulse'), 3500);
}

// Initial Run
applyTheme(localStorage.getItem('theme') || 'light');
