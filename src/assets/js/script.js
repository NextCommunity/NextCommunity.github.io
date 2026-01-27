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
  {
    level: 142,
    name: "Star Destroyer Commander",
    emoji: "🚢",
    color: "#94a3b8",
  },
  {
    level: 143,
    name: "Super Star Destroyer Admin",
    emoji: "📐",
    color: "#64748b",
  },
  {
    level: 144,
    name: "Kyber Crystal Corruptor",
    emoji: "🩸",
    color: "#f43f5e",
  },
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
  {
    level: 154,
    name: "Thermal Detonator Expert",
    emoji: "💣",
    color: "#f97316",
  },
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
  {
    level: 188,
    name: "World Between Worlds Explorer",
    emoji: "🌌",
    color: "#a5b4fc",
  },
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
  { level: 200, name: "One With The Force", emoji: "🌌", color: "#ffffff" },
  // --- CYBERPUNK & FUTURE TECH (201-225) ---
  { level: 201, name: "Chrome Junkie", emoji: "🦾", color: "#64748b" },
  { level: 202, name: "Data Courier", emoji: "💾", color: "#94a3b8" },
  { level: 203, name: "Street Samurai", emoji: "⚔️", color: "#f43f5e" },
  { level: 204, name: "Braindance Tuner", emoji: "🧠", color: "#a855f7" },
  { level: 205, name: "Ripperdoc Apprentice", emoji: "💉", color: "#10b981" },
  { level: 206, name: "Neural Linker", emoji: "🕸️", color: "#22d3ee" },
  { level: 207, name: "Grid Runner", emoji: "🏃", color: "#38bdf8" },
  { level: 208, name: "Sub-Grid Ghost", emoji: "👻", color: "#6366f1" },
  { level: 209, name: "Black Ice Specialist", emoji: "🧊", color: "#1d4ed8" },
  { level: 210, name: "Netrunner", emoji: "🔌", color: "#06b6d4" },
  { level: 211, name: "System Infiltrator", emoji: "🔓", color: "#fbbf24" },
  { level: 212, name: "Mainframe Ghost", emoji: "💻", color: "#f8fafc" },
  { level: 213, name: "Cyberdeck Modder", emoji: "🛠️", color: "#475569" },
  { level: 214, name: "Neon Nomad", emoji: "🏜️", color: "#f59e0b" },
  { level: 215, name: "Night City Fixer", emoji: "📞", color: "#ec4899" },
  { level: 216, name: "Corporate Saboteur", emoji: "💼", color: "#1e293b" },
  { level: 217, name: "Technomancer", emoji: "🪄", color: "#8b5e3c" },
  { level: 218, name: "Synthwave Rider", emoji: "🌅", color: "#f472b6" },
  { level: 219, name: "Memory Dealer", emoji: "🧠", color: "#a78bfa" },
  { level: 220, name: "Glitch Hunter", emoji: "👾", color: "#22c55e" },
  { level: 221, name: "Firewall Breaker", emoji: "🔥", color: "#ef4444" },
  { level: 222, name: "Protocol Enforcer", emoji: "🛡️", color: "#3b82f6" },
  { level: 223, name: "AI Whisperer", emoji: "🤖", color: "#f97316" },
  { level: 224, name: "Bio-Hacker", emoji: "🧬", color: "#84cc16" },
  { level: 225, name: "The Ghost in the Shell", emoji: "🐚", color: "#ffffff" },

  // --- THE MATRIX & SIMULATION (226-250) ---
  { level: 226, name: "Blue Pill Resident", emoji: "💊", color: "#3b82f6" },
  { level: 227, name: "Red Pill Awakened", emoji: "💊", color: "#ef4444" },
  { level: 228, name: "Zion Operator", emoji: "🎧", color: "#166534" },
  { level: 229, name: "Code Construct", emoji: "🏗️", color: "#22c55e" },
  { level: 230, name: "Sentinel Dodger", emoji: "🦑", color: "#475569" },
  { level: 231, name: "Nebuchadnezzar Crew", emoji: "🚢", color: "#94a3b8" },
  { level: 232, name: "Simulation Glitch", emoji: "📺", color: "#a855f7" },
  { level: 233, name: "Bullet-Time Master", emoji: "🔫", color: "#ffffff" },
  { level: 234, name: "Agent Program", emoji: "🕶️", color: "#111827" },
  { level: 235, name: "Rogue Program", emoji: "🚫", color: "#991b1b" },
  { level: 236, name: "The Keymaker", emoji: "🔑", color: "#fbbf24" },
  { level: 237, name: "Merovingian Guard", emoji: "🍷", color: "#7f1d1d" },
  { level: 238, name: "The Oracle's Pupil", emoji: "🍪", color: "#d97706" },
  { level: 239, name: "Seraph's Equal", emoji: "🕊️", color: "#f8fafc" },
  { level: 240, name: "Source Architect", emoji: "🏛️", color: "#ffffff" },
  { level: 241, name: "Logic Bomb", emoji: "💣", color: "#000000" },
  { level: 242, name: "Digital Messiah", emoji: "✨", color: "#6366f1" },
  { level: 243, name: "Binary Sovereign", emoji: "🔢", color: "#22c55e" },
  { level: 244, name: "Hardware Overlord", emoji: "🔌", color: "#4b5563" },
  { level: 245, name: "Recursive Soul", emoji: "🌀", color: "#8b5e3c" },
  { level: 246, name: "Data Streamer", emoji: "🌊", color: "#0ea5e9" },
  { level: 247, name: "Packet Sniffer", emoji: "👃", color: "#64748b" },
  { level: 248, name: "Root Admin", emoji: "🌳", color: "#15803d" },
  { level: 249, name: "The One", emoji: "🕴️", color: "#000000" },
  { level: 250, name: "The Source", emoji: "🔆", color: "#ffffff" },

  // --- ANIME: THE SHONEN PATH (251-275) ---
  { level: 251, name: "Academy Student", emoji: "🎒", color: "#f97316" },
  { level: 252, name: "Leaf Village Genin", emoji: "🍃", color: "#16a34a" },
  { level: 253, name: "Chunin Candidate", emoji: "📜", color: "#b45309" },
  { level: 254, name: "Jonin Elite", emoji: "🧥", color: "#14532d" },
  { level: 255, name: "Anbu Black Ops", emoji: "🎭", color: "#334155" },
  { level: 256, name: "Sannin Successor", emoji: "🐸", color: "#22c55e" },
  { level: 257, name: "Kage", emoji: "🏮", color: "#dc2626" },
  { level: 258, name: "Tailed Beast Host", emoji: "🦊", color: "#f97316" },
  { level: 259, name: "Sage Mode", emoji: "👁️", color: "#fbbf24" },
  { level: 260, name: "Super Saiyan", emoji: "👱", color: "#facc15" },
  { level: 261, name: "Ascended Saiyan", emoji: "⚡", color: "#ffffff" },
  { level: 262, name: "Z-Fighter", emoji: "🥋", color: "#ea580c" },
  { level: 263, name: "Namekian Healer", emoji: "💊", color: "#16a34a" },
  { level: 264, name: "Gravity Trainer", emoji: "🏋️", color: "#475569" },
  { level: 265, name: "Spirit Bomb User", emoji: "🔵", color: "#3b82f6" },
  { level: 266, name: "God of Destruction", emoji: "🟣", color: "#a855f7" },
  { level: 267, name: "Ultra Instinct", emoji: "🥈", color: "#e2e8f0" },
  { level: 268, name: "Soul Reaper", emoji: "💀", color: "#000000" },
  { level: 269, name: "Shikai Awakened", emoji: "⚔️", color: "#94a3b8" },
  { level: 270, name: "Bankai Master", emoji: "💥", color: "#991b1b" },
  { level: 271, name: "Captain of Squad 13", emoji: "🧥", color: "#ffffff" },
  { level: 272, name: "Hollow Mask", emoji: "👹", color: "#dc2626" },
  { level: 273, name: "Quincy Archer", emoji: "🏹", color: "#38bdf8" },
  { level: 274, name: "Espada Rank", emoji: "🔢", color: "#1e293b" },
  { level: 275, name: "Number One Protector", emoji: "🛡️", color: "#facc15" },

  // --- ANIME: GRAND LINE VOYAGERS (276-300) ---
  { level: 276, name: "East Blue Cabin Boy", emoji: "🧹", color: "#94a3b8" },
  { level: 277, name: "Devil Fruit Eater", emoji: "🍇", color: "#a855f7" },
  { level: 278, name: "Grand Line Navigator", emoji: "🧭", color: "#3b82f6" },
  { level: 279, name: "Sniper King", emoji: "👺", color: "#facc15" },
  { level: 280, name: "Black Leg Chef", emoji: "🍳", color: "#1e293b" },
  { level: 281, name: "Santoryu Master", emoji: "⚔️", color: "#16a34a" },
  { level: 282, name: "Cyborg Shipwright", emoji: "🔧", color: "#06b6d4" },
  { level: 283, name: "Archaeologist", emoji: "🏺", color: "#8b5e3c" },
  {
    level: 284,
    name: "Doctor of Cherry Blossoms",
    emoji: "🌸",
    color: "#f472b6",
  },
  { level: 285, name: "Warlord of the Sea", emoji: "🏴‍☠️", color: "#7f1d1d" },
  { level: 286, name: "Haki User", emoji: "🌑", color: "#334155" },
  { level: 287, name: "Conqueror's Spirit", emoji: "👑", color: "#991b1b" },
  { level: 288, name: "Supernova", emoji: "🌟", color: "#fbbf24" },
  { level: 289, name: "Revolutionary", emoji: "🚩", color: "#dc2626" },
  { level: 290, name: "Yonko Commander", emoji: "🎖️", color: "#4c0519" },
  { level: 291, name: "Emperor of the Sea", emoji: "🍷", color: "#7f1d1d" },
  { level: 292, name: "Ancient Weapon Seeker", emoji: "🔱", color: "#22d3ee" },
  { level: 293, name: "Gear Second", emoji: "💨", color: "#f87171" },
  { level: 294, name: "Gear Fourth", emoji: "🦍", color: "#991b1b" },
  { level: 295, name: "Joy Boy Heir", emoji: "🌞", color: "#ffffff" },
  { level: 296, name: "Logia Intangible", emoji: "🌫️", color: "#e2e8f0" },
  { level: 297, name: "Admiral of the Fleet", emoji: "⚓", color: "#ffffff" },
  { level: 298, name: "Laugh Tale Voyager", emoji: "🗺️", color: "#fbbf24" },
  { level: 299, name: "Pirate King", emoji: "🏴‍☠️", color: "#ef4444" },
  { level: 300, name: "King of the World", emoji: "🌎", color: "#ffffff" },
];

