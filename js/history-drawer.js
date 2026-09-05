// @ts-check

/**
 * @fileoverview Componente de Gaveta Lateral de Histórico de Redações (ADR-14)
 * Padrão Estrangulador: Injeta sua própria UI e estilos sem poluir o monólito.
 */
import { getCorrectionHistory, getLatestDraft, exportFullDatabaseBackup, importFullDatabaseBackup, deleteCorrection, deleteDraft } from './database.js';
const DRAWER_HTML = `
  <div id="history-drawer-overlay" class="history-drawer-overlay"></div>
  <aside id="history-drawer" class="history-drawer" aria-hidden="true">
    <div class="history-drawer-header">
      <h2>Histórico de Redações</h2>
      <button id="close-history-drawer" aria-label="Fechar histórico">&times;</button>
    </div>
    
    <div class="history-tabs">
      <button class="history-tab active" data-tab="correcoes">Correções Salvas</button>
      <button class="history-tab" data-tab="rascunhos">Rascunhos</button>
    </div>

    <div class="history-content-area">
      <div id="history-tab-correcoes" class="history-tab-content active">
        <div class="history-list" id="correcoes-list">
          <div class="history-empty">Carregando correções...</div>
        </div>
      </div>
      <div id="history-tab-rascunhos" class="history-tab-content">
        <div class="history-list" id="rascunhos-list">
          <div class="history-empty">Nenhum rascunho encontrado.</div>
        </div>
      </div>
    </div>
    
    <div class="history-drawer-footer" style="padding: 1rem; border-top: 1px solid var(--panel-border, #333); display: flex; gap: 0.5rem; justify-content: center;">
      <button id="btn-backup-download" class="btn btn-secondary btn-sm" style="flex: 1;">Baixar Backup (.json)</button>
      <button id="btn-backup-restore" class="btn btn-secondary btn-sm" style="flex: 1;">Restaurar Dados</button>
      <input type="file" id="backup-file-input" accept=".json" style="display: none;" />
    </div>
  </aside>
`;

const DRAWER_CSS = `
  .history-drawer-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.5);
    backdrop-filter: blur(4px);
    z-index: 9998;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease;
  }
  .history-drawer-overlay.active {
    opacity: 1;
    visibility: visible;
  }
  .history-drawer {
    position: fixed;
    top: 0; right: -400px;
    width: 400px; max-width: 90vw;
    height: 100vh;
    background: var(--bg-color, #09090b);
    border-left: 1px solid var(--panel-border, #333);
    z-index: 9999;
    box-shadow: -5px 0 15px rgba(0,0,0,0.5);
    display: flex;
    flex-direction: column;
    transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    color: var(--text-color, #f8fafc);
  }
  .history-drawer.open {
    right: 0;
  }
  .history-drawer-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid var(--panel-border, #333);
  }
  .history-drawer-header h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
  }
  #close-history-drawer {
    background: transparent;
    border: none;
    color: var(--text-muted, #9ca3af);
    font-size: 1.5rem;
    cursor: pointer;
    transition: color 0.2s;
  }
  #close-history-drawer:hover {
    color: var(--text-color, #fff);
  }
  .history-tabs {
    display: flex;
    border-bottom: 1px solid var(--panel-border, #333);
  }
  .history-tab {
    flex: 1;
    background: transparent;
    border: none;
    padding: 1rem;
    color: var(--text-muted, #9ca3af);
    font-weight: 500;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: all 0.2s;
  }
  .history-tab.active {
    color: var(--accent-color, #60a5fa);
    border-bottom-color: var(--accent-color, #60a5fa);
    background: rgba(255,255,255,0.02);
  }
  .history-content-area {
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem;
  }
  .history-tab-content {
    display: none;
  }
  .history-tab-content.active {
    display: block;
  }
  .history-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid var(--panel-border, #333);
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
    transition: border-color 0.2s;
  }
  .history-card:hover {
    border-color: var(--accent-color, #60a5fa);
  }
  .history-card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.5rem;
  }
  .history-card-date {
    font-size: 0.85rem;
    color: var(--text-muted, #9ca3af);
  }
  .history-card-badge {
    background: var(--accent-color, #60a5fa);
    color: #fff;
    font-size: 0.75rem;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-weight: 600;
  }
  .history-card-theme {
    font-weight: 500;
    margin: 0.5rem 0;
    font-size: 0.95rem;
    line-height: 1.4;
  }
  .history-card-score {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--accent-color, #60a5fa);
    margin-bottom: 1rem;
  }
  .history-empty {
    text-align: center;
    color: var(--text-muted, #9ca3af);
    padding: 2rem 0;
  }
`;

function injectDrawerStyles() {
    if (document.getElementById('history-drawer-styles')) return;
    const style = document.createElement('style');
    style.id = 'history-drawer-styles';
    style.textContent = DRAWER_CSS;
    document.head.appendChild(style);
}

