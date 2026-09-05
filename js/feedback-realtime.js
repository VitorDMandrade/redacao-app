// @ts-check

/**
 * Módulo de Feedback em Tempo Real & HUD de Telemetria Caligráfica
 * Atua como um co-piloto silencioso que projeta o consumo físico da folha e monitora regras textuais.
 * ADR-12: Autosave assíncrono integrado via import dinâmico de js/database.js
 */

import { analyzeEssayText } from '../src/utils/essay-metrics.js';

const PARAGRAPH_ABBR = ['Intro', 'Desenv 1', 'Desenv 2', 'Conclusão'];

/** Referência ao último texto salvo para cálculo de diff mínimo */
let _lastSavedText = '';

/** Promise resolvida com a função saveDraft após o import dinâmico */
let _saveDraftFn = null;

// Carrega o módulo de banco de dados de forma assíncrona e silenciosa
import('./database.js')
  .then((db) => { _saveDraftFn = db.saveDraft; })
  .catch((e) => console.warn('[Autosave] Módulo database.js não pôde ser carregado:', e));
const TARGET_TOTAL_CHARS = 2820;

/**
 * Utilitário de Debounce para prevenir layout thrashing na digitação rápida
 * @param {Function} fn 
 * @param {number} delay 
 */
function debounce(fn, delay = 350) {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
}

/**
 * Garante a criação do container do HUD de Telemetria Caligráfica no DOM
 * @returns {HTMLElement}
 */
function ensureTelemetryHud() {
    let hud = document.getElementById('telemetria-caligrafica-hud');
    if (hud) return hud;

    hud = document.createElement('div');
    hud.id = 'telemetria-caligrafica-hud';
    hud.className = 'telemetria-container';
    hud.innerHTML = `
        <div class="telemetria-global-stats">
            <div class="telemetria-chip telemetria-chip-lines" id="telemetria-lines-chip">
                <span class="telemetria-chip-label">Folha</span>
                <strong class="telemetria-chip-value">0 / 30 linhas</strong>
            </div>
            <div class="telemetria-chip telemetria-chip-chars">
                <span class="telemetria-chip-label">Caracteres</span>
                <strong class="telemetria-chip-value" id="telemetria-chars-val">0 / 2.820</strong>
            </div>
        </div>
        <div class="telemetria-paragraphs-pills" id="telemetria-paragraphs-badges" role="toolbar" aria-label="Navegação por parágrafos">
        </div>
    `;

    // Delegação de eventos para os botões interativos
    hud.addEventListener('click', (e) => {
        const btn = /** @type {HTMLElement} */ (e.target).closest('.telemetria-pill');
        if (!btn) return;
        
        const pidxStr = btn.getAttribute('data-pidx');
        if (!pidxStr) return;
        const targetPIdx = parseInt(pidxStr, 10);
        
        const textarea = /** @type {HTMLTextAreaElement} */ (document.getElementById('essay'));
        if (!textarea) return;
        
        const text = textarea.value;
        const lines = text.split('\n');
        
        let start = 0;
        let end = 0;
        let currentP = 0;
        
        for (let i = 0; i < lines.length; i++) {
            const lineLength = lines[i].length;
            if (lines[i].trim().length > 0) {
                if (currentP === targetPIdx) {
                    end = start + lineLength;
                    break;
                }
                currentP++;
            }
            start += lineLength + 1; // +1 for the '\n'
        }
        
        textarea.focus();
        textarea.setSelectionRange(start, end);
        
        // Feedback visual
        document.querySelectorAll('.telemetria-pill').forEach(p => p.classList.remove('is-focused'));
        btn.classList.add('is-focused');
    });

    // Posiciona logo antes do .paper-container (ou acima do feedback panel)
    const paperContainer = document.querySelector('.paper-container');
    if (paperContainer && paperContainer.parentNode) {
        paperContainer.parentNode.insertBefore(hud, paperContainer);
    } else {
        const livePanel = document.getElementById('live-feedback-panel');
        if (livePanel && livePanel.parentNode) {
            livePanel.parentNode.insertBefore(hud, livePanel.nextSibling);
        } else {
            document.body.appendChild(hud);
        }
    }

    return hud;
}

