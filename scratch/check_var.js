const fs = require('fs');
let code = fs.readFileSync('repertories.js', 'utf8');
code = code.replace(/const /g, 'var '); // Make them var so they attach to global or eval scope
try {
    eval(code);
    console.log("Is Array?", Array.isArray(REPERTORIOS_MAPEADOS));
    if (Array.isArray(REPERTORIOS_MAPEADOS)) {
        console.log("Length:", REPERTORIOS_MAPEADOS.length);
        console.log("Keys of [0]:", Object.keys(REPERTORIOS_MAPEADOS[0]));
    } else {
        console.log("Keys:", Object.keys(REPERTORIOS_MAPEADOS));
    }
} catch(e) {
    console.error(e);
}
