document.addEventListener('DOMContentLoaded', () => {
    let currentRepertoryFilter = 'all';
    const btnFilterAll = document.getElementById('btn-filter-all');
    const btnFilterFavs = document.getElementById('btn-filter-favs');
    const btnFilterIntro = document.getElementById('btn-filter-intro');

    function updateFilterBtns() {
        if (!btnFilterAll) return;
        [btnFilterAll, btnFilterFavs, btnFilterIntro].forEach(b => {
            b.classList.remove('active');
            b.style.background = 'transparent';
            b.style.color = 'var(--text-main)';
            b.style.borderColor = 'var(--panel-border)';
        });

        let activeBtn = currentRepertoryFilter === 'all' ? btnFilterAll :
            currentRepertoryFilter === 'favs' ? btnFilterFavs : btnFilterIntro;
        activeBtn.classList.add('active');
        activeBtn.style.background = 'var(--primary)';
        activeBtn.style.color = '#fff';
        activeBtn.style.borderColor = 'var(--primary)';
    }

    if (btnFilterAll) {
        btnFilterAll.addEventListener('click', () => { currentRepertoryFilter = 'all'; updateFilterBtns(); if (currentBanca.eixosTematicos[currentEixoIndex]) mostrarEixo(currentBanca.eixosTematicos[currentEixoIndex]); });
        btnFilterFavs.addEventListener('click', () => { currentRepertoryFilter = 'favs'; updateFilterBtns(); if (currentBanca.eixosTematicos[currentEixoIndex]) mostrarEixo(currentBanca.eixosTematicos[currentEixoIndex]); });
        btnFilterIntro.addEventListener('click', () => { currentRepertoryFilter = 'intro'; updateFilterBtns(); if (currentBanca.eixosTematicos[currentEixoIndex]) mostrarEixo(currentBanca.eixosTematicos[currentEixoIndex]); });
        updateFilterBtns();
    }
    const essayInput = document.getElementById('essay');
    const wordCountVal = document.getElementById('word-count-val');
    const analyzeBtn = document.getElementById('analyze-btn');
    const clearBtn = document.getElementById('clear-btn');
    const backBtn = document.getElementById('back-btn');

    const writeView = document.getElementById('write-view');
    const resultView = document.getElementById('result-view');
    const themeInput = document.getElementById('theme');
    const themeDisplay = document.getElementById('theme-display');
    const correctedText = document.getElementById('corrected-text');

    const tooltip = document.getElementById('error-tooltip');
    const tooltipOriginal = document.getElementById('tooltip-original');
    const tooltipSuggestion = document.getElementById('tooltip-suggestion');
    const tooltipExplanation = document.getElementById('tooltip-explanation');
    const tooltipHeader = document.querySelector('.tooltip-header');

    // Elementos da Banca
    const bancaSelect = document.getElementById('banca-select');
    const titleContainer = document.getElementById('title-container');
    const titleStatus = document.getElementById('title-status');
    const essayTitle = document.getElementById('essay-title');
    const navButtons = document.querySelectorAll('.nav-btn');
    const finalScoreValue = document.getElementById('final-score-value');
    const finalScoreMax = document.getElementById('final-score-max');
    const competenciesContainer = document.getElementById('competencies-container');
    const resumoPraticoText = document.getElementById('resumo-pratico-text');
    const axisSelector = document.getElementById('axis-selector');
    const currentAxisTitle = document.getElementById('current-axis-title');
    const repertoryList = document.getElementById('repertory-list');

    // Elementos do Flashcard
    const btnRepPratica = document.getElementById('btn-rep-pratica');
    const btnRepFlashcards = document.getElementById('btn-rep-flashcards');
    const repPracticeContainer = document.getElementById('repertory-practice-container');
    const flashcardsContainer = document.getElementById('flashcards-container');
    const fcElement = document.getElementById('flashcard-element');
    const btnFcPrev = document.getElementById('btn-fc-prev');
    const btnFcNext = document.getElementById('btn-fc-next');

    let currentBanca = BANCAS['ENEM']; // Default

    // Flashcard variables
    let currentFlashcards = [];
    let flashcardIndex = 0;

    function updateBancaUI() {
        currentBanca = BANCAS[bancaSelect.value];

        const selectedGenero = currentBanca.generosPermitidos[0] || 'dissertativo';

        // Atualiza Título
        if (selectedGenero === 'carta') {
            titleContainer.style.display = 'none';
        } else {
            titleContainer.style.display = 'block';
            if (currentBanca.exigeTitulo) {
                titleStatus.textContent = "(Obrigatório)";
                titleStatus.style.color = "var(--danger)";
            } else {
                titleStatus.textContent = "(Opcional)";
                titleStatus.style.color = "var(--text-muted)";
            }
        }

        // Atualiza Resumo Prático
        resumoPraticoText.textContent = currentBanca.resumoPratico || "";

        // Atualiza Labels dos botões de navegação
        navButtons.forEach(btn => {
            if (btn.dataset.mode === 'training') btn.textContent = currentBanca.labelTreino || "Treino por Partes";
            if (btn.dataset.mode === 'full') btn.textContent = currentBanca.labelFolha || "Folha de Redação";
        });

        // Atualiza Aba de Treino por Partes
        if (selectedGenero === 'carta') {
            document.getElementById('train-title-1').textContent = "1. Cabeçalho, Vocativo e Introdução";
            document.getElementById('train-hint-1').textContent = "Local, data, vocativo respeitoso e apresentação do tema ao leitor/veículo.";
            document.getElementById('train-title-2').textContent = "2. Argumentação (Diálogo com Veículo)";
            document.getElementById('train-hint-2').textContent = "Apresente o argumento dialogando diretamente com a revista/jornal ou autor da matéria.";
            document.getElementById('train-title-3').textContent = "3. Aprofundamento Crítico";
            document.getElementById('train-hint-3').textContent = "Traga uma consequência ou repertório produtivo e posicione-se criticamente.";
            document.getElementById('train-title-4').textContent = "4. Conclusão, Despedida e Assinatura";
            document.getElementById('train-hint-4').textContent = "Reflexão final, despedida formal e assinatura neutra (Ex: Um(a) leitor(a)).";
        } else {
            document.getElementById('train-title-1').textContent = "1. Introdução";
            document.getElementById('train-hint-1').textContent = "Apresente o tema e sua tese (ponto de vista).";
            document.getElementById('train-title-2').textContent = "2. Desenvolvimento 1";
            document.getElementById('train-hint-2').textContent = "Apresente o primeiro argumento e repertório sociocultural.";
            document.getElementById('train-title-3').textContent = "3. Desenvolvimento 2";
            document.getElementById('train-hint-3').textContent = "Apresente o segundo argumento e aprofunde a discussão.";
            document.getElementById('train-title-4').textContent = "4. Conclusão";
            document.getElementById('train-hint-4').textContent = "Retome a tese e elabore a proposta de intervenção ou síntese conclusiva.";
        }

        // Renderiza Eixos Temáticos
        renderEixos();
    }

    // Navigation Logic
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetView = document.getElementById(`${btn.dataset.mode}-view`);
            switchMode(btn, targetView);
        });
    });

    bancaSelect.addEventListener('change', updateBancaUI);
    updateBancaUI(); // initial call

    // Mode Toggle
    const btnModeFull = document.getElementById('btn-mode-full');
    const btnModeTraining = document.getElementById('btn-mode-training');
    const btnModeRepertory = document.getElementById('btn-mode-repertory');
    const btnModeGrammar = document.getElementById('btn-mode-grammar');
    const btnModeModel = document.getElementById('btn-mode-model');

    const trainingView = document.getElementById('training-view');
    const repertoryView = document.getElementById('repertory-view');
    const grammarView = document.getElementById('grammar-view');
    const modelView = document.getElementById('model-view');

    const analyzeTrainingBtn = document.getElementById('analyze-training-btn');

    let lastActiveView = writeView; // Track the last view before result

    function switchMode(activeBtn, activeView) {
        if (!activeBtn) return;
        [btnModeFull, btnModeTraining, btnModeRepertory, btnModeGrammar, btnModeModel].forEach(btn => btn && btn.classList.remove('active'));
        [writeView, trainingView, repertoryView, grammarView, modelView, resultView].forEach(view => view && view.classList.add('hidden'));

        activeBtn.classList.add('active');
        activeView.classList.remove('hidden');
        lastActiveView = activeView;
    }

    btnModeFull.addEventListener('click', () => switchMode(btnModeFull, writeView));
    btnModeTraining.addEventListener('click', () => switchMode(btnModeTraining, trainingView));
    btnModeRepertory.addEventListener('click', () => switchMode(btnModeRepertory, repertoryView));
    btnModeGrammar.addEventListener('click', () => switchMode(btnModeGrammar, grammarView));
    if (btnModeModel) btnModeModel.addEventListener('click', () => switchMode(btnModeModel, modelView));

    // Reiniciar Página
    const btnResetPage = document.getElementById('btn-reset-page');
    if (btnResetPage) {
        btnResetPage.addEventListener('click', () => {
            if (confirm("Tem certeza que deseja apagar todo o conteúdo de TODAS as abas e recomeçar?")) {
                // Clear Full
                essayInput.value = '';
                themeInput.value = '';
                essayTitle.value = '';
                wordCountVal.textContent = '0';

                // Clear Training Textareas
                document.querySelectorAll('.training-textarea').forEach(t => t.value = '');

                // Clear Timers (Mock reset, real implementation depends on timer logic)
                document.querySelectorAll('.training-timer-display').forEach(d => d.textContent = '00:00');

                // Switch back to Full Mode
                btnModeFull.click();
            }
        });
    }

    // Removida configuração de API Key e chamadas da antiga callGeminiAPI

    // Renderiza Eixos Temáticos
    function renderEixos() {
        axisSelector.innerHTML = '';
        repertoryList.innerHTML = '';
        currentAxisTitle.textContent = 'Selecione um eixo';

        if (!currentBanca.eixosTematicos) return;

        currentBanca.eixosTematicos.forEach((eixo, index) => {
            const btn = document.createElement('button');
            btn.className = 'axis-btn';
            btn.textContent = eixo.nome;
            if (index === 0) btn.classList.add('active'); // O primeiro fica ativo por padrão

            btn.addEventListener('click', () => {
                document.querySelectorAll('.axis-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                mostrarEixo(eixo);
            });

            axisSelector.appendChild(btn);
        });

        // Mostra o primeiro eixo automaticamente
        if (currentBanca.eixosTematicos.length > 0) {
            mostrarEixo(currentBanca.eixosTematicos[0]);
        }
    }

    function mostrarEixo(eixo) {
        currentAxisTitle.textContent = `Eixo: ${eixo.nome}`;
        repertoryList.innerHTML = '';
        currentEixoIndex = currentBanca.eixosTematicos.indexOf(eixo);

        if (eixo.repertorios) {
            let favs = JSON.parse(localStorage.getItem('redacao_favorite_repertories') || '[]');
            
            let repsToRender = eixo.repertorios.filter(rep => {
                const isIntro = (rep.obra && rep.obra.includes('INTRODUÇÃO')) || (rep.uso && rep.uso.includes('Introdução'));
                if (currentRepertoryFilter === 'favs' && !favs.includes(rep.obra)) return false;
                if (currentRepertoryFilter === 'intro' && !isIntro) return false;
                return true;
            });

            // Agrupar os repertórios
            let favReps = [];
            let introReps = [];
            let otherReps = [];

            repsToRender.forEach(rep => {
                const isIntro = (rep.obra && rep.obra.includes('INTRODUÇÃO')) || (rep.uso && rep.uso.includes('Introdução'));
                if (favs.includes(rep.obra)) {
                    favReps.push(rep);
                } else if (isIntro) {
                    introReps.push(rep);
                } else {
                    otherReps.push(rep);
                }
            });

            const renderGroup = (title, reps, color) => {
                if (reps.length === 0) return;
                const header = document.createElement('h4');
                header.style.color = color;
                header.style.marginTop = '1.5rem';
                header.style.marginBottom = '0.5rem';
                header.style.borderBottom = `1px solid ${color}`;
                header.style.paddingBottom = '0.3rem';
                header.textContent = title;
                repertoryList.appendChild(header);

                reps.forEach(rep => {
                    const item = document.createElement('div');
                    item.className = 'repertory-item';
                    const isFav = favs.includes(rep.obra);
                    const starColor = isFav ? '#fbbf24' : 'rgba(255,255,255,0.2)';
                    item.innerHTML = `
                        <h4 style="display:flex; justify-content:space-between; align-items:center;">
                            <span>${rep.obra} <span style="font-size:0.85em; color:var(--text-muted); font-weight:normal;">- ${rep.autor}</span></span>
                            <svg class="fav-star" data-obra="${rep.obra}" viewBox="0 0 24 24" width="18" height="18" stroke="${starColor}" stroke-width="2" fill="${isFav ? '#fbbf24' : 'none'}" stroke-linecap="round" stroke-linejoin="round" style="cursor:pointer;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        </h4>
                        <p><strong>Resumo:</strong> ${rep.resumo}</p>
                        ${rep.uso ? `<p style="margin-top:0.5rem; font-size:0.85rem; color:var(--warning);"><strong>Uso:</strong> ${rep.uso}</p>` : ''}
                    `;
                    item.querySelector('.fav-star').addEventListener('click', (e) => {
                        let f = JSON.parse(localStorage.getItem('redacao_favorite_repertories') || '[]');
                        const obra = e.currentTarget.dataset.obra;
                        if (f.includes(obra)) {
                            f = f.filter(o => o !== obra);
                            e.currentTarget.setAttribute('fill', 'none');
                            e.currentTarget.setAttribute('stroke', 'rgba(255,255,255,0.2)');
                        } else {
                            f.push(obra);
                            e.currentTarget.setAttribute('fill', '#fbbf24');
                            e.currentTarget.setAttribute('stroke', '#fbbf24');
                        }
                        localStorage.setItem('redacao_favorite_repertories', JSON.stringify(f));
                    });
                    repertoryList.appendChild(item);
                });
            };

            renderGroup('Meus Favoritos', favReps, '#fbbf24');
            renderGroup('Para Introdução', introReps, 'var(--primary)');
            renderGroup('Para Desenvolvimento / Coringas', otherReps, 'var(--text-main)');

            initFlashcards(repsToRender);
        } else if (eixo.topicos) {
            eixo.topicos.forEach(topico => {
                const item = document.createElement('div');
                item.className = 'repertory-item';
                item.innerHTML = `
                    <h4>Ponto de Atenção / Aposta</h4>
                    <p>${topico}</p>
                `;
                repertoryList.appendChild(item);
            });
            initFlashcards([]);
        }
    }

    // === Flashcard & Tabs Logic ===

    if (btnRepPratica && btnRepFlashcards) {
        btnRepPratica.addEventListener('click', () => {
            btnRepPratica.classList.add('active');
            btnRepFlashcards.classList.remove('active');
            btnRepPratica.style.background = 'var(--primary)';
            btnRepPratica.style.color = '#fff';
            btnRepFlashcards.style.background = 'transparent';
            repPracticeContainer.classList.remove('hidden');
            flashcardsContainer.classList.add('hidden');
        });

        btnRepFlashcards.addEventListener('click', () => {
            btnRepFlashcards.classList.add('active');
            btnRepPratica.classList.remove('active');
            btnRepFlashcards.style.background = 'rgba(245, 158, 11, 0.1)';
            btnRepPratica.style.background = 'transparent';
            btnRepPratica.style.color = 'var(--text-main)';
            flashcardsContainer.classList.remove('hidden');
            repPracticeContainer.classList.add('hidden');
            renderCurrentFlashcard();
        });
    }

    if (fcElement) {
        fcElement.addEventListener('click', () => {
            fcElement.classList.toggle('flipped');
        });
    }

    const favBtn = document.getElementById('fc-favorite-btn');
    if (favBtn) {
        favBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent flipping the card
            if (!currentFlashcards.length) return;
            const rep = currentFlashcards[flashcardIndex];
            let favs = JSON.parse(localStorage.getItem('redacao_favorite_repertories') || '[]');

            if (favs.includes(rep.obra)) {
                favs = favs.filter(o => o !== rep.obra);
                favBtn.classList.remove('active');
            } else {
                favs.push(rep.obra);
                favBtn.classList.add('active');
            }
            localStorage.setItem('redacao_favorite_repertories', JSON.stringify(favs));
        });
    }

    if (btnFcPrev && btnFcNext) {
        btnFcPrev.addEventListener('click', () => {
            if (flashcardIndex > 0) {
                flashcardIndex--;
                fcElement.classList.remove('flipped');
                setTimeout(renderCurrentFlashcard, 300); // Wait for unflip animation
            }
        });
        btnFcNext.addEventListener('click', () => {
            if (flashcardIndex < currentFlashcards.length - 1) {
                flashcardIndex++;
                fcElement.classList.remove('flipped');
                setTimeout(renderCurrentFlashcard, 300);
            }
        });

        // Spaced Repetition Logic
        const btnErrei = document.getElementById('btn-fc-errei');
        const btnAcertei = document.getElementById('btn-fc-acertei');

        if (btnErrei && btnAcertei) {
            btnErrei.addEventListener('click', (e) => {
                e.stopPropagation(); // Evita virar a carta
                if (!currentFlashcards[flashcardIndex]) return;

                let wrongFlashcards = JSON.parse(localStorage.getItem('redacao_wrong_flashcards') || '[]');
                const currentObra = currentFlashcards[flashcardIndex].obra;
                if (!wrongFlashcards.includes(currentObra)) {
                    wrongFlashcards.push(currentObra);
                    localStorage.setItem('redacao_wrong_flashcards', JSON.stringify(wrongFlashcards));
                }

                // Vai pra próxima
                if (flashcardIndex < currentFlashcards.length - 1) {
                    flashcardIndex++;
                    fcElement.classList.remove('flipped');
                    setTimeout(renderCurrentFlashcard, 300);
                }
            });

            btnAcertei.addEventListener('click', (e) => {
                e.stopPropagation();
                if (!currentFlashcards[flashcardIndex]) return;

                let wrongFlashcards = JSON.parse(localStorage.getItem('redacao_wrong_flashcards') || '[]');
                const currentObra = currentFlashcards[flashcardIndex].obra;
                wrongFlashcards = wrongFlashcards.filter(o => o !== currentObra);
                localStorage.setItem('redacao_wrong_flashcards', JSON.stringify(wrongFlashcards));

                if (flashcardIndex < currentFlashcards.length - 1) {
                    flashcardIndex++;
                    fcElement.classList.remove('flipped');
                    setTimeout(renderCurrentFlashcard, 300);
                }
            });
        }
    }

    function initFlashcards(repertorios) {
        let wrongFlashcards = JSON.parse(localStorage.getItem('redacao_wrong_flashcards') || '[]');

        let allRep = [...(repertorios || [])];
        allRep.sort((a, b) => {
            const aWrong = wrongFlashcards.includes(a.obra);
            const bWrong = wrongFlashcards.includes(b.obra);
            if (aWrong && !bWrong) return -1;
            if (!aWrong && bWrong) return 1;
            return 0; // maintain original order otherwise
        });

        currentFlashcards = allRep;
        flashcardIndex = 0;
        if (fcElement) fcElement.classList.remove('flipped');
        renderCurrentFlashcard();
    }

    function renderCurrentFlashcard() {
        const fcObra = document.getElementById('fc-obra');
        const fcAutor = document.getElementById('fc-autor');
        const fcResumo = document.getElementById('fc-resumo');
        const fcUso = document.getElementById('fc-uso');
        const fcCounter = document.getElementById('fc-counter');
        const fcFraseBox = document.getElementById('fc-frase-box');
        const fcFrase = document.getElementById('fc-frase');

        if (!currentFlashcards.length) {
            if (fcObra) fcObra.textContent = "Nenhum repertório";
            if (fcAutor) fcAutor.textContent = "-";
            if (fcResumo) fcResumo.textContent = "Este eixo não possui repertórios detalhados.";
            if (fcUso) fcUso.textContent = "";
            if (fcFraseBox) fcFraseBox.classList.add('hidden');
            if (fcCounter) fcCounter.textContent = "0 / 0";
            return;
        }

        const rep = currentFlashcards[flashcardIndex];
        if (fcObra) fcObra.textContent = rep.obra;
        if (fcAutor) fcAutor.textContent = rep.autor;
        if (fcResumo) fcResumo.textContent = rep.resumo;
        if (fcUso) fcUso.textContent = rep.uso ? "Uso Sugerido: " + rep.uso : "";

        if (rep.frase) {
            fcFrase.textContent = rep.frase;
            fcFraseBox.classList.remove('hidden');
        } else {
            fcFraseBox.classList.add('hidden');
        }

        if (fcCounter) fcCounter.textContent = `${flashcardIndex + 1} / ${currentFlashcards.length}`;
    }

    // Generate Line Numbers (up to 30 lines)
    const lineNumbersContainer = document.getElementById('line-numbers');
    const resultLineNumbersContainer = document.getElementById('result-line-numbers');
    let numbersHTML = '';
    for (let i = 1; i <= 30; i++) {
        numbersHTML += `<span class="line-number">${i}</span>`;
    }
    lineNumbersContainer.innerHTML = numbersHTML;
    resultLineNumbersContainer.innerHTML = numbersHTML;

    // Sync line height logic (prevent textarea from breaking lines out of grid if possible)
    // Actually, setting line-height correctly in CSS usually does the trick.

    function countLines() {
        // Estima as linhas baseado no scrollHeight e lineHeight (32px)
        const lineHeight = 32;
        return Math.floor(essayInput.scrollHeight / lineHeight);
    }

    // Update word count and limit lines
    essayInput.addEventListener('input', (e) => {
        const maxLines = currentBanca.limiteLinhas.max;
        const maxHeight = maxLines * 32;

        // Prevent exceeding max lines
        if (essayInput.scrollHeight > maxHeight) {
            // Revert last change by trimming the text
            essayInput.value = essayInput.value.slice(0, -1);
            // Flash red background momentarily to indicate limit
            essayInput.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
            setTimeout(() => { essayInput.style.backgroundColor = 'transparent'; }, 200);
        }

        const text = essayInput.value.trim();
        const words = text === '' ? 0 : text.split(/\s+/).length;
        wordCountVal.textContent = words;
    });

    // Also prevent paste that exceeds the limit
    essayInput.addEventListener('paste', (e) => {
        setTimeout(() => {
            const maxLines = currentBanca.limiteLinhas.max;
            const maxHeight = maxLines * 32;

            if (essayInput.scrollHeight > maxHeight) {
                alert(`O texto colado excede o limite de ${maxLines} linhas da banca ${currentBanca.nome}.`);
                // Revert to fit
                while (essayInput.scrollHeight > maxHeight && essayInput.value.length > 0) {
                    essayInput.value = essayInput.value.slice(0, -10);
                }
            }
            // Trigger input event to update word count
            essayInput.dispatchEvent(new Event('input'));
        }, 0);
    });

    // Clear input
    clearBtn.addEventListener('click', () => {
        if (confirm("Tem certeza que deseja apagar a redação atual?")) {
            essayInput.value = '';
            themeInput.value = '';
            wordCountVal.textContent = '0';
        }
    });

    // Back to write mode
    backBtn.addEventListener('click', () => {
        resultView.classList.add('hidden');
        if (lastActiveView) {
            lastActiveView.classList.remove('hidden');

            // Re-activate correct button based on last view
            [btnModeFull, btnModeTraining, btnModeRepertory, btnModeGrammar].forEach(btn => btn.classList.remove('active'));
            if (lastActiveView === writeView) btnModeFull.classList.add('active');
            if (lastActiveView === trainingView) btnModeTraining.classList.add('active');
            if (lastActiveView === repertoryView) btnModeRepertory.classList.add('active');
            if (lastActiveView === grammarView) btnModeGrammar.classList.add('active');
        } else {
            writeView.classList.remove('hidden');
            btnModeFull.classList.add('active');
        }
    });

    // Botão de análise original removido (pois agora usamos o Copiador Inteligente).

    // Lógica do Modo Copiador Inteligente
    const copyPromptBtn = document.getElementById('copy-prompt-btn');
    const copiadorModal = document.getElementById('copiador-modal');
    const btnCloseCopiador = document.getElementById('btn-close-copiador');
    const btnRenderCopiador = document.getElementById('btn-render-copiador');
    const jsonPasteArea = document.getElementById('json-paste-area');

    // Variável para armazenar o texto da redação atual para quando for renderizar
    let copiadorRawText = '';

    // Função global que será chamada quando o usuário submeter o conteúdo no copiador
    let onCopiadorSubmit = null;

    if (copyPromptBtn) {
        copyPromptBtn.addEventListener('click', () => {
            const rawText = essayInput.value.trim();

            if (currentBanca.exigeTitulo && essayTitle.value.trim() === '') {
                alert(`A banca ${currentBanca.nome} exige um título. Por favor, preencha o campo de título.`);
                return;
            }

            if (rawText.length < 50) {
                alert("Por favor, digite uma redação mais longa para análise.");
                return;
            }

            copiadorRawText = rawText;
            const essayTheme = themeInput.value.trim();
            const essayTitleText = essayTitle.value.trim();
            const banca = currentBanca.nome;
            const genero = currentBanca.generosPermitidos[0] || 'dissertativo';

            let promptUser = `Gênero: ${genero}\nBanca: ${banca}\nTema: ${essayTheme}\n`;
            if (essayTitleText) promptUser += `Título: ${essayTitleText}\n`;

            let bancaInstructions = `\nREGRAS DA BANCA SELECIONADA (${currentBanca.nome}):\n- ${currentBanca.resumoPratico || ''}\nCritérios que você DEVE avaliar e pontuar rigorosamente:\n`;
            if (currentBanca.criterios) {
                currentBanca.criterios.forEach(c => {
                    bancaInstructions += `- ${c.nome} (Máx: ${c.pontuacao}): ${c.desc}\n`;
                });
            }
            promptUser += bancaInstructions;

            promptUser += `\nRedação:\n${rawText}`;

            // Monta o prompt completo (Sistema + Usuário)
            const fullPrompt = `${typeof SYSTEM_PROMPT !== 'undefined' ? SYSTEM_PROMPT : 'Você é um avaliador de redações rigoroso.'}\n\nINSTRUÇÃO CRÃƒÂTICA FINAL: Responda APENAS E EXCLUSIVAMENTE com um bloco de código contendo o objeto JSON solicitado, sem markdown em volta do json ou explicações adicionais antes ou depois.\n\n---\n\n${promptUser}`;

            // Copia para a área de transferência
            navigator.clipboard.writeText(fullPrompt).then(() => {
                // Define o comportamento ao receber a resposta
                onCopiadorSubmit = (jsonStr) => {
                    const resultObj = JSON.parse(jsonStr);

                    themeDisplay.textContent = themeInput.value.trim() || "TEMA NÃO INFORMADO";
                    renderGeminiResults(resultObj, copiadorRawText);

                    // Switch Views
                    writeView.classList.add('hidden');
                    resultView.classList.remove('hidden');

                    // Reset progress bars for animation
                    const progressBars = document.querySelectorAll('.progress');
                    progressBars.forEach(bar => {
                        const width = bar.style.width;
                        bar.style.width = '0%';
                        setTimeout(() => { bar.style.width = width; }, 50);
                    });
                };

                // Abre o modal de instrução
                jsonPasteArea.value = ''; // limpa a caixa
                copiadorModal.classList.remove('hidden');
            }).catch(err => {
                console.error('Erro ao copiar', err);
                alert('Erro ao copiar o prompt. Seu navegador pode estar bloqueando o acesso à área de transferência.');
            });
        });
    }

    if (btnCloseCopiador) {
        btnCloseCopiador.addEventListener('click', () => {
            copiadorModal.classList.add('hidden');
        });
    }

    if (btnRenderCopiador) {
        btnRenderCopiador.addEventListener('click', () => {
            const pastedText = jsonPasteArea.value.trim();
            if (!pastedText) {
                alert('Por favor, cole o resultado JSON do Gemini.');
                return;
            }

            try {
                // Tenta extrair o JSON caso o usuário tenha copiado com ```json ... ```
                let jsonStr = pastedText;
                const match = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/i);
                if (match) {
                    jsonStr = match[1];
                }
                jsonStr = jsonStr.trim();

                // Tratar virgulas sobrando no final de objetos/arrays (hallucination do Gemini)
                jsonStr = jsonStr.replace(/,\s*([}\]])/g, '$1');

                // Tratar quebras de linha não escapadas dentro de strings
                jsonStr = jsonStr.replace(/"([^"\\]*(?:\\.[^"\\]*)*)"/g, function (match) {
                    return match.replace(/\r?\n/g, '\\n');
                });

                if (onCopiadorSubmit) {
                    onCopiadorSubmit(jsonStr);
                }

                // Fecha modal
                copiadorModal.classList.add('hidden');
            } catch (err) {
                console.error("Erro ao processar texto colado:", err);
                alert("Ocorreu um erro ao ler o JSON gerado pelo Gemini. Isso acontece se o Gemini escreveu texto fora do formato JSON (hallucination) ou deixou aspas abertas.\n\nPor favor, volte na aba do Gemini e clique em 'Gerar novamente'. Ou edite e cole apenas o JSON bruto.\n\nErro técnico: " + err.message);
            }
        });
    }

    // Render Results from Gemini JSON
    function renderGeminiResults(resultObj, rawText) {
        // Atualiza nota final
        finalScoreMax.textContent = `/${currentBanca.notaMaxima}`;

        let scoreObtida = 0;
        if (resultObj.notas) {
            scoreObtida = Object.values(resultObj.notas).reduce((acc, curr) => acc + (Number(curr) || 0), 0);
        }

        if (currentBanca.notaMaxima <= 10 || currentBanca.notaMaxima === 24) {
            finalScoreValue.textContent = scoreObtida.toFixed(1);
        } else {
            finalScoreValue.textContent = Math.round(scoreObtida);
        }

        // Critérios/Competências
        competenciesContainer.innerHTML = '';
        if (resultObj.notas) {
            currentBanca.criterios.forEach((crit) => {
                const max = crit.pontuacao || 1;
                const obt = resultObj.notas[crit.id] || 0;
                const perc = max > 0 ? (obt / max) : 0;

                let displayObtida = max <= 10 ? obt.toFixed(1) : Math.round(obt);
                let displayMax = max <= 10 ? max.toFixed(1) : Math.round(max);

                const html = `
                    <div class="competency-item">
                        <div class="comp-header">
                            <h4>${crit.nome}</h4>
                            <span>${displayObtida}/${displayMax}</span>
                        </div>
                        <div class="progress-bar"><div class="progress" style="width: ${perc * 100}%"></div></div>
                        <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.25rem;">${crit.desc}</p>
                    </div>
                `;
                competenciesContainer.innerHTML += html;
            });
        }

        // Adiciona um bloco de orientações da banca
        competenciesContainer.innerHTML += `
            <div style="margin-top: 1.5rem; padding: 1rem; background: rgba(59, 130, 246, 0.1); border-left: 4px solid var(--primary); border-radius: 4px;">
                <strong>Dica para a banca ${currentBanca.nome}:</strong> ${currentBanca.orientacoes}
            </div>
        `;

        // Diagnóstico e Reescrita
        const diagnosticoDiv = document.getElementById('ai-diagnostico');
        const reescritaDiv = document.getElementById('ai-reescrita');

        if (diagnosticoDiv) diagnosticoDiv.textContent = resultObj.diagnostico || "Diagnóstico não disponível.";
        if (reescritaDiv) reescritaDiv.textContent = resultObj.reescrita || "Reescrita não disponível.";

        // Destaques de Erros (Marcações) no Texto
        if (resultObj.erros && Array.isArray(resultObj.erros) && resultObj.erros.length > 0) {
            let highlightedText = rawText;

            resultObj.erros.forEach(erro => {
                if (erro.trecho_original) {
                    const tipoClasse = erro.tipo ? erro.tipo.toLowerCase().replace(/[^a-z]/g, '') : 'erro';

                    let bg = 'rgba(239, 68, 68, 0.2)';
                    let border = 'red';
                    if (erro.tipo === 'Gramática' || tipoClasse === 'gramatica') { bg = 'rgba(239, 68, 68, 0.2)'; border = 'red'; }
                    else if (erro.tipo === 'Coesão' || tipoClasse === 'coesao') { bg = 'rgba(245, 158, 11, 0.2)'; border = 'orange'; }
                    else if (erro.tipo === 'Estilo' || tipoClasse === 'estilo') { bg = 'rgba(59, 130, 246, 0.2)'; border = '#3b82f6'; }
                    else if (erro.tipo === 'Estrutura' || erro.tipo === 'Repertório' || tipoClasse === 'estrutura' || tipoClasse === 'repertorio') { bg = 'rgba(139, 92, 246, 0.2)'; border = '#8b5cf6'; }

                    const span = `<span class="error-mark error-${tipoClasse}" style="background-color: ${bg}; cursor: pointer; border-bottom: 2px dashed ${border};" data-type="${erro.tipo || 'Erro'}" data-orig="${erro.trecho_original}" data-sugg="${erro.sugestao || ''}" data-exp="${erro.explicacao}"> ${erro.trecho_original} </span>`;
                    highlightedText = highlightedText.replace(erro.trecho_original, span);
                }
            });
            correctedText.innerHTML = highlightedText.replace(/\n/g, '<br>');
        } else {
            correctedText.innerHTML = rawText.replace(/\n/g, '<br>');
        }

        setupTooltips();
    }

    // -----------------------------------------
    // LÓGICA DA ARENA DE MICRO-TREINOS
    // -----------------------------------------
    let currentDrillCategory = 'Crase';
    let currentDrillExercises = [];
    let currentDrillIndex = 0;
    let drillScore = 0;

    // Turbo Mode Variables
    let isTurboMode = false;
    let turboTimerInterval = null;
    let turboTimeLeft = 60;

    const drillCategoryBtns = document.querySelectorAll('.drill-category-btn');
    const drillQuestionDisplay = document.getElementById('drill-question');
    const drillOptionsContainer = document.getElementById('drill-options');
    const drillFeedbackDisplay = document.getElementById('drill-feedback');
    const btnNextDrill = document.getElementById('btn-next-drill');
    const drillCounterDisplay = document.getElementById('drill-counter');
    const drillScoreDisplay = document.getElementById('drill-score');

    // UI elements for Turbo Mode
    const btnTurboMode = document.getElementById('btn-turbo-mode');
    const turboTimerContainer = document.getElementById('turbo-timer-container');
    const turboTimerDisplay = document.getElementById('turbo-timer-display');

    function loadDrillsByCategory(category) {
        if (typeof grammarExercises === 'undefined') return;

        // Parar turbo mode se estiver ativo
        stopTurboMode();

        currentDrillCategory = category;

        if (category === 'PontosFracos') {
            const wrongAnswers = JSON.parse(localStorage.getItem('redacao_wrong_drills') || '[]');
            if (wrongAnswers.length === 0) {
                drillQuestionDisplay.innerHTML = `<span style="color:var(--success)">Parabéns! Você não tem pontos fracos registrados.</span>`;
                drillOptionsContainer.innerHTML = '';
                drillFeedbackDisplay.classList.add('hidden');
                btnNextDrill.classList.add('hidden');
                return;
            }
            // Filtra os exercícios que estão no array de pontos fracos
            currentDrillExercises = grammarExercises.filter(ex => wrongAnswers.includes(ex.question));
        } else {
            currentDrillExercises = grammarExercises.filter(ex => ex.category === category);
        }

        // Embaralha as questoes da categoria
        currentDrillExercises.sort(() => Math.random() - 0.5);
        currentDrillIndex = 0;
        drillScore = 0;
        drillScoreDisplay.textContent = '0';

        if (currentDrillExercises.length > 0) {
            renderCurrentDrill();
        }
    }

    function renderCurrentDrill() {
        if (currentDrillIndex >= currentDrillExercises.length) {
            drillQuestionDisplay.innerHTML = `<span style="color:var(--success)">Parabéns! Você completou os treinos de ${currentDrillCategory}!</span>`;
            drillOptionsContainer.innerHTML = '';
            drillFeedbackDisplay.classList.add('hidden');
            btnNextDrill.classList.add('hidden');
            return;
        }

        const drill = currentDrillExercises[currentDrillIndex];
        drillCounterDisplay.textContent = currentDrillIndex + 1;
        drillQuestionDisplay.textContent = drill.question;
        drillFeedbackDisplay.classList.add('hidden');
        btnNextDrill.classList.add('hidden');

        drillOptionsContainer.innerHTML = '';
        drill.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'btn btn-secondary';
            btn.textContent = opt;
            btn.onclick = () => handleDrillAnswer(idx, drill, btn);
            drillOptionsContainer.appendChild(btn);
        });
    }

    function handleDrillAnswer(selectedIndex, drill, clickedBtn) {
        // Desabilita os botoes
        Array.from(drillOptionsContainer.children).forEach(b => b.disabled = true);

        const isCorrect = selectedIndex === drill.correctOptionIndex;
        let wrongAnswers = JSON.parse(localStorage.getItem('redacao_wrong_drills') || '[]');

        // Define a "Lino Tip" padrão baseada na categoria
        let linoTip = "";
        if (drill.category === 'Crase') {
            linoTip = "👨‍🏫 Lino Tip: O Método Cachorrão salva vidas! Troque a palavra feminina por uma masculina (ex: 'o problema'). Se der 'AO', tem crase.";
        } else if (drill.category === 'Vírgula') {
            linoTip = "👨‍🏫 Lino Tip: Cuidado com a Vírgula Suicida! Jamais separe o sujeito do seu verbo, mesmo que o sujeito seja um termo longo.";
        } else {
            linoTip = "👨‍🏫 Lino Tip: A redação nota 1000 exige conectivos lógicos explícitos entre parágrafos. Evite o gerúndio fraco!";
        }

        const finalTip = drill.linoTip || linoTip;

        let extraFeedback = "";
        if (drill.correctSide && drill.wrongSide) {
            extraFeedback = `
                <div style="margin-top: 15px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 0.9rem;">
                    <div style="background: rgba(16, 185, 129, 0.1); border-radius: 8px; padding: 10px; border: 1px solid var(--success);">
                        <strong style="color:var(--success)">✅ Lado Correto:</strong><br>
                        <span style="color:var(--text-main)">${drill.correctSide}</span>
                    </div>
                    <div style="background: rgba(239, 68, 68, 0.1); border-radius: 8px; padding: 10px; border: 1px solid var(--danger);">
                        <strong style="color:var(--danger)">❌ Lado Errado:</strong><br>
                        <span style="color:var(--text-main)">${drill.wrongSide}</span>
                    </div>
                </div>
            `;
        }

        let conceptBox = "";
        if (drill.concept && drill.conceptExplanation) {
            conceptBox = `
                <div style="margin-top: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 8px; padding: 12px; border-left: 4px solid var(--primary);">
                    <strong style="color:var(--primary)">📚 O que é: ${drill.concept}?</strong><br>
                    <span style="color:var(--text-main); font-size: 0.9rem;">${drill.conceptExplanation}</span>
                </div>
            `;
        }

        if (isCorrect) {
            clickedBtn.style.backgroundColor = 'var(--success)';
            clickedBtn.style.color = '#fff';
            clickedBtn.style.borderColor = 'var(--success)';
            drillScore++;
            drillScoreDisplay.textContent = drillScore;

            // Remove dos pontos fracos se estava lá
            if (wrongAnswers.includes(drill.question)) {
                wrongAnswers = wrongAnswers.filter(q => q !== drill.question);
                localStorage.setItem('redacao_wrong_drills', JSON.stringify(wrongAnswers));
            }

            drillFeedbackDisplay.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
            drillFeedbackDisplay.style.borderLeft = '4px solid var(--success)';
            drillFeedbackDisplay.innerHTML = `<strong style="color:var(--success)">✅ Acertou!</strong><br><span style="color:var(--text-main)">${drill.explanation}</span>${extraFeedback}${conceptBox}<br><br><em style="color:var(--primary); font-size:0.9rem;">${finalTip}</em>`;
        } else {
            clickedBtn.style.backgroundColor = 'var(--danger)';
            clickedBtn.style.color = '#fff';
            clickedBtn.style.borderColor = 'var(--danger)';

            // Destaca a correta
            drillOptionsContainer.children[drill.correctOptionIndex].style.borderColor = 'var(--success)';
            drillOptionsContainer.children[drill.correctOptionIndex].style.borderWidth = '2px';

            // Adiciona aos pontos fracos
            if (!wrongAnswers.includes(drill.question)) {
                wrongAnswers.push(drill.question);
                localStorage.setItem('redacao_wrong_drills', JSON.stringify(wrongAnswers));
            }

            drillFeedbackDisplay.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
            drillFeedbackDisplay.style.borderLeft = '4px solid var(--danger)';
            drillFeedbackDisplay.innerHTML = `<strong style="color:var(--danger)">❌ Errou!</strong><br><span style="color:var(--text-main)">${drill.explanation}</span>${extraFeedback}${conceptBox}<br><br><em style="color:var(--primary); font-size:0.9rem;">${finalTip}</em>`;
        }

        drillFeedbackDisplay.classList.remove('hidden');

        if (!isTurboMode) {
            btnNextDrill.classList.remove('hidden');
        } else {
            // No modo turbo, avança automaticamente após 1.5s
            setTimeout(() => {
                if (isTurboMode) {
                    currentDrillIndex++;
                    renderCurrentDrill();
                }
            }, 2000);
        }
    }

    if (btnNextDrill) {
        btnNextDrill.addEventListener('click', () => {
            currentDrillIndex++;
            renderCurrentDrill();
        });
    }

    drillCategoryBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            drillCategoryBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            loadDrillsByCategory(e.target.getAttribute('data-category'));
        });
    });

    // Logica do Turbo Mode
    function startTurboMode() {
        if (typeof grammarExercises === 'undefined') return;

        drillCategoryBtns.forEach(b => b.classList.remove('active'));
        btnTurboMode.classList.add('active');

        isTurboMode = true;
        currentDrillCategory = 'Turbo';
        turboTimeLeft = 60;

        // Mistura TODAS as questões
        currentDrillExercises = [...grammarExercises].sort(() => Math.random() - 0.5);
        currentDrillIndex = 0;
        drillScore = 0;
        drillScoreDisplay.textContent = '0';

        turboTimerContainer.classList.remove('hidden');
        turboTimerDisplay.textContent = turboTimeLeft;

        renderCurrentDrill();

        turboTimerInterval = setInterval(() => {
            turboTimeLeft--;
            turboTimerDisplay.textContent = turboTimeLeft;

            if (turboTimeLeft <= 0) {
                stopTurboMode(true);
            }
        }, 1000);
    }

    function stopTurboMode(timeOut = false) {
        if (!isTurboMode) return;

        isTurboMode = false;
        clearInterval(turboTimerInterval);
        turboTimerContainer.classList.add('hidden');

        if (timeOut) {
            drillQuestionDisplay.innerHTML = `<span style="color:var(--danger)">Fim do Tempo! ⏰</span><br>Você acertou <strong style="color:var(--success)">${drillScore}</strong> questões em 60 segundos!`;
            drillOptionsContainer.innerHTML = '';
            drillFeedbackDisplay.classList.add('hidden');
            btnNextDrill.classList.add('hidden');
        }
    }

    if (btnTurboMode) {
        btnTurboMode.addEventListener('click', () => {
            startTurboMode();
        });
    }

    // Iniciar com Crase
    if (drillQuestionDisplay) {
        loadDrillsByCategory('Crase');
    }

    // -----------------------------------------
    // LÓGICA DO DESAFIO GRAMATICAL DINÂMICO
    // -----------------------------------------
    const btnCopyGrammarChallenge = document.getElementById('btn-copy-grammar-challenge');
    const grammarChallengeInput = document.getElementById('grammar-challenge-input');
    const grammarChallengeDisplay = document.getElementById('grammar-challenge-display');
    const grammarChallengeText = document.getElementById('grammar-challenge-text');
    const grammarChallengeHint = document.getElementById('grammar-challenge-hint');
    const grammarChallengeRewrite = document.getElementById('grammar-challenge-rewrite');
    const btnEvaluateGrammarChallenge = document.getElementById('btn-evaluate-grammar-challenge');
    const grammarChallengeResponse = document.getElementById('grammar-challenge-response');
    let currentGrammarChallenge = "";

    if (btnCopyGrammarChallenge) {
        btnCopyGrammarChallenge.addEventListener('click', () => {
            navigator.clipboard.writeText(PROMPT_GERAR_DESAFIO).then(() => {
                alert("Prompt copiado! Cole no Gemini e traga o JSON de volta para o passo 2.");
            });
        });
    }

    if (grammarChallengeInput) {
        grammarChallengeInput.addEventListener('input', () => {
            const val = grammarChallengeInput.value.trim();
            if (!val) {
                grammarChallengeDisplay.classList.add('hidden');
                btnEvaluateGrammarChallenge.style.display = 'none';
                return;
            }
            try {
                // Remove possivel markdown de codigo
                const cleanJson = val.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();
                const obj = JSON.parse(cleanJson);

                if (obj.texto_problematico) {
                    currentGrammarChallenge = obj.texto_problematico;
                    grammarChallengeText.textContent = obj.texto_problematico;
                    grammarChallengeHint.textContent = obj.dica || "";
                    grammarChallengeDisplay.classList.remove('hidden');
                    btnEvaluateGrammarChallenge.style.display = 'block';
                }
            } catch (e) {
                // Aguarda o usuario colar um json valido
            }
        });
    }

    if (btnEvaluateGrammarChallenge) {
        btnEvaluateGrammarChallenge.addEventListener('click', () => {
            const studentRewrite = grammarChallengeRewrite.value.trim();
            if (!studentRewrite) {
                alert("Por favor, escreva a sua correção antes de avaliar!");
                return;
            }

            let prompt = PROMPT_CORRIGIR_DESAFIO.replace("{TEXTO_ORIGINAL}", currentGrammarChallenge).replace("{REESCRITA_ALUNO}", studentRewrite);

            navigator.clipboard.writeText(prompt).then(() => {
                onCopiadorSubmit = (jsonStr) => {
                    const resultObj = JSON.parse(jsonStr);

                    let html = `<div style="padding: 1.5rem; background: rgba(30, 41, 59, 0.8); border: 1px solid var(--panel-border); border-radius: 8px; margin-top: 1.5rem; border-left: 4px solid var(--primary);">`;
                    html += `<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">`;
                    html += `<h3 style="color: var(--primary);">Correção do Prof. Lino</h3>`;

                    const corNota = resultObj.nota === 100 ? 'var(--success)' : (resultObj.nota >= 70 ? 'var(--warning)' : 'var(--danger)');
                    html += `<div style="font-size: 1.5rem; font-weight: bold; color: ${corNota}">${resultObj.nota}/100</div>`;
                    html += `</div>`;

                    html += `<p style="line-height: 1.6; margin-bottom: 1rem; color: var(--text-main);">${resultObj.feedback_geral}</p>`;

                    if (resultObj.erros_encontrados && resultObj.erros_encontrados.length > 0) {
                        html += `<ul style="list-style: none; padding: 0; margin-bottom: 1.5rem;">`;
                        resultObj.erros_encontrados.forEach(erro => {
                            const isCorrigido = erro.status.toLowerCase().includes("não") ? false : true;
                            const icone = isCorrigido ? "✅" : "❌";
                            const cor = isCorrigido ? "var(--success)" : "var(--danger)";
                            html += `<li style="margin-bottom: 0.5rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border-left: 3px solid ${cor};">
                                ${icone} <span style="font-weight: 500;">${erro.status}</span>: ${erro.erro}
                            </li>`;
                        });
                        html += `</ul>`;
                    }

                    html += `<div><h4 style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 0.5rem;">Reescrita Ideal:</h4>`;
                    html += `<p style="font-family: monospace; background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 4px;">${resultObj.reescrita_ideal}</p></div>`;

                    html += `</div>`;

                    grammarChallengeResponse.innerHTML = html;
                };

                copiadorModal.classList.remove('hidden');
                jsonPasteArea.value = '';
                jsonPasteArea.focus();
            });
        });
    }

    // Função auxiliar provisória
    function textToLines(text) {
        return text.split('\n').length;
    }

    function setupTooltips() {
        const errorMarks = document.querySelectorAll('.error-mark');

        errorMarks.forEach(mark => {
            if (mark.classList.contains('bound')) return;
            mark.classList.add('bound');

            mark.addEventListener('mouseenter', (e) => {
                const type = mark.getAttribute('data-type');
                const orig = mark.getAttribute('data-orig');
                const sugg = mark.getAttribute('data-sugg');
                const exp = mark.getAttribute('data-exp');

                if (type === 'Conectivo') {
                    tooltipHeader.textContent = `Sugestão de Conectivo/Operador`;
                    tooltipHeader.style.backgroundColor = 'var(--success)';
                } else {
                    tooltipHeader.textContent = `Erro de ${type}`;
                    if (type === 'Gramática') tooltipHeader.style.backgroundColor = 'var(--danger)';
                    else if (type === 'Coesão') tooltipHeader.style.backgroundColor = 'var(--warning)';
                    else tooltipHeader.style.backgroundColor = 'var(--primary)';
                }

                tooltipOriginal.textContent = orig;
                if (sugg) {
                    tooltipSuggestion.textContent = sugg;
                    tooltipSuggestion.parentElement.style.display = 'block';
                } else {
                    tooltipSuggestion.parentElement.style.display = 'none';
                }
                tooltipExplanation.textContent = exp;

                // Position tooltip
                const rect = mark.getBoundingClientRect();
                tooltip.style.left = `${rect.left + window.scrollX - 150 + (rect.width / 2)}px`;
                tooltip.style.top = `${rect.bottom + window.scrollY + 10}px`;

                tooltip.classList.add('visible');
            });

            mark.addEventListener('mouseleave', () => {
                tooltip.classList.remove('visible');
            });

            mark.addEventListener('click', () => {
                const type = mark.getAttribute('data-type');
                const orig = mark.getAttribute('data-orig');
                const sugg = mark.getAttribute('data-sugg');
                const exp = mark.getAttribute('data-exp');

                // Switch to Grammar tab
                const btnModeGrammar = document.getElementById('btn-mode-grammar');
                if (btnModeGrammar) btnModeGrammar.click();

                // Fill the textarea
                const grammarTextarea = document.getElementById('grammar-tutor-textarea');
                if (grammarTextarea) {
                    grammarTextarea.value = `Prof. Lino, cometi um erro do tipo '${type}' ao escrever "${orig}". A sugestão foi "${sugg}" por conta disso: "${exp}". Pode me explicar a regra gramatical e me dar dicas para não errar mais?`;

                    // Trigger the analyze button if available
                    const tutorSubmitBtn = document.getElementById('grammar-tutor-submit');
                    if (tutorSubmitBtn) {
                        tutorSubmitBtn.click();
                    }
                }
            });
        });
    }

    // Analysis for Training Mode
    const trainingBlockTimers = {}; // Store intervals

    function startTrainingBlockTimer(index, displayEl, durationSecs) {
        if (trainingBlockTimers[index]) return; // Already running

        let timeRemaining = durationSecs;
        displayEl.style.color = 'var(--warning)';

        trainingBlockTimers[index] = setInterval(() => {
            timeRemaining--;
            if (timeRemaining <= 0) {
                clearInterval(trainingBlockTimers[index]);
                displayEl.textContent = '00:00';
                displayEl.style.color = 'var(--danger)';
            } else {
                const m = Math.floor(timeRemaining / 60).toString().padStart(2, '0');
                const s = (timeRemaining % 60).toString().padStart(2, '0');
                displayEl.textContent = `${m}:${s}`;
                if (timeRemaining < 60 * 5) {
                    displayEl.style.color = 'var(--danger)';
                }
            }
        }, 1000);
    }

    [1, 2, 3, 4].forEach(i => {
        const textarea = document.getElementById(`textarea-part-${i}`);
        const displayEl = document.getElementById(`timer-display-${i}`);
        if (textarea && displayEl) {
            const duration = parseInt(displayEl.getAttribute('data-duration'), 10) || 900;
            const startTimer = () => startTrainingBlockTimer(i, displayEl, duration);
            textarea.addEventListener('input', startTimer, { once: true });
            textarea.addEventListener('focus', startTimer, { once: true });
        }
    });

    const tutorialTextarea = document.getElementById('tutorial-textarea');
    const tutorialDisplay = document.getElementById('timer-display-tutorial');
    if (tutorialTextarea && tutorialDisplay) {
        // Set an attribute for default duration if missing (e.g. 20 min)
        const duration = parseInt(tutorialDisplay.getAttribute('data-duration'), 10) || 1200;
        const startTutorialTimer = () => startTrainingBlockTimer('tutorial', tutorialDisplay, duration);
        tutorialTextarea.addEventListener('input', startTutorialTimer, { once: true });
        tutorialTextarea.addEventListener('focus', startTutorialTimer, { once: true });
    }

    const analyzePartBtns = document.querySelectorAll('.btn-analyze-part');
    if (analyzePartBtns.length > 0) {
        analyzePartBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Stop timers
                Object.keys(trainingBlockTimers).forEach(key => clearInterval(trainingBlockTimers[key]));
                if (typeof partTimerInterval !== 'undefined') clearInterval(partTimerInterval);

                const part = btn.getAttribute('data-part');
                const textarea = document.getElementById(`textarea-part-${part}`);
                const text = textarea ? textarea.value.trim() : '';
                const themeElement = document.getElementById('theme');
                const theme = themeElement ? themeElement.value.trim() : '';

                if (text.length < 10) {
                    alert("Preencha este bloco com mais detalhes para analisarmos!");
                    return;
                }

                const partNames = ["Introdução", "Desenvolvimento 1", "Desenvolvimento 2", "Conclusão"];
                const partName = partNames[part - 1] || "Bloco";

                const fullPrompt = `${typeof SYSTEM_PROMPT !== 'undefined' ? SYSTEM_PROMPT : ''}\n\nINSTRUÇÃO CRÃƒÂTICA FINAL: Responda APENAS E EXCLUSIVAMENTE com um bloco de código contendo o objeto JSON solicitado, sem markdown em volta do json ou explicações adicionais antes ou depois.\n\n---\n\nAnalise o seguinte parágrafo isolado de redação (${partName}). Focando em diagnosticar a estrutura, apresentar os erros e dar uma reescrita cirúrgica para este bloco fornecido. Retorne usando a mesma estrutura JSON do sistema de Treino (chave diagnostico e reescrita).\n\nBanca Alvo: ${currentBanca.nome}\nTema: ${theme || 'Não informado'}\nBloco (${partName}):\n${text}`;

                navigator.clipboard.writeText(fullPrompt).then(() => {
                    onCopiadorSubmit = (jsonStr) => {
                        const resultObj = JSON.parse(jsonStr);

                        let feedbackHtml = `
                            <div style="margin-top: 1rem; background: var(--bg-color); padding: 1.5rem; border-radius: 8px; border: 1px solid var(--panel-border);">
                                <h4 style="color: var(--primary); margin-bottom: 0.5rem;">Feedback do ${partName}</h4>
                                <p style="white-space: pre-wrap; line-height: 1.6; color: var(--text-color); font-size: 0.95rem;">${resultObj.diagnostico || 'Sem diagnóstico.'}</p>
                                
                                <h5 style="color: var(--success); margin-top: 1rem; margin-bottom: 0.5rem;">Reescrita Sugerida</h5>
                                <p style="white-space: pre-wrap; line-height: 1.6; color: var(--text-color); font-size: 0.95rem;">${resultObj.reescrita || 'Sem reescrita.'}</p>
                            </div>
                        `;

                        const feedbackContainer = document.getElementById(`feedback-part-${part}`);
                        feedbackContainer.innerHTML = feedbackHtml;
                    };

                    jsonPasteArea.value = '';
                    copiadorModal.classList.remove('hidden');
                }).catch(err => {
                    console.error('Erro ao copiar', err);
                    alert('Erro ao copiar o prompt.');
                });
            });
        });
    }


    // Toggle Modes - Treino por Partes
    const btnModeAvaliacao = document.getElementById('btn-mode-avaliacao');
    const btnModeTutorial = document.getElementById('btn-mode-tutorial');
    const containerAvaliacao = document.getElementById('training-avaliacao-container');
    const containerTutorial = document.getElementById('training-tutorial-container');

    if (btnModeAvaliacao && btnModeTutorial) {
        btnModeAvaliacao.addEventListener('click', () => {
            btnModeAvaliacao.classList.add('active');
            btnModeAvaliacao.style.background = 'var(--primary)';
            btnModeAvaliacao.style.color = '#fff';

            btnModeTutorial.classList.remove('active');
            btnModeTutorial.style.background = 'transparent';
            btnModeTutorial.style.color = 'var(--text-color)';

            containerAvaliacao.classList.remove('hidden');
            containerTutorial.classList.add('hidden');
        });

        btnModeTutorial.addEventListener('click', () => {
            btnModeTutorial.classList.add('active');
            btnModeTutorial.style.background = 'var(--primary)';
            btnModeTutorial.style.color = '#fff';

            btnModeAvaliacao.classList.remove('active');
            btnModeAvaliacao.style.background = 'transparent';
            btnModeAvaliacao.style.color = 'var(--text-color)';

            containerTutorial.classList.remove('hidden');
            containerAvaliacao.classList.add('hidden');

            initTutorial();
        });
    }

    // Lógica do Modo Tutorial (Treino Guiado Passo a Passo)
    const TUTORIAL_CONFIG = {
        intro: {
            title: "Introdução",
            periods: [
                { id: 1, name: "Frase 1", hint: "Tópico Frasal c/ Repertório e dupla identificação." },
                { id: 2, name: "Frase 2", hint: "Ponte Temática c/ palavras-chave conectando o repertório ao tema." },
                { id: 3, name: "Frase 3", hint: "Tese Dupla (apresentação dos dois argumentos/problemas)." }
            ]
        },
        d1: {
            title: "Desenvolvimento 1",
            periods: [
                { id: 1, name: "Frase 1", hint: "Tópico Frasal (Retomada do Argumento 1)." },
                { id: 2, name: "Frase 2", hint: "Progressão Causal / Explicação do problema." },
                { id: 3, name: "Frase 3", hint: "Encaixe de Repertório produtivo." },
                { id: 4, name: "Frase 4", hint: "Fechamento Crítico (Consequência ou reflexão)." }
            ]
        },
        d2: {
            title: "Desenvolvimento 2",
            periods: [
                { id: 1, name: "Frase 1", hint: "Tópico Frasal (Retomada do Argumento 2)." },
                { id: 2, name: "Frase 2", hint: "Progressão Causal / Explicação do problema." },
                { id: 3, name: "Frase 3", hint: "Encaixe de Repertório produtivo." },
                { id: 4, name: "Frase 4", hint: "Fechamento Crítico (Consequência ou reflexão)." }
            ]
        },
        conclusao: {
            title: "Conclusão",
            periods: [
                { id: 1, name: "Frase 1", hint: "Retomada da Tese (Confirmação do problema)." },
                { id: 2, name: "Frase 2", hint: "Proposta de Intervenção (GOMIFES) ou Síntese Circular." },
                { id: 3, name: "Frase 3", hint: "Fechamento final (Retomando o repertório da introdução)." }
            ]
        }
    };

    let currentTutorialPara = 'intro';
    let currentTutorialPeriod = 1;
    let tutorialHistory = [];

    const tutorialSelect = document.getElementById('tutorial-paragraph-select');
    const tutorialChatArea = document.getElementById('tutorial-chat-area');
    // tutorialTextarea já foi declarado acima
    const tutorialStepTitle = document.getElementById('tutorial-step-title');
    const tutorialStepHint = document.getElementById('tutorial-step-hint');
    const tutorialSubmitBtn = document.getElementById('tutorial-submit-btn');
    const tutorialRestartBtn = document.getElementById('tutorial-restart-btn');

    function initTutorial() {
        if (!tutorialSelect) return;
        currentTutorialPara = tutorialSelect.value;
        currentTutorialPeriod = 1;
        tutorialHistory = [];
        tutorialChatArea.innerHTML = '';
        tutorialTextarea.value = '';
        tutorialTextarea.disabled = false;
        tutorialSubmitBtn.classList.remove('hidden');
        tutorialRestartBtn.classList.add('hidden');
        updateTutorialUI();
    }

    if (tutorialSelect) tutorialSelect.addEventListener('change', initTutorial);
    if (tutorialRestartBtn) tutorialRestartBtn.addEventListener('click', initTutorial);

    function updateTutorialUI() {
        const config = TUTORIAL_CONFIG[currentTutorialPara];
        if (currentTutorialPeriod <= config.periods.length) {
            const periodConfig = config.periods[currentTutorialPeriod - 1];
            tutorialStepTitle.textContent = periodConfig.name;
            tutorialStepHint.textContent = "Missão atual: " + periodConfig.hint;
        } else {
            tutorialStepTitle.textContent = "Parágrafo Concluído!";
            tutorialStepHint.textContent = "Você terminou este parágrafo. O texto completo está compilado abaixo.";
            tutorialTextarea.disabled = true;
            tutorialSubmitBtn.classList.add('hidden');
            tutorialRestartBtn.classList.remove('hidden');
            let textoCompleto = tutorialHistory.map(h => h.text.trim()).join(' ');
            tutorialTextarea.value = textoCompleto;
        }
    }

    if (tutorialSubmitBtn) {
        tutorialSubmitBtn.addEventListener('click', () => {
            const text = tutorialTextarea ? tutorialTextarea.value.trim() : '';
            const themeElement = document.getElementById('theme');
            const theme = themeElement ? themeElement.value.trim() : '';
            if (text.length < 5) {
                alert("Escreva o período para que possamos avaliar!");
                return;
            }

            const config = TUTORIAL_CONFIG[currentTutorialPara];
            const periodConfig = config.periods[currentTutorialPeriod - 1];

            let historyText = tutorialHistory.length > 0 ? "O aluno já escreveu os seguintes períodos deste parágrafo:\\n" + tutorialHistory.map(h => `Frase ${h.period}: ${h.text}`).join('\\n') + "\\n\\n" : "";

            const currentBanca = document.getElementById('banca-select').value;
            const bancaRules = typeof BANCAS !== 'undefined' ? BANCAS[currentBanca] : null;

            let bancaInstructions = '';
            if (bancaRules) {
                bancaInstructions = `\nREGRAS DA BANCA SELECIONADA (${bancaRules.nome}):\n- ${bancaRules.resumoPratico}\n`;
            }

            const systemPromptTutorial = `
Você é o Prof. Daniel Lino AI, atuando no MODO TUTORIAL PASSO A PASSO.
O aluno está construindo um parágrafo da redação (Tema: ${theme || "Não informado"}).
Parágrafo alvo: ${config.title}.
O aluno está na ${periodConfig.name}. A missão desta frase era: "${periodConfig.hint}".
${bancaInstructions}

${historyText}
Texto que o aluno acabou de submeter para a ${periodConfig.name}:
"${text}"

SUA TAREFA:
Retorne EXCLUSIVAMENTE um objeto JSON com as chaves:
{
  "avaliacao": "Um feedback cirúrgico sobre a frase enviada (errou gramática? fugiu da missão?).",
  "texto_corrigido": "A reescrita da frase enviada, melhorando o léxico e corrigindo falhas, mantendo a voz do aluno.",
  "aprovado": true ou false (true se aceitável, false se precisar refazer totalmente),
  "proxima_instrucao": "Instrução técnica e encorajadora para a PRÓXIMA frase do parágrafo, ou parabenize se for a última frase.",
  "erros": [
    { "trecho_original": "palavra errada", "sugestao": "correção", "explicacao": "motivo do erro", "tipo": "Gramática ou Estilo" }
  ],
  "conectivos_melhoria": [
    { "trecho_original": "conectivo usado pelo aluno", "sugestoes": ["opção 1", "opção 2", "opção 3"] }
  ]
}`;

            const fullPrompt = `${systemPromptTutorial}\n\nINSTRUÇÃO CRÃƒÂTICA FINAL: Responda APENAS E EXCLUSIVAMENTE com um bloco de código contendo o objeto JSON solicitado, sem markdown em volta do json ou explicações adicionais antes ou depois.\n\n---\n\nAvalie a frase e me retorne os erros e sugestões.`;

            navigator.clipboard.writeText(fullPrompt).then(() => {
                onCopiadorSubmit = (jsonStr) => {
                    const resultObj = JSON.parse(jsonStr);

                    let highlightedText = text;
                    if (resultObj.erros && resultObj.erros.length > 0) {
                        resultObj.erros.forEach(erro => {
                            if (highlightedText.includes(erro.trecho_original)) {
                                const tipoClasse = erro.tipo ? erro.tipo.toLowerCase().replace(/[^a-z]/g, '') : 'erro';

                                let bg = 'rgba(239, 68, 68, 0.2)';
                                let border = 'red';
                                if (erro.tipo === 'Gramática' || tipoClasse === 'gramatica') { bg = 'rgba(239, 68, 68, 0.2)'; border = 'red'; }
                                else if (erro.tipo === 'Coesão' || tipoClasse === 'coesao') { bg = 'rgba(245, 158, 11, 0.2)'; border = 'orange'; }
                                else if (erro.tipo === 'Estilo' || tipoClasse === 'estilo') { bg = 'rgba(59, 130, 246, 0.2)'; border = '#3b82f6'; }
                                else if (erro.tipo === 'Estrutura' || erro.tipo === 'Repertório' || tipoClasse === 'estrutura' || tipoClasse === 'repertorio') { bg = 'rgba(139, 92, 246, 0.2)'; border = '#8b5cf6'; }

                                const span = `<span class="error-mark error-${tipoClasse}" style="background-color: ${bg}; cursor: pointer; border-bottom: 2px dashed ${border};" data-type="${erro.tipo || 'Erro'}" data-orig="${erro.trecho_original}" data-sugg="${erro.sugestao || ''}" data-exp="${erro.explicacao}"> ${erro.trecho_original} </span>`;
                                highlightedText = highlightedText.replace(erro.trecho_original, span);
                            }
                        });
                    }

                    if (resultObj.conectivos_melhoria && resultObj.conectivos_melhoria.length > 0) {
                        resultObj.conectivos_melhoria.forEach(conectivo => {
                            if (highlightedText.includes(conectivo.trecho_original)) {
                                const span = `<span class="error-mark error-conectivo" style="background-color: rgba(34, 197, 94, 0.2); cursor: pointer; border-bottom: 2px dashed var(--success);" data-type="Conectivo" data-orig="${conectivo.trecho_original}" data-sugg="${conectivo.sugestoes.join(' | ')}" data-exp="Essas opções refinam o vocabulário e elevam a coesão do texto."> ${conectivo.trecho_original} </span>`;
                                highlightedText = highlightedText.replace(conectivo.trecho_original, span);
                            }
                        });
                    }

                    if (resultObj.aprovado || resultObj.aprovado === undefined) {
                        tutorialHistory.push({
                            period: currentTutorialPeriod,
                            text: resultObj.texto_corrigido || text
                        });

                        const stepCard = document.createElement('div');
                        stepCard.style.padding = '1rem';
                        stepCard.style.background = 'var(--bg-color)';
                        stepCard.style.borderLeft = '4px solid var(--success)';
                        stepCard.style.borderRadius = '4px';
                        stepCard.style.border = '1px solid var(--panel-border)';
                        stepCard.innerHTML = `
                            <h4 style="color: var(--success); margin-bottom: 0.5rem;">${periodConfig.name} - Aprovada</h4>
                            <p style="margin-bottom: 0.5rem; color: var(--text-color);"><strong>Original:</strong> ${highlightedText}</p>
                            <p style="margin-bottom: 0.5rem; color: var(--text-color);"><strong>Correção Lino:</strong> ${resultObj.texto_corrigido}</p>
                            <p style="color: var(--warning); font-size: 0.95rem;"><em>Feedback: ${resultObj.avaliacao}</em></p>
                        `;
                        tutorialChatArea.appendChild(stepCard);
                        setupTooltips();

                        currentTutorialPeriod++;
                        tutorialTextarea.value = '';
                        updateTutorialUI();

                        if (currentTutorialPeriod <= config.periods.length) {
                            tutorialStepHint.textContent = `Missão atual: ${config.periods[currentTutorialPeriod - 1].hint} | Dica Prof. Lino: ${resultObj.proxima_instrucao}`;
                        }
                    } else {
                        const stepCard = document.createElement('div');
                        stepCard.style.padding = '1rem';
                        stepCard.style.background = 'var(--bg-color)';
                        stepCard.style.borderLeft = '4px solid var(--danger)';
                        stepCard.style.borderRadius = '4px';
                        stepCard.style.border = '1px solid var(--panel-border)';
                        stepCard.style.marginBottom = '1rem';
                        stepCard.innerHTML = `
                            <h4 style="color: var(--danger); margin-bottom: 0.5rem;">${periodConfig.name} - Reprovada (Refaça!)</h4>
                            <p style="margin-bottom: 0.5rem; color: var(--text-color);"><strong>Original:</strong> ${highlightedText}</p>
                            <p style="color: var(--warning); font-size: 0.95rem;"><em>Motivo: ${resultObj.avaliacao}</em></p>
                        `;
                        tutorialChatArea.appendChild(stepCard);
                        setupTooltips();
                    }
                };

                jsonPasteArea.value = '';
                copiadorModal.classList.remove('hidden');
            }).catch(err => {
                console.error('Erro ao copiar', err);
                alert('Erro ao copiar o prompt.');
            });
        });
    }


    const analyzeRepertoryBtn = document.querySelector('#repertory-view .btn-primary');
    if (analyzeRepertoryBtn) {
        analyzeRepertoryBtn.addEventListener('click', () => {
            const textarea = document.querySelector('#repertory-view .training-textarea');
            const text = textarea.value.trim();
            const axisTitle = document.getElementById('current-axis-title').textContent;

            if (text.length < 15) {
                alert("Escreva mais para podermos avaliar a produtividade do repertório.");
                return;
            }

            const fullPrompt = `${typeof SYSTEM_PROMPT !== 'undefined' ? SYSTEM_PROMPT : ''}\n\nINSTRUÇÃO CRÃƒÂTICA FINAL: Responda APENAS E EXCLUSIVAMENTE com um bloco de código contendo o objeto JSON solicitado, sem markdown em volta do json ou explicações adicionais antes ou depois.\n\n---\n\nBanca Alvo: ${currentBanca.nome}\nEixo: ${axisTitle}\nTrecho de Repertório a avaliar:\n"${text}"\n\nAvalie a PRODUTIVIDADE (Improdutivo, Mediano, Produtivo) deste repertório e se atende às regras (dupla informação e costura causal). Retorne apenas no formato JSON estruturado do sistema.`;

            navigator.clipboard.writeText(fullPrompt).then(() => {
                onCopiadorSubmit = (jsonStr) => {
                    const resultObj = JSON.parse(jsonStr);

                    let feedbackHtml = `
                        <div style="margin-top: 2rem; background: var(--bg-color); padding: 1.5rem; border-radius: 8px; border: 1px solid var(--panel-border);">
                            <h3 style="color: var(--primary); margin-bottom: 1rem;">Feedback de Repertório</h3>
                            <p style="white-space: pre-wrap; line-height: 1.6; color: var(--text-color);">${resultObj.diagnostico || 'Sem diagnóstico.'}</p>
                            
                            <h4 style="color: var(--success); margin-top: 1.5rem; margin-bottom: 0.5rem;">Como usar corretamente:</h4>
                            <p style="white-space: pre-wrap; line-height: 1.6; color: var(--text-color);">${resultObj.reescrita || 'Sem reescrita.'}</p>
                        </div>
                    `;

                    let feedbackContainer = document.getElementById('repertory-feedback');
                    if (!feedbackContainer) {
                        feedbackContainer = document.createElement('div');
                        feedbackContainer.id = 'repertory-feedback';
                        analyzeRepertoryBtn.parentNode.parentNode.appendChild(feedbackContainer);
                    }
                    feedbackContainer.innerHTML = feedbackHtml;
                };

                jsonPasteArea.value = '';
                copiadorModal.classList.remove('hidden');
            }).catch(err => {
                console.error('Erro ao copiar', err);
                alert('Erro ao copiar o prompt.');
            });
        });
    }

    // Removed old grammar mode analysis logic that was conflicting with the Arena

    // ==========================================
    // LÓGICA DE TEMPORIZADORES E TUTOR
    // ==========================================

    // 1. Simulado Oficial (Modo Valendo)
    let simuladoTimerInterval = null;
    const btnFreeMode = document.getElementById('btn-free-mode');
    const btnTimerMode = document.getElementById('btn-timer-mode');
    const simuladoTimerDisplay = document.getElementById('simulado-timer-display');
    const btnStartSimulado = document.getElementById('btn-start-simulado');
    const modeToggleBar = document.querySelector('.mode-toggle');

    if (btnFreeMode && btnTimerMode) {
        btnFreeMode.addEventListener('click', () => {
            btnFreeMode.classList.add('active');
            btnFreeMode.style.background = 'var(--primary)';
            btnFreeMode.style.color = '#fff';

            btnTimerMode.classList.remove('active');
            btnTimerMode.style.background = 'transparent';
            btnTimerMode.style.color = 'var(--danger)';

            simuladoTimerDisplay.style.display = 'none';
            btnStartSimulado.style.display = 'none';

            clearInterval(simuladoTimerInterval);
            simuladoTimerDisplay.textContent = '01:30:00';
            essayInput.disabled = false;
            if (modeToggleBar) {
                modeToggleBar.style.pointerEvents = 'auto';
                modeToggleBar.style.opacity = '1';
            }
        });

        btnTimerMode.addEventListener('click', () => {
            btnTimerMode.classList.add('active');
            btnTimerMode.style.background = 'var(--danger)';
            btnTimerMode.style.color = '#fff';

            btnFreeMode.classList.remove('active');
            btnFreeMode.style.background = 'transparent';
            btnFreeMode.style.color = 'var(--primary)';

            simuladoTimerDisplay.style.display = 'block';
            btnStartSimulado.style.display = 'block';

            clearInterval(simuladoTimerInterval);
            simuladoTimerDisplay.textContent = '01:30:00';
            essayInput.disabled = true; // wait for start
            btnStartSimulado.textContent = 'Iniciar Simulado';
        });

        btnStartSimulado.addEventListener('click', () => {
            if (btnStartSimulado.textContent === 'Forçar Entrega') {
                clearInterval(simuladoTimerInterval);
                analyzeBtn.click();
                if (modeToggleBar) {
                    modeToggleBar.style.pointerEvents = 'auto';
                    modeToggleBar.style.opacity = '1';
                }
                return;
            }

            essayInput.disabled = false;
            essayInput.focus();
            if (modeToggleBar) {
                modeToggleBar.style.pointerEvents = 'none';
                modeToggleBar.style.opacity = '0.5';
            }
            btnStartSimulado.textContent = 'Forçar Entrega';

            let timeRemaining = 90 * 60; // 90 minutes
            simuladoTimerInterval = setInterval(() => {
                timeRemaining--;
                if (timeRemaining <= 0) {
                    clearInterval(simuladoTimerInterval);
                    simuladoTimerDisplay.textContent = '00:00:00';
                    alert('O tempo acabou! Sua redação será submetida automaticamente.');
                    if (modeToggleBar) {
                        modeToggleBar.style.pointerEvents = 'auto';
                        modeToggleBar.style.opacity = '1';
                    }
                    analyzeBtn.click();
                } else {
                    const h = Math.floor(timeRemaining / 3600).toString().padStart(2, '0');
                    const m = Math.floor((timeRemaining % 3600) / 60).toString().padStart(2, '0');
                    const s = (timeRemaining % 60).toString().padStart(2, '0');
                    simuladoTimerDisplay.textContent = `${h}:${m}:${s}`;
                }
            }, 1000);
        });
    }

    // 2. Cronômetro de Treino por Partes
    const btnStartPartTimer = document.getElementById('btn-start-part-timer');
    const currentPartTimeDisplay = document.getElementById('current-part-time');
    let partTimerInterval = null;

    if (btnStartPartTimer) {
        btnStartPartTimer.addEventListener('click', () => {
            clearInterval(partTimerInterval);
            currentPartTimeDisplay.style.color = 'var(--warning)';

            let duration = 20 * 60; // 20m default

            const pSelect = document.getElementById('tutorial-paragraph-select');
            if (!document.getElementById('training-tutorial-container').classList.contains('hidden') && pSelect) {
                if (pSelect.value === 'intro' || pSelect.value === 'conclusao') duration = 15 * 60;
                else duration = 20 * 60;
            }

            let timeRemaining = duration;
            btnStartPartTimer.textContent = 'Reiniciar Cronômetro';

            partTimerInterval = setInterval(() => {
                timeRemaining--;
                if (timeRemaining <= 0) {
                    clearInterval(partTimerInterval);
                    currentPartTimeDisplay.textContent = '00:00';
                    currentPartTimeDisplay.style.color = 'var(--danger)';
                    alert('Tempo sugerido esgotado. Tente finalizar em breve!');
                } else {
                    const m = Math.floor(timeRemaining / 60).toString().padStart(2, '0');
                    const s = (timeRemaining % 60).toString().padStart(2, '0');
                    currentPartTimeDisplay.textContent = `${m}:${s}`;
                    if (timeRemaining < 60 * 5) { // last 5 minutes
                        currentPartTimeDisplay.style.color = 'var(--danger)';
                    }
                }
            }, 1000);
        });
    }

    // 3. Tutor Gramatical On-Demand
    const grammarTutorSubmit = document.getElementById('grammar-tutor-submit');
    const grammarTutorResponse = document.getElementById('grammar-tutor-response');
    if (grammarTutorSubmit) {
        grammarTutorSubmit.addEventListener('click', () => {
            const textarea = document.getElementById('grammar-tutor-textarea');
            const question = textarea.value.trim();
            if (!question) {
                alert("Digite a sua dúvida para o professor.");
                return;
            }

            const fullPrompt = `INSTRUÇÃO CRÃƒÂTICA FINAL: Responda APENAS E EXCLUSIVAMENTE com um bloco de código contendo o objeto JSON solicitado, sem markdown em volta do json ou explicações adicionais antes ou depois.\n\n---\n\nAja como o Prof. Daniel Lino. O aluno perguntou: "${question}". \nResponda sendo claro, didático e direto, focando na dúvida gramatical ou estrutural. Seja rigoroso quanto à norma culta (sem gerundismo, sem queísmo), mas mostre encorajamento. Leve em consideração que o aluno está treinando para a banca: ${currentBanca.nome}.\n\nSUA TAREFA:\nRetorne EXCLUSIVAMENTE um JSON neste formato:\n{\n  "resposta_html": "<p>Sua resposta formatada em tags HTML <strong>aqui</strong>.</p>"\n}`;

            navigator.clipboard.writeText(fullPrompt).then(() => {
                onCopiadorSubmit = (jsonStr) => {
                    const resultObj = JSON.parse(jsonStr);
                    const cleanHtml = resultObj.resposta_html || '';

                    grammarTutorResponse.innerHTML = `
                        <div class="training-card" style="border-left: 4px solid var(--primary); padding: 1.5rem; background: rgba(59, 130, 246, 0.05);">
                            <h4 style="color: var(--primary); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path></svg>
                                Resposta do Professor Lino
                            </h4>
                            <div style="color: var(--text-color); line-height: 1.6;">${cleanHtml}</div>
                        </div>
                    `;
                };

                jsonPasteArea.value = '';
                copiadorModal.classList.remove('hidden');
            }).catch(err => {
                console.error('Erro ao copiar', err);
                alert('Erro ao copiar o prompt.');
            });
        });
    }

    // AVALIAÇÃO DE REPERTÓRIO
    const btnEvaluateRepertory = document.getElementById('btn-evaluate-repertory');
    if (btnEvaluateRepertory) {
        btnEvaluateRepertory.addEventListener('click', () => {
            const textarea = document.getElementById('repertory-practice-textarea');
            if (!textarea) return;
            const text = textarea.value.trim();
            const currentAxisTitleEl = document.getElementById('current-axis-title');
            const themeOrAxis = currentAxisTitleEl ? currentAxisTitleEl.textContent : 'Eixo não especificado';

            if (text.length < 10) {
                alert("Preencha o parágrafo de repertório com mais detalhes para analisarmos!");
                return;
            }

            const fullPrompt = `${typeof SYSTEM_PROMPT !== 'undefined' ? SYSTEM_PROMPT : ''}\n\nINSTRUÇÃO CRÃƒÂTICA FINAL: Responda APENAS E EXCLUSIVAMENTE com um bloco de código contendo o objeto JSON solicitado, sem markdown em volta do json ou explicações adicionais antes ou depois.\n\n---\n\nAnalise o seguinte parágrafo de aplicação de repertório sociocultural. Focando em diagnosticar a estrutura, pertinência ao eixo temático, uso gramatical e apresentar uma reescrita mais sofisticada e produtiva. Retorne usando a mesma estrutura JSON do sistema de Treino, ou seja: \n{"diagnostico": "seu texto", "reescrita": "seu texto"}\n\nBanca Alvo: ${currentBanca.nome}\nEixo Temático: ${themeOrAxis}\nParágrafo de Repertório:\n${text}`;

            navigator.clipboard.writeText(fullPrompt).then(() => {
                onCopiadorSubmit = (jsonStr) => {
                    const resultObj = JSON.parse(jsonStr);

                    let feedbackHtml = `
                        <div style="margin-top: 1rem; background: var(--bg-color); padding: 1.5rem; border-radius: 8px; border: 1px solid var(--panel-border);">
                            <h4 style="color: var(--primary); margin-bottom: 0.5rem;">Feedback do Repertório</h4>
                            <p style="white-space: pre-wrap; line-height: 1.6; color: var(--text-color); font-size: 0.95rem;">${resultObj.diagnostico || 'Sem diagnóstico.'}</p>
                            
                            <h5 style="color: var(--success); margin-top: 1rem; margin-bottom: 0.5rem;">Reescrita Sugerida</h5>
                            <p style="white-space: pre-wrap; line-height: 1.6; color: var(--text-color); font-size: 0.95rem;">${resultObj.reescrita || 'Sem reescrita.'}</p>
                        </div>
                    `;

                    // Remove possible existing feedback before appending a new one
                    const existingFb = document.getElementById('repertory-feedback');
                    if (existingFb) existingFb.remove();

                    const feedbackContainer = document.createElement('div');
                    feedbackContainer.id = 'repertory-feedback';
                    feedbackContainer.innerHTML = feedbackHtml;
                    btnEvaluateRepertory.parentElement.appendChild(feedbackContainer);
                };

                const jsonPasteArea = document.getElementById('json-paste-area');
                if (jsonPasteArea) jsonPasteArea.value = '';
                const copiadorModal = document.getElementById('copiador-modal');
                if (copiadorModal) copiadorModal.classList.remove('hidden');
            }).catch(err => {
                console.error('Erro ao copiar', err);
                alert('Erro ao copiar o prompt.');
            });
        });
    }
    // ==========================================
    // LÓGICA DA ABA "MEU MODELO"
    // ==========================================
    const btnCopyModelPrompt = document.getElementById('btn-copy-model-prompt');
    const modelThemeInput = document.getElementById('model-theme-input');
    const modelJsonInput = document.getElementById('model-json-input');
    const btnAnalyzeModel = document.getElementById('btn-analyze-model');
    const modelAnalysisContainer = document.getElementById('model-analysis-container');
    const modelAnalyzedText = document.getElementById('model-analyzed-text');

    const skeletonIntro = document.getElementById('skeleton-intro');
    const skeletonD1 = document.getElementById('skeleton-d1');
    const skeletonD2 = document.getElementById('skeleton-d2');
    const skeletonConclusao = document.getElementById('skeleton-conclusao');

    if (btnCopyModelPrompt) {
        btnCopyModelPrompt.addEventListener('click', () => {
            const tema = modelThemeInput.value.trim();
            if (!tema) {
                alert("Por favor, digite um tema para o modelo.");
                return;
            }

            const promptFinal = PROMPT_MEU_MODELO
                .replace("{TEMA}", tema)
                .replace("{BANCA}", currentBanca.nome);

            navigator.clipboard.writeText(promptFinal).then(() => {
                const originalText = btnCopyModelPrompt.innerHTML;
                btnCopyModelPrompt.innerHTML = "<span>Copiado! Cole no Gemini e traga a resposta</span>";
                btnCopyModelPrompt.style.background = "var(--success)";
                btnCopyModelPrompt.style.borderColor = "var(--success)";
                btnCopyModelPrompt.style.color = "white";

                setTimeout(() => {
                    btnCopyModelPrompt.innerHTML = originalText;
                    btnCopyModelPrompt.style.background = "";
                    btnCopyModelPrompt.style.borderColor = "var(--primary)";
                    btnCopyModelPrompt.style.color = "var(--primary)";
                }, 4000);
            }).catch(err => {
                alert("Falha ao copiar: " + err);
            });
        });
    }

    if (btnAnalyzeModel) {
        btnAnalyzeModel.addEventListener('click', () => {
            const rawJson = modelJsonInput.value.trim();
            if (!rawJson) {
                alert("Cole o JSON retornado pelo Gemini antes de analisar.");
                return;
            }

            try {
                // Tenta extrair json caso venha com markdown ou texto sujo em volta
                let jsonStr = rawJson;
                const match = jsonStr.match(/\{[\s\S]*\}/);
                if (match) {
                    jsonStr = match[0];
                }

                const data = JSON.parse(jsonStr);

                if (!data.redacao || !data.destaques) {
                    throw new Error("O JSON não possui as propriedades 'redacao' ou 'destaques' exigidas.");
                }

                renderModelAnalysis(data.redacao, data.destaques);
                modelAnalysisContainer.classList.remove('hidden');

            } catch (e) {
                alert("Erro ao processar o JSON: " + e.message + "\n\nVerifique se copiou todo o código do Gemini corretamente.");
            }
        });
    }

    function renderModelAnalysis(redacao, destaques) {
        let highlightedText = redacao.replace(/\n/g, '<br><br>');

        // Limpar esqueletos
        skeletonIntro.innerHTML = '';
        skeletonD1.innerHTML = '';
        skeletonD2.innerHTML = '';
        skeletonConclusao.innerHTML = '';

        // Ordernar destaques por tamanho do termo (decrescente) para evitar highlights parciais
        const sortedDestaques = [...destaques].sort((a, b) => b.termo.length - a.termo.length);

        sortedDestaques.forEach((destaque, index) => {
            const className = `highlight-${destaque.tipo}`;
            const id = `model-hl-${index}`;

            // Fazer escape de RegExp
            const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

            // Definir cores por tipo
            let bg = 'rgba(245, 158, 11, 0.2)'; // Laranja default
            let border = 'orange';
            if (destaque.tipo === 'conectivo') { bg = 'rgba(34, 197, 94, 0.2)'; border = 'green'; }
            else if (destaque.tipo === 'operador') { bg = 'rgba(59, 130, 246, 0.2)'; border = '#3b82f6'; }
            else if (destaque.tipo === 'generico') { bg = 'rgba(239, 68, 68, 0.2)'; border = 'red'; }

            // Substituir termo pelo termo com tag span
            const regex = new RegExp(`(${escapeRegExp(destaque.termo)})`, 'g');
            highlightedText = highlightedText.replace(regex, `<span id="${id}" class="${className}" style="background-color: ${bg}; cursor: pointer; border-bottom: 2px dashed ${border};" data-tipo="${destaque.tipo}" data-comp="${destaque.competencia}" data-uso="${destaque.uso}">$1</span>`);

            // Adicionar ao esqueleto correspondente
            const skeletonItem = document.createElement('span');
            skeletonItem.className = `skeleton-item ${destaque.tipo}`;
            skeletonItem.textContent = destaque.termo;
            skeletonItem.title = `${destaque.competencia}: ${destaque.uso}`;

            // Lógica simples de parágrafo
            if (destaque.paragrafo === 1) skeletonIntro.appendChild(skeletonItem);
            else if (destaque.paragrafo === 2) skeletonD1.appendChild(skeletonItem);
            else if (destaque.paragrafo === 3) skeletonD2.appendChild(skeletonItem);
            else if (destaque.paragrafo === 4 || destaque.paragrafo > 4) skeletonConclusao.appendChild(skeletonItem);
            else skeletonIntro.appendChild(skeletonItem); // fallback
        });

        modelAnalyzedText.innerHTML = highlightedText;

        // Adicionar eventos de hover para os tooltips na dissecação
        document.querySelectorAll('#model-analyzed-text span[class^="highlight-"]').forEach(span => {
            span.addEventListener('mouseenter', (e) => {
                const tipo = span.dataset.tipo;
                const comp = span.dataset.comp;
                const uso = span.dataset.uso;

                tooltipHeader.textContent = comp + " (" + tipo.charAt(0).toUpperCase() + tipo.slice(1) + ")";
                tooltipOriginal.textContent = span.textContent;
                tooltipSuggestion.textContent = "";
                tooltipSuggestion.parentElement.style.display = 'none';
                tooltipExplanation.textContent = uso;

                tooltipHeader.style.background = tipo === 'conectivo' ? 'var(--success)' : (tipo === 'generico' ? 'var(--warning)' : 'var(--primary)');
                tooltipHeader.style.color = tipo === 'generico' ? '#000' : '#fff';

                const rect = span.getBoundingClientRect();
                tooltip.style.left = `${rect.left + window.scrollX}px`;
                tooltip.style.top = `${rect.bottom + window.scrollY + 10}px`;
                tooltip.classList.add('visible');
            });

            span.addEventListener('mouseleave', () => {
                tooltip.classList.remove('visible');
                // Restaurar cor do header caso seja modificado por outra view
                tooltipHeader.style.background = 'var(--danger)';
                tooltipHeader.style.color = '#fff';
            });
        });

        // Verifica se algum esqueleto ficou vazio e preenche com aviso
        [skeletonIntro, skeletonD1, skeletonD2, skeletonConclusao].forEach(el => {
            if (el.innerHTML.trim() === '') {
                el.innerHTML = '<span style="color: var(--text-muted); font-style: italic;">Nenhum elemento mapeado.</span>';
            }
        });
    }

});





