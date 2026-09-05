// @ts-check

/**
 * @fileoverview Painel de Analytics da Arena Gramatical (ADR-15)
 * Consome os dados de proficiência do IndexedDB e renderiza
 * barras de progresso nativas sem dependências externas.
 */

import { getDB } from './database.js';

const ANALYTICS_HTML = `
  <div id="arena-analytics-overlay" class="arena-analytics-overlay"></div>
  <aside id="arena-analytics-drawer" class="arena-analytics-drawer" aria-hidden="true">
    <div class="arena-analytics-header">
      <h2>Meu Desempenho na Arena</h2>
      <button id="close-arena-analytics" aria-label="Fechar analytics">&times;</button>
    </div>
    
    <div class="arena-analytics-content-area" id="arena-analytics-content">
      <div class="arena-analytics-empty">Carregando métricas...</div>
    </div>
  </aside>
`;

const ANALYTICS_CSS = `
  .arena-analytics-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.5);
    backdrop-filter: blur(4px);
    z-index: 9998;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease;
  }
  .arena-analytics-overlay.active {
    opacity: 1;
    visibility: visible;
  }
  .arena-analytics-drawer {
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
  .arena-analytics-drawer.open {
    right: 0;
  }
  .arena-analytics-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid var(--panel-border, #333);
  }
  .arena-analytics-header h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
  }
  #close-arena-analytics {
    background: transparent;
    border: none;
    color: var(--text-muted, #9ca3af);
    font-size: 1.5rem;
    cursor: pointer;
    transition: color 0.2s;
  }
  #close-arena-analytics:hover {
    color: var(--text-color, #fff);
  }
  .arena-analytics-content-area {
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem;
  }
  .metric-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid var(--panel-border, #333);
    border-radius: 8px;
    padding: 1.25rem;
    margin-bottom: 1rem;
  }
  .metric-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  .metric-title {
    font-weight: 600;
    font-size: 1rem;
  }
  .metric-percent {
    font-weight: 700;
    font-size: 1.1rem;
  }
  .metric-stats {
    font-size: 0.85rem;
    color: var(--text-muted, #9ca3af);
    margin-bottom: 0.75rem;
  }
  .progress-bg {
    width: 100%;
    height: 8px;
    background: rgba(255,255,255,0.1);
    border-radius: 4px;
    overflow: hidden;
  }
  .progress-fill {
    height: 100%;
    border-radius: 4px;
    transition: width 0.5s ease-out;
  }
  .progress-fill.success { background: var(--success, #10b981); }
  .progress-fill.warning { background: var(--warning, #f59e0b); }
  .progress-fill.danger { background: var(--danger, #ef4444); }
  
  .arena-analytics-empty {
    text-align: center;
    color: var(--text-muted, #9ca3af);
    padding: 2rem 0;
  }
`;

function injectAnalyticsStyles() {
    if (document.getElementById('arena-analytics-styles')) return;
    const style = document.createElement('style');
    style.id = 'arena-analytics-styles';
    style.textContent = ANALYTICS_CSS;
    document.head.appendChild(style);
}

function injectAnalyticsDOM() {
    if (document.getElementById('arena-analytics-drawer')) return;
    document.body.insertAdjacentHTML('beforeend', ANALYTICS_HTML);
}

/**
 * 
 * @param {string} containerSelector (optional) if we want to render inline instead of drawer
 */
