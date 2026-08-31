const fs = require('fs');
let content = fs.readFileSync('script.js', 'utf8');

const regex = /const fullPrompt = `INSTRUÇÃO CRÍTICA FINAL/g;
if (regex.test(content)) {
    content = content.replace(regex, "const fullPrompt = `${typeof SYSTEM_PROMPT !== 'undefined' ? SYSTEM_PROMPT : ''}\\n\\nINSTRUÇÃO CRÍTICA FINAL");
    fs.writeFileSync('script.js', content, 'utf8');
    console.log('Fixed Tutor');
} else {
    console.log('Not found');
}