function injectDrawerDOM() {
    if (document.getElementById('history-drawer')) return;
    document.body.insertAdjacentHTML('beforeend', DRAWER_HTML);
}

function formatDate(isoString) {
    if (!isoString) return 'Data desconhecida';
    const d = new Date(isoString);
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute:'2-digit' });
}

function calculateScore(notas) {
    if (!notas) return 0;
    return Object.values(notas).reduce((acc, curr) => acc + (Number(curr) || 0), 0);
}

async function renderCorrecoes() {
    const list = document.getElementById('correcoes-list');
    if (!list) return;

    try {
        const historico = await getCorrectionHistory(20);
        if (!historico || historico.length === 0) {
            list.innerHTML = '<div class="history-empty">Nenhuma correção salva ainda.</div>';
            return;
        }

        list.innerHTML = historico.map(item => `
            <div class="history-card">
                <div class="history-card-header">
                    <span class="history-card-date">${formatDate(item.timestamp)}</span>
                    <span class="history-card-badge">${item.banca || 'ENEM'}</span>
                </div>
                <div class="history-card-theme">${item.tema || 'Tema Livre'}</div>
                <div class="history-card-score">Nota: ${calculateScore(item.dados?.notas)}</div>
                <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
                    <button class="btn btn-secondary btn-sm btn-load-history" data-payload="${encodeURIComponent(JSON.stringify(item))}" style="flex: 1;">Visualizar</button>
                    <button class="btn btn-sm btn-delete-history" data-id="${item.id}" style="background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid #ef4444; border-radius: 4px; cursor: pointer;" title="Apagar Correção">🗑️</button>
                </div>
            </div>
        `).join('');

        // Bind clicks for visualize
        list.querySelectorAll('.btn-load-history').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const btnEl = /** @type {HTMLElement} */ (e.currentTarget);
                const payloadStr = btnEl.getAttribute('data-payload');
                if (payloadStr) {
                    const item = JSON.parse(decodeURIComponent(payloadStr));
                    loadCorrectionIntoView(item);
                }
            });
        });

        // Bind clicks for delete
        list.querySelectorAll('.btn-delete-history').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                if (!confirm('Tem certeza que deseja apagar esta correção do histórico?')) return;
                const btnEl = /** @type {HTMLElement} */ (e.currentTarget);
                const id = Number(btnEl.getAttribute('data-id'));
                if (id) {
                    try {
                        await deleteCorrection(id);
                        await renderCorrecoes(); // Re-render list
                    } catch (err) {
                        console.error('[History] Erro ao apagar correção:', err);
                        alert('Erro ao apagar correção.');
                    }
                }
            });
        });

    } catch (err) {
        console.error('[History] Erro ao carregar correções:', err);
        list.innerHTML = '<div class="history-empty">Erro ao carregar histórico.</div>';
    }
}

async function renderRascunhos() {
    const list = document.getElementById('rascunhos-list');
    if (!list) return;

    try {
        const draft = await getLatestDraft();
        if (!draft) {
            list.innerHTML = '<div class="history-empty">Nenhum rascunho em andamento.</div>';
            return;
        }

        list.innerHTML = `
            <div class="history-card">
                <div class="history-card-header">
                    <span class="history-card-date">${formatDate(draft.timestamp)}</span>
                    <span class="history-card-badge">${draft.banca || 'ENEM'}</span>
                </div>
                <div class="history-card-theme">${draft.tema || 'Rascunho Atual'}</div>
                <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">
                    ${draft.totalPalavras || 0} palavras &bull; ~${draft.linhasEstimadas || 0} linhas
                </div>
                <div style="display: flex; gap: 0.5rem;">
                    <button class="btn btn-primary btn-sm" id="btn-load-draft" style="flex: 1;">Restaurar Rascunho</button>
                    <button class="btn btn-sm" id="btn-delete-draft" data-id="${draft.id}" style="background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid #ef4444; border-radius: 4px; cursor: pointer;" title="Apagar Rascunho">🗑️</button>
                </div>
            </div>
        `;

        const btnRestore = document.getElementById('btn-load-draft');
        if (btnRestore) {
            btnRestore.addEventListener('click', () => {
                const textarea = /** @type {HTMLTextAreaElement} */ (document.getElementById('essay'));
                if (textarea) {
                    textarea.value = draft.texto || '';
                    textarea.dispatchEvent(new Event('input', { bubbles: true }));
                    closeDrawer();
                }
            });
        }

        const btnDeleteDraft = document.getElementById('btn-delete-draft');
        if (btnDeleteDraft) {
            btnDeleteDraft.addEventListener('click', async (e) => {
                if (!confirm('Tem certeza que deseja descartar este rascunho?')) return;
                const id = Number(btnDeleteDraft.getAttribute('data-id'));
                if (id) {
                    try {
                        await deleteDraft(id);
                        await renderRascunhos(); // Re-render list
                    } catch (err) {
                        console.error('[History] Erro ao apagar rascunho:', err);
                        alert('Erro ao apagar rascunho.');
                    }
                }
            });
        }
    } catch (err) {
        console.error('[History] Erro ao carregar rascunhos:', err);
        list.innerHTML = '<div class="history-empty">Erro ao carregar rascunho.</div>';
    }
}

