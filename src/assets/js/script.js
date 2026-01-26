/**
 * 1. GLOBAL STATE & CONFIGURATION
 */
const LEVELS = [
    { level: 0, name: "Newbie", emoji: "🐣", color: "#94a3b8" },      // Start
    { level: 1, name: "Script Kid", emoji: "🛹", color: "#10b981" }, // Matrix
    { level: 2, name: "Code Breaker", emoji: "🕵️‍♂️", color: "#f59e0b" }, // Konami
    { level: 3, name: "Void Walker", emoji: "🌌", color: "#6366f1" }, // Gravity
    { level: 4, name: "Bug Hunter", emoji: "🐛", color: "#84cc16" },
    { level: 5, name: "Data Miner", emoji: "💎", color: "#06b6d4" },
    { level: 6, name: "Sys Admin", emoji: "🛠️", color: "#ec4899" },
    { level: 7, name: "Terminal Pro", emoji: "⌨️", color: "#7c3aed" },
    { level: 8, name: "Cloud Expert", emoji: "☁️", color: "#3b82f6" },
    { level: 9, name: "Full Stack", emoji: "🥞", color: "#f97316" },
    { level: 10, name: "Architect", emoji: "👑", color: "#ef4444" }
];

let unlockedEggs = JSON.parse(localStorage.getItem('unlockedEggs')) || [];
let surpriseClickCount = 0;
let matrixActive = false;

/**
 * 2. GAME ENGINE
 * Handles leveling up and UI updates
 */
function updateGameUI() {
    const eggCount = unlockedEggs.length;
    const levelIndex = Math.min(eggCount, LEVELS.length - 1);
    const rank = LEVELS[levelIndex];

    const badge = document.getElementById('level-badge');
    const nameLabel = document.getElementById('level-name');
    const numLabel = document.getElementById('level-number');
    const progressBar = document.getElementById('level-progress');

    if (badge) {
        badge.innerText = rank.emoji;
        badge.style.backgroundColor = rank.color;
    }
    if (nameLabel) {
        nameLabel.innerText = rank.name;
        nameLabel.style.color = rank.color;
    }
    if (numLabel) numLabel.innerText = levelIndex;
    if (progressBar) {
        progressBar.style.width = `${(levelIndex / (LEVELS.length - 1)) * 100}%`;
    }
}

function unlockEgg(eggId) {
    if (!unlockedEggs.includes(eggId)) {
        unlockedEggs.push(eggId);
        localStorage.setItem('unlockedEggs', JSON.stringify(unlockedEggs));
        showLevelUpNotification(unlockedEggs.length);
        updateGameUI();
    }
}

function showLevelUpNotification(newLevelIndex) {
    const levelIndex = Math.min(newLevelIndex, LEVELS.length - 1);
    const rank = LEVELS[levelIndex];
    const notify = document.createElement('div');
    notify.className = "fixed top-24 left-1/2 -translate-x-1/2 z-[2000] px-8 py-4 bg-white dark:bg-slate-900 border-4 rounded-full shadow-2xl flex items-center gap-4 animate-bounce";
    notify.style.borderColor = rank.color;
    notify.innerHTML = `
        <span class="text-4xl">${rank.emoji}</span>
        <div class="text-left">
            <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-500">New Rank Achieved!</h4>
            <p class="text-xl font-black uppercase tracking-tighter" style="color: ${rank.color}">${rank.name}</p>
        </div>
    `;
    document.body.appendChild(notify);
    setTimeout(() => {
        notify.style.opacity = '0';
        setTimeout(() => notify.remove(), 500);
    }, 4000);
}

/**
 * 3. THEME SYSTEM
 */
function applyTheme(theme) {
    const html = document.documentElement;
    localStorage.setItem('theme', theme);
    html.classList.remove('dark');

    // Clear dynamic styles
    const props = ['--bg-page', '--bg-card', '--bg-footer', '--text-main', '--text-muted', '--border-color', '--accent'];
    props.forEach(p => html.style.removeProperty(p));

    if (theme === 'dark') {
        html.classList.add('dark');
    } else if (theme === 'random') {
        const h = Math.floor(Math.random() * 360);
        html.style.setProperty('--bg-page', `hsl(${h}, 40%, 8%)`);
        html.style.setProperty('--bg-card', `hsl(${h}, 35%, 12%)`);
        html.style.setProperty('--bg-footer', `hsl(${h}, 35%, 15%)`);
        html.style.setProperty('--text-main', `hsl(${h}, 20%, 95%)`);
        html.style.setProperty('--accent', `hsl(${(h + 150) % 360}, 80%, 65%)`);
    }
    updateThemeIcon(theme);
}

function toggleTheme() {
    const current = localStorage.getItem('theme') || 'light';
    const next = current === 'light' ? 'dark' : (current === 'dark' ? 'random' : 'light');
    applyTheme(next);
}

function updateThemeIcon(theme) {
    const icon = document.getElementById('theme-icon');
    if (icon) icon.innerText = theme === 'light' ? '🌙' : (theme === 'dark' ? '🎲' : '☀️');
}

/**
 * 4. EASTER EGG TRIGGERS
 */

