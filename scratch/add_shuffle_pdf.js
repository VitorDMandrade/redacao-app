const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');

const shufflePdfLogic = `
// ==========================================
// SHUFFLE & PDF EXPORT
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Botão Embaralhar
    const btnShuffle = document.getElementById('btn-shuffle-reps');
    if (btnShuffle) {
        btnShuffle.addEventListener('click', () => {
            if (typeof mostrarEixo === 'function' && typeof state !== 'undefined') {
                // Modifica a função renderRepertorios para poder embaralhar
                // Como não podemos reescrever tudo aqui, vamos apenas adicionar uma flag no state temporariamente
                state.shuffleNext = true;
                if (state.currentEixoId) {
                    mostrarEixo(state.currentEixoId);
                } else {
                    mostrarEixo(EIXOS_MESTRES[0].id);
                }
            }
        });
    }

    // 2. Botão Exportar PDF
    const btnExportPdf = document.getElementById('btn-export-pdf');
    if (btnExportPdf) {
        btnExportPdf.addEventListener('click', () => {
            // Cria uma janela de impressão
            const favs = JSON.parse(localStorage.getItem('redacao_favorites') || '[]');
            if (favs.length === 0) {
                alert('Você não tem nenhum repertório favorito salvo para exportar!');
                return;
            }

            let htmlContent = \`
                <html>
                <head>
                    <title>Meus Repertórios - PDF de Revisão</title>
                    <style>
                        body { font-family: 'Arial', sans-serif; color: #333; line-height: 1.6; padding: 20px; }
                        h1 { text-align: center; color: #4f46e5; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; }
                        .rep-card { border: 1px solid #ccc; border-radius: 8px; padding: 15px; margin-bottom: 15px; page-break-inside: avoid; }
                        .rep-title { font-size: 1.2em; font-weight: bold; color: #1e293b; margin-top: 0; }
                        .rep-author { color: #64748b; font-style: italic; margin-bottom: 10px; }
                        .rep-desc { margin-bottom: 10px; }
                        .rep-tags { font-size: 0.85em; color: #fff; background: #4f46e5; padding: 3px 8px; border-radius: 12px; display: inline-block; margin-right: 5px; margin-bottom: 5px;}
                    </style>
                </head>
                <body>
                    <h1>Revisão Rápida: Meus Repertórios</h1>
            \`;

            favs.forEach(id => {
                let repInfo = null;
                // Procura em COMPLETOS e MAPEADOS
                if (typeof REPERTORIOS_COMPLETOS !== 'undefined') {
                    repInfo = REPERTORIOS_COMPLETOS.find(r => r.id === id);
                }
                if (!repInfo && typeof REPERTORIOS_MAPEADOS !== 'undefined') {
                    for(let eixo in REPERTORIOS_MAPEADOS) {
                        const found = REPERTORIOS_MAPEADOS[eixo].find(r => r.id === id);
                        if(found) { repInfo = found; break; }
                    }
                }

                if (repInfo) {
                    htmlContent += \`
                        <div class="rep-card">
                            <h3 class="rep-title">\${repInfo.obra || repInfo.id}</h3>
                            <div class="rep-author">\${repInfo.autor || ''}</div>
                            <div class="rep-desc">\${repInfo.descricao || ''}</div>
                            <div>
                                \${(repInfo.tags || []).map(t => \`<span class="rep-tags">\${t}</span>\`).join('')}
                            </div>
                        </div>
                    \`;
                }
            });

            htmlContent += \`
                <script>
                    window.onload = function() {
                        window.print();
                    }
                </script>
                </body>
                </html>
            \`;

            const printWindow = window.open('', '_blank');
            printWindow.document.write(htmlContent);
            printWindow.document.close();
        });
    }
});
`;

code = code + '\n' + shufflePdfLogic;
fs.writeFileSync('script.js', code, 'utf8');
console.log('Added shuffle and PDF logic to script.js');
