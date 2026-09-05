// @ts-check

/**
 * Módulo de Feedback em Tempo Real & HUD de Telemetria Caligráfica
 * Atua como um co-piloto silencioso que projeta o consumo físico da folha e monitora regras textuais.
 */

import { analyzeEssayText } from '../src/utils/essay-metrics.js';

const stopWords = new Set([
    'a', 'o', 'e', 'é', 'de', 'do', 'da', 'dos', 'das',
    'em', 'no', 'na', 'nos', 'nas',
    'por', 'para', 'com', 'sem',
    'um', 'uma', 'uns', 'umas',
    'que', 'se', 'como', 'mais', 'mas', 'ou',
    'sua', 'seu', 'suas', 'seus',
    'ao', 'aos', 'à', 'às', 'pelo', 'pela'
]);

const PARAGRAPH_ABBR = ['Intro', 'Desenv 1', 'Desenv 2', 'Conclusão'];
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

    // Debounce de 350ms para evitar reflows desnecessários na digitação
    const onInputDebounced = debounce((/** @type {string} */ text) => {
        updateTelemetryHud(hud, text);

        if (panel && msgElement) {
            const feedback = analyzeText(text);
            if (feedback) {
                msgElement.textContent = feedback;
                panel.style.display = 'flex';
            } else {
                panel.style.display = 'none';
            }
        }
    }, 350);

    essayTextarea.addEventListener('input', (e) => {
        // @ts-ignore
        const text = e.target.value || '';
        onInputDebounced(text);
    });

    // Estado inicial síncrono
    updateTelemetryHud(hud, essayTextarea.value || '');
}

/**
 * Análise de regras textuais rápidas (repetição, tamanho bruto)
 * @param {string} text 
 * @returns {string | null}
 */
function analyzeText(text) {
    if (!text || text.trim().length === 0) return null;

    // 1. Checagem de Repetição de Palavras
    const words = text.toLowerCase()
        .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
        .split(/\s+/)
        .filter(w => w.length > 2 && !stopWords.has(w));

    /** @type {Record<string, number>} */
    const wordCounts = {};
    for (const w of words) {
        wordCounts[w] = (wordCounts[w] || 0) + 1;
    }

    for (const [word, count] of Object.entries(wordCounts)) {
        if (count > 4) {
            return `A palavra "${word.toUpperCase()}" já foi repetida ${count} vezes. Tente usar um sinônimo!`;
        }
    }

    // 2. Checagem de parágrafos muito longos (> 80 palavras)
    const paragraphs = text.split('\n').filter(p => p.trim().length > 0);
    for (let i = 0; i < paragraphs.length; i++) {
        const pLength = paragraphs[i].split(/\s+/).length;
        if (pLength > 80) {
            return `O parágrafo ${i + 1} está muito longo (mais de 80 palavras). Considere dividi-lo com ponto final.`;
        }
    }

    // 3. Conexão Arena ↔ Co-piloto (Lê fraquezas salvas)
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
            return `⚠️ Atenção: Na Arena você identificou fragilidade em "${dominantWeakness}". Fique atento a isso nesta redação!`;
        }
    } catch(e) {
        console.warn('Erro ao ler fraquezas', e);
    }

    return null;
}

// Inicializa automaticamente quando o módulo ESM carrega
initLiveFeedback();
