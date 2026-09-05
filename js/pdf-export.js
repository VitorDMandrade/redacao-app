// @ts-check

/**
 * Inicializa o botão de exportação e dispara o motor de impressão vetorial nativo.
 */
export function initPdfExport() {
  const actionsContainer = document.querySelector('#result-view .paper-header .actions');
  if (!actionsContainer) return;

  if (document.getElementById('btn-export-pdf')) return;

  const btnExport = document.createElement('button');
  btnExport.id = 'btn-export-pdf';
  btnExport.type = 'button';
  btnExport.className = 'btn btn-secondary';
  btnExport.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 6px;">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
    Exportar Relatório PDF
  `;

  btnExport.addEventListener('click', () => {
    // Disparo direto da API nativa do navegador
    window.print();
  });

  actionsContainer.appendChild(btnExport);
}

// Auto-inicialização caso o DOM já esteja pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPdfExport);
} else {
  initPdfExport();
}
