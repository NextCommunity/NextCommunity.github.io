
/**
 * 1. LEVELS DATA (0-100)
 */
const LEVELS = [
    // 0-10: Original Ranks
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
    { level: 10, name: "Architect", emoji: "👑", color: "#ef4444" },

    // 11-30: Magic the Gathering (Creatures & Keywords)
    { level: 11, name: "Llanowar Elf", emoji: "🏹", color: "#2d5a27" },
    { level: 12, name: "Scryer", emoji: "🔮", color: "#1d4ed8" },
    { level: 13, name: "Trampler", emoji: "🐘", color: "#15803d" },
    { level: 14, name: "Flying Menace", emoji: "🦇", color: "#4a044e" },
    { level: 15, name: "Mana Leech", emoji: "💧", color: "#0ea5e9" },
    { level: 16, name: "Spellcounter", emoji: "🚫", color: "#2563eb" },
    { level: 17, name: "Goblin Guide", emoji: "👺", color: "#dc2626" },
    { level: 18, name: "Serum Visionary", emoji: "🧪", color: "#6366f1" },
    { level: 19, name: "Mythic Rare", emoji: "🟠", color: "#f97316" },
    { level: 20, name: "Planeswalker", emoji: "✨", color: "#fbbf24" },

    // 21-40: Game of Thrones (Houses & Heroes)
    { level: 21, name: "Night's Watch", emoji: "🦅", color: "#1e293b" },
    { level: 22, name: "Wildling Scout", emoji: "❄️", color: "#94a3b8" },
    { level: 23, name: "Ironborn", emoji: "⚓", color: "#475569" },
    { level: 24, name: "Dothraki Rider", emoji: "🐎", color: "#b45309" },
    { level: 25, name: "Kingslayer", emoji: "🗡️", color: "#facc15" },
    { level: 26, name: "Winterfell Warden", emoji: "🐺", color: "#cbd5e1" },
    { level: 27, name: "Dragonstone Guard", emoji: "🐉", color: "#991b1b" },
    { level: 28, name: "Faceless Man", emoji: "🎭", color: "#4b5563" },
    { level: 29, name: "Hand of the King", emoji: "🖐️", color: "#d97706" },
    { level: 30, name: "Iron Throne Heir", emoji: "⚔️", color: "#111827" },

    // 31-50: Wheel of Time (The Tiers of Power)
    { level: 31, name: "Two Rivers Archer", emoji: "🏹", color: "#166534" },
    { level: 32, name: "Gleeman", emoji: "🎶", color: "#be185d" },
    { level: 33, name: "Borderlander", emoji: "🛡️", color: "#991b1b" },
    { level: 34, name: "Warders Bond", emoji: "🔗", color: "#1e293b" },
    { level: 35, name: "Aes Sedai Novice", emoji: "🕯️", color: "#f8fafc" },
    { level: 36, name: "Accepted", emoji: "💍", color: "#e2e8f0" },
    { level: 37, name: "Aiel Dreamwalker", emoji: "🏜️", color: "#d97706" },
    { level: 38, name: "Asha'man", emoji: "⚡", color: "#000000" },
    { level: 39, name: "Amyrlin Seat", emoji: "📜", color: "#ffffff" },
    { level: 40, name: "Ta'veren", emoji: "🌀", color: "#6366f1" },

    // 41-60: Lord of the Rings (Fellowship & Foes)
    { level: 41, name: "Hobbit Adventurer", emoji: "🍺", color: "#15803d" },
    { level: 42, name: "Bree Strider", emoji: "👢", color: "#451a03" },
    { level: 43, name: "Riddermark Lord", emoji: "🏇", color: "#166534" },
    { level: 44, name: "Gondor Soldier", emoji: "🛡️", color: "#94a3b8" },
    { level: 45, name: "Uruk-hai Berserker", emoji: "✋", color: "#450a0a" },
    { level: 46, name: "Elven Archer", emoji: "🍃", color: "#4ade80" },
    { level: 47, name: "Dwarf Warrior", emoji: "⛏️", color: "#78350f" },
    { level: 48, name: "Nazgûl Rider", emoji: "🐎", color: "#020617" },
    { level: 49, name: "Istari Pupil", emoji: "🧙", color: "#3b82f6" },
    { level: 50, name: "Ring-bearer", emoji: "💍", color: "#fbbf24" },

    // NEW LEVELS 51-60
    { level: 51, name: "White Wizard", emoji: "🧙‍♂️", color: "#f8fafc" },
    { level: 52, name: "Silmaril Seeker", emoji: "💎", color: "#7dd3fc" },
    { level: 53, name: "Dune Walker", emoji: "⏳", color: "#fcd34d" },
    { level: 54, name: "Shadowfax Rider", emoji: "🐎", color: "#e2e8f0" },
    { level: 55, name: "Master of Coin", emoji: "🪙", color: "#fbbf24" },
    { level: 56, name: "Kingsguard", emoji: "🛡️", color: "#94a3b8" },
    { level: 57, name: "Valyrian Smith", emoji: "⚒️", color: "#475569" },
    { level: 58, name: "Night Watcher", emoji: "🦉", color: "#312e81" },
    { level: 59, name: "Obsidian Blade", emoji: "🗡️", color: "#1e293b" },
    { level: 60, name: "Citadel Maester", emoji: "📜", color: "#8b5e3c" },

    // 61-80: High Magic & Artifacts
    { level: 61, name: "Mox Emerald", emoji: "💚", color: "#10b981" },
    { level: 62, name: "Mox Sapphire", emoji: "💙", color: "#3b82f6" },
    { level: 63, name: "Mox Ruby", emoji: "❤️", color: "#ef4444" },
    { level: 64, name: "Mox Jet", emoji: "🖤", color: "#18181b" },
    { level: 65, name: "Mox Pearl", emoji: "🤍", color: "#f8fafc" },
    { level: 66, name: "Black Lotus", emoji: "🌺", color: "#000000" },
    { level: 67, name: "Balrog Slayer", emoji: "🔥", color: "#f97316" },
    { level: 68, name: "Witch-king", emoji: "👑", color: "#334155" },
    { level: 69, name: "Shelob's Kin", emoji: "🕷️", color: "#0f172a" },
    { level: 70, name: "Dragon-friend", emoji: "🐲", color: "#dc2626" },

    // NEW LEVELS 71-80
    { level: 71, name: "Neon Ghost", emoji: "👻", color: "#22d3ee" },
    { level: 72, name: "Dragon's Greed", emoji: "🪙", color: "#fbbf24" },
    { level: 73, name: "Mistborn", emoji: "🌫️", color: "#94a3b8" },
    { level: 74, name: "Cinder Soul", emoji: "🔥", color: "#f87171" },
    { level: 75, name: "High Council", emoji: "🏛️", color: "#6366f1" },
    { level: 76, name: "Valyrian Steel", emoji: "🗡️", color: "#cbd5e1" },
    { level: 77, name: "Golden Snitch", emoji: "✨", color: "#facc15" },
    { level: 78, name: "Ether Weaver", emoji: "🕸️", color: "#a855f7" },
    { level: 79, name: "Star Forge", emoji: "🔨", color: "#38bdf8" },
    { level: 80, name: "Mithril Guard", emoji: "🛡️", color: "#e2e8f0" },

    // 81-90: Wheel of Time (The Forsaken & Dragons)
    { level: 81, name: "Lan Mandragoran", emoji: "🗡️", color: "#1e293b" },
    { level: 82, name: "Moiraine Damodred", emoji: "💧", color: "#1d4ed8" },
    { level: 83, name: "Ishamael", emoji: "👁️", color: "#450a0a" },
    { level: 84, name: "Callandor Wielder", emoji: "💎", color: "#22d3ee" },
    { level: 85, name: "Lewes Therin", emoji: "☀️", color: "#fde047" },
    { level: 86, name: "Dragon Reborn", emoji: "🐉", color: "#ef4444" },

    // NEW LEVELS 87-90
    { level: 87, name: "Phoenix Down", emoji: "🪶", color: "#fb7185" },
    { level: 88, name: "Void Sentinel", emoji: "👁️‍🗨️", color: "#4ade80" },
    { level: 89, name: "Elder Wand", emoji: "🪄", color: "#94a3b8" },
    { level: 90, name: "Balrog's Whip", emoji: "🔥", color: "#b91c1c" },

    // 91-100: Cosmic Legends
    { level: 91, name: "Sauron's Shadow", emoji: "👁️", color: "#000000" },
    { level: 92, name: "Galadriel's Light", emoji: "🌟", color: "#e2e8f0" },
    { level: 93, name: "Eldrazi Titan", emoji: "🐙", color: "#a855f7" },
    { level: 94, name: "Tom Bombadil", emoji: "🍄", color: "#fbbf24" },
    { level: 95, name: "Sauron Unleashed", emoji: "🌋", color: "#7f1d1d" },
    { level: 96, name: "Saruman the White", emoji: "✋", color: "#cbd5e1" },
    { level: 97, name: "Gandalf the Grey", emoji: "🎆", color: "#64748b" },
    { level: 98, name: "Gandalf the White", emoji: "🧙‍♂️", color: "#ffffff" },
    { level: 99, name: "The Creator", emoji: "🌌", color: "#6366f1" },
    { level: 100, name: "Eru Ilúvatar", emoji: "✨", color: "#ffffff" },

    { level: 101, name: "Padawan Learner", emoji: "🧘", color: "#60a5fa" },
    { level: 102, name: "Moisture Farmer", emoji: "🚜", color: "#d97706" },
    { level: 103, name: "Scrappy Scavenger", emoji: "🔧", color: "#fcd34d" },
    { level: 104, name: "Cantina Regular", emoji: "🍹", color: "#9333ea" },
    { level: 105, name: "Holocron Finder", emoji: "🧊", color: "#38bdf8" },
    { level: 106, name: "Speeder Racer", emoji: "🏎️", color: "#fb923c" },
    { level: 107, name: "Droid Mechanic", emoji: "🤖", color: "#94a3b8" },
    { level: 108, name: "Kyber Seeker", emoji: "💎", color: "#ffffff" },
    { level: 109, name: "Outer Rim Nomad", emoji: "🏜️", color: "#a8a29e" },
    { level: 110, name: "Rebel Pilot", emoji: "🚀", color: "#ef4444" },
    { level: 111, name: "Squadron Leader", emoji: "📡", color: "#f87171" },
    { level: 112, name: "Astromech Specialist", emoji: "🔌", color: "#3b82f6" },
    { level: 113, name: "Smuggler Associate", emoji: "📦", color: "#b45309" },
    { level: 114, name: "Sabacc Champion", emoji: "🃏", color: "#fbbf24" },
    { level: 115, name: "Jedi Knight", emoji: "⚔️", color: "#60a5fa" },
    { level: 116, name: "Lightsaber Smith", emoji: "🛠️", color: "#2dd4bf" },
    { level: 117, name: "Force Sensitive", emoji: "🌀", color: "#818cf8" },
    { level: 118, name: "Temple Guardian", emoji: "🏰", color: "#facc15" },
    { level: 119, name: "Wayseeker", emoji: "🧭", color: "#94a3b8" },
    { level: 120, name: "Mandalorian Initiate", emoji: "🛡️", color: "#64748b" },
    { level: 121, name: "Foundling", emoji: "👶", color: "#cbd5e1" },
    { level: 122, name: "Beskar Bearer", emoji: "🌑", color: "#475569" },
    { level: 123, name: "Clan Defender", emoji: "⚔️", color: "#1e293b" },
    { level: 124, name: "Jetpack Ace", emoji: "🔥", color: "#f97316" },
    { level: 125, name: "Jedi Guardian", emoji: "🛡️", color: "#22c55e" },

    // --- IMPERIAL MIGHT: THE SHADOW (126-150) ---
    { level: 126, name: "Stormtrooper Recruit", emoji: "⚪", color: "#ffffff" },
    { level: 127, name: "Scout Trooper", emoji: "🏍️", color: "#e2e8f0" },
    { level: 128, name: "TIE Pilot", emoji: "🦇", color: "#1f2937" },
    { level: 129, name: "Imperial Officer", emoji: "💂", color: "#334155" },
    { level: 130, name: "Millennium Captain", emoji: "🌌", color: "#fbbf24" },
    { level: 131, name: "Sith Acolyte", emoji: "💀", color: "#991b1b" },
    { level: 132, name: "Shadow Guard", emoji: "👤", color: "#000000" },
    { level: 133, name: "Inquisitor Trainee", emoji: "🔴", color: "#dc2626" },
    { level: 134, name: "Purge Trooper", emoji: "🧨", color: "#450a0a" },
    { level: 135, name: "Sith Stalker", emoji: "🕵️", color: "#7f1d1d" },
    { level: 136, name: "Red Guard", emoji: "🛡️", color: "#b91c1c" },
    { level: 137, name: "Dark Side Adept", emoji: "🌑", color: "#450606" },
    { level: 138, name: "Sith Alchemist", emoji: "🧪", color: "#6d28d9" },
    { level: 139, name: "Holocron Corruptor", emoji: "🔻", color: "#be123c" },
    { level: 140, name: "Imperial Inquisitor", emoji: "🤺", color: "#991b1b" },
    { level: 141, name: "Grand Inquisitor", emoji: "👹", color: "#7f1d1d" },
    { level: 142, name: "Star Destroyer Commander", emoji: "🚢", color: "#94a3b8" },
    { level: 143, name: "Super Star Destroyer Admin", emoji: "📐", color: "#64748b" },
    { level: 144, name: "Kyber Crystal Corruptor", emoji: "🩸", color: "#f43f5e" },
    { level: 145, name: "Death Star Architect", emoji: "🛰️", color: "#475569" },
    { level: 146, name: "Planetary Governor", emoji: "🪐", color: "#ca8a04" },
    { level: 147, name: "Imperial Advisor", emoji: "🧠", color: "#a855f7" },
    { level: 148, name: "Sith Warrior", emoji: "⚔️", color: "#991b1b" },
    { level: 149, name: "Dark Disciple", emoji: "🔥", color: "#dc2626" },
    { level: 150, name: "Sith Lord", emoji: "😈", color: "#000000" },

    // --- BOUNTY HUNTERS & MERCENARIES (151-175) ---
    { level: 151, name: "Guild Member", emoji: "📜", color: "#8b5e3c" },
    { level: 152, name: "Tracker", emoji: "👣", color: "#a8a29e" },
    { level: 153, name: "Sniper Specialist", emoji: "🎯", color: "#ef4444" },
    { level: 154, name: "Thermal Detonator Expert", emoji: "💣", color: "#f97316" },
    { level: 155, name: "Bounty Hunter Prime", emoji: "🎖️", color: "#4ade80" },
    { level: 156, name: "Carbonite Freezer", emoji: "🧊", color: "#bae6fd" },
    { level: 157, name: "Underworld Kingpin", emoji: "👑", color: "#7c3aed" },
    { level: 158, name: "Hutt Enforcer", emoji: "🐌", color: "#65a30d" },
    { level: 159, name: "Crime Syndicate Boss", emoji: "💼", color: "#1e1b4b" },
    { level: 160, name: "Grand Moff", emoji: "🏅", color: "#334155" },
    { level: 161, name: "Imperial Regent", emoji: "🏛️", color: "#94a3b8" },
    { level: 162, name: "Hand of Justice", emoji: "⚖️", color: "#facc15" },
    { level: 163, name: "Ancient Archivist", emoji: "📚", color: "#d97706" },
    { level: 164, name: "Dathomir Witch", emoji: "🔮", color: "#db2777" },
    { level: 165, name: "Grey Jedi", emoji: "☯️", color: "#64748b" },
    { level: 166, name: "Balance Seeker", emoji: "🌓", color: "#94a3b8" },
    { level: 167, name: "Jedi Master", emoji: "🧘", color: "#60a5fa" },
    { level: 168, name: "Council Member", emoji: "🪑", color: "#3b82f6" },
    { level: 169, name: "Temple Overseer", emoji: "🏛️", color: "#2563eb" },
    { level: 170, name: "Jedi Sage", emoji: "📜", color: "#93c5fd" },
    { level: 171, name: "High Republic Hero", emoji: "🌟", color: "#fbbf24" },
    { level: 172, name: "Living Force Vessel", emoji: "🍃", color: "#4ade80" },
    { level: 173, name: "Chosen One Initiate", emoji: "⚡", color: "#ffffff" },
    { level: 174, name: "Master of the Order", emoji: "👑", color: "#1d4ed8" },
    { level: 175, name: "Jedi Grand Master", emoji: "🧘‍♂️", color: "#10b981" },

    // --- THE FORCE SUPREME (176-200) ---
    { level: 176, name: "Dark Side Entity", emoji: "🌑", color: "#111827" },
    { level: 177, name: "Life Force Leecher", emoji: "🩸", color: "#7f1d1d" },
    { level: 178, name: "Sith Emperor", emoji: "👑", color: "#000000" },
    { level: 179, name: "World Eater", emoji: "🌎", color: "#4c0519" },
    { level: 180, name: "Darth Vader's Wrath", emoji: "👺", color: "#b91c1c" },
    { level: 181, name: "Unstoppable Force", emoji: "🌪️", color: "#ffffff" },
    { level: 182, name: "Immovable Object", emoji: "🗿", color: "#475569" },
    { level: 183, name: "Force Projection", emoji: "✨", color: "#7dd3fc" },
    { level: 184, name: "Voice of the Force", emoji: "🗣️", color: "#e2e8f0" },
    { level: 185, name: "Emperor's Hand", emoji: "⚡", color: "#a855f7" },
    { level: 186, name: "Force Stormbringer", emoji: "🌩️", color: "#38bdf8" },
    { level: 187, name: "Space-Time Weaver", emoji: "🕸️", color: "#c084fc" },
    { level: 188, name: "World Between Worlds Explorer", emoji: "🌌", color: "#a5b4fc" },
    { level: 189, name: "Cosmic Sentinel", emoji: "👁️", color: "#2dd4bf" },
    { level: 190, name: "Force Ghost", emoji: "👻", color: "#bae6fd" },
    { level: 191, name: "Ethereal Guide", emoji: "🕯️", color: "#ffffff" },
    { level: 192, name: "Midi-chlorian Master", emoji: "🧬", color: "#4ade80" },
    { level: 193, name: "Force Nexus", emoji: "🔆", color: "#facc15" },
    { level: 194, name: "Ancient One", emoji: "⏳", color: "#d97706" },
    { level: 195, name: "The Son & The Daughter", emoji: "☯️", color: "#000000" },
    { level: 196, name: "Avatar of Mortis", emoji: "🏛️", color: "#f8fafc" },
    { level: 197, name: "Bendu's Wisdom", emoji: "🐂", color: "#78350f" },
    { level: 198, name: "The Father", emoji: "⚖️", color: "#fbbf24" },
    { level: 199, name: "The Whills", emoji: "👁️", color: "#5eead4" },
    { level: 200, name: "One With The Force", emoji: "🌌", color: "#ffffff" }
];