const XP_PER_LEVEL = 45;

// Load saved level or start at 0
let currentLevel = Number(localStorage.getItem("userLevel")) || 0;

// Load saved XP or start at 0
let currentXP = parseInt(localStorage.getItem("userXP")) || 0;

function getContrastYIQ(hexcolor) {
  hexcolor = hexcolor.replace("#", "");
  var r = parseInt(hexcolor.substr(0, 2), 16);
  var g = parseInt(hexcolor.substr(2, 2), 16);
  var b = parseInt(hexcolor.substr(4, 2), 16);
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "black" : "white";
}

function isEggUnlocked(eggId) {
  // Returns true if the ID exists in the array, false otherwise
  return unlockedEggs.includes(eggId);
}

/**
 * 1. RETRO SOUND ENGINE
 */
let audioCtx;

function initAudio() {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  } catch (e) {
    console.error("AudioContext failed to initialize:", e);
  }
}

window.addEventListener("click", initAudio, { once: true });
window.addEventListener("keydown", initAudio, { once: true });

function playSound(type) {
  initAudio();
  if (!audioCtx || audioCtx.state !== "running") return;

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  const now = audioCtx.currentTime;

  if (type === "click") {
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, now);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    osc.start(now);
    osc.stop(now + 0.1);
  } else if (type === "levelUp") {
    osc.type = "square";
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.4);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 1.0);
    osc.start(now);
    osc.stop(now + 1.5);
  } else if (type === "secret") {
    osc.type = "triangle";
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
      const s = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      s.connect(g);
      g.connect(audioCtx.destination);
      s.frequency.setValueAtTime(freq, now + i * 0.3);
      g.gain.setValueAtTime(0.07, now + i * 0.3);
      g.gain.exponentialRampToValueAtTime(0.01, now + i * 0.3 + 0.3);
      s.start(now + i * 0.3);
      s.stop(now + i * 0.3 + 0.3);
    });
  } else if (type === "restore") {
    osc.type = "sine";
    [220, 440, 880, 1760].forEach((freq, i) => {
      const s = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      s.connect(g);
      g.connect(audioCtx.destination);
      s.frequency.setValueAtTime(freq, now + i * 0.05);
      g.gain.setValueAtTime(0.1, now + i * 0.05);
      g.gain.exponentialRampToValueAtTime(0.01, now + i * 0.05 + 0.1);
      s.start(now + i * 0.05);
      s.stop(now + i * 0.05 + 0.1);
    });
  }
}

