const fs = require('fs');
const path = require('path');

const indexFile = path.join(__dirname, 'index.html');

console.log('🔍 Iniciando auditoria do projeto Simulador de Redação...\n');

const htmlContent = fs.readFileSync(indexFile, 'utf8');

// IDs críticos confirmados no index.html
const idsObrigatorios = [
    // Header e Tabs
    'banca-select',
    'btn-mode-full', 'btn-mode-training', 'btn-mode-repertory', 'btn-mode-grammar', 'btn-mode-model',
    'write-view', 'training-view', 'repertory-view', 'grammar-view', 'model-view',
    
    // Aba Redação Principal
    'essay', 'theme', 'essay-title', 'resumo-pratico-container', 'resumo-pratico-text',
    'btn-start-simulado', 'clear-btn', 
    
    // Construtor Livre
    'free-builder-area', 'btn-add-text-piece',
    
    // Dicionário de Conectivos
    'connectives-widget'
];

let falhas = 0;

idsObrigatorios.forEach(id => {
    // Busca id exato
    const regex = new RegExp(`id=["']${id}["']`, 'i');
    if (!regex.test(htmlContent)) {
        console.error(`❌ ERRO CRÍTICO: ID '${id}' não encontrado em index.html!`);
        falhas++;
    } else {
        console.log(`✅ ID '${id}' encontrado.`);
    }
});

// Checagem de IDs duplicados no index.html
const allIds = [...htmlContent.matchAll(/\bid\s*=\s*["']([^"']+)["']/gi)].map(m => m[1]);
const idCounts = {};
allIds.forEach(id => {
    idCounts[id] = (idCounts[id] || 0) + 1;
});
const duplicateIds = Object.entries(idCounts).filter(([, count]) => count > 1);
if (duplicateIds.length > 0) {
    duplicateIds.forEach(([id, count]) => {
        console.error(`❌ ERRO CRÍTICO: ID duplicado '${id}' aparece ${count}x em index.html!`);
        falhas++;
    });
} else {
    console.log(`✅ Nenhum ID duplicado entre ${allIds.length} IDs de index.html.`);
}

console.log('\n=======================================');
if (falhas === 0) {
    console.log('🎉 Auditoria aprovada! A estrutura do index.html parece íntegra.');
    process.exit(0);
} else {
    console.error(`⚠️ Auditoria falhou com ${falhas} erros. Corrija o index.html antes de prosseguir.`);
    process.exit(1);
}