/**
 * Recicla a tela de resultado (#result-view) sem precisar recarregar a página.
 * Usa a Fachada de Compatibilidade legada para conversar com o monólito script.js.
 */
function loadCorrectionIntoView(item) {
    if (!item || !item.dados) return;

    // Se o texto original existe, popula o textarea pra manter contexto
    const textarea = /** @type {HTMLTextAreaElement} */ (document.getElementById('essay'));
    if (textarea && item.textoOriginal) {
        textarea.value = item.textoOriginal;
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
    }

    // Fecha o drawer
    closeDrawer();

    if (window.__REDACAO_BRIDGE__?.renderResults) {
        window.__REDACAO_BRIDGE__.renderResults(item.dados, item.textoOriginal);
    } else {
        console.error('[History] Falha na ponte com renderizador do monólito.');
        alert('Erro ao carregar correção. Renderizador inacessível.');
    }
}

function openDrawer() {
    const drawer = document.getElementById('history-drawer');
    const overlay = document.getElementById('history-drawer-overlay');
    if (drawer && overlay) {
        drawer.classList.add('open');
        overlay.classList.add('active');
        drawer.setAttribute('aria-hidden', 'false');
        
        // Atualiza as listas toda vez que abrir
        renderCorrecoes();
        renderRascunhos();
    }
}

function closeDrawer() {
    const drawer = document.getElementById('history-drawer');
    const overlay = document.getElementById('history-drawer-overlay');
    if (drawer && overlay) {
        drawer.classList.remove('open');
        overlay.classList.remove('active');
        drawer.setAttribute('aria-hidden', 'true');
    }
}

function bindEvents() {
    const btnOpen = document.getElementById('btn-open-history');
    const btnClose = document.getElementById('close-history-drawer');
    const overlay = document.getElementById('history-drawer-overlay');

    if (btnOpen) btnOpen.addEventListener('click', openDrawer);
    if (btnClose) btnClose.addEventListener('click', closeDrawer);
    if (overlay) overlay.addEventListener('click', closeDrawer);

    // Abas
    document.querySelectorAll('.history-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            const target = /** @type {HTMLElement} */ (e.currentTarget);
            const tabName = target.getAttribute('data-tab');
            
            document.querySelectorAll('.history-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.history-tab-content').forEach(c => c.classList.remove('active'));
            
            target.classList.add('active');
            const content = document.getElementById(`history-tab-${tabName}`);
            if (content) content.classList.add('active');
        });
    });

    // Backup
    const btnBackupDownload = document.getElementById('btn-backup-download');
    if (btnBackupDownload) {
        btnBackupDownload.addEventListener('click', async () => {
            try {
                const backupData = await exportFullDatabaseBackup();
                const jsonStr = JSON.stringify(backupData, null, 2);
                const blob = new Blob([jsonStr], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `backup-redacoes-${new Date().toISOString().split('T')[0]}.json`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            } catch (err) {
                console.error('Erro ao exportar backup:', err);
                alert('Erro ao exportar backup.');
            }
        });
    }

    const btnBackupRestore = document.getElementById('btn-backup-restore');
    const backupFileInput = /** @type {HTMLInputElement} */ (document.getElementById('backup-file-input'));
    
    if (btnBackupRestore && backupFileInput) {
        btnBackupRestore.addEventListener('click', () => {
            backupFileInput.click();
        });
        
        backupFileInput.addEventListener('change', async (e) => {
            const target = /** @type {HTMLInputElement} */ (e.target);
            const file = target.files ? target.files[0] : null;
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = async (evt) => {
                try {
                    const content = /** @type {string} */ (evt.target?.result);
                    const backupObj = JSON.parse(content);
                    await importFullDatabaseBackup(backupObj);
                    alert('Backup restaurado com sucesso!');
                    renderCorrecoes();
                    renderRascunhos();
                } catch (err) {
                    console.error('Erro ao restaurar backup:', err);
                    alert('Erro ao restaurar backup. Verifique o formato do arquivo.');
                } finally {
                    backupFileInput.value = ''; // Reset
                }
            };
            reader.readAsText(file);
        });
    }
}

/**
 * Inicializa a UI do Drawer de histórico injetando no DOM.
 */
export function initHistoryDrawer() {
    injectDrawerStyles();
    injectDrawerDOM();
    bindEvents();
}

// Inicializa no carregamento do módulo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHistoryDrawer);
} else {
    initHistoryDrawer();
}
