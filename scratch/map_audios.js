const fs = require('fs');
let code = fs.readFileSync('repertories.js', 'utf8');

const m = {
    'Estrelas Além do Tempo': 'arquivos de audio para repertório/Estrelas alem do tempo.m4a',
    'O Dilema das Redes': 'arquivos de audio para repertório/O dilema das redes.m4a',
    'O Menino que Descobriu o Vento': 'arquivos de audio para repertório/O menino que descobriu o vento.m4a',
    'Sociedade dos Poetas Mortos': 'arquivos de audio para repertório/Sociedade dos poétas mortos.m4a',
    'Tempos Modernos': 'arquivos de audio para repertório/Tempos modernos.m4a'
};

for (const [obra, path] of Object.entries(m)) {
    const r = new RegExp('(\\"obra\\":\\s*\\"' + obra + '\\",[\\s\\S]*?\\"frase\\":\\s*\\"[^\\"]*\\",)(\\s*\\"tipo\\":)', 'i');
    if (!code.includes(path)) {
        code = code.replace(r, '$1\n        "audio": "' + path + '",$2');
    }
}

fs.writeFileSync('repertories.js', code);
console.log('Audios mapped!');
