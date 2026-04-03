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

    // Visual feedback: heart grows with each click
    const scaleAmount = 1 + heartClickCount * 0.3;
    heart.style.transition =
      "transform 0.1s cubic-bezier(0.17, 0.67, 0.83, 0.67)";
    heart.style.transform = "scale(" + scaleAmount + ")";

    if (heartClickCount === 5) {
      phaserStarted = true;
      heart.innerHTML = "🎮";
      heart.style.transform = "scale(1.5)";

      setTimeout(() => {
        heart.style.opacity = "0";
        SpaceInvaders.launch();
      }, 300);
    }
  });
})();
