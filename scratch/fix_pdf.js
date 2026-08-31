const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');

code = code.replace("localStorage.getItem('redacao_favorites')", "localStorage.getItem('redacao_favorite_repertories')");
code = code.replace(/r\.id === id/g, "r.obra === id");

fs.writeFileSync('script.js', code, 'utf8');
console.log('Fixed PDF logic');
