/**
 * RETRO SOUND ENGINE
 */
let audioCtx;

function initAudio() {
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    } catch (e) {
        console.error("AudioContext failed to initialize:", e);
    }
}

window.addEventListener('click', initAudio, { once: true });
window.addEventListener('keydown', initAudio, { once: true });

function playSound(type) {
    initAudio();
    if (!audioCtx || audioCtx.state !== 'running') return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    const now = audioCtx.currentTime;

    if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
    }
    else if (type === 'levelUp') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.2);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
    }
    else if (type === 'secret') {
        osc.type = 'triangle';
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
            const s = audioCtx.createOscillator();
            const g = audioCtx.createGain();
            s.connect(g); g.connect(audioCtx.destination);
            s.frequency.setValueAtTime(freq, now + i * 0.1);
            g.gain.setValueAtTime(0.07, now + i * 0.1);
            g.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.1);
            s.start(now + i * 0.1);
            s.stop(now + i * 0.1 + 0.1);
        });
    }
}

/**
 * 1. GLOBAL STATE & CONFIGURATION
 */
const LEVELS = [
    { level: 0, name: "Newbie", emoji: "🐣", color: "#94a3b8" },
    { level: 1, name: "Script Kid", emoji: "🛹", color: "#10b981" },
    { level: 2, name: "Code Breaker", emoji: "🕵️‍♂️", color: "#f59e0b" },
    { level: 3, name: "Void Walker", emoji: "🌌", color: "#6366f1" },
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
 * 2. GAME ENGINE & SEQUENTIAL UNLOCKING
 */
/**
 * 2. GAME ENGINE
 */
function updateGameUI() {
    // Total count of unique things found
    const eggCount = unlockedEggs.length;

    // Ensure we don't exceed the array length
    const levelIndex = Math.min(eggCount, LEVELS.length - 1);

    // Pick the rank object (0 found = Newbie, 1 found = Script Kid, etc.)
    const rank = LEVELS[levelIndex];

    const badge = document.getElementById('level-badge');
    const nameLabel = document.getElementById('level-name');
    const numLabel = document.getElementById('level-number');
    const progressBar = document.getElementById('level-progress');

    // Add this line to trigger the CSS Architect styles
    if (levelIndex >= 10) {
        document.body.classList.add('level-architect');
    } else {
        document.body.classList.remove('level-architect');
    }

    if (badge) {
        badge.innerText = rank.emoji;
        badge.style.backgroundColor = rank.color;
        // Add a little pop animation when the rank changes
        badge.classList.add('animate-bounce');
        setTimeout(() => badge.classList.remove('animate-bounce'), 1000);
    }

    if (nameLabel) {
        nameLabel.innerText = rank.name;
        nameLabel.style.color = rank.color;
    }

    if (numLabel) numLabel.innerText = levelIndex;

    if (progressBar) {
        // Calculate percentage based on total possible ranks
        const progressPercent = (levelIndex / (LEVELS.length - 1)) * 100;
        progressBar.style.width = `${progressPercent}%`;
        progressBar.style.backgroundColor = rank.color;
    }
}

function unlockEgg(eggId) {
    // Only proceed if this is a NEW discovery
    if (!unlockedEggs.includes(eggId)) {
        unlockedEggs.push(eggId);
        localStorage.setItem('unlockedEggs', JSON.stringify(unlockedEggs));

        // Play sound and show the notification for the NEW level count
        playSound('levelUp');
        showLevelUpNotification(unlockedEggs.length);

        // Refresh the whole UI with the new rank
        updateGameUI();
    }
}

/**
 * UNIVERSAL EGG UNLOCKER
 * 4 Secrets: matrix, konami, gravity (hash), badge_click
 */

// Ensure the actual badge click also uses this logic
function handleLevelClick() {
    triggerSecretUnlock('badge_click');
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
        </div>`;
    document.body.appendChild(notify);
    setTimeout(() => { notify.style.opacity = '0'; setTimeout(() => notify.remove(), 500); }, 4000);
}

/**
 * 3. THEME SYSTEM
 */
function applyTheme(theme) {
    const html = document.documentElement;
    const heart = document.getElementById('footer-heart');
    localStorage.setItem('theme', theme);

    html.classList.remove('dark');
    const props = ['--bg-page', '--bg-card', '--bg-footer', '--text-main', '--text-muted', '--border-color', '--accent'];
    props.forEach(p => html.style.removeProperty(p));

    if (theme === 'dark') {
        html.classList.add('dark');
        if (heart) heart.innerText = '💜';
    }
    else if (theme === 'random') {
        const h = Math.floor(Math.random() * 360);
        html.style.setProperty('--bg-page', `hsl(${h}, 40%, 8%)`);
        html.style.setProperty('--bg-card', `hsl(${h}, 35%, 12%)`);
        html.style.setProperty('--bg-footer', `hsl(${h}, 35%, 10%)`);
        html.style.setProperty('--border-color', `hsl(${h}, 30%, 20%)`);
        html.style.setProperty('--text-main', `hsl(${h}, 20%, 95%)`);
        html.style.setProperty('--text-muted', `hsl(${h}, 15%, 60%)`);
        html.style.setProperty('--accent', `hsl(${(h + 150) % 360}, 80%, 65%)`);

        if (heart) {
            const hearts = ['💚', '💙', '💛', '🧡', '🤍', '🤎', '🖤', '💎', '🌈', '✨'];
            heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];
        }
    }
    else if (heart) { heart.innerText = '❤️'; }

    updateThemeIcon(theme);
}

function toggleTheme() {
    playSound('click');
    const current = localStorage.getItem('theme') || 'light';
    const next = current === 'light' ? 'dark' : (current === 'dark' ? 'random' : 'light');
    applyTheme(next);
}

function updateThemeIcon(theme) {
    const icon = document.getElementById('theme-icon');
    if (icon) icon.innerText = theme === 'light' ? '🌙' : (theme === 'dark' ? '🎲' : '☀️');
}

/**
 * 4. EASTER EGG LOGIC
 */
function scrollToRandomUser() {
    playSound('click');
    surpriseClickCount++;
    if (surpriseClickCount >= 5) {
        surpriseClickCount = 0;
        // This now checks for 'secret_matrix' and won't level up twice
        triggerSecretUnlock('matrix');
    }

    const cards = document.querySelectorAll('.user-card');
    if (cards.length === 0) return;
    cards.forEach(c => c.classList.remove('highlight-pulse'));
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    randomCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    randomCard.classList.add('highlight-pulse');
}

const konamiCode = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];
let konamiPosition = 0;

window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();

    if (key === 'd' && e.target.tagName !== 'INPUT') {
        const devPanel = document.getElementById('dev-tools');
        if (devPanel) {
            const isHidden = devPanel.classList.toggle('hidden');
            // SAVE STATE: Store whether it's hidden or not
            localStorage.setItem('devToolsVisible', !isHidden);
            playSound(isHidden ? 'click' : 'secret');
        }
        return;
    }

    // Konami Sequence
    if (key === konamiCode[konamiPosition]) {
        konamiPosition++;
        if (konamiPosition === konamiCode.length) {
            triggerSecretUnlock('konami');
            konamiPosition = 0;
        }
    } else {
        konamiPosition = (key === 'arrowup') ? 1 : 0;
    }
});

function activateKonami() {
    playSound('secret');
    document.documentElement.classList.add('konami-roll');
    setTimeout(() => document.documentElement.classList.remove('konami-roll'), 2000);
}

function triggerGravity(event) {
    if (event) event.preventDefault();
    playSound('secret');
    document.body.classList.add('glitch-shake');

    setTimeout(() => {
        document.body.classList.remove('glitch-shake');
        const elements = document.querySelectorAll('.user-card, header, footer, main, h1, #game-stats');
        elements.forEach((el) => {
            const fallDist = window.innerHeight + 500;
            const rotation = Math.random() * 90 - 45;
            el.style.transition = `transform ${1 + Math.random()}s cubic-bezier(0.47, 0, 0.745, 0.715), opacity 1.5s ease-in`;
            el.style.transform = `translateY(${fallDist}px) rotate(${rotation}deg)`;
            el.style.opacity = "0";
            el.style.pointerEvents = "none";
        });

        setTimeout(() => {
            if (!document.getElementById('repair-btn')) {
                const btn = document.createElement('button');
                btn.id = 'repair-btn';
                btn.innerHTML = "REPAIR CORE SYSTEM";
                btn.className = "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-white px-10 py-5 rounded-full font-black z-[3000] shadow-2xl animate-pulse cursor-pointer border-4 border-white";
                btn.onclick = () => window.location.reload();
                document.body.appendChild(btn);
            }
        }, 1200);
    }, 500);
}

/**
 * 5. MATRIX ENGINE
 */
function initMatrix() {
    matrixActive = true;
    const overlay = document.getElementById('matrix-overlay');
    const canvas = document.getElementById('matrix-canvas');
    if (!overlay || !canvas) return;

    overlay.classList.remove('hidden');
    overlay.style.display = 'block';

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789アァカサタナハマヤャ';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const rainDrops = Array.from({ length: columns }).fill(1);

    const render = () => {
        if (!matrixActive) return;
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
    window.addEventListener('keydown', handleMatrixEsc);
}

function handleMatrixEsc(e) { if (e.key === 'Escape') closeMatrix(); }

function closeMatrix() {
    matrixActive = false;
    const overlay = document.getElementById('matrix-overlay');
    if (overlay) { overlay.classList.add('hidden'); overlay.style.display = 'none'; }
    window.removeEventListener('keydown', handleMatrixEsc);
}

let destructInterval;
/**
 * SELF DESTRUCT ENGINE
 * Forces console visibility and manages the dynamic loading bar
 */
/**
 * RE-INITIALIZE THE SELF-DESTRUCT (SOUND + PERSISTENCE)
 */
window.startSelfDestruct = function() {
    const btn = document.getElementById('self-destruct-btn');
    const devPanel = document.getElementById('dev-tools');
    const timerText = document.getElementById('destruct-timer');
    const progressBar = document.getElementById('destruct-bar');

    if (destructInterval) return;

    // AUDIO BOOTUP
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    audioCtx.resume();

    // UI LOCKING
    document.body.appendChild(devPanel);
    devPanel.setAttribute('data-lock', 'true');
    btn.classList.add('is-destructing');

    let timeLeft = 10;

    destructInterval = setInterval(() => {
    timeLeft--; // Countdown moves from 10 towards 0

    // 1. Update the numerical text
    const timerDisplay = document.getElementById('destruct-timer');
    const statusText = document.getElementById('destruct-text');

    if (timerDisplay) {
        timerDisplay.innerText = `${timeLeft}s`;
        timerDisplay.style.color = "#fff"; // Ensure it's visible against the red
    }

    // 2. Update the progress bar (Green -> Red)
    const progressBar = document.getElementById('destruct-bar');
    if (progressBar) {
        const percent = ((10 - timeLeft) / 10) * 100;
        progressBar.style.width = `${percent}%`;

        // Color transition logic
        if (timeLeft > 5) progressBar.style.backgroundColor = "#22c55e"; // Green
        else if (timeLeft > 2) progressBar.style.backgroundColor = "#eab308"; // Yellow
        else progressBar.style.backgroundColor = "#ef4444"; // Red
    }

    // 3. Audio & Haptics
    if (audioCtx) {
        const osc = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        osc.connect(g); g.connect(audioCtx.destination);
        // Pitch goes up as time runs out
        osc.frequency.setValueAtTime(300 + (10 - timeLeft) * 50, audioCtx.currentTime);
        g.gain.setValueAtTime(0.1, audioCtx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
        osc.start(); osc.stop(audioCtx.currentTime + 0.1);
    }

    // 4. Visual Panic (Last 4 seconds)
    if (timeLeft <= 4) {
        document.body.classList.add('glitch-shake');
        if (statusText) statusText.innerText = "SYSTEM_FAILURE_IMMINENT";
    }

    // 5. Termination
    if (timeLeft <= 0) {
        clearInterval(destructInterval);
        destructInterval = null;
        if (timerDisplay) timerDisplay.innerText = "0s";

        // Release lock and trigger explosion
        const devPanel = document.getElementById('dev-tools');
        devPanel.setAttribute('data-lock', 'false');
        triggerSecretUnlock('gravity');
    }
}, 1000);
}
/**
 * UPDATED TRIGGER LOGIC
 * Corrects the 'Gravity' failure for the Commit Hash
 */
function triggerSecretUnlock(type) {
    if (type === 'gravity') {
        // Run specific gravity visual logic
        activateGravityEffect();
    } else if (type === 'matrix') {
        initMatrix();
    } else if (type === 'konami') {
        activateKonami();
    }

    // Global XP Unlock
    unlockEgg(`secret_${type}`);
}

function activateGravityEffect() {
    playSound('secret');
    document.body.classList.add('glitch-shake');

    setTimeout(() => {
        document.body.classList.remove('glitch-shake');
        // Targeted elements for falling
        const targets = document.querySelectorAll('.user-card, header, footer, main, h1');
        targets.forEach(el => {
            const dist = window.innerHeight + 500;
            el.style.transition = `transform ${1 + Math.random()}s ease-in, opacity 1s`;
            el.style.transform = `translateY(${dist}px) rotate(${Math.random() * 60 - 30}deg)`;
            el.style.opacity = "0";
            el.style.pointerEvents = "none";
        });
    }, 500);
}

// Internal helper to ensure bar exists
function createBar(btn) {
    const container = document.createElement('div');
    container.id = 'destruct-bar-container';
    container.innerHTML = '<div id="destruct-bar-progress"></div>';
    btn.parentNode.insertBefore(container, btn.nextSibling);
    return container;
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Restore Console Visibility
    const devToolsVisible = localStorage.getItem('devToolsVisible') === 'true';
    const devPanel = document.getElementById('dev-tools');
    if (devToolsVisible && devPanel) {
        devPanel.classList.remove('hidden');
    }

    // 2. Setup Mobile Override
    const footerYear = document.getElementById('current-year');
    let tapCount = 0;
    if (footerYear) {
        footerYear.addEventListener('touchstart', () => {
            tapCount++;
            if (tapCount === 3) {
                devPanel.classList.toggle('hidden');
                localStorage.setItem('devToolsVisible', !devPanel.classList.contains('hidden'));
                playSound('secret');
                tapCount = 0;
            }
            setTimeout(() => { tapCount = 0; }, 1000);
        });
    }

    applyTheme(localStorage.getItem('theme') || 'light');
    updateGameUI();
});