let unlockedEggs = JSON.parse(localStorage.getItem("unlockedEggs")) || [];
let surpriseClickCount = 0;
let matrixActive = false;
let destructInterval;

function getRank(lvl) {
  const numericLevel = Number(lvl) || 0;

  // IMPORTANT: .slice().reverse() creates a temporary reversed list
  // so we find the HIGHEST level match first.
  const rank = LEVELS.slice()
    .reverse()
    .find((r) => numericLevel >= r.level);

  if (!rank) {
    console.warn("Rank not found, defaulting to Newbie");
    return LEVELS[0];
  }

  return rank;
}

const consoleContainer = document.getElementById("matrix-console-container");
const consoleOutput = document.getElementById("matrix-console-output");

const dragContainer = document.getElementById("matrix-console-container");
const dragHeader = dragContainer.querySelector(".bg-green-500\\/10"); // Selects the header bar

let isDragging = false;
let offsetLeft = 0;
let offsetTop = 0;

dragHeader.addEventListener("mousedown", (e) => {
  // Prevent dragging when clicking the minimize/close buttons
  if (e.target.tagName === "BUTTON") return;

  isDragging = true;

  // Calculate where the mouse is relative to the top-left of the console
  const rect = dragContainer.getBoundingClientRect();
  offsetLeft = e.clientX - rect.left;
  offsetTop = e.clientY - rect.top;

  // Change cursor to indicate moving
  dragHeader.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  // Calculate new position
  let x = e.clientX - offsetLeft;
  let y = e.clientY - offsetTop;

  // Boundary Check (Optional: keeps it inside the screen)
  x = Math.max(0, Math.min(x, window.innerWidth - dragContainer.offsetWidth));
  y = Math.max(0, Math.min(y, window.innerHeight - dragContainer.offsetHeight));

  // Apply position and remove Tailwind's 'bottom' and 'right' so they don't fight the 'top'/'left'
  dragContainer.style.bottom = "auto";
  dragContainer.style.right = "auto";
  dragContainer.style.left = `${x}px`;
  dragContainer.style.top = `${y}px`;
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  dragHeader.style.cursor = "grab";
});

function minimizeConsole() {
  // Toggles the height of the output area
  if (consoleOutput.style.display === "none") {
    consoleOutput.style.display = "block";
    consoleContainer.style.width = "20rem"; // w-80
  } else {
    consoleOutput.style.display = "none";
    consoleContainer.style.width = "150px"; // Compact view
  }
}

