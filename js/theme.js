// Move the initialization logic outside DOMContentLoaded
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    const icon = document.querySelector('#themeToggle i');
    if (icon) {
        // In light mode, show moon (to switch to dark)
        // In dark mode, show sun (to switch to light)
        icon.className = savedTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    const icon = document.querySelector('#themeToggle i');
    if (icon) {
        // When switching to dark mode, show sun
        // When switching to light mode, show moon
        icon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// Initialize theme immediately
initializeTheme();

// Add click handler after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}); 