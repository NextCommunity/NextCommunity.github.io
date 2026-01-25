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

// --- EASTER EGG STATE ---
let surpriseClickCount = 0;
let matrixActive = false;

/**
 * Updated Surprise Me Logic with Counter
 */
function scrollToRandomUser() {
    // Increment Easter Egg counter
    surpriseClickCount++;
    if (surpriseClickCount === 5) {
        initMatrix();
    }

    const cards = document.querySelectorAll('.user-card');
    if (cards.length === 0) return;

    cards.forEach(c => c.classList.remove('highlight-pulse'));
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    randomCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    randomCard.classList.add('highlight-pulse');
    setTimeout(() => randomCard.classList.remove('highlight-pulse'), 3500);
}

// --- THE MATRIX ENGINE ---
function initMatrix() {
    matrixActive = true;
    const overlay = document.getElementById('matrix-overlay');
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');

    overlay.classList.remove('hidden');

    // Set canvas to full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;

    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const rainDrops = Array.from({ length: columns }).fill(1);

    const render = () => {
        // Subtle fade effect to create trails
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0F0'; // Matrix Green
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

            if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }

        if (matrixActive) requestAnimationFrame(render);
    };

    render();

    // Listen for Escape key to exit
    window.addEventListener('keydown', handleEsc);
}

function closeMatrix() {
    matrixActive = false;
    surpriseClickCount = 0; // Reset counter
    document.getElementById('matrix-overlay').classList.add('hidden');
    window.removeEventListener('keydown', handleEsc);
}

function handleEsc(e) {
    if (e.key === 'Escape') closeMatrix();
}

// Initial Run
applyTheme(localStorage.getItem('theme') || 'light');