function maximizeConsole() {
  // Toggles a full-screen-ish mode
  consoleContainer.classList.toggle("console-maximized");

  // Adjust height when maximized
  if (consoleContainer.classList.contains("console-maximized")) {
    consoleOutput.style.height = "70vh";
    consoleOutput.style.display = "block";
  } else {
    consoleOutput.style.height = "12rem"; // h-48
  }
}

function closeConsole() {
  const container = document.getElementById("matrix-console-container");
  const reopenBtn = document.getElementById("reopen-console-btn");

  // Hide the console
  container.style.opacity = "0";
  container.style.transform = "translateY(20px)";

  setTimeout(() => {
    container.classList.add("hidden");
    // Show the small reopen button
    if (reopenBtn) reopenBtn.classList.remove("hidden");
  }, 300);
}

function reopenConsole() {
  const container = document.getElementById("matrix-console-container");
  const reopenBtn = document.getElementById("reopen-console-btn");

  // Show the console
  container.classList.remove("hidden");

  // Trigger reflow for animation
  void container.offsetWidth;

  container.style.opacity = "1";
  container.style.transform = "translateY(0)";

  // Hide the reopen button
  if (reopenBtn) reopenBtn.classList.add("hidden");
}

let isProcessingXP = false;

// Ensure this is in the GLOBAL scope (not hidden inside another function)
window.createFloatingXP = function (e) {
  // Prevent "spam" firing from high-speed mouse movement
  if (isProcessingXP) return;
  isProcessingXP = true;

  // Release the lock after 50ms
  setTimeout(() => {
    isProcessingXP = false;
  }, 50);

  // 1. Create the XP element
  const popup = document.createElement("div");

  // 2. Styling (Tailwind classes + Inline for positioning)
  popup.className =
    "fixed pointer-events-none z-[999] font-black text-sm tracking-tighter animate-xp-float";
  popup.innerText = "+1 XP";

  // 3. Get current Rank color for the "Pop"
  const rank = getRank(currentLevel);
  popup.style.color = rank.color;

  // 4. Position at mouse (using clientX/Y for fixed positioning)
  popup.style.left = `${e.clientX}px`;
  popup.style.top = `${e.clientY}px`;

  document.body.appendChild(popup);

  // 5. Award XP and update that "Newbie" header
  if (typeof addExperience === "function") {
    addExperience(1);
  }

  // 6. Cleanup
  setTimeout(() => popup.remove(), 800);
};

// Re-attach listeners to your skill tags
function attachSkillListeners() {
  const skillTags = document.querySelectorAll(".skill-tag"); // Use your actual class name
  skillTags.forEach((tag) => {
    // Use 'mouseenter' for a clean single-pop on hover
    tag.addEventListener("mouseenter", createXPPopup);
  });
}

function unlockEgg(eggId) {
  if (!unlockedEggs.includes(eggId)) {
    unlockedEggs.push(eggId);
    localStorage.setItem("unlockedEggs", JSON.stringify(unlockedEggs));
    playSound("levelUp");
    showLevelUpNotification(unlockedEggs.length);
    updateGameUI();
  }
}

function handleLevelClick() {
  triggerSecretUnlock("badge_click");
}

function showLevelUpNotification(input) {
  // Determine if input is a rank object or a level number
  let rank;
  if (typeof input === "object" && input !== null) {
    rank = input;
  } else {
    rank = getRank(input); // Convert number to rank object
  }

  // Safety fallback to prevent the "undefined" crash
  if (!rank) rank = LEVELS[0];

  const notify = document.createElement("div");
  notify.className =
    "fixed top-24 left-1/2 -translate-x-1/2 z-[2000] px-8 py-4 bg-white dark:bg-slate-900 border-4 rounded-full shadow-2xl flex items-center gap-4 animate-bounce";

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
    notify.style.opacity = "0";
    setTimeout(() => notify.remove(), 500);
  }, 4000);
}

/**
 * 4. THEME SYSTEM
 */
function applyTheme(theme) {
  const html = document.documentElement;
  const heart = document.getElementById("footer-heart");
  localStorage.setItem("theme", theme);

  // Reset classes
  html.classList.remove("dark");
  const props = [
    "--bg-page",
    "--bg-card",
    "--bg-footer",
    "--text-main",
    "--text-muted",
    "--border-color",
    "--accent",
    "--accent-light",
  ];
  props.forEach((p) => html.style.removeProperty(p));

  if (theme === "dark") {
    html.classList.add("dark");
    if (heart) heart.innerText = "💜";
  } else if (theme === "random") {
    const h = Math.floor(Math.random() * 360);
    // The "Secret Sauce": A second hue for accents (180 degrees away or +40)
    const accentHue = (h + 160) % 360;

    // Backgrounds (Consistent and Dark)
    html.style.setProperty("--bg-page", `hsl(${h}, 45%, 7%)`);
    html.style.setProperty("--bg-card", `hsl(${h}, 35%, 12%)`);
    html.style.setProperty("--bg-footer", `hsl(${h}, 40%, 5%)`);

    // Typography
    html.style.setProperty("--text-main", `hsl(${h}, 10%, 98%)`); // Crisp White
    html.style.setProperty("--text-muted", `hsl(${h}, 20%, 70%)`); // Readable Muted

    // The Pop Colors (The ones you were missing!)
    html.style.setProperty("--accent", `hsl(${accentHue}, 90%, 65%)`);
    html.style.setProperty("--accent-light", `hsl(${accentHue}, 90%, 40%)`);
    html.style.setProperty("--border-color", `hsl(${h}, 30%, 20%)`);

    if (heart) {
      const symbols = ["💎", "🌈", "✨", "🔥", "🌀", "🧬"];
      heart.innerText = symbols[Math.floor(Math.random() * symbols.length)];
    }
  } else {
    if (heart) heart.innerText = "❤️";
  }

  updateThemeIcon(theme);
}