export async function renderArenaAnalytics(containerSelector = null) {
    injectAnalyticsStyles();
    injectAnalyticsDOM();

    const drawer = document.getElementById('arena-analytics-drawer');
    const overlay = document.getElementById('arena-analytics-overlay');
    
    if (!containerSelector && drawer && overlay) {
        drawer.classList.add('open');
        overlay.classList.add('active');
        drawer.setAttribute('aria-hidden', 'false');
    }

    const contentArea = containerSelector 
        ? document.querySelector(containerSelector) 
        : document.getElementById('arena-analytics-content');

    if (!contentArea) return;

    try {
        const db = await getDB();
        const tx = db.transaction('arena_analytics', 'readonly');
        const store = tx.objectStore('arena_analytics');
        const request = store.getAll();

        request.onsuccess = () => {
            const metrics = request.result;
            
            if (!metrics || metrics.length === 0) {
                contentArea.innerHTML = `
                    <div class="metric-card" style="text-align: center; padding: 2rem 1rem;">
                        <div style="font-size: 2.5rem; margin-bottom: 1rem;">🎯</div>
                        <h3 style="margin-bottom: 1rem; color: var(--text-color, #fff);">Nenhum micro-treino registrado ainda.</h3>
                        <p style="color: var(--text-muted, #9ca3af); margin-bottom: 1.5rem; line-height: 1.5;">
                            Pratique na Arena para mapear suas proficiências gramaticais!
                        </p>
                        <button class="btn btn-primary" style="padding: 0.5rem 1rem; border: none; border-radius: 4px; cursor: pointer; background: var(--primary, #3b82f6); color: white;" onclick="document.getElementById('close-arena-analytics').click(); window.scrollTo({top: document.querySelector('.training-card') ? document.querySelector('.training-card').offsetTop - 50 : 0, behavior: 'smooth'});">
                            Iniciar Treino Agora
                        </button>
                    </div>
                `;
                return;
            }

            // Calculate total for each metric
            metrics.forEach(m => m.total = (m.acertos || 0) + (m.erros || 0));

            // Ordenar por total (mais praticados primeiro)
            metrics.sort((a, b) => b.total - a.total);

            contentArea.innerHTML = metrics.map(m => {
                const percent = m.total > 0 ? Math.round((m.acertos / m.total) * 100) : 0;
                let colorClass = 'danger';
                if (percent >= 80) colorClass = 'success';
                else if (percent >= 60) colorClass = 'warning';

                return `
                    <div class="metric-card">
                        <div class="metric-header">
                            <span class="metric-title">${m.categoria}</span>
                            <span class="metric-percent" class="${colorClass}">${percent}%</span>
                        </div>
                        <div class="metric-stats">
                            ${m.total} resolvidos &bull; ${m.acertos} acertos &bull; ${m.erros} erros
                        </div>
                        <div class="progress-bg">
                            <div class="progress-fill ${colorClass}" style="width: ${percent}%"></div>
                        </div>
                    </div>
                `;
            }).join('');
        };
        
        request.onerror = (e) => {
            console.error('[Analytics] Erro ao buscar métricas:', e);
            contentArea.innerHTML = '<div class="arena-analytics-empty">Erro ao carregar métricas.</div>';
        };

    } catch (err) {
        console.error('[Analytics] Erro de BD:', err);
        contentArea.innerHTML = '<div class="arena-analytics-empty">Erro ao inicializar DB.</div>';
    }
}

function closeAnalyticsDrawer() {
    const drawer = document.getElementById('arena-analytics-drawer');
    const overlay = document.getElementById('arena-analytics-overlay');
    if (drawer && overlay) {
        drawer.classList.remove('open');
        overlay.classList.remove('active');
        drawer.setAttribute('aria-hidden', 'true');
    }
}

function bindEvents() {
    const btnClose = document.getElementById('close-arena-analytics');
    const overlay = document.getElementById('arena-analytics-overlay');
    const btnOpen = document.getElementById('btn-arena-analytics');

    if (btnClose) btnClose.addEventListener('click', closeAnalyticsDrawer);
    if (overlay) overlay.addEventListener('click', closeAnalyticsDrawer);
    if (btnOpen) btnOpen.addEventListener('click', () => renderArenaAnalytics());
}

// Bind basic events early
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        injectAnalyticsStyles();
        injectAnalyticsDOM();
        bindEvents();
    });
} else {
    injectAnalyticsStyles();
    injectAnalyticsDOM();
    bindEvents();
}
