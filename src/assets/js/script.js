const XP_PER_LEVEL = 45;
const NUM_LEVELS = LEVELS.length;
// Load saved level or start at 0
let currentLevel = Number(localStorage.getItem("userLevel")) || 0;

// Load saved XP or start at 0
let currentXP = parseInt(localStorage.getItem("userXP")) || 0;

let isSurging = false;

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
  if (isSurging) return; // Prevent overlapping surges

  isSurging = true;
  initAudio();
  addExperience(1000);

  // Reset after the animation duration (e.g., 1 second)
  setTimeout(() => {
    isSurging = false;
  }, 10000);
}

function triggerMagicXP() {
  initAudio();
  addExperience(50);
}

// Visual Effect for Level 101+
function triggerForceEffects() {
  const badge = document.getElementById("level-badge");
  if (badge) {
    badge.classList.add("force-glow");
    // Remove after 2 seconds unless it's a persistent rank
    setTimeout(() => badge.classList.remove("force-glow"), 5000);
    console.log("Trigger Force Effects");
  } else {
    console.log("Badge not found");
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
  while (currentXP >= XP_THRESHOLD && currentLevel < NUM_LEVELS) {
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

function updateInventoryCounts(lvl) {
  // Initialize counts
  const counts = {
    common: 0,
    uncommon: 0,
    rare: 0,
    epic: 0,
    legendary: 0,
    mythic: 0,
    absolute: 0,
  };

  // Loop through LEVELS array up to current unlocked level
  // We use i <= lvl because currentLevel is the index reached
  for (let i = 0; i <= lvl; i++) {
    const levelEntry = LEVELS[i];
    if (levelEntry && levelEntry.rarity) {
      const r = levelEntry.rarity.toLowerCase();
      if (counts.hasOwnProperty(r)) {
        counts[r]++;
      }
    }
  }

  // Inject counts into the Tooltip DOM
  const elements = {
    "count-common": counts.common,
    "count-uncommon": counts.uncommon,
    "count-rare": counts.rare,
    "count-epic": counts.epic,
    "count-legendary": counts.legendary,
    "count-mythic": counts.mythic,
    "count-absolute": counts.absolute,
  };

  for (const [id, val] of Object.entries(elements)) {
    const el = document.getElementById(id);
    if (el) el.innerText = val;
  }
}

function updateLevelUI(levelData) {
  // ... your existing code to update level-name and level-number ...

  const tooltipDesc = document.getElementById("tooltip-desc");
  const tooltipRarity = document.getElementById("tooltip-rarity");
  const tooltipCard = document.getElementById("level-tooltip");

  // Update Text
  tooltipDesc.innerText = levelData.description;
  tooltipRarity.innerText = levelData.rarity;

  // Optional: Dynamic Color based on rarity
  const rarityColors = {
    common: "var(--rarity-common)",
    uncommon: "var(--rarity-uncommon)",
    rare: "var(--rarity-rare)",
    epic: "var(--rarity-epic)",
    legendary: "var(--rarity-legendary)",
    mythic: "var(--rarity-mythic)",
    absolute: "var(--rarity-absolute)",
  };

  const color = rarityColors[levelData.rarity] || "var(--accent)";
  tooltipRarity.style.backgroundColor = `${color}20`; // 20 is hex alpha for transparency
  tooltipRarity.style.color = color;
  tooltipCard.style.borderColor = `${color}40`; // Subtle border glow
}

function updateGameUI() {
  const lvl = Number(currentLevel) || 0;
  const rank = getRank(lvl);

  // 1. Update the Description Tooltip
  updateLevelUI(rank);

  // 2. Calculate and Update the Inventory Tooltip
  updateInventoryCounts(lvl);

  // Update the Name and its Color
  const nameLabel = document.getElementById("level-name");
  if (nameLabel) {
    nameLabel.innerText = rank.name;
    nameLabel.style.color = rank.color;
  }

  // Update the Badge
  const badge = document.getElementById("level-badge");
  if (badge) {
    badge.innerText = rank.emoji;
    badge.style.backgroundColor = rank.color;
    // Set contrast text color for the emoji/background
    badge.style.color = getContrastYIQ(rank.color);
  }

  if (document.getElementById("level-number")) {
    document.getElementById("level-number").innerText = lvl.toString();
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

/**
 * Tracks profile views via localStorage and updates the header.
 * Displays current view count and the associated level from the LEVELS array.
 */
function initProfileTracker() {
  // 1. Target the specific span class from your template
  const headerSpan = document.querySelector(".header-gtd");
  if (!headerSpan) return;

  // 2. Create the counter element
  // Using a wrapper to ensure it sits nicely under the span
  const statsContainer = document.createElement("div");
  statsContainer.id = "profile-stats-display";
  statsContainer.style.cssText =
    "font-size: 0.7rem; font-weight: normal; margin-top: 2px; opacity: 0.8; display: block;";

  // Append it right after the span or inside the parent container
  headerSpan.parentElement.appendChild(statsContainer);

  // 3. UI Update Logic
  const refreshStats = () => {
    const count = parseInt(localStorage.getItem("profile_view_count") || 0);
    statsContainer.innerHTML = `
            <span style="letter-spacing: 1px;">VIEWS: ${count}</span>
        `;
  };

  // Initial render
  refreshStats();

  // 4. Listen for clicks on any "Profile" links
  document.addEventListener("click", (e) => {
    const targetLink = e.target.closest("a");

    // Only increment if the link text contains "Profile"
    if (targetLink && targetLink.textContent.includes("Profile")) {
      let currentCount = parseInt(
        localStorage.getItem("profile_view_count") || 0,
      );
      localStorage.setItem("profile_view_count", currentCount + 1);
      refreshStats();
    }
  });
}

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

  // Clamp between 0 and NUM_LEVELS
  targetLvl = Math.max(0, Math.min(NUM_LEVELS, targetLvl));

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
}

function handleFooterDotClick() {
  // 1. Get the current list of unlocked eggs
  const rawEggs = localStorage.getItem("unlockedEggs") || "[]";
  const unlockedEggs = JSON.parse(rawEggs);

  // 2. Exit if already unlocked
  if (unlockedEggs.includes("footer_surge")) return;

  let clicks = parseInt(localStorage.getItem("footerDotClicks")) || 0;
  clicks++;

  const core = document.getElementById("footer-dot-core");
  const ping = document.getElementById("footer-dot-ping");

  if (clicks >= 10) {
    // Trigger the main function
    triggerForceSurge();

    // 3. Update the global unlockedEggs array
    unlockedEggs.push("footer_surge");
    localStorage.setItem("unlockedEggs", JSON.stringify(unlockedEggs));

    // Cleanup temporary click counter
    localStorage.removeItem("footerDotClicks");

    finalizeFooterDot(core, ping);
  } else {
    updateFooterDotVisuals(clicks, core, ping);
    localStorage.setItem("footerDotClicks", clicks);
  }
}

function updateFooterDotVisuals(count, core, ping) {
  if (count >= 4 && count < 8) {
    core.classList.replace("bg-green-500", "bg-yellow-500");
    ping.classList.replace("bg-green-400", "bg-yellow-400");
  } else if (count >= 8) {
    core.classList.replace("bg-yellow-500", "bg-red-500");
    ping.classList.replace("bg-yellow-400", "bg-red-400");
  }
}

function finalizeFooterDot(core, ping) {
  // Switch to a "spent" state (Indigo)
  core.classList.remove("bg-red-500", "bg-green-500", "bg-yellow-500");
  core.classList.add("bg-indigo-500");
  ping.classList.add("hidden");
  document.getElementById("footer-surge-button").style.cursor = "default";
}

// Re-initialize skills after Surprise scroll or any DOM changes
window.addEventListener("DOMContentLoaded", () => {
  initSkillXP();

  const unlockedEggs = JSON.parse(localStorage.getItem("unlockedEggs") || "[]");
  if (unlockedEggs.includes("footer_surge")) {
    finalizeFooterDot(
      document.getElementById("footer-dot-core"),
      document.getElementById("footer-dot-ping"),
    );
  }
});

/**
 * INITIALIZATION
 */
document.addEventListener("DOMContentLoaded", () => {
  const devToolsVisible = localStorage.getItem("devToolsVisible") === "true";
  const devPanel = document.getElementById("dev-tools");
  // Add this to your initialization script
  let skillHoverCount = 0;

  if (devToolsVisible && devPanel) {
    devPanel.classList.remove("hidden");
  }

  const container = document.getElementById("matrix-console-container");
  const reopenBtn = document.getElementById("reopen-console-btn");

  // Force closed state on load
  if (container) {
    container.classList.add("hidden");
    container.style.opacity = "0";
    container.style.transform = "translateY(20px)";
  }

  if (reopenBtn) {
    reopenBtn.classList.remove("hidden");
  }

  initDotEasterEgg();
  initSkillMining();
  // Initialize the profile counter
  initProfileTracker();

  applyTheme(localStorage.getItem("theme") || "light");
  updateGameUI();
});