function toggleTheme() {
  playSound("click");
  const current = localStorage.getItem("theme") || "light";
  const next =
    current === "light" ? "dark" : current === "dark" ? "random" : "light";
  applyTheme(next);

  // Maintenance XP Trigger
  addMaintenanceXP();
}

function updateThemeIcon(theme) {
  const icon = document.getElementById("theme-icon");
  if (icon)
    icon.innerText = theme === "light" ? "🌙" : theme === "dark" ? "🎲" : "☀️";
}

/**
 * 5. EASTER EGG LOGIC & TRIGGERS
 */
function triggerForceSurge() {
  initAudio();
  addExperience(100); // This now handles UI updates, sounds, and bar filling
}

function triggerMagicXP() {
  initAudio();
  addExperience(50);
}

// Visual Effect for Level 101+
function triggerForceEffects(lvl) {
  const badge = document.getElementById("level-badge");
  if (badge) {
    badge.classList.add("force-glow");
    // Remove after 2 seconds unless it's a persistent rank
    setTimeout(() => badge.classList.remove("force-glow"), 2000);
  }
}

function triggerSecretUnlock(type) {
  const eggId = `secret_${type}`;

  // 1. Check if this is a NEW discovery
  const isNewUnlock = !unlockedEggs.includes(eggId);

  // 2. Trigger the Visual Effects (Always trigger these)
  if (type === "gravity") {
    activateGravityEffect();
  } else if (type === "matrix") {
    initMatrix();
  } else if (type === "konami") {
    activateKonami();
  }

  // 3. Only process XP and Save if it's the first time
  if (isNewUnlock) {
    playSound("secret");
    // Update the array and save to localStorage
    unlockedEggs.push(eggId);
    localStorage.setItem("unlockedEggs", JSON.stringify(unlockedEggs));

    // Assign XP based on difficulty
    if (type === "konami") {
      addExperience(500); // Massive bonus for the long code
    } else if (type === "gravity" || type === "matrix") {
      addExperience(45); // 1 full level
    } else if (type === "pulse") {
      addExperience(180); // 4 levels
    } else {
      addExperience(75); // 2 full levels
    }

    console.log(`✨ Secret Unlocked: ${eggId}`);
  } else {
    playSound("click");
    console.log(`Secret ${eggId} already discovered. No extra XP granted.`);
  }
}

/**
 * Initialize the Easter Egg functionality for the talent directory status dot.
 */
function initDotEasterEgg() {
  const dot = document.querySelector(".animate-pulse");

  if (!dot) return; // Exit if the dot isn't found

  dot.style.cursor = "pointer";

  // Define the hover behavior
  dot.onmouseover = function () {
    this.style.backgroundColor = "#fbbf24"; // Change to a "gold" color
    this.classList.remove("animate-pulse");
    this.style.transform = "scale(2.5)";
    this.style.transition = "transform 0.2s ease-in-out";
  };

  dot.onmouseout = function () {
    this.style.backgroundColor = ""; // Reset to original green
    this.style.transform = "scale(1)";
    this.classList.add("animate-pulse");
  };

  // Define the click behavior (The Easter Egg)
  dot.onclick = function () {
    console.log("Easter egg triggered pulse egg active!");
    // Example: Rotate the dot 360 degrees and change the text nearby
    this.animate(
      [{ transform: "rotate(0)" }, { transform: "rotate(360deg)" }],
      { duration: 500 },
    );

    // Bonus: You could trigger a custom event or reveal hidden content here
    // document.body.classList.add("pulse-egg-active");
    triggerSecretUnlock("pulse");
  };
}

// Call the function once the DOM is ready
document.addEventListener("DOMContentLoaded", initDotEasterEgg);

const konamiCode = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
];
let konamiPosition = 0;

window.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

  if (key === "d") {
    e.preventDefault();

    const systemDash = document.getElementById("dev-tools"); // Adjust ID as needed
    const isOpening = systemDash.classList.contains("hidden");

    localStorage.setItem("devToolsVisible", !isOpening);
    playSound(isOpening ? "secret" : "click");

    if (isOpening) {
      document
        .getElementById("matrix-console-container")
        .classList.add("hidden");
      systemDash.classList.remove("hidden");

      // Wait 100-150ms for the animation/display to settle
      setTimeout(() => {
        // Find the first interactive element (button or link)
        const firstControl = systemDash.querySelector("button, a, input");
        if (firstControl) {
          firstControl.focus();
        }
      }, 150);
    } else {
      systemDash.classList.add("hidden");
      document.body.focus(); // Return focus to the page
    }
  }

  if (key === konamiCode[konamiPosition]) {
    konamiPosition++;
    if (konamiPosition === konamiCode.length) {
      triggerSecretUnlock("konami");
      konamiPosition = 0;
    }
  } else {
    konamiPosition = key === "arrowup" ? 1 : 0;
  }
});

