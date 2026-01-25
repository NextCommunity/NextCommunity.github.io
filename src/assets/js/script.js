// THEME TOGGLE LOGIC
function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// RANDOM USER SCROLL LOGIC
function scrollToRandomUser() {
    const cards = document.querySelectorAll('.user-card');
    if (cards.length === 0) return;

    // Clear previous highlights
    cards.forEach(card => card.classList.remove('highlight-pulse'));

    // Pick random
    const randomIndex = Math.floor(Math.random() * cards.length);
    const selectedCard = cards[randomIndex];

    // Scroll with offset for sticky header
    selectedCard.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });

    // Visual feedback
    selectedCard.classList.add('highlight-pulse');

    // Remove highlight after 3.5 seconds
    setTimeout(() => {
        selectedCard.classList.remove('highlight-pulse');
    }, 3500);
}
