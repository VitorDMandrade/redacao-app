const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');

const darkModeLogic = `
// ==========================================
// DARK MODE
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    
    // Check saved preference
    const savedTheme = localStorage.getItem('redacao_theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if(sunIcon && moonIcon) {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            localStorage.setItem('redacao_theme', isDark ? 'dark' : 'light');
            
            if (isDark) {
                sunIcon.style.display = 'block';
                moonIcon.style.display = 'none';
            } else {
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'block';
            }
        });
    }
});
`;

code = code + '\n' + darkModeLogic;
fs.writeFileSync('script.js', code, 'utf8');
console.log('Added dark mode logic to script.js');