// EGG 1: Surprise Me x5 -> Matrix
function scrollToRandomUser() {
    // 1. Force the count to increment
    surpriseClickCount++;
    console.log("Surprise clicks:", surpriseClickCount); // Debugging line

    // 2. Check threshold
    if (surpriseClickCount >= 5) {
        // Reset immediately so the user can start the next 5-click cycle
        surpriseClickCount = 0;

        // Attempt level unlock
        unlockEgg('matrix');

        // FORCE start the matrix
        initMatrix();
    }

    // Standard card highlight/scroll logic
    const cards = document.querySelectorAll('.user-card');
    if (cards.length === 0) return;

    cards.forEach(c => c.classList.remove('highlight-pulse'));
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    randomCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    randomCard.classList.add('highlight-pulse');
    setTimeout(() => randomCard.classList.remove('highlight-pulse'), 3500);
}

// EGG 2: Konami Code -> Barrel Roll
const konamiCode = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];
let konamiPosition = 0;

window.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();

  if (key === konamiCode[konamiPosition]) {
    konamiPosition++;
    if (konamiPosition === konamiCode.length) {
      activateKonami();
      konamiPosition = 0;
    }
  } else {
    // Reset, but check if the wrong key was actually the start of a new attempt
    konamiPosition = (key === 'arrowup') ? 1 : 0;
  }
});

function activateKonami() {
  // Apply to documentElement (html) so the sticky header spins too
  document.documentElement.classList.add('konami-roll');

  // Call your level up / egg unlock logic here
  if (typeof unlockEgg === 'function') unlockEgg('konami');

  setTimeout(() => {
    document.documentElement.classList.remove('konami-roll');
  }, 2000);
}

// EGG 3: Gravity Glitch -> Build Hash Click
function triggerGravity(event) {
    if (event) event.preventDefault();

    // Level up!
    unlockEgg('gravity');

    // Immediate feedback: Shake everything
    document.body.classList.add('glitch-shake');

    setTimeout(() => {
        document.body.classList.remove('glitch-shake');

        // Target everything that should fall
        const elements = document.querySelectorAll('.user-card, header, footer, main, h1, #game-stats');
        const viewportHeight = window.innerHeight;

        elements.forEach((el, index) => {
            const rect = el.getBoundingClientRect();
            // Calculate a personalized fall distance so they don't all hit at once
            const fallDist = viewportHeight - rect.top + (Math.random() * 300 + 100);
            const rotation = Math.random() * 90 - 45; // Wider rotation for more "chaos"

            el.style.transition = `transform ${1 + Math.random()}s cubic-bezier(0.47, 0, 0.745, 0.715), opacity 1.5s ease-in`;
            el.style.transform = `translateY(${fallDist}px) rotate(${rotation}deg)`;
            el.style.opacity = "0";
            el.style.pointerEvents = "none";
        });

        // Summon the Reset Button
        setTimeout(() => {
            if (!document.getElementById('repair-btn')) {
                const btn = document.createElement('button');
                btn.id = 'repair-btn';
                btn.innerHTML = "REPAIR CORE SYSTEM";
                btn.className = "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-white px-10 py-5 rounded-full font-black z-[3000] shadow-[0_0_50px_rgba(0,0,0,0.5)] hover:scale-110 transition-all cursor-pointer border-4 border-white animate-pulse";
                btn.onclick = () => window.location.reload();
                document.body.appendChild(btn);
            }
        }, 1200);
    }, 500);
}

/**
 * THE MATRIX ENGINE
 */
function initMatrix() {
    // 1. Reset state to ensure clean start
    matrixActive = true;
    const overlay = document.getElementById('matrix-overlay');
    const canvas = document.getElementById('matrix-canvas');
    if (!overlay || !canvas) return;

    // 2. Show the overlay
    overlay.classList.remove('hidden');
    overlay.style.display = 'block';

    // 3. Setup Canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789アァカサタナハマヤャ';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const rainDrops = Array.from({ length: columns }).fill(1);

    // 4. Rendering Loop with explicit Kill Switch
    const render = () => {
        if (!matrixActive) {
            // Stop the loop entirely
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            return;
        }

        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
            if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) rainDrops[i] = 0;
            rainDrops[i]++;
        }
        requestAnimationFrame(render);
    };

    render();

    // 5. Add Escape Listener
    window.addEventListener('keydown', handleMatrixEsc);
}

// Separate function for the listener so we can remove it properly
function handleMatrixEsc(e) {
    if (e.key === 'Escape') {
        closeMatrix();
    }
}

function closeMatrix() {
    // 1. Flip the kill switch
    matrixActive = false;

    // 2. Hide the UI
    const overlay = document.getElementById('matrix-overlay');
    if (overlay) {
        overlay.classList.add('hidden');
        overlay.style.display = 'none';
    }

    // 3. Clean up the listener to prevent memory leaks
    window.removeEventListener('keydown', handleMatrixEsc);

    // 4. Reset click counter so they don't get stuck in a loop
    surpriseClickCount = 0;
}

/**
 * 6. INITIALIZATION
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme
    applyTheme(localStorage.getItem('theme') || 'light');
    // 2. Game Stats
    updateGameUI();
});

// Helper for Bio page email copy
function copyToClipboard(text, el) {
    navigator.clipboard.writeText(text);
    const span = el.querySelector('span:last-child');
    if (span) {
        const original = span.innerText;
        span.innerText = 'Copied!';
        setTimeout(() => span.innerText = original, 2000);
    }
}