function activateKonami() {
  document.documentElement.classList.add("konami-roll");
  setTimeout(
    () => document.documentElement.classList.remove("konami-roll"),
    2000,
  );
}

function activateGravityEffect() {
  document.body.classList.add("glitch-shake");

  setTimeout(() => {
    document.body.classList.remove("glitch-shake");
    const targets = document.querySelectorAll(
      ".user-card, header, footer, main, h1, #game-stats",
    );
    targets.forEach((el) => {
      const dist = window.innerHeight + 1000;
      el.style.transition = `transform ${
        1 + Math.random()
      }s ease-in, opacity 1s`;
      el.style.transform = `translateY(${dist}px) rotate(${
        Math.random() * 60 - 30
      }deg)`;
      el.style.opacity = "0";
      el.style.pointerEvents = "none";
    });

    setTimeout(() => {
      if (!document.getElementById("repair-btn")) {
        const btn = document.createElement("button");
        btn.id = "repair-btn";
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
          playSound("restore");
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
  const overlay = document.getElementById("matrix-overlay");
  const canvas = document.getElementById("matrix-canvas");
  if (!overlay || !canvas) return;

  overlay.classList.remove("hidden");
  overlay.style.display = "block";

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789アァカサタナハマヤャ";
  const fontSize = 16;
  const columns = Math.floor(canvas.width / fontSize);
  const rainDrops = Array.from({ length: columns }).fill(1);

  const render = () => {
    if (!matrixActive) return;
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0F0";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < rainDrops.length; i++) {
      const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
      ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
      if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975)
        rainDrops[i] = 0;
      rainDrops[i]++;
    }
    requestAnimationFrame(render);
  };
  render();
  window.addEventListener("keydown", handleMatrixEsc);
}

function handleMatrixEsc(e) {
  if (e.key === "Escape") closeMatrix();
}

function closeMatrix() {
  matrixActive = false;
  const overlay = document.getElementById("matrix-overlay");
  if (overlay) {
    overlay.classList.add("hidden");
    overlay.style.display = "none";
  }
  window.removeEventListener("keydown", handleMatrixEsc);
}

let hasTriggeredFirstLevel = false; // Prevents the sound from spamming every click

function triggerBadgeLevelUp() {
  const badge = document.getElementById("level-badge");

  // 1. Visual Pop Animation
  if (badge) {
    badge.classList.remove("animate-badge-pop");
    void badge.offsetWidth; // Force reflow to restart animation
    badge.classList.add("animate-badge-pop");
  }

  // 2. Secret Sound & Level Logic
  if (!hasTriggeredFirstLevel) {
    // Play your secret sound
    playSound("secret");

    // Force a level up for the "first time" experience
    addExperience(45); // Assuming 45 XP = 1 Level

    hasTriggeredFirstLevel = true;

    // Push a special "Easter Egg" message to the Matrix Console
    if (typeof matrixConsoleLog === "function") {
      matrixConsoleLog(currentLevel);
    }
  }
}

// Attach to the badge click
document
  .getElementById("level-badge")
  .addEventListener("click", triggerBadgeLevelUp);

/**
 * 7. SELF DESTRUCT ENGINE
 */
window.startSelfDestruct = function () {
  const btn = document.getElementById("self-destruct-btn");
  const devPanel = document.getElementById("dev-tools");

  if (destructInterval) return;

  initAudio();

  // Move to HTML root to ignore scroll position and Body transforms
  document.documentElement.appendChild(devPanel);
  devPanel.setAttribute("data-lock", "true");
  devPanel.classList.remove("hidden");

  btn.classList.add("is-destructing");

  let timeLeft = 10;

  destructInterval = setInterval(() => {
    timeLeft--;

    // Re-locate elements in the new DOM position
    const timerDisplay = document.getElementById("destruct-timer");
    const progressBar = document.getElementById("destruct-bar");
    const statusText = document.getElementById("destruct-text");

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
      osc.connect(g);
      g.connect(audioCtx.destination);
      osc.frequency.setValueAtTime(
        400 + (10 - timeLeft) * 80,
        audioCtx.currentTime,
      );
      g.gain.setValueAtTime(0.1, audioCtx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.1);
    }

    // CRITICAL STATE: 3 Seconds Left
    if (timeLeft <= 3) {
      document.body.classList.add("glitch-shake");
      // Flash the console background red
      devPanel.style.backgroundColor =
        timeLeft % 2 === 0
          ? "rgba(239, 68, 68, 0.9)"
          : "rgba(15, 23, 42, 0.95)";
      devPanel.style.borderColor = "#ffffff";
      if (statusText) statusText.innerText = "OVERHEAT_CRITICAL";
    }

    if (timeLeft <= 0) {
      clearInterval(destructInterval);
      destructInterval = null;
      if (timerDisplay) timerDisplay.innerText = "0s";

      // Clean up and trigger the fall
      devPanel.style.backgroundColor = "rgba(15, 23, 42, 0.95)";
      triggerSecretUnlock("gravity");
    }
  }, 1000);
};

function scrollToRandomUser() {
  playSound("click");

  surpriseClickCount++;
  if (surpriseClickCount >= 5) {
    surpriseClickCount = 0;
    triggerSecretUnlock("matrix");
    return;
  }

  const cards = document.querySelectorAll(".user-card");
  if (cards.length === 0) return;

  // Clean up previous selection
  cards.forEach((c) => {
    c.classList.remove("selected-fancy");
    const oldTrace = c.querySelector(".border-trace");
    if (oldTrace) oldTrace.remove();
  });

  const randomCard = cards[Math.floor(Math.random() * cards.length)];
  randomCard.scrollIntoView({ behavior: "smooth", block: "center" });

  setTimeout(() => {
    playSound("levelUp");
    randomCard.classList.add("selected-fancy");

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
      randomCard.classList.remove("selected-fancy");
      svg.remove();
    }, 7500);
  }, 400);
}