/**
 * Atualiza o HUD de Telemetria Caligráfica com base na análise matemática
 * @param {HTMLElement} hud 
 * @param {string} rawText 
 */
function updateTelemetryHud(hud, rawText) {
    if (!hud) return;

    const linesChip = hud.querySelector('#telemetria-lines-chip');
    const linesValEl = hud.querySelector('.telemetria-chip-lines .telemetria-chip-value');
    const badgesContainer = hud.querySelector('#telemetria-paragraphs-badges');
    const charsValEl = hud.querySelector('#telemetria-chars-val');

    // Estado zerado gracioso
    if (!rawText || rawText.trim().length === 0) {
        if (linesChip) linesChip.setAttribute('data-status', 'UNDER_LIMIT');
        if (linesValEl) linesValEl.textContent = '0 / 30 linhas';
        if (badgesContainer) {
            badgesContainer.innerHTML = `
                <button type="button" class="telemetria-pill" data-pidx="0"><span class="pill-label">Intro</span><span class="pill-count">0/7L</span></button>
                <button type="button" class="telemetria-pill" data-pidx="1"><span class="pill-label">Desenv 1</span><span class="pill-count">0/8L</span></button>
                <button type="button" class="telemetria-pill" data-pidx="2"><span class="pill-label">Desenv 2</span><span class="pill-count">0/8L</span></button>
                <button type="button" class="telemetria-pill" data-pidx="3"><span class="pill-label">Conclusão</span><span class="pill-count">0/7L</span></button>
            `;
        }
        if (charsValEl) charsValEl.textContent = '0 / 2.820';
        return;
    }

    const metrics = analyzeEssayText(rawText);

    // 1. Linhas Totais Físicas
    if (linesChip) {
        linesChip.setAttribute('data-status', metrics.status);
    }
    if (linesValEl) {
        linesValEl.textContent = `${metrics.totalEstimatedLines} / 30 linhas`;
    }

    // 2. Micro-Badges por Parágrafo
    if (badgesContainer) {
        const defaultTargets = [7, 8, 8, 7];
        const badgesHtml = [];
        const count = Math.max(4, metrics.paragraphs.length);

        for (let i = 0; i < count; i++) {
            const p = metrics.paragraphs[i];
            const abbr = PARAGRAPH_ABBR[i] || `P${i + 1}`;
            const target = p ? p.targetLines : (defaultTargets[i] || 7);
            const estimated = p ? p.estimatedLines : 0;
            const isOver = p ? p.isOverflown : false;

            let badgeClass = 'telemetria-pill';
            if (isOver) {
                badgeClass += ' is-overflown';
            }
            
            badgesHtml.push(`
                <button type="button" class="${badgeClass}" data-pidx="${i}">
                    <span class="pill-label">${abbr}</span>
                    <span class="pill-count">${estimated}/${target}L</span>
                </button>
            `);
        }
        badgesContainer.innerHTML = badgesHtml.join('');
    }

    // 3. Densidade de Caracteres
    if (charsValEl) {
        charsValEl.textContent = `${metrics.totalCharsWithSpaces.toLocaleString('pt-BR')} / 2.820`;
    }
}

/**
 * Inicializa a escuta de eventos e instanciação do Co-piloto e HUD
 */
