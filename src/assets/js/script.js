/**
 * 1. RETRO SOUND ENGINE
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
    else if (type === 'restore') {
        osc.type = 'sine';
        [220, 440, 880, 1760].forEach((freq, i) => {
            const s = audioCtx.createOscillator();
            const g = audioCtx.createGain();
            s.connect(g); g.connect(audioCtx.destination);
            s.frequency.setValueAtTime(freq, now + i * 0.05);
            g.gain.setValueAtTime(0.1, now + i * 0.05);
            g.gain.exponentialRampToValueAtTime(0.01, now + i * 0.05 + 0.1);
            s.start(now + i * 0.05);
            s.stop(now + i * 0.05 + 0.1);
        });
    }
}

/**
 * 2. GLOBAL STATE & CONFIGURATION
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
let destructInterval;

/**
 * 3. GAME ENGINE
 */
function updateGameUI() {
    const eggCount = unlockedEggs.length;
    const levelIndex = Math.min(eggCount, LEVELS.length - 1);
    const rank = LEVELS[levelIndex];

    const badge = document.getElementById('level-badge');
    const nameLabel = document.getElementById('level-name');
    const numLabel = document.getElementById('level-number');
    const progressBar = document.getElementById('level-progress');

    if (levelIndex >= 10) {
        document.body.classList.add('level-architect');
    } else {
        document.body.classList.remove('level-architect');
    }

    if (badge) {
        badge.innerText = rank.emoji;
        badge.style.backgroundColor = rank.color;
        badge.classList.add('animate-bounce');
        setTimeout(() => badge.classList.remove('animate-bounce'), 1000);
    }

    if (nameLabel) {
        nameLabel.innerText = rank.name;
        nameLabel.style.color = rank.color;
    }

    if (numLabel) numLabel.innerText = levelIndex;

    if (progressBar) {
        const progressPercent = (levelIndex / (LEVELS.length - 1)) * 100;
        progressBar.style.width = `${progressPercent}%`;
        progressBar.style.backgroundColor = rank.color;
    }
}

function unlockEgg(eggId) {
    if (!unlockedEggs.includes(eggId)) {
        unlockedEggs.push(eggId);
        localStorage.setItem('unlockedEggs', JSON.stringify(unlockedEggs));
        playSound('levelUp');
        showLevelUpNotification(unlockedEggs.length);
        updateGameUI();
    }
}

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
 * 4. THEME SYSTEM
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
 * 5. EASTER EGG LOGIC & TRIGGERS
 */
function triggerSecretUnlock(type) {
    if (type === 'gravity') {
        activateGravityEffect();
    } else if (type === 'matrix') {
        initMatrix();
    } else if (type === 'konami') {
        activateKonami();
    }
    unlockEgg(`secret_${type}`);
}

const konamiCode = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];
let konamiPosition = 0;

window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (key === 'd') {
        const devPanel = document.getElementById('dev-tools');
        if (devPanel) {
            const isHidden = devPanel.classList.toggle('hidden');
            localStorage.setItem('devToolsVisible', !isHidden);
            playSound(isHidden ? 'click' : 'secret');
        }
        return;
    }

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

function activateGravityEffect() {
    playSound('secret');
    document.body.classList.add('glitch-shake');

    setTimeout(() => {
        document.body.classList.remove('glitch-shake');
        const targets = document.querySelectorAll('.user-card, header, footer, main, h1, #game-stats');
        targets.forEach(el => {
            const dist = window.innerHeight + 1000;
            el.style.transition = `transform ${1 + Math.random()}s ease-in, opacity 1s`;
            el.style.transform = `translateY(${dist}px) rotate(${Math.random() * 60 - 30}deg)`;
            el.style.opacity = "0";
            el.style.pointerEvents = "none";
        });

        setTimeout(() => {
            if (!document.getElementById('repair-btn')) {
                const btn = document.createElement('button');
                btn.id = 'repair-btn';
                btn.innerHTML = "REPAIR CORE SYSTEM";
                btn.style.cssText = `
                    position: fixed !important;
                    top: 50% !important;
                    left: 50% !important;
                    transform: translate(-50%, -50%) !important;
                    z-index: 999999 !important;
                    background: #2563eb !important;
                    color: white !important;
                    padding: 20px 40px;
                    border-radius: 50px;
                    font-weight: 900;
                    border: 4px solid white;
                    cursor: pointer;
                    box-shadow: 0 0 50px rgba(37, 99, 235, 0.8);
                `;
                btn.onclick = () => {
                    playSound('restore');
                    btn.innerHTML = "SYSTEM RESTORED";
                    btn.style.pointerEvents = "none";
                    setTimeout(() => window.location.reload(), 1000);
                };
                document.body.appendChild(btn);
            }
        }, 1500);
    }, 500);
}

