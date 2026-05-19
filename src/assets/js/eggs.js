/**
 * eggs.js — Easter Egg Trigger Layer.
 *
 * This file is intentionally thin. All game logic lives in the dedicated
 * modules under src/assets/js/games/.
 *
 * Trigger: 5 clicks on the footer ❤️ → SpaceInvaders.launch()
 */

(() => {
  let heartClickCount = 0;
  let phaserStarted = false;

  const heart = document.getElementById("footer-heart");
  if (!heart) return;

  heart.style.cursor = "pointer";
  heart.style.display = "inline-block";

  heart.addEventListener("click", () => {
    if (phaserStarted) return;

    heartClickCount++;

    if (heartClickCount === 5) {
      phaserStarted = true;
      heart.innerHTML = "🎮";
      SpaceInvaders.launch();
    }
  });
})();