export function initLiveFeedback() {
    const essayTextarea = /** @type {HTMLTextAreaElement|null} */ (document.getElementById('essay'));
    const panel = document.getElementById('live-feedback-panel');
    const msgElement = document.getElementById('live-feedback-msg');

    if (!essayTextarea) {
        console.warn('Textarea #essay não encontrado para inicialização da telemetria.');
        return;
    }

    const hud = ensureTelemetryHud();

    // ─── Hidratação Inicial: restaura rascunho do IndexedDB (ADR-13) ────────
    // Executado de forma assíncrona e silenciosa; não bloqueia o editor.
    (async function hidratarRascunhoSeNecessario() {
        if (essayTextarea.value.trim().length > 0) return; // editor já tem conteúdo
        try {
            const { getLatestDraft } = await import('./database.js');
            const rascunho = await getLatestDraft();
            if (rascunho && rascunho.texto && essayTextarea.value.trim().length === 0) {
                essayTextarea.value = rascunho.texto;
                _lastSavedText = rascunho.texto; // sincroniza o diff para não regravá-lo imediatamente
                updateTelemetryHud(hud, rascunho.texto); // atualiza HUD de imediato
                essayTextarea.dispatchEvent(new Event('input', { bubbles: true })); // Notifica o Web Worker e listeners
            }
        } catch (err) {
            console.warn('[Storage] Falha ao hidratar rascunho do IndexedDB:', err);
        }
    })();
    
    // Instancia o worker nativo off-thread
    let copilotWorker;
    try {
        copilotWorker = new Worker(new URL('./workers/copilot.worker.js', import.meta.url), { type: 'module' });
    } catch (e) {
        console.warn("Web Workers não puderam ser inicializados:", e);
    }

    // ─── Autosave debounced (5s de inatividade) ────────────────────────────
    const triggerAutosave = debounce((/** @type {string} */ text) => {
        if (!_saveDraftFn) return; // módulo ainda não carregou
        if (Math.abs(text.length - _lastSavedText.length) < 10) return; // diff mínimo

        const temaEl = /** @type {HTMLInputElement|null} */ (document.getElementById('theme'));
        const bancaEl = /** @type {HTMLSelectElement|null} */ (document.getElementById('banca-select'));
        const wordCountEl = document.getElementById('word-count-val');

        const draft = {
            texto: text,
            tema: temaEl ? temaEl.value : '',
            banca: bancaEl ? bancaEl.value : 'ENEM',
            totalPalavras: wordCountEl ? parseInt(wordCountEl.textContent || '0', 10) : 0,
            linhasEstimadas: Math.ceil(text.length / 94), // estimativa média de 94 chars/linha
        };

        _saveDraftFn(draft)
            .then(() => { _lastSavedText = text; })
            .catch((e) => console.warn('[Autosave] Falha ao gravar rascunho:', e));
    }, 5000);

    // Debounce de 350ms para evitar reflows desnecessários na digitação
    const onInputDebounced = debounce((/** @type {string} */ text) => {
        updateTelemetryHud(hud, text);
        triggerAutosave(text);

        if (panel && msgElement && copilotWorker) {
            copilotWorker.onmessage = (event) => {
                const { feedback } = event.data;
                let finalFeedback = feedback;

                // Conexão Arena ↔ Co-piloto (Lê fraquezas salvas da thread principal)
                if (!finalFeedback) {
                    try {
                        const weaknesses = JSON.parse(localStorage.getItem('redacao_weaknesses') || '{}');
                        let dominantWeakness = null;
                        let maxErrors = 0;
                        
                        for (const [category, errors] of Object.entries(weaknesses)) {
                            // @ts-ignore
                            if (errors > 2 && errors > maxErrors) {
                                // @ts-ignore
                                maxErrors = errors;
                                dominantWeakness = category;
                            }
                        }

                        if (dominantWeakness) {
                            finalFeedback = `⚠️ Atenção: Na Arena você identificou fragilidade em "${dominantWeakness}". Fique atento a isso nesta redação!`;
                        }
                    } catch(e) {
                        console.warn('Erro ao ler fraquezas', e);
                    }
                }

                if (finalFeedback) {
                    msgElement.textContent = finalFeedback;
                    panel.style.display = 'flex';
                } else {
                    panel.style.display = 'none';
                }
            };
            
            copilotWorker.onerror = (error) => {
                console.warn('Erro no worker do co-piloto:', error);
            };

            // Delega o processamento pesado de tokenização e frequências para o worker
            copilotWorker.postMessage({ rawText: text });
        }
    }, 350);

    essayTextarea.addEventListener('input', (e) => {
        // @ts-ignore
        const text = e.target.value || '';
        onInputDebounced(text);
    });

    // Estado inicial síncrono (antes da hidratação assíncrona — pode mostrar 0/30 por um frame)
    updateTelemetryHud(hud, essayTextarea.value || '');
}

// Inicializa automaticamente quando o módulo ESM carrega
initLiveFeedback();