const XP_PER_LEVEL = 45;

// Load saved level or start at 0
let currentLevel = parseInt(localStorage.getItem('userLevel')) || 0;

// Load saved XP or start at 0
let currentXP = parseInt(localStorage.getItem('userXP')) || 0;


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


let unlockedEggs = JSON.parse(localStorage.getItem('unlockedEggs')) || [];
let surpriseClickCount = 0;
let matrixActive = false;
let destructInterval;

function getRank(lvl) {
    // 1. Ensure lvl is a valid number
    const searchLvl = parseInt(lvl) || 0;

    // 2. Find the highest rank that is less than or equal to current level
    // We slice().reverse() to check the highest levels first
    const rank = LEVELS.slice().reverse().find(r => searchLvl >= r.level);

    // 3. Fallback: If rank is undefined, return the first level (Newbie)
    if (!rank) {
        console.warn(`Rank not found for level ${searchLvl}, defaulting to Level 0.`);
        return LEVELS[0];
    }

    return rank;
}

/**
 * 3. GAME ENGINE
 */
function updateGameUI() {
    // Ensure currentLevel is a valid number
    const lvl = parseInt(currentLevel) || 0;
    // Check if LEVELS exists yet
    if (!LEVELS || LEVELS.length === 0) return;

    const rank = getRank(currentLevel);

    // If rank is STILL undefined (e.g. LEVELS is empty), stop here
    if (!rank) return;

    const xpBar = document.getElementById('level-progress');
    const xpText = document.getElementById('total-xp-display');

    if (xpBar) {
        const progress = (currentXP / 45) * 100;
        xpBar.style.width = `${progress}%`;
    }

    if (xpText) {
        xpText.innerText = `${currentXP} / 45`;
    }

    const nameLabel = document.getElementById('level-name');
    if (nameLabel) {
        nameLabel.innerText = rank.name;
        // This is where it was crashing:
        nameLabel.style.color = rank.color || "#ffffff";
    }

    const badge = document.getElementById('level-badge');
    const numLabel = document.getElementById('level-number');

    if (badge) {
        badge.innerText = rank.emoji;
        badge.style.backgroundColor = rank.color;
    }
    if (numLabel) numLabel.innerText = currentLevel;

    // Update the Progress Bar
    const pb = document.getElementById('level-progress');
    if (pb) {
        // Use 45 XP per level as the denominator
        const progressPercent = Math.min((currentXP / 45) * 100, 100);
        pb.style.width = `${progressPercent}%`;
        pb.style.backgroundColor = rank.color;
    }
    // Sith Theme Auto-Switch (Levels 131-160)
    if (lvl >= 131 && lvl <= 160) {
        document.documentElement.style.setProperty('--accent', '#ef4444');
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

function showLevelUpNotification(input) {
    // Determine if input is a rank object or a level number
    let rank;
    if (typeof input === 'object' && input !== null) {
        rank = input;
    } else {
        rank = getRank(input); // Convert number to rank object
    }

    // Safety fallback to prevent the "undefined" crash
    if (!rank) rank = LEVELS[0];

    const notify = document.createElement('div');
    notify.className = "fixed top-24 left-1/2 -translate-x-1/2 z-[2000] px-8 py-4 bg-white dark:bg-slate-900 border-4 rounded-full shadow-2xl flex items-center gap-4 animate-bounce";

    // Now rank.color is guaranteed to exist
    notify.style.borderColor = rank.color;

    notify.innerHTML = `
        <span class="text-4xl">${rank.emoji}</span>
        <div class="text-left">
            <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-500">Rank Update</h4>
            <p class="text-xl font-black uppercase tracking-tighter" style="color: ${rank.color}">${rank.name}</p>
        </div>`;

    document.body.appendChild(notify);
    setTimeout(() => {
        notify.style.opacity = '0';
        setTimeout(() => notify.remove(), 500);
    }, 4000);
}

/**
 * 4. THEME SYSTEM
 */
function applyTheme(theme) {
    const html = document.documentElement;
    const heart = document.getElementById('footer-heart');
    localStorage.setItem('theme', theme);

    // Reset classes
    html.classList.remove('dark');
    const props = ['--bg-page', '--bg-card', '--bg-footer', '--text-main', '--text-muted', '--border-color', '--accent', '--accent-light'];
    props.forEach(p => html.style.removeProperty(p));

    if (theme === 'dark') {
        html.classList.add('dark');
        if (heart) heart.innerText = '💜';
    }
    else if (theme === 'random') {
        // Generate a random Hue (0-360)
        const h = Math.floor(Math.random() * 360);

        // VIBRANT NEON LOGIC: Keep saturation high and lightness balanced
        html.style.setProperty('--bg-page', `hsl(${h}, 45%, 7%)`);     // Very Dark
        html.style.setProperty('--bg-card', `hsl(${h}, 35%, 12%)`);    // Slightly lighter
        html.style.setProperty('--bg-footer', `hsl(${h}, 40%, 5%)`);   // Deepest
        html.style.setProperty('--text-main', `hsl(${h}, 20%, 95%)`);  // Near White
        html.style.setProperty('--text-muted', `hsl(${h}, 15%, 70%)`); // Softened
        html.style.setProperty('--accent', `hsl(${h}, 95%, 70%)`);     // Vivid Pop
        html.style.setProperty('--accent-light', `hsla(${h}, 95%, 70%, 0.2)`);
        html.style.setProperty('--border-color', `hsl(${h}, 30%, 20%)`);

        if (heart) {
            const symbols = ['💎', '🌈', '✨', '🔥', '🌀', '🧬'];
            heart.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        }
    }
    else {
        if (heart) heart.innerText = '❤️';
    }

    updateThemeIcon(theme);
}

function toggleTheme() {
    playSound('click');
    const current = localStorage.getItem('theme') || 'light';
    const next = current === 'light' ? 'dark' : (current === 'dark' ? 'random' : 'light');
    applyTheme(next);

    // Maintenance XP Trigger
    addMaintenanceXP();
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

    if (destructInterval) return;

    initAudio();

    // Move to HTML root to ignore scroll position and Body transforms
    document.documentElement.appendChild(devPanel);
    devPanel.setAttribute('data-lock', 'true');
    devPanel.classList.remove('hidden');

    btn.classList.add('is-destructing');

    let timeLeft = 10;

    destructInterval = setInterval(() => {
        timeLeft--;

        // Re-locate elements in the new DOM position
        const timerDisplay = document.getElementById('destruct-timer');
        const progressBar = document.getElementById('destruct-bar');
        const statusText = document.getElementById('destruct-text');

        if (timerDisplay) timerDisplay.innerText = `${timeLeft}s`;

        if (progressBar) {
            const percent = ((10 - timeLeft) / 10) * 100;
            progressBar.style.width = `${percent}%`;

            // Color Logic
            if (timeLeft > 5) progressBar.style.backgroundColor = "#22c55e";
            else if (timeLeft > 2) progressBar.style.backgroundColor = "#eab308";
            else progressBar.style.backgroundColor = "#ef4444";
        }

        // Rising Audio Frequency
        if (audioCtx) {
            const osc = audioCtx.createOscillator();
            const g = audioCtx.createGain();
            osc.connect(g); g.connect(audioCtx.destination);
            osc.frequency.setValueAtTime(400 + (10 - timeLeft) * 80, audioCtx.currentTime);
            g.gain.setValueAtTime(0.1, audioCtx.currentTime);
            g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
            osc.start(); osc.stop(audioCtx.currentTime + 0.1);
        }

        // CRITICAL STATE: 3 Seconds Left
        if (timeLeft <= 3) {
            document.body.classList.add('glitch-shake');
            // Flash the console background red
            devPanel.style.backgroundColor = (timeLeft % 2 === 0) ? "rgba(239, 68, 68, 0.9)" : "rgba(15, 23, 42, 0.95)";
            devPanel.style.borderColor = "#ffffff";
            if (statusText) statusText.innerText = "OVERHEAT_CRITICAL";
        }

        if (timeLeft <= 0) {
            clearInterval(destructInterval);
            destructInterval = null;
            if (timerDisplay) timerDisplay.innerText = "0s";

            // Clean up and trigger the fall
            devPanel.style.backgroundColor = "rgba(15, 23, 42, 0.95)";
            triggerSecretUnlock('gravity');
        }
    }, 1000);
}

function scrollToRandomUser() {
    playSound('click');

    surpriseClickCount++;
    if (surpriseClickCount >= 5) {
        surpriseClickCount = 0;
        triggerSecretUnlock('matrix');
        return;
    }

    const cards = document.querySelectorAll('.user-card');
    if (cards.length === 0) return;

    // Clean up previous selection
    cards.forEach(c => {
        c.classList.remove('selected-fancy');
        const oldTrace = c.querySelector('.border-trace');
        if (oldTrace) oldTrace.remove();
    });

    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    randomCard.scrollIntoView({ behavior: 'smooth', block: 'center' });

    setTimeout(() => {
        playSound('levelUp');
        randomCard.classList.add('selected-fancy');

        // Inject the Tracing SVG
        const svgNamespace = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNamespace, "svg");
        const rect = document.createElementNS(svgNamespace, "rect");

        svg.setAttribute("class", "border-trace");
        rect.setAttribute("fill", "none");
        rect.setAttribute("width", "100%");
        rect.setAttribute("height", "100%");

        svg.appendChild(rect);
        randomCard.appendChild(svg);

        // Remove trace and fancy class after the 7.5s animation ends
        setTimeout(() => {
            randomCard.classList.remove('selected-fancy');
            svg.remove();
        }, 7500);
    }, 400);
}

/**
 * UTILITY: SCREENSHOT MODE
 */
window.toggleScreenshotMode = function() {
    const devPanel = document.getElementById('dev-tools');
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const gameStats = document.getElementById('game-stats');

    // Hide everything
    [devPanel, header, footer, gameStats].forEach(el => {
        if(el) el.style.opacity = '0';
        if(el) el.style.pointerEvents = 'none';
    });

    // Show a tiny notification that it's active
    const toast = document.createElement('div');
    toast.style.cssText = "position:fixed; bottom:20px; left:50%; transform:translateX(-50%); color:var(--text-muted); font-family:monospace; font-size:10px; z-index:9999;";
    toast.innerText = "SCREENSHOT MODE ACTIVE - RESTORING IN 5S";
    document.body.appendChild(toast);

    setTimeout(() => {
        [devPanel, header, footer, gameStats].forEach(el => {
            if(el) el.style.opacity = '1';
            if(el) el.style.pointerEvents = 'auto';
        });
        toast.remove();
    }, 5000);
};

/**
 * 8. INITIALIZATION
 */
document.addEventListener('DOMContentLoaded', () => {
    const devToolsVisible = localStorage.getItem('devToolsVisible') === 'true';
    const devPanel = document.getElementById('dev-tools');
    // Add this to your initialization script
    let skillHoverCount = 0;

    if (devToolsVisible && devPanel) {
        devPanel.classList.remove('hidden');
    }

    applyTheme(localStorage.getItem('theme') || 'light');
    updateGameUI();
});

/**
 * 9. ENHANCED XP & SKILL MINING SYSTEM
 */

async function addExperience(amount) {
    if (document.getElementById('dev-tools')?.getAttribute('data-lock') === 'true') return;

    currentXP += amount;

    // Check if we have enough XP to level up
    while (currentXP >= 45 && currentLevel < 200) {
        // 1. Force the bar to 100% manually first
        renderXP(45);

        // 2. Wait for the CSS transition to finish (matches your transition speed)
        await new Promise(resolve => setTimeout(resolve, 300));

        // 3. Perform the actual Level Up
        currentXP -= 45;
        currentLevel++;

        playSound('levelUp');
        showLevelUpNotification(getRank(currentLevel));

        // 4. Momentarily disable transitions to reset bar to 0% without sliding back
        const pb = document.getElementById('level-progress');
        if (pb) {
            pb.style.transition = 'none';
            renderXP(0);
            void pb.offsetWidth; // Force a reflow
            pb.style.transition = 'width 0.3s ease-in-out';
        }
    }

    // 5. Save and Render final state
    localStorage.setItem('userLevel', currentLevel);
    localStorage.setItem('userXP', currentXP);
    updateGameUI();
}

// Helper to update just the bar width
function renderXP(value) {
    const pb = document.getElementById('level-progress');
    if (pb) {
        const percent = Math.min((value / 45) * 100, 100);
        pb.style.width = `${percent}%`;
    }
}


function createFloatingXP(event, type = "skill") {
    const float = document.createElement('div');
    const levelIndex = unlockedEggs.length;
    const rankColor = LEVELS[levelIndex]?.color || '#06b6d4';

    float.innerText = type === "maintenance" ? "+5 XP (MAINT)" : "+1 XP";

    float.style.cssText = `
        position: fixed;
        left: ${event.clientX}px;
        top: ${event.clientY}px;
        color: ${rankColor};
        font-family: 'JetBrains Mono', monospace;
        font-weight: 900;
        font-size: ${type === "maintenance" ? '14px' : '12px'};
        pointer-events: none;
        z-index: 10000;
        animation: float-up 0.8s ease-out forwards;
    `;

    document.body.appendChild(float);
    setTimeout(() => float.remove(), 800);
}

function initSkillXP() {
    const skills = document.querySelectorAll('.skill-item');
    skills.forEach(skill => {
        skill.addEventListener('mouseenter', (e) => {
            const isLocked = document.getElementById('dev-tools')?.hasAttribute('data-lock');
            if (!isLocked) {
                addExperience(1);
                createFloatingXP(e);

                // Fancy scale-up on hover
                skill.style.transform = "scale(1.1) translateY(-2px)";
                skill.style.transition = "transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
            }
        });

        skill.addEventListener('mouseleave', () => {
            skill.style.transform = "scale(1) translateY(0)";
        });
    });
}

// Re-initialize skills after Surprise scroll or any DOM changes
window.addEventListener('DOMContentLoaded', initSkillXP);

/**
 * SYS ADMIN XP (Level 6 Mechanic)
 */
function addMaintenanceXP() {
    // Sys Admins get more XP for system-level interactions
    const bonus = unlockedEggs.length >= 6 ? 5 : 2;
    addExperience(bonus);

    // Console log for that "hacker" feel
    if (unlockedEggs.length >= 6) {
        console.log("%c [SYS_ADMIN] System optimized: +5 XP", "color: #ec4899; font-weight: bold;");
    }
}

/**
 * MAGIC XP HANDLER
 */
function triggerMagicXP() {
    // 1. Play the high-pitched secret sound
    playSound('secret');

    // Check if function exists
    if (typeof addExperience === "function") {
        addExperience(100);
        console.log("Magic XP Injected");
    } else {
        console.error("Critical Error: addExperience function not found!");
    }

    // 3. Visual "Magic" Flare on the badge
    const badge = document.getElementById('level-badge');
    if (badge) {
        badge.style.filter = "drop-shadow(0 0 20px #a855f7) brightness(1.5)";
        badge.animate([
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(2) rotate(180deg)', offset: 0.5 },
            { transform: 'scale(1) rotate(360deg)' }
        ], {
            duration: 800,
            easing: 'ease-out'
        });

        // Reset filter after animation
        setTimeout(() => {
            badge.style.filter = "none";
        }, 800);
    }

    // 4. Console feedback
    console.log("%c ✨ Magic XP Cast! +100 XP added to the void.", "color: #a855f7; font-weight: bold;");
}

function triggerForceSurge() {
    playSound('secret');

    // 1. Add XP via the engine (which handles the math)
    addExperience(100);

    // 2. Show a specific "Force" notification manually if you want
    // We get the rank object FIRST to avoid passing a raw number
    const currentRank = getRank(currentLevel);
    showLevelUpNotification(currentRank);

    // 3. Visuals
    const badge = document.getElementById('level-badge');
    if (badge) {
        badge.classList.add('force-glow');
        setTimeout(() => badge.classList.remove('force-glow'), 2000);
    }
}

/**
 * SYSTEM LEVEL JUMP
 */

function jumpToLevel() {
    const input = document.getElementById('jump-lvl');
    if (!input || input.value === "") return;

    let targetLvl = parseInt(input.value);

    // Clamp between 0 and 200
    targetLvl = Math.max(0, Math.min(200, targetLvl));

    // Update the GLOBAL variables
    currentLevel = targetLvl;
    currentXP = 0;

    // Save to LocalStorage
    localStorage.setItem('userLevel', currentLevel);
    localStorage.setItem('userXP', currentXP);

    // Refresh everything
    updateGameUI();

    const rank = getRank(currentLevel);
    showLevelUpNotification(rank);

    if (currentLevel >= 101) {
        triggerForceSurge();
    }
}