/**
 * UTILITY: SCREENSHOT MODE
 */
window.toggleScreenshotMode = function () {
  const devPanel = document.getElementById("dev-tools");
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");
  const gameStats = document.getElementById("game-stats");

  // Hide everything
  [devPanel, header, footer, gameStats].forEach((el) => {
    if (el) el.style.opacity = "0";
    if (el) el.style.pointerEvents = "none";
  });

  // Show a tiny notification that it's active
  const toast = document.createElement("div");
  toast.style.cssText =
    "position:fixed; bottom:20px; left:50%; transform:translateX(-50%); color:var(--text-muted); font-family:monospace; font-size:10px; z-index:9999;";
  toast.innerText = "SCREENSHOT MODE ACTIVE - RESTORING IN 5S";
  document.body.appendChild(toast);

  setTimeout(() => {
    [devPanel, header, footer, gameStats].forEach((el) => {
      if (el) el.style.opacity = "1";
      if (el) el.style.pointerEvents = "auto";
    });
    toast.remove();
  }, 5000);
};

/**
 * 8. INITIALIZATION
 */
document.addEventListener("DOMContentLoaded", () => {
  const devToolsVisible = localStorage.getItem("devToolsVisible") === "true";
  const devPanel = document.getElementById("dev-tools");
  // Add this to your initialization script
  let skillHoverCount = 0;

  if (devToolsVisible && devPanel) {
    devPanel.classList.remove("hidden");
  }

  applyTheme(localStorage.getItem("theme") || "light");
  updateGameUI();
});

/**
 * 9. ENHANCED XP & SKILL MINING SYSTEM
 */
function renderXP(value) {
  const pb = document.getElementById("level-progress");
  if (!pb) return;

  // 1. Ensure 'value' is a clean number
  const currentXPNum = Number(value) || 0;

  // 2. Calculate percentage (current / 45 * 100)
  const percentage = Math.min((currentXPNum / 45) * 100, 100);

  // 3. Apply to style
  pb.style.width = `${percentage}%`;

  // Debugging: uncomment this to see the math in your console
  // console.log(`XP: ${currentXPNum}, Percent: ${percentage}%`);
}

function showLevelUpToast(rank) {
  // 1. Create the container
  const toast = document.createElement("div");
  toast.className = "level-up-toast";

  // 2. Build the inner content
  // We use the rank color for the name and emoji to make it feel custom
  toast.innerHTML = `
        <div class="toast-content">
            <span class="toast-emoji">${rank.emoji}</span>
            <div class="toast-text">
                <p class="toast-title">LEVEL UP!</p>
                <p class="toast-rank" style="color: ${rank.color}">${rank.name}</p>
            </div>
        </div>
    `;

  document.body.appendChild(toast);

  // 3. Auto-remove after animation
  setTimeout(() => {
    toast.classList.add("fade-out");
    setTimeout(() => toast.remove(), 500);
  }, 2500);
}

function matrixConsoleLog(level) {
  const rank = getRank(level);

  // This looks awesome in the F12 Dev Console
  console.log(
    `%c [SYSTEM] %c LEVEL UP: %c ${rank.name.toUpperCase()} %c [LVL ${level}] `,
    "color: #10b981; font-weight: bold; background: #064e3b; padding: 2px;",
    "color: #ffffff; background: #1e293b; padding: 2px;",
    `color: ${rank.color}; font-weight: 900; background: #1e293b; padding: 2px;`,
    "color: #94a3b8; background: #1e293b; padding: 2px;",
  );

  // 3. If you have an on-screen Matrix Console element, push there too:
  const matrixConsole = document.getElementById("matrix-console-output");
  if (matrixConsole) {
    const line = document.createElement("p");
    line.className = "matrix-line text-xs font-mono mb-1";
    line.innerHTML = `<span class="text-green-500">>></span> Rank Updated: <span style="color: ${rank.color}">${rank.name}</span>`;
    matrixConsole.appendChild(line);
    // Auto-scroll to bottom
    matrixConsole.scrollTop = matrixConsole.scrollHeight;
  }
}