/**
 * 6. MATRIX ENGINE
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

/**
 * 7. SELF DESTRUCT ENGINE
 */
window.startSelfDestruct = function() {
    const btn = document.getElementById('self-destruct-btn');
    const devPanel = document.getElementById('dev-tools');
    const timerDisplay = document.getElementById('destruct-timer');
    const progressBar = document.getElementById('destruct-bar');
    const statusText = document.getElementById('destruct-text');

    if (destructInterval) return;

    initAudio();
    document.body.appendChild(devPanel);
    devPanel.setAttribute('data-lock', 'true');
    btn.classList.add('is-destructing');

    let timeLeft = 10;

    destructInterval = setInterval(() => {
        timeLeft--;

        if (timerDisplay) {
            timerDisplay.innerText = `${timeLeft}s`;
            timerDisplay.style.color = "#fff";
        }

        if (progressBar) {
            const percent = ((10 - timeLeft) / 10) * 100;
            progressBar.style.width = `${percent}%`;
            if (timeLeft > 5) progressBar.style.backgroundColor = "#22c55e";
            else if (timeLeft > 2) progressBar.style.backgroundColor = "#eab308";
            else progressBar.style.backgroundColor = "#ef4444";
        }

        if (audioCtx) {
            const osc = audioCtx.createOscillator();
            const g = audioCtx.createGain();
            osc.connect(g); g.connect(audioCtx.destination);
            osc.frequency.setValueAtTime(300 + (10 - timeLeft) * 50, audioCtx.currentTime);
            g.gain.setValueAtTime(0.1, audioCtx.currentTime);
            g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
            osc.start(); osc.stop(audioCtx.currentTime + 0.1);
        }

        if (timeLeft <= 4) {
            document.body.classList.add('glitch-shake');
            if (statusText) statusText.innerText = "SYSTEM_FAILURE_IMMINENT";
        }

        if (timeLeft <= 0) {
            clearInterval(destructInterval);
            destructInterval = null;
            devPanel.setAttribute('data-lock', 'false');
            triggerSecretUnlock('gravity');
        }
    }, 1000);
}

function scrollToRandomUser() {
    playSound('click');

    // 1. Secret Unlock Logic
    surpriseClickCount++;
    if (surpriseClickCount >= 5) {
        surpriseClickCount = 0;
        // This triggers the Matrix overlay
        triggerSecretUnlock('matrix');
    }

    // 2. Scrolling Logic
    const cards = document.querySelectorAll('.user-card');
    if (cards.length === 0) {
        console.warn("No .user-card elements found to scroll to.");
        return;
    }

    // Clear previous highlights
    cards.forEach(c => c.classList.remove('highlight-pulse'));

    // Pick a random card and scroll
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    randomCard.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Changed to center for better visibility

    // Add the pulse animation
    randomCard.classList.add('highlight-pulse');
}

/**
 * 8. INITIALIZATION
 */
document.addEventListener('DOMContentLoaded', () => {
    const devToolsVisible = localStorage.getItem('devToolsVisible') === 'true';
    const devPanel = document.getElementById('dev-tools');
    if (devToolsVisible && devPanel) {
        devPanel.classList.remove('hidden');
    }

    applyTheme(localStorage.getItem('theme') || 'light');
    updateGameUI();
});