document.addEventListener("keydown", (e) => {
  // Check if user pressed 'L' (for Log) and isn't typing in an input field
  if (
    e.key.toLowerCase() === "l" &&
    e.target.tagName !== "INPUT" &&
    e.target.tagName !== "TEXTAREA"
  ) {
    const container = document.getElementById("matrix-console-container");
    if (container.classList.contains("hidden")) {
      reopenConsole();
    } else {
      closeConsole();
    }
  }
});

async function addExperience(amount) {
  // 1. Force strict numeric types to prevent "1" + "1" = "11"
  let xpToAdd = Number(amount) || 0;
  currentXP = Number(currentXP) || 0;
  currentLevel = Number(currentLevel) || 0;
  const XP_THRESHOLD = 45;

  // 2. Add the new XP
  currentXP += xpToAdd;

  // 3. Process Level Ups one by one
  // Using a while loop ensures that if you gain 100 XP,
  // it processes Level 1, then Level 2, with the remainder left over.
  while (currentXP >= XP_THRESHOLD && currentLevel < 200) {
    currentXP -= XP_THRESHOLD;
    currentLevel++;
    // 1. Trigger the Visual Toast (Top of screen)
    if (typeof showLevelUpToast === "function") {
      showLevelUpToast(getRank(currentLevel));
    }

    // 2. Trigger the "Matrix" Console Log
    matrixConsoleLog(currentLevel);

    // --- THE POPUP TRIGGER ---
    const badge = document.getElementById("level-badge");
    if (badge) {
      // Remove the class if it exists (to reset animation)
      badge.classList.remove("animate-badge-pop");
      // Trigger a "reflow" (magic trick to allow re-animation)
      void badge.offsetWidth;
      // Re-add the class
      badge.classList.add("animate-badge-pop");
    }
    // --------------------------

    console.log(`Leveled Up to ${currentLevel}!`);
  }

  // 4. Persistence: Save clean numbers
  localStorage.setItem("userLevel", currentLevel.toString());
  localStorage.setItem("userXP", currentXP.toString());

  // 5. Update UI
  updateGameUI();
}

function updateGameUI() {
  const lvl = Number(currentLevel) || 0;
  const rank = getRank(lvl);

  // Update the Name and its Color
  const nameLabel = document.getElementById("level-name");
  if (nameLabel) {
    nameLabel.innerText = rank.name;
    nameLabel.style.color = rank.color; // This applies the array color
  }

  // Update the Badge Background
  const badge = document.getElementById("level-badge");
  if (badge) {
    badge.innerText = rank.emoji;
    badge.style.backgroundColor = rank.color;
  }

  // Update the Number and XP
  if (document.getElementById("level-number")) {
    document.getElementById("level-number").innerText = lvl;
  }

  if (document.getElementById("total-xp-display")) {
    document.getElementById("total-xp-display").innerText =
      `${currentXP} / ${XP_PER_LEVEL}`;
  }

  renderXP(currentXP);
}

function initSkillMining() {
  // Select all your skill badges/tags
  const skillTags = document.querySelectorAll(".skill-tag, .experience-badge");

  skillTags.forEach((tag) => {
    // Remove old listeners to prevent double-firing
    tag.removeEventListener("mouseenter", createFloatingXP);
    tag.addEventListener("mouseenter", createFloatingXP);
  });
}

// Run this on page load
document.addEventListener("DOMContentLoaded", initSkillMining);

function initSkillXP() {
  const skills = document.querySelectorAll(".skill-item");
  skills.forEach((skill) => {
    skill.addEventListener("mouseenter", (e) => {
      const isLocked = document
        .getElementById("dev-tools")
        ?.hasAttribute("data-lock");
      if (!isLocked) {
        addExperience(1);
        createFloatingXP(e);

        // Fancy scale-up on hover
        skill.style.transform = "scale(1.1) translateY(-2px)";
        skill.style.transition =
          "transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
      }
    });

    skill.addEventListener("mouseleave", () => {
      skill.style.transform = "scale(1) translateY(0)";
    });
  });
}

// Re-initialize skills after Surprise scroll or any DOM changes
window.addEventListener("DOMContentLoaded", initSkillXP);

/**
 * SYS ADMIN XP (Level 6 Mechanic)
 */
function addMaintenanceXP() {
  // Sys Admins get more XP for system-level interactions
  const bonus = unlockedEggs.length >= 6 ? 5 : 2;
  addExperience(bonus);

  // Console log for that "hacker" feel
  if (unlockedEggs.length >= 6) {
    console.log(
      "%c [SYS_ADMIN] System optimized: +5 XP",
      "color: #ec4899; font-weight: bold;",
    );
  }
}

function jumpToLevel() {
  const input = document.getElementById("jump-lvl");
  if (!input || input.value === "") return;

  let targetLvl = parseInt(input.value);

  // Clamp between 0 and 200
  targetLvl = Math.max(0, Math.min(200, targetLvl));

  // Update the GLOBAL variables
  currentLevel = targetLvl;
  currentXP = 0;

  // Save to LocalStorage
  localStorage.setItem("userLevel", currentLevel);
  localStorage.setItem("userXP", currentXP);

  // Refresh everything
  updateGameUI();

  const rank = getRank(currentLevel);
  showLevelUpNotification(rank);

  if (currentLevel >= 101) {
    triggerForceSurge();
  }
}
